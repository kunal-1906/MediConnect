import React, { useState } from 'react';
import { Form, Input, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import "../styles/RegisterStyles.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinishHandler = async (values) => {
    try {
      setLoading(true);
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading());
      
      if (res.data.success) {
        message.success('Registered Successfully!');
        navigate('/login');
      } else {
        message.error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.response?.data?.message || 'Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{
      minHeight: '100vh',
      backgroundImage: 'url("https://i.pinimg.com/736x/b5/03/05/b5030572bfa7c568d6a63eb0bccfc7ec.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="register-card" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        maxWidth: '450px',
        width: '100%',
        maxHeight: '90vh', // Ensure card doesn't exceed viewport height
        overflowY: 'auto', // Make card content scrollable if needed
        position: 'relative',
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
        
        {/* Logo and heading - reduced margin */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="/kunal.png"
            alt="MediConnect Logo"
            style={{ 
              width: '100px', 
              height: '100px',
              objectFit: 'contain',
              borderRadius: '50%',
              border: '3px solid #0052d4',
              boxShadow: '0 4px 12px rgba(0, 82, 212, 0.3)'
            }}
          />
          <h2 style={{
            marginTop: '10px',
            color: '#0052d4',
            fontWeight: '600',
            fontSize: '1.5rem'
          }}>Create Account</h2>
        </div>

        {/* Registration form with reduced spacing */}
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          style={{ padding: '0 10px' }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Enter your full name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Create a password"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '15px' }}>
            <button 
              className="register-btn" 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                height: '40px',
                background: 'linear-gradient(to right, #0052d4, #4364f7)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '5px'
              }}
            >
              {loading ? <Spin size="small" /> : 'Register Now'}
            </button>
          </Form.Item>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '15px',
            paddingBottom: '10px' // Ensure bottom spacing
          }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Already have an account? </span>
            <Link 
              to="/login" 
              style={{ 
                color: '#0052d4',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Login here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;