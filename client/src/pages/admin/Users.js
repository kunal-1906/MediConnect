import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout'
import axios from 'axios';
import { Table } from 'antd';

const Users = () => {

  const [users,setUsers]=useState([])



  const getUsers =async () =>{
    try {
      const res =await axios.get('/api/v1/admin/getAllUsers',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      
        
      }
    } catch (error) {
      console.log(error);
      
    }
  };




  useEffect(()=>{
    getUsers();
  }, []);


  const columns = [

    {
      title:'Name',
      dataIndex:'name'
    },
    {
      title:'Email',
      dataIndex:'email'
    },
    {
      title:'Doctor',
      dataIndex:'isDoctor',
      render:(text,record)=>(
        <span>{record.isDoctor ? 'Yes':'No'}</span>
      )
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>(
        <div className='d-flex'>
          <button className='btn btn-danger'>Block</button>
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
        <h1><b>Users List</b></h1>
        <Table columns={columns} dataSource={users}/>
        </div>
    </Layout>
  )
}

export default Users