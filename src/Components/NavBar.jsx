import React, { useRef, useState, useEffect } from 'react';
import Logo from '../assets/Images/Icon.png';
import NewPostModal from './CreatePostModal';
import CreatePackageModal from './CreatePackage.jsx';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import LuggageIcon from '@mui/icons-material/Luggage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BusinessIcon from '@mui/icons-material/Business';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Navbar = () => {
	const modalRef = useRef(null);
	const modalRef1 = useRef(null);
	const [authenticated, setAuthenticated] = useState(false);
	const userType = localStorage.getItem('userType');
	const userProfile = `/myProfile/${userType}`;

	useEffect(() => {
		// Check if userType exists in localStorage to determine authentication status
		setAuthenticated(!!userType);
	}, [userType]);

	const openModal1 = () => {
		if (authenticated) {
			if (modalRef1.current) {
				modalRef1.current.showModal();
			}
		} else {
			// Redirect to login page if not authenticated
			window.location.href = '/login';
		}
	};

	const openModal = () => {
		if (authenticated) {
			if (modalRef.current) {
				modalRef.current.showModal();
			}
		} else {
			// Redirect to login page if not authenticated
			window.location.href = '/login';
		}
	};

	const logout = () => {
		// Clear cookies (assuming you know the cookie names)
		document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

		// Clear local storage items
		localStorage.removeItem('userType');
		localStorage.removeItem('avatar');

		window.location.href = '/login';
	};

	const redirectTo = (path) => {
		if (authenticated) {
			// Redirect to the specified path if authenticated
			window.location.href = path;
		} else {
			// Redirect to login page if not authenticated
			window.location.href = '/login';
		}
	};

	return (
		<div className="navbar bg-base-300 z-40">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a href="/">
								Homepage
								<HomeIcon />
							</a>
						</li>
						{userType === 'traveler' && (
							<li>
								<a href="#" onClick={() => redirectTo('/posts')}>
									Posts
									<FeedIcon />
								</a>
							</li>
						)}
						{userType === 'company' && (
							<li>

								<a href="/quoteRequests">Quote Requests<RequestQuoteIcon /></a>
							</li>
						)}
						{userType === 'admin' && (
							<li>
								<a href="/allTransactions">All Transactions<PaidIcon /></a>
							</li>
						)}
						{userType === 'admin' && (
							<li>
								<a href="/addAdmin">
									Add admin
									<AddCircleIcon />
								</a>
							</li>
						)}
						{userType === 'admin' && (
							<li>
								<a href="/requests/company">
									Companies Requests
									<BusinessIcon />
								</a>
							</li>
						)}
						{userType === 'admin' && (
							<li>
								<a href="/requests/localguide">Local Guides Requests</a>
							</li>
						)}
						{userType === 'traveler' && (
							<li>
								<a href="/myTrips">
									My Saved Trips
									<LuggageIcon />
								</a>
							</li>
						)}
						{userType === 'traveler' && (
							<li>
								<a href="/myQuotes">My Quote Requests<RequestQuoteIcon /></a>
							</li>
						)}
						{userType === 'localguide' && (
							<li>
								<a href="/localguide/bookings">My Bookings<BookmarkIcon /></a>
							</li>
						)}
						{userType === 'company' && (
							<li>
								<a href="/">
									Trips Bookings
									<LuggageIcon />
								</a>
							</li>
						)}
						{userType !== 'admin' && authenticated && (
							<li>
								<a href="/transactions">Transactions<ReceiptLongIcon /></a>
							</li>
						)}
					</ul>
				</div>
				{userType === 'traveler' && (
					<a className="btn btn-ghost btn-circle" onClick={() => redirectTo('/search')}>
						<SearchOutlinedIcon />
					</a>
				)}
			</div>
			<div className="navbar-center">
				<a href="/">
					<img className="object-cover h-14 w-14 ml-1 shadow-sm" src={Logo} alt="Logo"></img>
				</a>
				<a
					href="/"
					className="lg:self-end text-primary text-xl font-extrabold shadow-sm lg:block hidden"
				>
					Safarny
				</a>
			</div>
			<div className="navbar-end">
				{userType === 'traveler' && (
					<a className="btn mr-3" onClick={openModal}>
						+ Post
					</a>
				)}
				{userType === 'localguide' && (
					<a className="btn mr-3" onClick={openModal1}>
						+ Package
					</a>
				)}
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img
								src={require(`../assets/Images/${userType}${localStorage.getItem(
									'avatar'
								)}.jpg`)}
								alt=""
							/>
						</div>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a href="#" onClick={() => redirectTo(userProfile)}>
								Profile
								<PersonIcon />
							</a>
						</li>
						{userType === 'traveler' && (
							<li>
								<a href="/myprofile/settings">
									Settings
									<SettingsIcon />
								</a>
							</li>
						)}
						{userType !== 'traveler' && authenticated && (
							<li>
								<a>
									Settings
									<SettingsIcon />
								</a>
							</li>
						)}
						{/* Conditionally render Login or Logout based on authentication status */}
						<li>
							{authenticated ? (
								<button
									onClick={() => {
										logout();
									}}
								>
									Log Out
									<LogoutIcon />
								</button>
							) : (
								<a href="/login">
									Log In
									<LoginIcon />
								</a>
							)}
						</li>
					</ul>
				</div>
			</div>
			<NewPostModal modalRef={modalRef} />
			<CreatePackageModal modalRef={modalRef1} />
		</div>
	);
};

export default Navbar;