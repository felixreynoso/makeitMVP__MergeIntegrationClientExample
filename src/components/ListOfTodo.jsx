import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListOfTodo({ token }) {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    console.log(token);
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    const res = await axios.get(
      "http://127.0.0.1:5001/fx-test-merge/us-central1/api/events",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(res.data, "watauba");
    setEventsList(res.data.events);
  };

  return (
    <div>
      <h1>Events List</h1>
      <ul>
        {eventsList.map((eventObj) => {
          console.log(eventObj);
          return <li key={eventObj.id}>{eventObj.title}</li>;
        })}
      </ul>
    </div>
  );
}
