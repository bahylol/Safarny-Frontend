import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import traveler from '../../assets/Images/STraveler.jpg';
import guide from '../../assets/Images/SGuide.jpg';
import company from '../../assets/Images/SCompany.jpg';
import SignUpImage from '../../assets/Images/SignUpHero2.jpg';
import '../PreSignup/index.css';

function PreSignup() {
	const handleTravelerClick = () => {
		// Redirect to the signup URL
		window.location.href = 'signup/traveler';
	};

	const handleGuideClick = () => {
		// Redirect to the signup URL
		window.location.href = 'signup/localGuide';
	};

	const handleCompanyClick = () => {
		// Redirect to the company signup URL
		window.location.href = 'signup/company';
	};

	const scrollToSelectionClicked = () => {
		const targetSection = document.getElementById('scrollToSelection');
		targetSection.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="flex flex-col">
			<div
				className="mb-20 hero min-h-screen"
				style={{
					backgroundImage: `url(${SignUpImage})`,
				}}
			>
				<div className="hero-overlay bg-opacity-80"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Join Us</h1>
						<p className="mb-5">Become one of 3 members!</p>
						<p>
							Sign Up to become a fellow{' '}
							<span className="text-orange-700 text-lg font-bold">traveler</span> TODAY
						</p>
						<div className="divider">OR</div>
						<p>
							Send a request to join our trusted and knowledgeable{' '}
							<span className="text-orange-700 text-lg font-bold">local guides</span>
						</p>
						<div className="divider">OR</div>
						<p>
							Request to become a{' '}
							<span className="text-orange-700 text-lg font-bold">
								member travel company
							</span>
						</p>
						<button
							className="mt-12 btn btn-outline btn-info"
							onClick={scrollToSelectionClicked}
						>
							Start your journey as a member
						</button>
					</div>
				</div>
			</div>

			<div
				id="scrollToSelection"
				className="flex mt-8 mb-28 flex-wrap justify-center items-start gap-4"
			>
				<div className="PS_card-grid">
					<a
						className="PS_card PS_card--disabled"
						disabled
						onClick={(event) => {
							event.preventDefault();
						}}
					>
						<div
							className="PS_card__background"
							style={{
								backgroundImage: `url(${traveler})`,
							}}
						></div>
						<div className="PS_card__content">
							<button className="PS_card__category btn glass" onClick={handleTravelerClick}>
								Sign Up
							</button>
							<h3 className="PS_card__heading">Become a traveler</h3>
						</div>
					</a>
					<a
						className="PS_card PS_card--disabled"
						disabled
						onClick={(event) => {
							event.preventDefault();
						}}
					>
						<div
							className="PS_card__background"
							style={{
								backgroundImage: `url(${guide})`,
							}}
						></div>
						<div className="PS_card__content">
							<button className="PS_card__category btn glass" onClick={handleGuideClick}>
								Request
							</button>
							<h3 className="PS_card__heading">Become a member guide</h3>
						</div>
					</a>
					<a
						className="PS_card PS_card--disabled"
						disabled
						onClick={(event) => {
							event.preventDefault();
						}}
					>
						<div
							className="PS_card__background"
							style={{
								backgroundImage: `url(${company})`,
							}}
						></div>
						<div className="PS_card__content">
							<button className="PS_card__category btn glass" onClick={handleCompanyClick}>
								Request
							</button>
							<h3 className="PS_card__heading">Become a member company</h3>
						</div>
					</a>
				</div>
			</div>

			<div className="mb-20 flex flex-col justify-center items-center">
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					navigation={false}
					modules={[Autoplay, Pagination, Navigation]}
					className="mySwiper"
				>
					<SwiperSlide>
						<div className="card shadow-md bg-primary text-primary-content">
							<div className="card-body">
								<p>Sign Up to become a traveler NOW</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="card shadow-md bg-primary text-primary-content">
							<div className="card-body">
								<p>Send a pending request to become a guide</p>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="card shadow-md bg-primary text-primary-content">
							<div className="card-body">
								<p>Send a pending request to become a member company</p>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
}

export default PreSignup;
