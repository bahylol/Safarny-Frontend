import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/index';
import Home from './Pages/Home/index';
import Login from './Pages/Login/index';
import PreSignup from './Pages/PreSignup/index';
import Signup from './Pages/Signup/index';
import Error404 from './Pages/Error404/index';
import Test from './Pages/Test/index';
import Posts from './Pages/Posts/index';
import PostDetails from './Pages/PostDetails/index';
import TravelerMyProfile from './Pages/TravelerMyProfile/index';
import TravelerMyTrips from './Pages/TravelerMyTrips/index';
import EditTravelerMyProfile from './Pages/EditTravelerMyProfile/index';
import TravelerProfile from './Pages/TravelerProfile/index';
import PreSearch from './Pages/PreSearch/index';
import SearchTravelers from './Pages/SearchTravelers/index';
import LocalGuideMyProfile from './Pages/LocalGuideMyProfile/index';
import LocalGuideProfile from './Pages/LocalGuideProfile/index';
import SearchLocalGuide from './Pages/SearchLocalGuide/index';
import CompanyMyProfile from './Pages/CompanyMyProfile/index';
import CompanyProfile from './Pages/CompanyProfile/index';
import SearchCompanies from './Pages/SearchCompany/index';
import AdminMyProfile from './Pages/AdminMyProfile/index';
import UserOutput from './Pages/UserOutput/index';
import GetTrip from './Pages/GetTrip/getTrip';
import CompanyRequestsPage from './Pages/RequestCompany/index'
import LocalGuideRequest from './Pages/RequestLocalGuied/index';
import GuideSignUp from './Pages/GuiedSignup/index.jsx'
import CompanySignUp from './Pages/CompanySignup/index.jsx'
import Chat from './Pages/Chat/index';
import Transactions from './Pages/Transactions/index';
import AllTransactions from './Pages/AllTransactions/index';
import LocalGuideMyBookings from './Pages/LocalGuideMyBookings/index';
import MyQuoteRequests from './Pages/MyQuoteRequests/index';
import QuoteRequests from './Pages/QuoteRequests/index';
import ForgotPassword from './Pages/ForgotPassword';
import CurrencyConverter from './Pages/CountryDetails/Currency Exchange/CurrencyExchange';
import FamousDish from './Pages/CountryDetails/FamousDishes/FamousDishes';
import CountryDetails from './Pages/CountryDetails/CountryDetails';
import SignupAdmin from './Pages/AddAdmin/index';
import TripDetailsPage from './Pages/GetTrip/getTrip';
import LocalGuideRequests from './Pages/LocalGuideRequests/index';
import CompaniesRequests from './Pages/CompaniesRequests/index';
import TransacionLocalGuide from './Pages/TransactionLocalGuide/index';
import TransacionCompany from './Pages/TransacionCompany/index';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/Home" element={<Home />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/signup" element={<PreSignup />} />
				<Route path="/Signup/traveler" element={<Signup />} />
				<Route path="/Posts" element={<Posts />} />
				<Route path="/Post/:postId" element={<PostDetails />} />
				<Route path="/test" element={<Test />} />
				<Route path="/myProfile/traveler" element={<TravelerMyProfile />} />
				<Route path="/myTrips" element={<TravelerMyTrips />} />
				<Route path="/profile/traveler" element={<TravelerProfile />} />
				<Route path="/myProfile/settings" element={<EditTravelerMyProfile />} />
				<Route path="/myProfile/localGuide" element={<LocalGuideMyProfile />} />
				<Route path="/profile/localGuide" element={<LocalGuideProfile />} />
				<Route path="/myProfile/company" element={<CompanyMyProfile />} />
				<Route path="/profile/company" element={<CompanyProfile />} />
				<Route path="/myProfile/admin" element={<AdminMyProfile />} />
				<Route path="/search" element={<PreSearch />} />
				<Route path="/search/localGuides" element={<SearchLocalGuide />} />
				<Route path="/search/travelers" element={<SearchTravelers />} />
				<Route path="/search/companies" element={<SearchCompanies />} />
				<Route path="/transactions" element={<Transactions />} />
				<Route path="/allTransactions" element={<AllTransactions />} />
				<Route path="/localGuide/bookings" element={<LocalGuideMyBookings />} />
				<Route path="/myQuotes" element={<MyQuoteRequests />} />
				<Route path="/quoteRequests" element={<QuoteRequests />} />
				<Route path="/testt" element={<UserOutput />} />
				<Route path="/CurrencyConverter" element={<CurrencyConverter />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/CountryDetails" element={<CountryDetails />} />
				<Route path="/FamousDish" element={<FamousDish />} />
				<Route path="/TripDetailsPage" element={<TripDetailsPage />} />
				<Route path="/signup/company" element={<CompanyRequestsPage />} />
				<Route path="/signup/localGuide" element={<LocalGuideRequest />} />
				<Route path="/signupG" element={<GuideSignUp />} />
				<Route path="/signupC" element={<CompanySignUp />} />
				<Route path="chat" element={<Chat />} />
				<Route path="/addAdmin" element={<SignupAdmin />} />
				<Route path="/trip/:tripId" element={<GetTrip />} />

				<Route path="/requests/localguide" element={<LocalGuideRequests />} />
				<Route path="/requests/company" element={<CompaniesRequests />} />
				<Route path="/transaction/localGuide" element={<TransacionLocalGuide />} />
				<Route path="/transaction/company" element={<TransacionCompany />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</Router>
	);
}

export default App;
