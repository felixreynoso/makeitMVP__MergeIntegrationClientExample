import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfile({ token }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    const res = await axios.get(
      "http://127.0.0.1:5001/communiti-630fc/us-central1/api/user/profile",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setUser(res.data.user);
  };

  if (Object.keys(user).length === 0) return;
  return (
    <div>
      <h1>User Profile: </h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        Photo URL:
        <div
          style={{
            background: "red",
            backgroundImage: `url(${user.picture})`,
            width: "100px",
            height: "100px",
            borderRadius: "100%",
          }}
        ></div>
      </div>
    </div>
  );
}
