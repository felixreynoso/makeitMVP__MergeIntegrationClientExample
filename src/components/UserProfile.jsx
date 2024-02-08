import React, { useEffect, useContext, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export default function UserProfile() {
  const userContext = useContext(UserContext);
  const [userData, setUserData] = useState({});

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5001/communiti-630fc/us-central1/api/user/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userContext) {
      fetchUserData(userContext.accessToken);
    }
  }, [userContext]);

  if (Object.keys(userData).length === 0) return;
  return (
    <div>
      <h1>User Profile: </h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
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
            backgroundImage: `url(${userData.picture})`,
            width: "100px",
            height: "100px",
            borderRadius: "100%",
          }}
        ></div>
      </div>
    </div>
  );
}
