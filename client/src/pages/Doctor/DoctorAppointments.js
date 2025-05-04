import React, { useEffect, useState } from "react";
import Layout from "./../../components/layout";
import axios from "axios";
import moment from "moment";
import { Table, Button, message} from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(`/api/v1/doctor/doctor-appointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      console.log("Sending Request:", {
        appointmentId: record._id,
        status,
      });
  
      const res = await axios.post(
        '/api/v1/doctor/update-appointment-status',
        { appointmentId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      console.log("Server Response:", res.data);
  
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments(); // Refresh the list
      } else {
        message.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error in handleStatus:", error);
      message.error(error.response?.data?.message || "Something Went Wrong");
    }
  };
  

  const columns = [
    {
      title: "ID",

      dataIndex: "_id",
      key: "_id",
    },
    
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) =>
        record.status === "pending" ? (
          <div className="d-flex">
            <Button
  type="primary"
  className="btn btn-success"
  onClick={() => handleStatus(record, "approved")} // ✅ Pass record and status
>
  Approve
</Button>
<Button
  type="danger"
  className="btn btn-danger"
  onClick={() => handleStatus(record, "rejected")} // ✅ Pass record and status
  style={{ marginLeft: "10px" }}
>
  Reject
</Button>

          </div>
        ) : (
          <span>{record.status}</span>
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
  
      <h1>
        <b>Appointment List</b>
      </h1>
      <Table
        columns={columns}
        dataSource={appointments}
        rowKey="_id"
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

export default DoctorAppointments;
