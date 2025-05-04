import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message, Card, Button } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const dispatch = useDispatch();

  // Fetch Doctor Data inside useEffect
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.post(
          "/api/v1/doctor/getDoctorById",
          { doctorId: params.doctorId },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (res.data.success) {
          setDoctor(res.data.data);
        } else {
          console.error("Failed to fetch doctor:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [params.doctorId]);

  const handleBooking = async () => {
    if (!date || !time) {
      message.warning("Please select both date and time.");
      return;
    }

    try {
      dispatch(showLoading());

      const res = await axios.post(
        "/api/v1/user/book-appointment",
        { doctorId: params.doctorId, userId: user._id, doctorInfo: doctor, userInfo: user, date, time },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (res.data.success) {
        message.success(res.data.message || "Appointment booked successfully!");
        setDate(null);
        setTime(null);
      } else {
        message.error(res.data.message || "Booking failed!");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleAvailability = async () => {
    if (!date || !time) {
      message.warning("Please select a date and time.");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/booking-availability',
        {
          doctorId: params.doctorId,
          date,
          time
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }

    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Error checking availability. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container py-4">
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
          <h2 className="text-center mb-4" style={{ color: "#1D4ED8" }}><b>Book Appointment</b></h2>

          {doctor ? (
            <Card
              title={`Dr. ${doctor.firstname} ${doctor.lastname}`}
              bordered={true}
              style={{
                maxWidth: 600,
                margin: "0 auto",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <p><strong>Fees:</strong> ₹{doctor.feesPerConsultation}</p>
              <p><strong>Timings:</strong> {doctor.timings?.length > 1 ? `${doctor.timings[0]} - ${doctor.timings[1]}` : "Not Available"}</p>

              <div className="d-flex flex-column gap-3 mt-3">
                <DatePicker
                  format="DD-MM-YYYY"
                  className="w-100"
                  onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
                  size="large"
                />
                <TimePicker
                  format="HH:mm"
                  className="w-100"
                  onChange={(value) => setTime(moment(value).format("HH:mm"))}
                  size="large"
                />

                <Button type="primary" block onClick={handleAvailability}>
                  Check Availability
                </Button>

                <Button
                  type="default"
                  block
                  onClick={handleBooking}
                >
                  Book Now
                </Button>
              </div>

              {isAvailable && (
                <p className="text-success text-center mt-3">
                  Doctor is available at your selected time!
                </p>
              )}
              {!isAvailable && date && time && (
                <p className="text-danger text-center mt-3">
                  Please check availability before booking.
                </p>
              )}
            </Card>
          ) : (
            <h4 className="text-center">Loading doctor details...</h4>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
