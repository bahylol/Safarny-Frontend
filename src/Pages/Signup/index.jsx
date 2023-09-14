import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBRadio } from 'mdb-react-ui-kit';
import NileImage from '../../assets/Images/NileImage.jpg';

const Signup = () => {
	const loginLink = `${process.env.REACT_APP_FRONTEND_URL}/Login`;
	const [user, setUser] = useState({
		fname: '',
		lname: '',
		email: '',
		password: '',
		date: '',
		phone: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const [gender, setGender] = useState('');

	const handleRadio = (event) => {
		setGender(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const someNull = Object.values(user).some((x) => x === '');
		if (someNull === true) {
			let nullKeys = '';
			Object.entries(user)
				.filter(([k, v]) => v === '')
				.forEach(([k]) => (nullKeys += `${k} `));
			fail(`Please fill the following data : ${nullKeys}`);
			return;
		}
		if (gender === '') {
			fail('please fill the gender');
			return;
		}
		fetch(`${process.env.REACT_APP_BACKEND_URL}/signup/traveler`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				fname: user.fname,
				lname: user.lname,
				email: user.email,
				password: user.password,
				birthdate: user.date,
				gender: gender,
				phone: user.phone,
			}),
		})
			.then((response) => {
				// Check if the response status code is 200
				if (response.status === 200) {
					confirm();
					setTimeout(function () {
						window.location.href = '/login';
					}, 2501);
				} else {
					// Handle non-200 response status code
					return response.text().then((error) => {
						fail(error);
					});
				}
			})
			.catch((error) => {
				console.error('Error:', error.message);
				fail('An error occurred: ' + error.message);
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
	const confirm = () => {
		toast.success(
			'Your account has been created succesfully you will be redirected to the login page',
			{
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			}
		);
	};

	return (
		<>
			<div>
				<div className="lg:flex">
					<div className="lg:w-1/2 xl:max-w-screen-sm">
						<div className="py-12 bg-base-100 lg:bg-base-100 flex justify-center lg:justify-start lg:px-12">
							<div className="cursor-pointer flex items-center"></div>
						</div>
						<div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-0 xl:px-24 xl:max-w-2xl">
							<div>
								<form>
									<div className="flex">
										<div className="mr-4">
											<div className="text-sm font-bold text-base-content tracking-wide">
												First Name
											</div>
											<input
												className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
												type="text"
												placeholder="first name"
												name="fname"
												value={user.fname}
												onChange={handleChange}
											/>
										</div>
										<div>
											<div className="text-sm font-bold text-base-content tracking-wide">
												Last Name
											</div>
											<input
												className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
												type="text"
												placeholder="last name"
												name="lname"
												value={user.lname}
												onChange={handleChange}
											/>
										</div>
									</div>
									<div className="mt-8 flex align-items-center">
										<MDBRadio
											name="gender"
											id="inlineRadio1"
											value="M"
											label=" Male"
											inline
											checked={gender === 'M'}
											onChange={handleRadio}
										/>
										<div className="mx-6"></div> {/* Add space between the components */}
										<MDBRadio
											name="gender"
											id="inlineRadio2"
											value="F"
											label=" Female"
											inline
											checked={gender === 'F'}
											onChange={handleRadio}
										/>
									</div>
									<div>
										<div className="mt-8 text-sm font-bold text-base-content tracking-wide">
											Birthdate
										</div>
										<input
											className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
											type="date"
											placeholder=""
											name="date"
											value={user.date}
											onChange={handleChange}
										/>
									</div>
									<div>
										<div className="mt-8 text-sm font-bold text-base-content tracking-wide">
											Email Address
										</div>
										<input
											className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
											type="email"
											placeholder="sameer@email.com"
											name="email"
											value={user.email}
											onChange={handleChange}
										/>
									</div>
									<div className="mt-8">
										<div className="flex justify-between items-center">
											<div className="text-sm text-base-content font-bold tracking-wide">
												Password
											</div>
										</div>
										<input
											className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
											type="password"
											placeholder="Password"
											name="password"
											value={user.password}
											onChange={handleChange}
										/>
									</div>
									<div>
										<div className="mt-8 text-sm font-bold text-base-content tracking-wide">
											Phone Number
										</div>
										<input
											className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
											type="number"
											placeholder="+123-12345678"
											maxLength="15"
											name="phone"
											value={user.phone}
											onChange={handleChange}
										/>
									</div>
									<div className="mt-10">
										<button
											className="bg-primary text-neutral p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primary-focus shadow-lg"
											onClick={handleSubmit}
										>
											Sign Up
										</button>
									</div>
								</form>
								<div className="mt-12 text-sm font-display font-semibold text-base-content text-center">
									Already have an account?{' '}
									<a
										href={loginLink}
										className="cursor-pointer text-primary hover:text-primary-focus"
									>
										Log In
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="hidden shadow-2xl lg:flex items-center justify-center bg-primary flex-1 h-screen overflow-hidden">
						<img className="rounded-2xl h-fit" src={NileImage} alt="logo" />
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default Signup;
