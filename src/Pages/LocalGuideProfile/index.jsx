import { useState, useEffect, useRef } from 'react';
import RatingStars from '../../Components/RatingStars';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocalGuideMyProfile = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const [userInfo, setUserInfo] = useState({});
    const [activeTab, setActiveTab] = useState();
    const [packagesData, setPackagesData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState([]);
    const modalRef = useRef(null);
    const [rating, setRating] = useState(''); // State variable to store the selected rating
    const [reviewText, setReviewText] = useState(''); // State variable to store the review text
    const [people, setPeople] = useState(0);
    const [date, setDate] = useState('')
    const [packageID, setPackageID] = useState('');

    const handlePeopleChange = (event) => {
        setPeople(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmitPackage = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session-localGuide`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: people,
                package_id: packageID,
                date: date,
                localGuideId: userInfo.id
            }),
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
                window.location.href = data;
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

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

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmitReviewandRating = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/service/rating`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userInfo.service_id,
                rating: rating
            }),
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
                confirm(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/service/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userInfo.service_id,
                description: reviewText
            }),
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
                confirm(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
        userData()
    };

    function PackageCard({ data }) {
        return (
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark-bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">{data.name}</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{data.details}</p>
                <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">${data.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/per person</span>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                        {<DoneIcon sx={{ color: 'green' }} />}
                        <span>No hidden fees or extra cost </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        {data.languages ? (
                            <DoneIcon sx={{ color: 'green' }} />
                        ) : (
                            <ClearIcon sx={{ color: 'red' }} />
                        )}
                        <span>Languages: {data.languages}</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        {data.meals ? (
                            <DoneIcon sx={{ color: 'green' }} />
                        ) : (
                            <ClearIcon sx={{ color: 'red' }} />
                        )}
                        <span>Meals</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        {data.transportation ? (
                            <DoneIcon sx={{ color: 'green' }} />
                        ) : (
                            <ClearIcon sx={{ color: 'red' }} />
                        )}
                        <span>Transportation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        {data.photography ? (
                            <DoneIcon sx={{ color: 'green' }} />
                        ) : (
                            <ClearIcon sx={{ color: 'red' }} />
                        )}
                        <span>Photography</span>
                    </li>
                </ul>
                <button
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-blue-900"
                    onClick={() => {
                        setPackageID(data.id)
                        document.getElementById('packageModal').showModal();
                    }}
                >
                    Book this package
                </button>
            </div>
        );
    }

    const getPackages = async () => {
        handleTabClick('packages');
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/packages/${userId}`, {
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
                setPackagesData(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    };


    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const userData = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/localGuide/${userId}`, {
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
                console.log(data);
                setUserInfo(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    };

    const getRatings = async () => {
        handleTabClick('ratings');
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
    };

    const getReviews = async () => {
        handleTabClick('reviews');
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
    };

    useEffect(() => {
        userData();
    }, []);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <>
            <main className="profile-page">
                <section className="relative block" style={{ height: '500px' }}>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                        style={{ height: '70px' }}
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
                                                src={require(`../../assets/Images/localguide${userInfo.avatar}.jpg`)}
                                                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                style={{ maxWidth: '150px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button
                                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                                type="button"
                                                style={{ transition: 'all .15s ease' }}
                                                onClick={() =>
                                                    document.getElementById('my_modal_5').showModal()
                                                }
                                            >
                                                Review and Rate
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.rated}
                                                    <StarIcon />
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
                                        {userInfo.fname + ' ' + userInfo.lname}
                                    </h3>
                                </div>
                                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                                {userInfo.aboutme}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                    <ul
                                        className="flex text-sm font-medium text-center"
                                        id="Tab"
                                        role="tablist"
                                    >
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button
                                                className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'ratings'
                                                    ? 'border-gray-800 dark:border-gray-300'
                                                    : 'border-transparent'
                                                    }`}
                                                id="-ratings-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="ratings"
                                                aria-selected={activeTab === 'ratings'}
                                                onClick={getRatings}
                                            >
                                                Ratings
                                            </button>
                                        </li>
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button
                                                className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'reviews'
                                                    ? 'border-gray-800 dark:border-gray-300'
                                                    : 'border-transparent'
                                                    }`}
                                                id="-reviews-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="reviews"
                                                aria-selected={activeTab === 'reviews'}
                                                onClick={getReviews}
                                            >
                                                Reviews
                                            </button>
                                        </li>
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button
                                                className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'packages'
                                                    ? 'border-gray-800 dark:border-gray-300'
                                                    : 'border-transparent'
                                                    }`}
                                                id="-packages-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="packages"
                                                aria-selected={activeTab === 'packages'}
                                                onClick={getPackages}
                                            >
                                                Packages
                                            </button>
                                        </li>
                                    </ul>
                                    <div id="TabContent">
                                        <div
                                            className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'ratings' ? '' : 'hidden'
                                                }`}
                                            id="ratings"
                                            role="tabpanel"
                                            aria-labelledby="ratings-tab"
                                        >
                                            {ratings.length === 0 ? (
                                                <>
                                                    <div className="flex justify-center items-center h-32">
                                                        <p className="text-2xl text-gray-500">
                                                            You have no ratings yet.
                                                        </p>
                                                    </div>
                                                    <div className="mb-32"></div>
                                                </>
                                            ) : (
                                                <div>
                                                    {ratings.map((rating, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4"
                                                        >
                                                            <div className="flex flex-col md:flex-row">
                                                                <img
                                                                    src={require(`../../assets/Images/traveler${rating.avatar}.jpg`)}
                                                                    alt={rating.fname + ' ' + rating.lname}
                                                                    className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700"
                                                                />
                                                                <div className="flex-grow">
                                                                    <div className="flex justify-between items-center">
                                                                        <div>
                                                                            <h4 className="text-lg font-semibold md:text-left">
                                                                                {rating.fname + ' ' + rating.lname}
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <p className="mt-2 dark:text-gray-400">
                                                                        {<RatingStars rating={rating.rating} />}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'reviews' ? '' : 'hidden'
                                                }`}
                                            id="reviews"
                                            role="tabpanel"
                                            aria-labelledby="reviews-tab"
                                        >
                                            {reviews.length === 0 ? (
                                                <>
                                                    <div className="flex justify-center items-center h-32">
                                                        <p className="text-2xl text-gray-500">
                                                            You have no reviews yet.
                                                        </p>
                                                    </div>
                                                    <div className="mb-32"></div>
                                                </>
                                            ) : (
                                                <div>
                                                    {reviews.map((review, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4"
                                                        >
                                                            <div className="flex flex-col md:flex-row">
                                                                <img
                                                                    src={require(`../../assets/Images/traveler${review.avatar}.jpg`)}
                                                                    alt={review.fname + ' ' + review.lname}
                                                                    className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700"
                                                                />
                                                                <div className="flex-grow">
                                                                    <div className="flex justify-between items-center">
                                                                        <div>
                                                                            <h4 className="text-lg font-semibold md:text-left">
                                                                                {review.fname + ' ' + review.lname}
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <p className="mt-2 dark:text-gray-400">
                                                                        {review.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'packages' ? '' : 'hidden'
                                                }`}
                                            id="packages"
                                            role="tabpanel"
                                            aria-labelledby="packages-tab"
                                        >
                                            <section className="bg-white dark:bg-gray-900">
                                                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                                                    {packagesData.length === 0 ? (
                                                        <div className="text-center">
                                                            <p>No packages available.</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'packages' ? '' : 'hidden'
                                                                }`}
                                                            id="packages"
                                                            role="tabpanel"
                                                            aria-labelledby="packages-tab"
                                                        >
                                                            <section className="bg-white dark:bg-gray-900">
                                                                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                                                                    <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                                                                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                                                                            Book your plan
                                                                        </h2>
                                                                    </div>
                                                                    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                                                                        {packagesData.map((packageData, index) => (
                                                                            <PackageCard
                                                                                key={index}
                                                                                data={packageData}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    )}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="mb-10 font-bold text-lg">Review and rate this Guide</h3>

                    <label className="label">
                        <span className="label-text">Give a rating</span>
                    </label>
                    <div className="mb-10 rating rating-lg">
                        <input
                            type="radio"
                            name="rating-9"
                            className="rating-hidden"
                            value="1"
                            onChange={handleRatingChange}
                        />
                        <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2"
                            value="1"
                            onChange={handleRatingChange}
                        />
                        <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2"
                            value="2"
                            onChange={handleRatingChange}
                        />
                        <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2"
                            value="3"
                            onChange={handleRatingChange}
                        />
                        <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2"
                            value="4"
                            onChange={handleRatingChange}
                        />
                        <input
                            type="radio"
                            name="rating-9"
                            className="mask mask-star-2"
                            value="5"
                            onChange={handleRatingChange}
                        />
                    </div>
                    <label className="label">
                        <span className="label-text">Write a review</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24 w-full"
                        placeholder="Write your post here..."
                        value={reviewText}
                        onChange={handleReviewTextChange}
                    ></textarea>

                    <div className="modal-action">
                        <button className="btn btn-outline" onClick={handleSubmitReviewandRating}>
                            Confirm Review
                        </button>
                        <form method="dialog">
                            <button className="btn">Discard Review</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="packageModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="mb-10 font-bold text-lg">Plan Booking Information</h3>

                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input
                        className="mb-10 w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                        type="date"
                        placeholder=""
                        name="date"
                        value={date}
                        onChange={handleDateChange}
                    />

                    <label className="label">
                        <span className="label-text">{`Select the number of people ( ${people} )`}</span>
                    </label>
                    <input
                        type="range"
                        min={1}
                        max="5"
                        className="range"
                        step="1"
                        value={people}
                        onChange={handlePeopleChange}
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>

                    <div className="modal-action">
                        <button className="btn btn-outline"
                            onClick={handleSubmitPackage}>
                            Confirm Booking</button>
                        <form method="dialog">
                            <button className="btn">Discard booking</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <ToastContainer />
        </>
    );
};

export default LocalGuideMyProfile;