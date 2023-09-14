import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingStars from '../../Components/RatingStars';
import StarIcon from '@mui/icons-material/Star';

const CompanyMyProfile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [activeTab, setActiveTab] = useState();
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [trips, setTrips] = useState([]);

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

    const confirm = (message) => {
        toast.success(message, {
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

    const fail = (alert) => {
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

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const userData = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/myProfile/company`, {
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
                        window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/`;
                    });
                }
            })
            .then((data) => {
                setUserInfo(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    const getMyRatings = async () => {
        handleTabClick('my-ratings')
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/service/rating/${userInfo.service_id}`, {
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
                    throw new Error('Failed to fetch data');
                }
            })
            .then((data) => {
                setRatings(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
                setRatings([]);
            });
    }

    const getMyReviews = async () => {
        handleTabClick('my-reviews')
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/service/review/${userInfo.service_id}`, {
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
                        throw new Error('Failed to fetch data');
                    });
                }
            })
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
                setReviews([]);
            });
    }

    const getMyTrips = async () => {
        handleTabClick("my-trips-bookings");
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/company/managedTrips`, {
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
                        alert(error)
                    });
                }
            })
            .then((data) => {
                setTrips(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    useEffect(() => {
        userData();
    }, []);

    return (
        <>
            <main className="profile-page">
                <section className="relative block" style={{ height: "500px" }}>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                        style={{ height: "70px" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-gray-300 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-gray-300">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img
                                                alt="..."
                                                src={require(`../../assets/Images/company${userInfo.avatar}.jpg`)}
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                style={{ maxWidth: "150px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button
                                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                settings
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.rated}<StarIcon />
                                                </span>
                                                <span className="text-sm text-gray-500">Rated</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.booked}
                                                </span>
                                                <span className="text-sm text-gray-500">Booked</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.ratings}
                                                </span>
                                                <span className="text-sm text-gray-500">Ratings</span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.reveiws}
                                                </span>
                                                <span className="text-sm text-gray-500">Reveiws</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                        {userInfo.fname}
                                    </h3>
                                </div>
                                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                                {userInfo.about}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                    <ul className="flex text-sm font-medium text-center" id="myTab" role="tablist">
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'my-ratings' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'}`}
                                                id="my-ratings-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="my-ratings"
                                                aria-selected={activeTab === 'my-ratings'}
                                                onClick={getMyRatings}>
                                                My Ratings
                                            </button>
                                        </li>
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'my-reviews' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'}`}
                                                id="my-reviews-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="my-reviews"
                                                aria-selected={activeTab === 'my-reviews'}
                                                onClick={getMyReviews}>
                                                My Reviews
                                            </button>
                                        </li>
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'my-trips-bookings' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'}`}
                                                id="my-trips-bookings-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="my-trips-bookings"
                                                aria-selected={activeTab === 'my-trips-bookings'}
                                                onClick={getMyTrips}>
                                                Trips Bookings
                                            </button>
                                        </li>
                                    </ul>
                                    <div id="myTabContent">
                                        <div className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'my-ratings' ? '' : 'hidden'}`} id="my-ratings" role="tabpanel" aria-labelledby="my-ratings-tab">
                                            {ratings.length === 0 ? (
                                                <>
                                                    <div className="flex justify-center items-center h-32">
                                                        <p className="text-2xl text-gray-500">You have no ratings yet.</p>
                                                    </div>
                                                    <div className="mb-32"></div>
                                                </>
                                            ) : (
                                                <div>
                                                    {ratings.map((rating, index) => (
                                                        <div key={index} className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4">
                                                            <div className="flex flex-col md:flex-row">
                                                                <img src={require(`../../assets/Images/traveler${rating.avatar}.jpg`)}
                                                                    alt={rating.fname + " " + rating.lname} className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700" />
                                                                <div className="flex-grow">
                                                                    <div className="flex justify-between items-center">
                                                                        <div>
                                                                            <h4 className="text-lg font-semibold md:text-left">
                                                                                {rating.fname + " " + rating.lname}
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <p className="mt-2 dark:text-gray-400">{<RatingStars rating={rating.rating} />}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'my-reviews' ? '' : 'hidden'}`} id="my-reviews" role="tabpanel" aria-labelledby="my-reviews-tab">
                                            {reviews.length === 0 ? (
                                                <>
                                                    <div className="flex justify-center items-center h-32">
                                                        <p className="text-2xl text-gray-500">You have no reviews yet.</p>
                                                    </div>
                                                    <div className="mb-32"></div>
                                                </>
                                            ) : (
                                                <div>
                                                    {reviews.map((review, index) => (
                                                        <div key={index} className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4">
                                                            <div className="flex flex-col md:flex-row">
                                                                <img src={require(`../../assets/Images/traveler${review.avatar}.jpg`)}
                                                                    alt={review.fname + " " + review.lname} className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700" />
                                                                <div className="flex-grow">
                                                                    <div className="flex justify-between items-center">
                                                                        <div>
                                                                            <h4 className="text-lg font-semibold md:text-left">
                                                                                {review.fname + " " + review.lname}
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <p className="mt-2 dark:text-gray-400">{review.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'my-trips-bookings' ? '' : 'hidden'}`} id="my-trips-bookings" role="tabpanel" aria-labelledby="my-trips-tab"><div className="flex">
                                            {trips.length === 0 ? (
                                                <>
                                                    <div className="flex justify-center items-center h-32">
                                                        <p className="text-2xl text-gray-500">You have no Booked Trips.</p>
                                                    </div>
                                                    <div className="mb-32"></div>
                                                </>
                                            ) : (
                                                <div className="flex">
                                                    {trips.map((trip, index) => (
                                                        <div className="max-w-sm rounded overflow-hidden shadow-lg mb-4" key={index}>
                                                            <div className="w-32">
                                                                <img
                                                                    src={`https://flagsapi.com/${trip.country_code}/flat/64.png`}
                                                                    alt=" "
                                                                    className="self-center flex-shrink-0 w-full h-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700"
                                                                />
                                                            </div>
                                                            <div className="px-6 py-4 flex-1">
                                                                <div className="font-bold text-xl mb-2">{trip.destination}</div>
                                                                <p className="text-gray-700 text-base">Persons: {trip.quantity}</p>
                                                                <p className="text-gray-700 text-base">Date: {formatDate(trip.start_date).split("at")[0]}</p>
                                                                <p className="text-gray-700 text-base">Status: {trip.booktrip_status}</p>
                                                                <div className="flex items-center">
                                                                    <img className="w-7 h-7 rounded-full" src={require(`../../assets/Images/traveler${trip.avatar}.jpg`)} alt={`${trip.fname + " " + trip.lname} avatar`} />
                                                                    <span className="font-medium dark:text-white ml-2">{trip.fname + " " + trip.lname}</span>
                                                                </div>
                                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                                                                  onClick={() => {
                                                                    // Replace 'your-new-url' with the URL you want to navigate to
                                                                    window.location.href = `/trip/${trip.trip_id}`;
                                                                  }}       
                                                                >View Trip</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
            <ToastContainer />
        </>
    );
};

export default CompanyMyProfile;
