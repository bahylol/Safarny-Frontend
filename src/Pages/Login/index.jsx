import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NileImage from '../../assets/Images/NileImage.jpg';

const Login = () => {
	const fail = (error) => {
		toast.error(error, {
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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			credentials: 'include',
		})
			.then((response) => {
				// Check if the response status code is 200
				if (response.status === 200) {
					// Access cookies from the "Set-Cookie" header in the response
					const cookies = response.headers.get('Set-Cookie');
					return response.json();
				} else {
					// Handle non-200 response status code
					return response.text().then((error) => {
						fail(error);
					});
				}
			})
			.then((data) => {
				localStorage.setItem('userType', data[0]);
				localStorage.setItem('avatar', data[1]);
				window.location.href = `/myProfile/${localStorage.getItem('userType')}`;
			})
			.catch((error) => {
				console.error('Error:', error.message);
			});
	};

	return (
		<>
			<div>
				<div className="lg:flex">
					<div className="lg:w-1/2 xl:max-w-screen-sm">
						<div className="py-12 bg-base-100 lg:bg-base-100 flex justify-center lg:justify-start lg:px-12">
							<div className="cursor-pointer flex items-center">
								{/* Your logo or other content */}
							</div>
						</div>
						<div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
							<div className="mt-12">
								<form onSubmit={handleSubmit}>
									<div>
										<div className="text-sm font-bold text-base-content tracking-wide">
											Email Address
										</div>
										<input
											className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
											type="email"
											placeholder="sameer@email.com"
											value={email}
											onChange={handleEmailChange}
										/>
									</div>
									<div className="mt-8">
										<div className="flex justify-between items-center">
											<div className="text-sm text-base-content font-bold tracking-wide">
												Password
											</div>
											<div>
												<a
													href="/forgot-password"
													className="text-xs font-display font-semibold text-primary hover:text-primary-focus cursor-pointer"
												>
													Forgot Password?
												</a>
											</div>
										</div>
										<input
											className="w-full p-4 rounded-md text-lg py-2 border-neutral-focus hover:outline focus:outline-dashed focus:border-accent-focus shadow-lg"
											type="password"
											placeholder="Password"
											value={password}
											onChange={handlePasswordChange}
										/>
									</div>
									<div className="mt-10">
										<button
											className="bg-primary text-neutral p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primary-focus shadow-lg"
											type="submit"
										>
											Log In
										</button>
									</div>
								</form>
								<div className="mt-12 text-sm font-display font-semibold text-base-content text-center">
									Don't have an account?{' '}
									<a
										href="/signUp"
										className="cursor-pointer text-primary hover:text-primary-focus"
									>
										Sign up
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

export default Login;
