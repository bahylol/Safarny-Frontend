import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchLocalGuide = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    let [flag, setFlag] = useState(true);

    const showToast = (message) => {
        if (flag) {
            return
        }

        toast.error(message, {
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

    const searchUsers = async () => {
        setFlag(false);
        if (!selectedCategory) {
            showToast("You have to select a search option")
            return;
        }
        if (!searchQuery) {
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/localGuide/${selectedCategory}/${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data)
                setUsers(data);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setUsers([]);
        }
    };

    useEffect(() => {
        searchUsers();
    }, [selectedCategory, searchQuery]);

    return (
        <>
            <div className="mt-4 flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                    <select
                        className="px-4 py-2 bg-transparent focus:outline-none"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="">Search by</option>
                        <option value="name">Name</option>
                        <option value="country">Country</option>
                        <option value="city">City</option>
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 w-full focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span
                    className="px-4 py-2 bg-transparent rounded-r-lg flex items-center"
                >
                    <SearchIcon style={{ fill: 'black' }} />
                </span>

            </div>

            {users.length === 0 ? (
                <>
                    <div className="flex justify-center items-center h-32">
                        <p className="text-2xl text-gray-500">No results found.</p>
                    </div>
                    <div className="mb-32"></div>
                </>
            ) : (
                <div>
                    {users.map((user, index) => (
                        <div key={index} className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-md mb-4">
                            <div className="flex flex-col md:flex-row">
                                <img src={require(`../../assets/Images/localguide${user.avatar}.jpg`)}
                                    alt={user.fname + " " + user.lname} className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:mr-6 md:dark:bg-gray-500 md:dark:border-gray-700" />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="text-lg font-semibold md:text-left">
                                                {user.fname + " " + user.lname+" "}
                                                <span className="text-sm text-gray-500 ml-2">{user.city}, {user.country}</span> {/* Added span for city and country */}
                                            </h4>
                                        </div>
                                        <button
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                            onClick={() => window.location.href = `/profile/localguide?userId=${user.id}`}
                                        >
                                            <PersonIcon />
                                        </button>
                                    </div>
                                    <p className="mt-2 dark:text-gray-400">{user.biography}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ToastContainer />
        </>
    );
};

export default SearchLocalGuide;
