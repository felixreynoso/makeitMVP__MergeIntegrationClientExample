import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EventsList({ token }) {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    console.log(token);
    if (token) {
      fetchData(token);
    }
  }, [token]);

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
