import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);

  const getMyTrips = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/trips/traveler`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.text().then((error) => {
            throw new Error("Failed to fetch data");
          });
        }
      })
      .then((data) => {
        setTrips(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setTrips([]);
      });
  };

  useEffect(() => {
    getMyTrips();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-300 mb-6">
          My Saved Trips
        </h1>
        {trips.length === 0 ? (
          <>
            <div className="flex justify-center items-center h-32">
              <p className="text-2xl text-gray-500">
                You have no saved trips yet.
              </p>
            </div>
            <div className="mb-32"></div>
          </>
        ) : (
          <div>
            {trips.map((trip, index) => (
              <div
                key={index}
                className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4"
              >
                <div className="flex flex-col md:flex-row">
                  <img
                    src={
                      "https://flagsapi.com/" +
                      trip.country_code +
                      "/flat/64.png"
                    }
                    alt={trip.name}
                    className="self-center flex-shrink-0 w-24 h-24 md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold md:text-left">
                          {trip.name + " "}
                          <span className="text-sm text-gray-500 ml-2">
                            {trip.destination}
                          </span>
                        </h4>
                      </div>
                      <div className="ml-auto">
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                          onClick={() => {
                            // Replace 'your-new-url' with the URL you want to navigate to
                            window.location.href = `/trip/${trip.trip_id}`;
                          }}
                        >
                          View Trip
                        </button>
                        <button
                          className="px-3 py-1 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                          onClick={() => {}}
                        >
                          <DeleteForeverIcon />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 dark:text-gray-400">
                      {trip.activities.map((activity, activityIndex) => (
                        <span
                          key={activityIndex}
                          className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-white mr-2 mb-2"
                        >
                          {activity}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default MyTrips;
