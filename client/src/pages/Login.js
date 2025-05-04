import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message, notification, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "../styles/RegisterStyles.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinishHandler = async (values) => {
    setLoading(true);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successful");
        navigate("/");
      } else {
        showError(res.data.message || "Invalid credentials");
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response) {
        showError(error.response.data?.message || "Entered Email or Password Is Wrong!");
      } else {
        showError("Server not responding. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const showError = (errorMessage) => {
    notification.error({
      message: "Login Failed",
      description: errorMessage,
      placement: 'topRight',
      duration: 4,
    });
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      backgroundImage: 'url("https://i.pinimg.com/736x/b5/03/05/b5030572bfa7c568d6a63eb0bccfc7ec.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="login-card" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        maxWidth: '450px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        {/* Gradient top border */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(to right, #0052d4, #4364f7, #6fb1fc)'
        }}></div>
        
        {/* Logo and heading */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src="/kunal.png"
            alt="MediConnect Logo"
            style={{ 
              width: '120px', 
              height: '120px',
              objectFit: 'contain',
              borderRadius: '50%',
              border: '3px solid #0052d4',
              boxShadow: '0 4px 12px rgba(0, 82, 212, 0.3)'
            }}
          />
          <h2 style={{
            marginTop: '15px',
            color: '#0052d4',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>Welcome Back</h2>
          <p style={{ color: '#666', marginTop: '5px' }}>Please login to continue</p>
        </div>

        {/* Login form */}
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="login-form"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <button 
              className="login-btn" 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                height: '45px',
                background: 'linear-gradient(to right, #0052d4, #4364f7)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 8px rgba(0, 82, 212, 0.3)',
                marginTop: '10px'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {loading ? (
                <Spin indicator={<span style={{ color: 'white' }}>Logging in...</span>} />
              ) : (
                'Login'
              )}
            </button>
          </Form.Item>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ color: '#666' }}>New user? </span>
            <Link 
              to="/register" 
              style={{ 
                color: '#0052d4',
                fontWeight: '500',
                textDecoration: 'underline'
              }}
            >
              Create an account
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;