import React, { useEffect, useState } from "react";
import Layout from "./../../components/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import { FaUserMd, FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaBriefcaseMedical, FaClock, FaMoneyBillWave } from "react-icons/fa";

const DoctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    const getDoctorInfo = async () => {
      try {
        const res = await axios.post(
          "/api/v1/doctor/getDoctorInfo",
          { userId: params.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setDoctor(res.data.data);
          form.setFieldsValue({
            ...res.data.data,
            timings: [
              moment(res.data.data.timings[0], "HH:mm"),
              moment(res.data.data.timings[1], "HH:mm"),
            ],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDoctorInfo();
  }, [params.id, form]);

  return (
    <Layout>
      <div style={{
        backgroundImage: "url('/bghome.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '30px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'white'
            }}>
              <FaUserMd size={32} />
            </div>
            <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '0.5rem' }}>Your Profile</h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#6B73FF',
              fontWeight: '500',
              background: 'rgba(107, 115, 255, 0.1)',
              display: 'inline-block',
              padding: '5px 15px',
              borderRadius: '20px'
            }}>{doctor?.specialisation}</p>
          </div>

          <Form form={form} onFinish={handleFinish} layout="vertical">
            <Divider orientation="left" style={{ color: '#6B73FF', borderTopColor: 'rgba(107, 115, 255, 0.3)' }}>
              Personal Information
            </Divider>
            <Row gutter={24}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="firstname"
                  label="First Name"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<FaUserMd style={{ color: '#6B73FF' }} />} placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="lastname"
                  label="Last Name"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<FaUserMd style={{ color: '#6B73FF' }} />} placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<FaPhone style={{ color: '#6B73FF' }} />} placeholder="Phone Number" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input prefix={<FaEnvelope style={{ color: '#6B73FF' }} />} placeholder="Email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="website" label="Website">
                  <Input prefix={<FaGlobe style={{ color: '#6B73FF' }} />} placeholder="Website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="address"
                  label="Clinic Address"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<FaMapMarkerAlt style={{ color: '#6B73FF' }} />} placeholder="Clinic Address" />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left" style={{ color: '#6B73FF', borderTopColor: 'rgba(107, 115, 255, 0.3)' }}>
              Professional Information
            </Divider>
            <Row gutter={24}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="specialisation"
                  label="Specialization"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<FaBriefcaseMedical style={{ color: '#6B73FF' }} />} placeholder="Specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="experience"
                  label="Experience (Years)"
                  rules={[{ required: true }]}
                >
                  <Input type="number" placeholder="Years of Experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="feesPerConsultation"
                  label="Fees (₹)"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<FaMoneyBillWave style={{ color: '#6B73FF' }} />} type="number" placeholder="Consultation Fees" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="timings" label="Available Timings" required>
                  <TimePicker.RangePicker
                    format="HH:mm"
                    style={{ width: '100%' }}
                    suffixIcon={<FaClock style={{ color: '#6B73FF' }} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '200px'
                }}
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorProfile;