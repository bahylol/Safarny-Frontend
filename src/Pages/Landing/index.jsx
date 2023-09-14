import { React, useState, useEffect } from 'react';
import Banner from '../../Components/Banner';
import pyramid from '../../assets/Images/tourist.jpg';
import iphoneImage from '../../assets/Images/iphoneImage5.png';
import iosBadge from '../../assets/Images/AppBadge__ios.png';
import androidBadge from '../../assets/Images/AppBadge__android.png';
import travelPlanning from '../../assets/Images/TravelPlanning.jpg';
import seaTrip from '../../assets/Images/SeaTrip.jpg';
import villageTrip from '../../assets/Images/VillageTrip.jpg';
import warmBeachTrip from '../../assets/Images/WarmBeachTrip.jpg';
import snowTrip from '../../assets/Images/SnowTrip.jpg';
import Headline from '../../Components/Headline';
import Rating from '../../Components/Rating';
import RatingSmall from '../../Components/RatingSmall';
import LandingPageHero from '../../Components/LandingPageHero/LandingPageHero';
import Features from '../../Components/Features';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReadyToTravel from '../../assets/Images/ReadyToTravel.jpg';
import Typewriter from '../../Components/TypeWriterEffect';

const Landing = () => {
	const [cards, setCards] = useState([
		{
			id: 1,
			cardTitle: 'Travel Planning',
			bodyText: 'Planning has never been easier',
			secondary: 'Plan',
			badge1: 'Easy',
			badge2: 'Fast',
			image: travelPlanning,
		},
		{
			id: 2,
			cardTitle: 'Sea Trips',
			bodyText: 'Get on a yacht with your friends and family',
			secondary: 'Atlantic',
			badge1: 'Boating',
			badge2: 'Swimming',
			image: seaTrip,
		},
		{
			id: 3,
			cardTitle: 'Village Trips',
			bodyText: 'Visit hidden village gems',
			secondary: 'Crowded',
			badge1: 'Shopping',
			badge2: 'Clubbing',
			image: villageTrip,
		},
		{
			id: 4,
			cardTitle: 'Beach Trips',
			bodyText: 'Relax on the warm sunny beach',
			secondary: 'Sandy',
			badge1: 'Surfing',
			badge2: 'Tanning',
			image: warmBeachTrip,
		},
		{
			id: 5,
			cardTitle: 'Snow Trips',
			bodyText: 'Enjoy the chilly indoor activites with a hot cup of cocoa',
			secondary: 'Arctic',
			badge1: 'Snow Boarding',
			badge2: 'Snow Fights',
			image: snowTrip,
		},
	]);

	useEffect(() => {
		AOS.init({ duration: 700 });
	}, []);

	// scroll methods
	const scrollToAppClicked = () => {
		const targetSection = document.getElementById('scrollToAppTaregt');
		targetSection.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="flex flex-col">
			<LandingPageHero />
			<div id="scrollToGetStartedTarget" className="flex flex-col justify-center items-center">
				<Headline content={'Elevate Your Travel Experience with AI-Powered Trip Planning'} />

				<Banner
					positionOfBanner="lg:order-last shadow-xl"
					Image={pyramid}
					Title="Discover Your Perfect Journey"
					Content={
						<div className="text-lg">
							<p>
								Our <span className="font-bold text-primary">AI</span> trip planner takes
								the guesswork out of travel planning.
							</p>
							<p className="mb-8">
								Let <span className="font-bold text-primary">cutting-edge technology</span>{' '}
								create personalized itineraries just for you.
							</p>
							<Rating />
							<h4 className="text-sm my-2">
								4.9 on App Store, 4.8 on Google Play | Editors' Choice
							</h4>
							<br />
							<br />
							<button
								className="btn btn-primary mr-6"
								onClick={() => (window.location.href = 'http://localhost:3000/Home?#!')}
							>
								Start planning
							</button>
							<button
								onClick={scrollToAppClicked}
								className="btn btn-outline btn-primary rounded-3xl"
							>
								Get the app
							</button>
						</div>
					}
				/>
			</div>

			<div className="container my-24 mx-auto md:px-6">
				<section className="mb-32">
					<div className="flex flex-wrap">
						<div className="mb-12 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-5/12">
							<div className="flex lg:py-12">
								<img
									src={ReadyToTravel}
									className="rounded-tl-full rounded-br-lg rounded-bl-xl rounded-tr-xl shadow-lg dark:shadow-black lg:shadow-black-opacity-20 lg:ml-[50px] z-[10]"
									alt=""
								/>
							</div>
						</div>
						<div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
							<div className="flex h-full items-center rounded-lg bg-primary p-6 text-center text-white lg:pl-12 lg:text-left">
								<div className="lg:pl-12">
									<h2 className="mb-6 text-3xl font-bold">
										Ready to start your planning career?
									</h2>
									<p className="mb-6 pb-2 lg:pb-0">
										Unlock the gateway to your travel adventure with us. Embrace the
										community, orchestrate your dream trips, and weave an enduring
										tapestry of memories that color your life with exploration and joy
									</p>
									<button
										type="button"
										className="rounded-full border-2 border-neutral-50 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
										data-te-ripple-init
										data-te-ripple-color="light"
										onClick={() =>
											(window.location.href = 'http://localhost:3001/signUp')
										}
									>
										Sign up now
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			{/* ----------------------------------------------------------------------- */}

			<div className="flex flex-col w-full border-opacity-50">
				<div className="mt-20 mb-20 divider"></div>
			</div>

			<Features scrollToLearnMoreTaregt="scrollToLearnMoreTaregt" />

			<div className="flex flex-col w-full border-opacity-50">
				<div className="mt-20 mb-20 divider"></div>
			</div>

			<div className="flex flex-col justify-center items-center">
				<h2
					style={{
						fontSize: '32px',
						fontWeight: 'bold',
						color: '#333',
						textAlign: 'center',
						padding: '20px 0',
					}}
				>
					<Typewriter
						text="  In the Words of Travelers . . . "
						delay={100}
						color={'text-base-content'}
					/>
				</h2>
			</div>
			<div className="flex flex-wrap justify-center items-start gap-4">
				<div className="card lg:card-side bg-base-100 shadow-xl w-64 mb-4 lg:mb-0">
					<div tabIndex={0} className="collapse bg-base-200">
						<div className="collapse-title text-xl font-medium">
							<RatingSmall />
							<br />
							Lydia Yang
							<hr className="hr hr-blurry" />
						</div>

						<div className="collapse-content">
							<p>
								So much easier to visualize and plan a road trip to my favourite rock
								climbing destinations and explore the area around. Lydia Yang, Founder
								LydiaScapes Adventure Blog
							</p>
						</div>
					</div>
				</div>

				<div className="card lg:card-side bg-base-100 shadow-xl w-64 mb-4 lg:mb-0">
					<div tabIndex={0} className="collapse bg-base-200">
						<div className="collapse-title text-xl font-medium">
							<RatingSmall />
							<br />
							Nadia
							<hr className="hr hr-blurry" />
						</div>
						<div className="collapse-content">
							<p>
								Planning your trip by having all the attractions already plugged into a map
								makes trip planning so much easier. Nadia, Travel Blogger Couple Travel The
								World
							</p>
						</div>
					</div>
				</div>

				<div className="card lg:card-side bg-base-100 shadow-xl w-64 mb-4 lg:mb-0">
					<div tabIndex={0} className="collapse bg-base-200">
						<div className="collapse-title text-xl font-medium">
							<RatingSmall />
							<br />
							Kelvin S.
							<hr className="hr hr-blurry" />
						</div>
						<div className="collapse-content">
							<p>
								Yesterday I walked my kids through the vacation timeline that I've built so
								far and their excitement levels went way up! Kelvin S.
							</p>
						</div>
					</div>
				</div>

				<div className="card lg:card-side bg-base-100 shadow-xl w-64 mb-4 lg:mb-0">
					<div tabIndex={0} className="collapse bg-base-200">
						<div className="collapse-title text-xl font-medium">
							<RatingSmall />
							<br />
							Rachel M.
							<hr className="hr hr-blurry" />
						</div>
						<div className="collapse-content">
							<p>
								Discovering hidden gems becomes effortless with a well-organized travel
								itinerary. It's like unwrapping surprises at every turn! Rachel M., Explorer
								Wanderlust Diaries
							</p>
						</div>
					</div>
				</div>

				<div className="card lg:card-side bg-base-100 shadow-xl w-64 mb-4 lg:mb-0">
					<div tabIndex={0} className="collapse bg-base-200">
						<div className="collapse-title text-xl font-medium">
							<RatingSmall />
							<br />
							Alex P.
							<hr className="hr hr-blurry" />
						</div>
						<div className="collapse-content">
							<p>
								Exploring new cities through a curated travel plan allows me to make the
								most of my time and create lasting memories. Alex P., Adventurer Roaming
								Footsteps
							</p>
						</div>
					</div>
				</div>

				<div className="card lg:card-side bg-base-100 shadow-xl w-64 mb-4 lg:mb-0">
					<div tabIndex={0} className="collapse bg-base-200">
						<div className="collapse-title text-xl font-medium">
							<RatingSmall />
							<br />
							Emily C.
							<hr className="hr hr-blurry" />
						</div>
						<div className="collapse-content">
							<p>
								As a food enthusiast, mapping out all the must-try local restaurants in
								advance takes my culinary journey to a whole new level! Emily C., Foodie
								Tasty Travels Gazette
							</p>
						</div>
					</div>
				</div>

				<div className="card lg:card-side bg-base-100 shadow-xl w-64 mb-4 lg:mb-0">
					<div tabIndex={0} className="collapse bg-base-200">
						<div className="collapse-title text-xl font-medium">
							<RatingSmall />
							<br />
							Sam L.
							<hr className="hr hr-blurry" />
						</div>
						<div className="collapse-content">
							<p>
								The ability to sync my itinerary with my travel companions ensures that
								we're all on the same page, making group trips smoother than ever. Sam L.,
								Group Traveler Journey Together Adventures
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col w-full border-opacity-50">
				<div className="mt-20 mb-20 divider"></div>
			</div>

			<div
				id="scrollToAppTaregt"
				className="flex flex-wrap justify-center items-start gap-4 container my-24 mx-auto md:px-6"
			>
				<h1 class="mb-2 mt-0 text-5xl font-bold leading-tight text-base-content mb-6">
					Get Our App
				</h1>
				<section className="mb-32">
					<div className="container mx-auto text-center lg:text-left xl:px-32">
						<div className="flex grid items-center lg:grid-cols-2">
							<div className="mb-12 lg:mb-0">
								<div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14">
									<h2 className="mb-8 text-3xl font-bold">
										<span className="font-bold text-primary mb-5">Trip Planner</span>
										<br />
										<span className="text-accent">{'COMING SOON'}</span>
									</h2>
									<p className="mb-8 pb-2 text-neutral-500 dark:text-neutral-300 lg:pb-0">
										Elevate your travels with our new free Trip Planer App.
										<br />
										Available for Android and iOS. <br />
										<span className="font-bold text-error mt-12">
											Start planning smarter with Trip Planner.
										</span>
									</p>

									<div className="mx-auto mb-8 flex flex-col md:flex-row md:justify-around lg:justify-between">
										<p className="mx-auto mb-4 flex items-center md:mx-0 md:mb-2 lg:mb-0">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="2"
												stroke="currentColor"
												className="mr-2 h-5 w-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											Best team
										</p>

										<p className="mx-auto mb-4 flex items-center md:mx-0 md:mb-2 lg:mb-0">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="2"
												stroke="currentColor"
												className="mr-2 h-5 w-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											Best quality
										</p>

										<p className="mx-auto mb-2 flex items-center md:mx-0 lg:mb-0">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="2"
												stroke="currentColor"
												className="mr-2 h-5 w-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											Best experience
										</p>
									</div>

									<div className="flex flex-col items-center lg:flex-row">
										<img src={iosBadge} alt="" className="lg:w-1/4 lg:mr-1" />
										<img src={androidBadge} alt="" className="lg:w-1/4" />
									</div>

									<br />
									<Rating />
									<h4 className="text-sm my-6">
										4.9 on App Store, 4.8 on Google Play | Editors' Choice
									</h4>
								</div>
							</div>
							<div>
								<img src={iphoneImage} className="max-w-2xl w-full" alt="" />
							</div>
						</div>
					</div>
				</section>
			</div>

			<div className="flex flex-col w-full border-opacity-50">
				<div className="mt-20 mb-20 divider"></div>
			</div>

			<div className="container my-24 mx-auto md:px-6 xl:px-32">
				<section className="mb-32 text-center lg:text-left">
					<div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-base-content">
						<div className="flex flex-wrap items-center">
							<div className="hidden shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
								<img
									src="https://mdbcdn.b-cdn.net/img/new/ecommerce/vertical/004.jpg"
									alt="Trendy Pants and Shoes"
									className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
								/>
							</div>
							<div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
								<div className="px-6 py-12 md:px-12">
									<h2 className="mb-6 text-3xl font-bold text-accent dark:text-primary-300">
										Do not miss any updates.
										<br />
										<span className="text-primary dark:text-primary-400">
											Subscribe to the newsletter
										</span>
									</h2>
									<p className="mb-12 text-neutral-500 dark:text-base-300">
										We will write rarely and only high-quality content.
									</p>
									<div className="mb-6 flex-row md:mb-0 md:flex">
										<div
											className="relative mb-3 w-full md:mr-3 md:mb-0"
											data-te-input-wrapper-init
										>
											<input
												type="text"
												className="peer block min-h-[auto] text-primary w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
												id="exampleFormControlInput2"
												placeholder="Enter your email"
											/>
											<label
												htmlFor="exampleFormControlInput2"
												className="pointer-events-none text-primary absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-success-content dark:peer-focus:text-primary"
											>
												Enter your email
											</label>
										</div>
										<button
											type="submit"
											className="inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
											data-te-ripple-init
											data-te-ripple-color="light"
										>
											Subscribe
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div className="flex flex-col w-full border-opacity-50">
				<div className="mt-20 mb-20 divider"></div>
			</div>

			<div className="container my-24 mx-auto md:px-6">
				<section className="mb-32">
					<h2 className="mb-16 text-center text-3xl font-bold">FAQ</h2>
					<div className="grid gap-6 lg:grid-cols-3 ml-3">
						<div className="mb-6 md:mb-8 lg:mb-12">
							<p className="mb-4 font-bold">
								How can your website help me plan a trip to Egypt's historic sites like the
								Pyramids and the Nile?
							</p>
							<p>
								Our website offers a comprehensive trip planning tool that guides you
								through crafting your perfect Egyptian adventure. You can explore various
								itineraries, select destinations, activities, accommodations, and even
								receive AI-driven recommendations based on your preferences.
							</p>
						</div>

						<div className="mb-6 md:mb-8 lg:mb-12">
							<p className="mb-4 font-bold">
								What makes your AI recommendations for Egypt trips different from other
								travel websites?
							</p>
							<p>
								Our AI takes into account not just popular attractions, but also factors in
								your interests, travel style, and budget. This allows us to suggest
								personalized experiences that align with your preferences, ensuring you get
								the most out of your journey.
							</p>
						</div>

						<div className="mb-6 md:mb-8 lg:mb-12">
							<p className="mb-4 font-bold">
								How do I customize my Egypt trip itinerary on your website?
							</p>
							<p>
								Creating a customized itinerary is easy! Once you sign up and provide your
								preferences, our AI-powered tool generates a personalized plan. You can then
								fine-tune it by adding or removing attractions, adjusting durations, and
								even switching accommodations to design a trip that suits you perfectly.
							</p>
						</div>

						<div className="mb-6 md:mb-8 lg:mb-12">
							<p className="mb-4 font-bold">
								Can I trust your website's recommendations for local guides and experiences?
							</p>
							<p>
								Absolutely! We partner with reputable local guides and tour operators who
								have extensive knowledge of Egypt's history and culture. Our aim is to
								ensure you have an authentic experience and create lasting memories while
								exploring this captivating country.
							</p>
						</div>

						<div className="mb-6 md:mb-8 lg:mb-12">
							<p className="mb-4 font-bold">
								How do I stay informed about any updates or changes to my Egypt travel
								plans?
							</p>
							<p>
								Our platform provides real-time updates and notifications regarding your
								travel plans. You'll receive alerts about changes in your itinerary, flight
								details, and even weather updates, ensuring you're well-prepared and can
								enjoy your journey worry-free.
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Landing;
