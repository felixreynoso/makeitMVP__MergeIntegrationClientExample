import React, { useEffect, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export default function UserProfile() {
  const user = useContext(UserContext);

  const fetchUserData = async (token) => {
    await axios.get(
      "http://127.0.0.1:5001/communiti-630fc/us-central1/api/user/profile",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.accessToken);
    }
  }, [user]);

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
            backgroundImage: `url(${user.photoURL})`,
            width: "100px",
            height: "100px",
            borderRadius: "100%",
          }}
        ></div>
      </div>
    </div>
  );
}
