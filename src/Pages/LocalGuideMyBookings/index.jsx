import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const LocalGuideMyBookings = () => {
    const [myBookings, setMyBookings] = useState([]);

    const formatDate = (inputDate) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        const date = new Date(inputDate);
        return date.toLocaleDateString(undefined, options);
    };


    const getMyBookings = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/localguide/myBookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return response.text().then((error) => {
                        console.log(error);
                    });
                }
            })
            .then((data) => {
                setMyBookings(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    useEffect(() => {
        getMyBookings();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-300 mb-6">My Bookings</h1>
                {myBookings.length === 0 ? (
                    <>
                        <div className="flex justify-center items-center h-32">
                            <p className="text-2xl text-gray-500">You have no local guide bookings.</p>
                        </div>
                        <div className="mb-32"></div>
                    </>
                ) : (
                    <div>
                        {myBookings.map((myBooking, index) => (
                            <div key={index} className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4">
                                <div className="flex flex-col md:flex-row">
                                    <img
                                        src={require(`../../assets/Images/traveler${myBooking.traveler_avatar}.jpg`)}
                                        alt={myBooking.traveler_fname + " " + myBooking.traveler_lname}
                                        className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700"
                                    />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-lg font-semibold md:text-left">
                                                {myBooking.traveler_fname + " " + myBooking.traveler_lname}
                                            </h4>
                                        </div>
                                        <p className="mt-2 dark:text-gray-400">{"Package Details : " + myBooking.package_details}</p>
                                        <p
                                            className={`mt-2 dark:text-gray-400 ${myBooking.booking_status === 'Booked' ? 'text-green-800 font-semibold' : 'text-red-800 font-semibold'
                                                }`}
                                        >
                                            {"Booking Status : " + myBooking.booking_status}
                                        </p>
                                    </div>
                                    <div className="ml-auto flex flex-col items-end">
                                        <p className="text-lg font-semibold">{formatDate(myBooking.booking_date).split("at")[0]}</p>
                                        <p className="text-lg font-semibold">${myBooking.package_price * myBooking.quantity}</p>
                                        <p className="text-lg font-semibold">Persons : {myBooking.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    )
}

export default LocalGuideMyBookings;