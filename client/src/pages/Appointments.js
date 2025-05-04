import React, { useEffect, useState } from 'react';
import Layout from './../components/layout';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';



const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    // Fetch appointments
    const getAppointments = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });


            console.log("API Response:",res.data);



            if (res.data.success) {
                setAppointments(res.data.data);
            }
            setLoading(false); 
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        getAppointments();
    }, []);

    // Table columns
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        
        {
            title: 'Name',
            key: 'name',
            render: (text, record) => (
              <span>
               Dr. {record.doctorId?.firstname} {record.doctorId?.lastname}
              </span>
            ),
          },
          // {
          //   title: 'Phone',
          //   key: 'phoneNumber',
          //   render: (text, record) => 
              
          //       record.doctorId?.phoneNumber,
            
          // },
          
        {
            title: 'Date And Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
            render: (text, record) => (
                <span>
                    {moment(record.dateTime).format('DD-MM-YYYY HH:mm')}
                </span>
            ),
        },
        
            
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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
  
      <h1>
        <b>Your Appointments</b>
      </h1>
      <Table
        columns={columns}
        dataSource={appointments}
        rowKey="_id"
        loading={loading}
        style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '10px',
          padding: '20px',
        }}
      />
      </div>
      
    </Layout>
        
    );
};

export default Appointments;
