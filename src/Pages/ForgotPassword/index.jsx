import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
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
	const [phase1, setPhase1] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isButton1Disabled, setIsButton1Disabled] = useState(false);
	const [isButton2Disabled, setIsButton2Disabled] = useState(false);
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');
	const [pass, setPass] = useState('');
	const [pass2, setPass2] = useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSendEmail = (e) => {
		if (email === '') {
			fail('Please enter your email!');
		} else {
			setLoading(true);
			setIsButton1Disabled(true);
			fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot_password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
				}),
				credentials: 'include',
			})
				.then((response) => {
					// Check if the response status code is 200
					if (response.status === 200) {
						setTimeout(() => {
							confirm('Email sent!');
							setIsButton1Disabled(false);
							setPhase1(true);
							setLoading(false);
						}, 5000);

						return response.json();
					} else {
						// Handle non-200 response status code
						return response.text().then((error) => {
							setLoading(false);
							setIsButton1Disabled(false);
							fail(error);
						});
					}
				})
				.catch((error) => {
					console.error('Error:', error.message);
				});
		}
	};

	const handleTokenChange = (e) => {
		setToken(e.target.value);
	};

	const handlePassChange = (e) => {
		setPass(e.target.value);
	};

	const handlePass2Change = (e) => {
		setPass2(e.target.value);
	};

	const handleResetPassword = () => {
		if (token === '') {
			fail('Please enter the token!');
		} else if (pass === '') {
			fail('Please enter the new password!');
		} else if (pass2 === '') {
			fail('Please confirm the new password!');
		} else if (pass !== pass2) {
			fail('The passwords must match!');
		} else {
			setLoading(true);
			setIsButton2Disabled(true);
			fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot_password/reset_password`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					reset_pass_token: token,
					password: pass,
				}),
				credentials: 'include',
			})
				.then((response) => {
					// Check if the response status code is 200
					if (response.status === 200) {
						setTimeout(() => {
							confirm('Password successfully reset!');
							setIsButton2Disabled(false);
							setLoading(false);

							setTimeout(() => {
								window.location.href = '/login';
							}, 4000);
						}, 5000);

						return response.json();
					} else if (response.status === 405) {
						fail('Token invalid or expired!');
						setTimeout(() => {
							setIsButton2Disabled(false);
							setLoading(false);
						}, 4000);
					} else {
						// Handle non-200 response status code
						return response.text().then((error) => {
							setLoading(false);
							setIsButton2Disabled(false);
							fail(error);
						});
					}
				})
				.catch((error) => {
					console.error('Error:', error.message);
				});
		}
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="hero min-h-screen">
				<div className="hero-content flex-col">
					<h1 class="text-xl font-bold leading-tight text-secondary-focus">Reset Password</h1>
					{!phase1 && (
						<>
							<h1 class="text-xm font-bold text-secondary">
								Enter your email so we can send you your unique verification token
							</h1>
							<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
								<div className="card-body">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Email</span>
										</label>
										<input
											type="text"
											placeholder="email"
											className="input input-bordered"
											value={email}
											onChange={handleEmailChange}
										/>
									</div>
									{loading && (
										<div className="flex flex-col justify-center items-center">
											<h1 class="text-xm font-bold text-secondary">Sending email</h1>
											<span className="loading loading-spinner loading-lg text-primary"></span>
										</div>
									)}
									<div className="form-control mt-6">
										<button
											className="btn btn-primary"
											onClick={handleSendEmail}
											disabled={isButton1Disabled}
										>
											Send email
										</button>
									</div>
								</div>
							</div>
						</>
					)}

					{phase1 && (
						<>
							<h1 class="text-xm font-bold leading-tight text-secondary ">
								Enter the unique token sent via email
							</h1>
							<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
								<div className="card-body">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Reset Token</span>
										</label>
										<input
											type="text"
											placeholder="token"
											className="input input-bordered"
											value={token}
											onChange={handleTokenChange}
										/>
									</div>
									<div className="form-control">
										<label className="label">
											<span className="label-text">Password</span>
										</label>
										<input
											type="password"
											placeholder="password"
											className="input input-bordered"
											value={pass}
											onChange={handlePassChange}
										/>
									</div>
									<div className="form-control">
										<label className="label">
											<span className="label-text">Confirm Password</span>
										</label>
										<input
											type="password"
											placeholder="password"
											className="input input-bordered"
											value={pass2}
											onChange={handlePass2Change}
										/>
									</div>
									{loading && (
										<div className="flex flex-col justify-center items-center">
											<h1 class="text-xm font-bold text-secondary">
												Resetting Password
											</h1>
											<span className="loading loading-spinner loading-lg text-primary"></span>
										</div>
									)}
									<div className="form-control mt-6">
										<button
											className="btn btn-primary"
											onClick={handleResetPassword}
											disabled={isButton2Disabled}
										>
											Confirm
										</button>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default ForgotPassword;
