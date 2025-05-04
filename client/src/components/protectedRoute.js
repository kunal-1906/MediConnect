import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/user/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(hideLoading());

        if (res.data.success) {
          dispatch(setUser(res.data.data));
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        dispatch(hideLoading());
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (!user && token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [dispatch, user, token]);

  if (!token && !loading) {
    return <Navigate to="/login" replace />;
  }

  return loading ? <h1>Loading...</h1> : children;
}
