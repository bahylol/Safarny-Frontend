import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ClearIcon from "@mui/icons-material/Clear";

const TravelerMyProfile = () => {
  const [tripId, setTripId] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [activeTab, setActiveTab] = useState("my-posts");
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const userData = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/myProfile/traveler`, {
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
            window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/`;
          });
        }
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const getMyTrips = async () => {
    handleTabClick("my-trips-bookings");
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookedTrips/traveler`, {
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
            alert(error);
          });
        }
      })
      .then((data) => {
        setTrips(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const getMyLocalGuideBookings = async () => {
    handleTabClick("local-guide-bookings");
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/localguide`, {
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
            alert(error);
          });
        }
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  useEffect(() => {
    userData();
    fetchMyPosts();
  }, []);

  //Posts
  const [articles, setArticles] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const confirm = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const fetchMyPosts = async () => {
    handleTabClick("my-posts");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/myPosts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setArticles(data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleVote = async (input, index) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            upordown: input,
            post_id: index,
          }),
        }
      );

      if (response.status === 200) {
        fetchMyPosts();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleRemoveVote = async (index) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/vote`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            post_id: index,
          }),
        }
      );

      if (response.status === 200) {
        fetchMyPosts();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const formatDate = (inputDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(inputDate);
    return date.toLocaleDateString(undefined, options);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        confirm("Post link copied to your clipboard");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => console.error("Error copying text:", error));
  };

  const removePost = async (index) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: index,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          confirm("Your Post have been removed succesfully");
          fetchMyPosts();
          userData();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
 
  //End of Posts
  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
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
                        onClick={() => {
                          window.location.href = "/myprofile/settings";
                        }}
                      >
                        settings
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
                  <ul
                    className="flex text-sm font-medium text-center"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="flex-grow mr-2" role="presentation">
                      <button
                        className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${
                          activeTab === "my-posts"
                            ? "border-gray-800 dark:border-gray-300"
                            : "border-transparent"
                        }`}
                        id="my-posts-tab"
                        type="button"
                        role="tab"
                        aria-controls="my-posts"
                        aria-selected={activeTab === "my-posts"}
                        onClick={fetchMyPosts}
                      >
                        My Posts
                      </button>
                    </li>
                    <li className="flex-grow mr-2" role="presentation">
                      <button
                        className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                          activeTab === "my-trips-bookings"
                            ? "border-gray-800 dark:border-gray-300"
                            : "border-transparent"
                        }`}
                        id="my-trips-bookings-tab"
                        type="button"
                        role="tab"
                        aria-controls="my-trips-bookings"
                        aria-selected={activeTab === "my-trips-bookings"}
                        onClick={getMyTrips}
                      >
                        My Trips Bookings
                      </button>
                    </li>
                    <li className="flex-grow mr-2" role="presentation">
                      <button
                        className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                          activeTab === "local-guide-bookings"
                            ? "border-gray-800 dark:border-gray-300"
                            : "border-transparent"
                        }`}
                        id="local-guide-bookings-tab"
                        type="button"
                        role="tab"
                        aria-controls="local-guide-bookings"
                        aria-selected={activeTab === "local-guide-bookings"}
                        onClick={getMyLocalGuideBookings}
                      >
                        Local Guide Bookings
                      </button>
                    </li>
                  </ul>
                  <div id="myTabContent">
                    <div
                      className={`p-4 rounded-lg dark:bg-gray-800 ${
                        activeTab === "my-posts" ? "" : "hidden"
                      }`}
                      id="my-posts"
                      role="tabpanel"
                      aria-labelledby="my-posts-tab"
                    >
                      <>
                        <section className="bg-white dark:bg-gray-900">
                          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                            {articles.length === 0 ? (
                              <>
                                <div className="flex justify-center items-center h-32">
                                  <p className="text-2xl text-gray-500">
                                    You have no posts yet.
                                  </p>
                                </div>
                                <div className="mb-32"></div>
                              </>
                            ) : (
                              articles.map((article, index) => (
                                <div key={article.id}>
                                  <article
                                    key={article.id}
                                    className={`p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${
                                      index !== 0 ? "mt-4" : ""
                                    }`}
                                  >
                                    <div className="flex flex-col md:flex-row items-center justify-between mb-2">
                                      <div className="md:mb-0 mb-2 md:mr-2">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                          <a href="#">
                                            {article.title}
                                            <span className="text-sm text-gray-500">
                                              &nbsp;- {article.country},{" "}
                                              {article.city}
                                            </span>
                                          </a>
                                        </h2>
                                      </div>
                                      <div className="md:mb-2">
                                        <span className="text-sm text-gray-500">
                                          {formatDate(article.postdate)}
                                        </span>
                                        <button
                                          onClick={() => {
                                            removePost(article.id);
                                          }}
                                          className="text-black hover:text-red-500 transition-colors duration-300"
                                        >
                                          <ClearIcon className="hover:text-red-500" />
                                        </button>
                                      </div>
                                    </div>
                                    {article.tags.map((tag, tagIndex) => (
                                      <span
                                        key={tagIndex}
                                        className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-white mr-2 mb-2"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    <div
                                      className="max-height-container"
                                      style={{
                                        maxHeight: "600px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {article.images && (
                                        <img
                                          className="w-full h-full object-fit-cover"
                                          src={article.images[0]}
                                          alt="Article"
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "cover",
                                          }}
                                        />
                                      )}
                                    </div>
                                    <br />
                                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                      {article.description}
                                    </p>
                                    <br />
                                    <div className="flex items-center space-x-4">
                                      <img
                                        className="w-7 h-7 rounded-full"
                                        src={require(`../../assets/Images/traveler${article.avatar}.jpg`)}
                                        alt={`${
                                          article.fname + " " + article.lname
                                        } avatar`}
                                      />
                                      <span className="font-medium dark:text-white">
                                        {article.fname + " " + article.lname}
                                      </span>
                                      <div className="flex-grow"></div>
                                      <div className="flex items-center space-x-2">
                                        <button
                                          className={`text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 ${
                                            article.user_vote === 1
                                              ? "text-green-500"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            if (article.user_vote === 1) {
                                              handleRemoveVote(article.id);
                                            } else {
                                              handleVote(1, article.id);
                                            }
                                          }}
                                        >
                                          {article.upvotes}
                                          <ThumbUpOutlinedIcon />
                                        </button>
                                        <button
                                          className={`text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 ${
                                            article.user_vote === -1
                                              ? "text-red-500"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            if (article.user_vote === -1) {
                                              handleRemoveVote(article.id);
                                            } else {
                                              handleVote(-1, article.id);
                                            }
                                          }}
                                        >
                                          {article.downvotes}
                                          <ThumbDownOutlinedIcon />
                                        </button>

                                        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                                          <AddCommentOutlinedIcon />
                                        </button>
                                        <button
                                          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                                          onClick={() =>
                                            copyToClipboard(
                                              `${process.env.REACT_APP_FRONTEND_URL}/post/${article.id}`
                                            )
                                          }
                                        >
                                          <ShareOutlinedIcon />
                                        </button>
                                      </div>
                                    </div>
                                  </article>
                                </div>
                              ))
                            )}
                          </div>
                        </section>
                      </>
                    </div>
                    <div
                      className={`p-4 rounded-lg dark:bg-gray-800 ${
                        activeTab === "my-trips-bookings" ? "" : "hidden"
                      }`}
                      id="my-trips-bookings"
                      role="tabpanel"
                      aria-labelledby="my-trips-tab"
                    >
                      <div className="flex">
                        {trips.length === 0 ? (
                          <>
                            <div className="flex justify-center items-center h-32">
                              <p className="text-2xl text-gray-500">
                                You have no Booked Trips.
                              </p>
                            </div>
                            <div className="mb-32"></div>
                          </>
                        ) : (
                          <div className="flex">
                            {trips.map((trip, index) => (
                              <div
                                className="max-w-sm rounded overflow-hidden shadow-lg mb-4"
                                key={index}
                              >
                                <div className="w-32">
                                  <img
                                    src={`https://flagsapi.com/${trip.country_code}/flat/64.png`}
                                    alt=" "
                                    className="self-center flex-shrink-0 w-full h-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700"
                                  />
                                </div>
                                <div className="px-6 py-4 flex-1">
                                  <div className="font-bold text-xl mb-2">
                                    {trip.destination}
                                  </div>
                                  <p className="text-gray-700 text-base">
                                    Persons: {trip.quantity}
                                  </p>
                                  <p className="text-gray-700 text-base">
                                    Date:{" "}
                                    {formatDate(trip.start_date).split("at")[0]}
                                  </p>
                                  <p className="text-gray-700 text-base">
                                    Status: {trip.booktrip_status}
                                  </p>
                                  <div className="flex items-center">
                                    <img
                                      className="w-7 h-7 rounded-full"
                                      src={require(`../../assets/Images/company${trip.company_avatar}.jpg`)}
                                      alt={`${trip.company_fname} avatar`}
                                    />
                                    <span className="font-medium dark:text-white ml-2">
                                      {trip.company_fname}
                                    </span>
                                  </div>
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                                    onClick={() => {
                                        // Replace 'your-new-url' with the URL you want to navigate to
                                        window.location.href = `/trip/${trip.trip_id}`;
                                      }}                                  >
                                    View Trip
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg dark:bg-gray-800 ${
                        activeTab === "local-guide-bookings" ? "" : "hidden"
                      }`}
                      id="local-guide-bookings"
                      role="tabpanel"
                      aria-labelledby="local-guide-bookings-tab"
                    >
                      {bookings.length === 0 ? (
                        <>
                          <div className="flex justify-center items-center h-32">
                            <p className="text-2xl text-gray-500">
                              You have no local guide bookings.
                            </p>
                          </div>
                          <div className="mb-32"></div>
                        </>
                      ) : (
                        <div>
                          {bookings.map((booking, index) => (
                            <div
                              key={index}
                              className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4"
                            >
                              <div className="flex flex-col md:flex-row">
                                <img
                                  src={require(`../../assets/Images/localguide${booking.local_guide_avatar}.jpg`)}
                                  alt={
                                    booking.local_guide_fname +
                                    " " +
                                    booking.local_guide_lname
                                  }
                                  className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700"
                                />
                                <div className="flex-grow">
                                  <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold md:text-left">
                                      {booking.local_guide_fname +
                                        " " +
                                        booking.local_guide_lname}
                                      <span className="text-sm text-gray-500 ml-2">
                                        {booking.local_guide_city},{" "}
                                        {booking.local_guide_country}
                                      </span>
                                    </h4>
                                  </div>
                                  <p className="mt-2 dark:text-gray-400">
                                    {"Package Details : " +
                                      booking.package_details}
                                  </p>
                                  <p
                                    className={`mt-2 dark:text-gray-400 ${
                                      booking.booking_status === "Booked"
                                        ? "text-green-800 font-semibold"
                                        : "text-red-800 font-semibold"
                                    }`}
                                  >
                                    {"Booking Status : " +
                                      booking.booking_status}
                                  </p>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                  <p className="text-lg font-semibold">
                                    {
                                      formatDate(booking.booking_date).split(
                                        "at"
                                      )[0]
                                    }
                                  </p>
                                  <p className="text-lg font-semibold">
                                    ${booking.package_price * booking.quantity}
                                  </p>
                                  <p className="text-lg font-semibold">
                                    Persons : {booking.quantity}
                                  </p>
                                </div>
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
        </section>
      </main>
      <ToastContainer />
    </>
  );
};

export default TravelerMyProfile;
