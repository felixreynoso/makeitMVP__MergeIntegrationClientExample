import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export default function EventsList() {
  const [eventsList, setEventsList] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchData(user.accessToken);
    }
  }, [user]);

  const fetchData = async (token) => {
    const res = await axios.get(
      "http://127.0.0.1:5001/communiti-630fc/us-central1/api/events",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setEventsList(res.data.events);
  };

  return (
    <div>
      <h1>Events List</h1>
      <ul>
        {eventsList.map((eventObj) => {
          return <li key={eventObj.title}>{eventObj.title}</li>;
        })}
      </ul>
    </div>
  );
}
