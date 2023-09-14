import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransacionLocalGuide = () => {
    const params = new URLSearchParams(window.location.search);
    const booking_id = params.get("booking_id");
    const status = params.get("status");
    const payment_token = params.get("payment_token");

    const notify = (alert) => {
        toast.error(alert, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    const confirm = (alert) => {
        toast.success(alert, {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };
    useEffect(() => {
        if (status === "accepted") {
            const fetchData = async () => {
                try {
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/confirm/localguide`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            booking_id: booking_id,
                            payment_token: payment_token
                        }),
                    })
                        .then(response => {
                            if (response.status === 200) {
                                return response.json(); // Parse the JSON response data
                            } else {
                                throw new Error('Request failed with status ' + response.status);
                            }
                        })
                        .then(responseData => {
                            // Handle the successful response here
                            confirm(JSON.stringify(responseData)); // Display the data in an alert
                            setTimeout(function () {
                                window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/transactions`;
                            }, 2501);
                        })
                        .catch(error => {
                            // Handle any errors here
                            notify(error.message); // Display the error message in an alert
                            setTimeout(function () {
                                window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/transactions`;
                            }, 2501);
                            console.error(error);
                        });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/cancel`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            token: payment_token
                        }),
                    });
                    const data = await response.text;
                    notify("error has occured while Booking this guide");
                    setTimeout(function () {
                        window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/transactions`;
                    }, 2501);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();

        }
    }, []);

    return (
        <>
            <ToastContainer />
        </>
    );
};

export default TransacionLocalGuide;