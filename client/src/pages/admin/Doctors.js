import React, { useState, useEffect } from 'react';
import Layout from './../../components/layout';
import axios from 'axios';
import { message, Table } from 'antd';  // Import Table from Ant Design

const Doctors = () => {
  const [Doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async(record,status)=>{
    try {
      const res=await axios.post('/api/v1/admin/changeAccountStatus',
        {doctorId:record._id,userId:record.userId,status:status},
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if(res.data.success){
        message.success(res.data.message);
        window.location.reload();
      }
      
    } catch (error) {
      message.error('Something Went Wrong')

      
    }

  }

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <span>{record.firstname} {record.lastname}</span>, // ✅ Fixed "latName" to "lastName"
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => <span>{record.status}</span>,
      
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      render: (text, record) => <span>{record.phoneNumber}</span>,
      
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' ? (
            <button className='btn btn-success' onClick={()=> handleAccountStatus(record,'approved')}>Approve</button>
          ) : (
            <button className='btn btn-danger'>Reject</button>
          )}
        </div>
      ),
    },
  ];

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
      <h1><b>All Doctors</b></h1>
      <Table columns={columns} dataSource={Doctors} rowKey="_id" />  {/* ✅ Display Doctors */}
      </div>
    </Layout>
  );
};

export default Doctors;
