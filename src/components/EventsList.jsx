import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export default function EventsList() {
  const [eventsList, setEventsList] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext) {
      fetchData(userContext.accessToken);
    }
  }, [userContext]);

  const fetchData = async (token) => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5001/communiti-630fc/us-central1/api/events",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setEventsList(res.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/2 flex items-center flex-col">
      <h1>Events List</h1>
      <ul className="flex items-center flex-col">
        {eventsList.map((eventObj) => {
          return <li key={eventObj.title}>{eventObj.title}</li>;
        })}
      </ul>
    </div>
  );
}
