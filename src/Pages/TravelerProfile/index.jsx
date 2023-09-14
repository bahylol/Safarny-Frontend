import { useState, useEffect } from 'react';

const TravelerProfile = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const [activeTab, setActiveTab] = useState('posts');
    const [userInfo, setUserInfo] = useState({});
    const [follow, setFollow] = useState("");
    const [trips, setTrips] = useState([]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const getTrips = async () => {
        handleTabClick('trips')
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/trips/traveler/${userId}`, {
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
                setTrips(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    const getPosts = async () => {
        handleTabClick('posts')
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${userId}`, {
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
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    const userData = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/traveler/${userId}`, {
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
                if (data.isFollowed === true) {
                    setFollow("Unfollow")
                }
                else {
                    setFollow("Follow")
                }
                setUserInfo(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    useEffect(() => {
        userData();
        getPosts();
    }, []);

    const followOrUnfollow = async () => {
        let method = "POST"
        if (userInfo.isFollowed) {
            method = "DELETE"
        }
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/follows`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                following: userId,
            }),
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return response.text().then((error) => {
                        alert(error);
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
        userData();
    }

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
                                                src={require(`../../assets/Images/traveler${userInfo.avatar}.jpg`)}
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
                                                onClick={followOrUnfollow}
                                            >
                                                {follow}
                                            </button>
                                            <button
                                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                Message
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.followers}
                                                </span>
                                                <span className="text-sm text-gray-500">Followers</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.following}
                                                </span>
                                                <span className="text-sm text-gray-500">Following</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.posts}
                                                </span>
                                                <span className="text-sm text-gray-500">Posts</span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                                    {userInfo.comments}
                                                </span>
                                                <span className="text-sm text-gray-500">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                        {userInfo.fname + " " + userInfo.lname}
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
                                    <ul className="flex text-sm font-medium text-center" id="myTab" role="tablist">
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'posts' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'}`}
                                                id="posts-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="posts"
                                                aria-selected={activeTab === 'posts'}
                                                onClick={getPosts}>
                                                Posts
                                            </button>
                                        </li>
                                        <li className="flex-grow mr-2" role="presentation">
                                            <button className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'trips' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'}`}
                                                id="trips-tab"
                                                type="button"
                                                role="tab"
                                                aria-controls="trips"
                                                aria-selected={activeTab === 'trips'}
                                                onClick={getTrips}>
                                                Trips
                                            </button>
                                        </li>
                                    </ul>
                                    <div id="myTabContent">
                                        <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === 'posts' ? '' : 'hidden'}`} id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content for the <strong className="font-medium text-gray-800 dark:text-white">My Posts tab's associated content</strong>.</p>
                                        </div>
                                        <div className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === 'trips' ? '' : 'hidden'}`} id="trips" role="tabpanel" aria-labelledby="trips-tab">
                                            <div>
                                                {trips.map((trip, index) => (
                                                    <div key={index} className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4">
                                                        <div className="flex flex-col md:flex-row">
                                                            <img src={"https://flagsapi.com/" + trip.country_code + "/flat/64.png"}
                                                                alt={trip.name } className="self-center flex-shrink-0 w-24 h-24 md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700" />
                                                            <div className="flex-grow">
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <h4 className="text-lg font-semibold md:text-left">
                                                                            {trip.name + " "}
                                                                            <span className="text-sm text-gray-500 ml-2">{trip.destination}</span>
                                                                        </h4>
                                                                    </div>
                                                                    <button
                                                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                                                        onClick={() => window.location.href = `/profile/traveler?userId=${trip.id}`}
                                                                    >View Trip
                                                                    </button>
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
                                                                <div>
                                                                    {"Trip Duration : " + trip.duration + " days"}
                                                                </div>
                                                                {"Trip Month : " + trip.month}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default TravelerProfile;
