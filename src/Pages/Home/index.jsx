import React, { useEffect, useState } from "react";
import Stepper from "../TripPlanner/Stepper.jsx";

const Home = () => {
  const [cityNames, setCityNames] = useState([]);

  useEffect(() => {
    console.log("Fetching city names");
    const fetchCityNames = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getCities`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          console.log("DONE\n\n\n\n\n");
          const data = await response.json();
          setCityNames(data); // Update the state with fetched city names
          // console.log("City names:", cityNames  );
        } else {
          console.error("Failed to fetch city names");
        }
      } catch (error) {
        console.error("Error fetching city names:", error);
      }
    };

    fetchCityNames(); // Invoke the function when the component mounts
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <br />
        <Stepper cityNames={cityNames}/>
      </div>
    </div>
  );
};

export default Home;
