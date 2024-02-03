import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfile({ token }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(token);
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    const res = await axios.get(
      "http://127.0.0.1:5001/fx-test-merge/us-central1/api/user/profile",
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
      <p>Photo URL: {user.picture}</p>
    </div>
  );
}
