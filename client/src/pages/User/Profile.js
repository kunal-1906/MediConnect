import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import './Profile.css';

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.post(
          "/api/v1/user/getUserData",
          { userId: user._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setUserProfile(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      getUserInfo();
    }
  }, [user?._id]);

  return (
    <Layout>
      <div className="profile-container" style={{ backgroundImage: "url('/bghome.jpg')" }}>
        <div className="profile-content">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.address.reload()}>Retry</button>
            </div>
          ) : userProfile ? (
            <>
              <div className="profile-header">
                <div className="avatar">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
                <h1>{userProfile.name}</h1>
                {user?.createdAt && (
                  <p className="member-since">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                )}
              </div>

              <div className="profile-details">
                <div className="detail-card">
                  <div className="detail-icon">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p>{userProfile.email}</p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon">
                    <FiPhone size={18} />
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <p>{userProfile.phoneNumber || "Not provided"}</p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-icon">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <h3>Location</h3>
                    <p>{userProfile.address || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-data">
              <p>No profile data available</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;