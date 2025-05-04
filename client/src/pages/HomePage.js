import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import { Row, Spin, message,Col } from 'antd';
import DoctorList from '../components/doctorList';

const cardStyle = {
  flex: 1,
  background: 'rgba(255, 255, 255, 0.6)', // lighter white
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)', // <- important for Safari
  border: '1px solid rgba(255, 255, 255, 0.3)', // optional: subtle border
};



const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('No token found. Please login again.');
        return;
      }
  
      const headers = {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      };
  
      const userRes = await axios.post('/api/v1/user/getUserData', {}, { headers });
  
      if (userRes.data.success) {
        setUser(userRes.data.data);
  
        if (userRes.data.data.isDoctor) {
          // Fetch Doctor Dashboard Only if user is Doctor
          const dashboardRes = await axios.post('/api/v1/doctor/getDoctorDashboard', {
            doctorId: userRes.data.data._id,
          }, { headers });
  
          if (dashboardRes.data.success) {
            setDashboard(dashboardRes.data.data);
          }
        }
      } else {
        message.error('Failed to load user data.');
      }
  
      const doctorsRes = await axios.get('/api/v1/user/getAllDoctors', { headers });
  
      if (doctorsRes.data.success) {
        setDoctors(doctorsRes.data.data);
      } else {
        message.error('Failed to load doctors.');
      }
  
    } catch (error) {
      console.error('Error loading data:', error);
      message.error('Something went wrong while loading.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h1>Unable to load user information. Please login again.</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="home-container"
        style={{
          backgroundImage: "url('/bghome.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '2rem',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          {user.isDoctor ? (
            <>
             <h1 className="home-title"><b>Welcome Dr. {user.name}</b></h1>
      {dashboard ? (
        <div style={{ marginTop: '2rem' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <div style={cardStyle}>
                <h3>Today's Appointments</h3>
                <h2>{dashboard.todaysAppointments}</h2>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div style={cardStyle}>
                <h3>Total Patients</h3>
                <h2>{dashboard.totalPatients}</h2>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div style={cardStyle}>
                <h3>Earnings Today</h3>
                <h2>₹{dashboard.earningsToday}</h2>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Spin />
      )}
    

            </>
          ) : (
            <>
              <h1 className="home-title"><b>Find Your Specialist</b></h1>
              <Row gutter={[16, 16]}>
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <DoctorList key={doctor._id} doctor={doctor} />
                  ))
                ) : (
                  <div>No doctors found.</div>
                )}
              </Row>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
