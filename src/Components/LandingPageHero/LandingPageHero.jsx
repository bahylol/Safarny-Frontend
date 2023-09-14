import React from 'react';
import EgyptTrip from '../../assets/Images/EgyptTrip.jpg';
import Typewriter from '../../Components/TypeWriterEffect';
import './LandingPageHero.css';
import LuggageIcon from '@mui/icons-material/Luggage';

const LandingPageHero = () => {
	// never used !!
	// const scrollToGetStartedClicked = () => {
	// 	const targetSection = document.getElementById('scrollToGetStartedTarget');
	// 	targetSection.scrollIntoView({ behavior: 'smooth' });
	// };
	const scrollToLearnMoreClicked = () => {
		const targetSection = document.getElementById('scrollToLearnMoreTaregt');
		targetSection.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section className="mb-40 overflow-hidden">
			<div
				className="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] h-[500px]"
				style={{ backgroundImage: `url(${EgyptTrip})` }}
			>
				<div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed  bg-[hsla(0,0%,0%,0.70)]">
					<div className="flex h-full items-center justify-center">
						<div className="px-6 text-center text-white md:px-12">
							<h1 className="mt-6 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
								Craft Your Perfect Journey, <br />
								{/* <span className="text-info"> Every Time</span> */}
								<Typewriter text=" Every Time . . . " delay={90} color="text-primary" />
							</h1>
							<a href="/Home?#!">
								<button className="mr-5 mb-2 px-12 btn btn-outline rounded-full gradient-bg-button">
									Plan Your Trip
									<LuggageIcon />
								</button>
							</a>

							<a href="/CountryDetails">
								<button className="mr-5 px-12 btn btn-outline btn-secondary rounded-full">
									Country Details
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="-mt-2.5 text-white dark:text-neutral-800 md:-mt-4 lg:-mt-6 xl:-mt-10 h-[50px] scale-[2] origin-[top_center]">
				<svg viewBox="0 0 2880 48" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M 0 48 L 1437.5 48 L 2880 48 L 2880 0 L 2160 0 C 1453.324 60.118 726.013 4.51 720 0 L 0 0 L 0 48 Z"
						fill="white"
					></path>
				</svg>
			</div> */}
			{/* Background image */}
		</section>
	);
};

export default LandingPageHero;
