import React from 'react';
import Layout from "./../components/layout";
import { Form, Input, Row, Col,TimePicker,message  } from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {showLoading,hideLoading} from '../redux/features/alertSlice';
import axios from 'axios';


const ApplyDoctor = () => {

    const {user}=useSelector(state=>state.user)


    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
    
            // Convert TimePicker values to 'HH:mm' format
            const formattedTimings = values.timings
                ? [values.timings[0].format("HH:mm"), values.timings[1].format("HH:mm")]
                : [];
    
            const res = await axios.post('/api/v1/user/apply-doctor',
                { ...values, userId: user._id, timings: formattedTimings },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
    
            dispatch(hideLoading());
    
            if (res.data.success) {
                message.success("Application submitted successfully!");
                navigate('/');
            } else {
                message.error(res.data.message || "Something went wrong");
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
    
  return (
    <Layout>
            <div
        style={{
          minHeight: '100vh',
          backgroundImage: 'url("/bghome.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '40px',
        }}
      >
        <h1><b>Apply As a Doctor</b></h1>
        <Form 
        layout='vertical' 
        onFinish={handleFinish} 
        className='m-3'>
            

        
        
        <h4>Personal Details:</h4>
        <Row gutter={20}>
           
            <Col xs={24} md={24} lg={8}>
                
                <Form.Item label='First Name'
                name='firstname' 
                required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Your First Name'/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>    
                <Form.Item label='Last Name'
                name='lastname' 
                required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Your Last Name'/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Phone Number'
                name='phonenumber' 
                required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Your Phone Number'/>
                </Form.Item>
                </Col>

                
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Email'
                name='email' 
                required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Your Email'/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Website'
                name='website' 
                >
                    <Input type='text' placeholder='Enter Your Website Link'/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Address'
                name='address' 
                required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Your Address'/>
                </Form.Item>

            </Col>
        </Row>



        <h4>Professional Details:</h4>
        <Row gutter={20}>
           
            <Col xs={24} md={24} lg={8}>
                
                <Form.Item label='Specialisation'
                name='specialisation' 
                required rules={[{required:true}]}
                >
                    <Input type='text' placeholder='Enter Your Specialisation'/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>    
                <Form.Item label='Experience'
                name='experience' 
                required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Your Experience'/>
                </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Fees Per Consultation'
                name='feesperconsultation' 
                required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter Your Fees Per Consultation'/>
                </Form.Item>
               
                </Col>

                
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Timings'
                name='timings' 
                required
                >
                   <TimePicker.RangePicker format="HH:mm"/>
                </Form.Item>
                </Col>
               
                <Col xs={24} md={24} lg={8}></Col>

                <Col xs={24} md={24} lg={8}>
                <button className='form-btn btn btn-primary' type='submit'>Submit</button>
                </Col>
                
        </Row>
       
        
        </Form>
        </div>
    </Layout>
  );
};

export default ApplyDoctor;