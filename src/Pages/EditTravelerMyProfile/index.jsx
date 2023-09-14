import { useState, useEffect } from 'react';

const EditTravelerMyProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [preferences, setPreferences] = useState("");
    const [aboutMe, setAboutMe] = useState("");

    const handleButtonClick = () => {
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Phone Number:", phoneNumber);
        console.log("Gender:", gender);
        console.log("Birthdate:", birthdate);
        console.log("Preferences:", preferences);
        console.log("About Me:", aboutMe);
    };

    const userData = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/myProfile/traveler`, {
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
                setFirstName(data.fname)
                setLastName(data.lname)
                setPhoneNumber(data.phone)
                setGender(data.gender)
                const formattedBirthdate = new Date(data.birthdate).toISOString().split('T')[0]
                setBirthdate(formattedBirthdate)
                setAboutMe(data.aboutme)
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    useEffect(() => {
        userData();
    }, []);


    return (
        <div className="mx-12 my-12">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Your Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and information.</p>
            </div>
            <div className="mt-8 border-t border-gray-700">
                <dl>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-700">
                        <dt className="text-sm font-medium leading-6 text-gray-900">First Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                                className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-700">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Last Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                                className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-700">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                                className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-700">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                                className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-700">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Birthdate</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                                className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-700">
                        <dt className="text-sm font-medium leading-6 text-gray-900">About Me</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <textarea
                                className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                rows="4"
                            />
                        </dd>
                    </div>
                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-gray-700">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Preferences</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                                className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
                                type="text"
                                value={preferences}
                                onChange={(e) => setPreferences(e.target.value)}
                            />
                        </dd>
                    </div> */}
                </dl>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleButtonClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditTravelerMyProfile;
