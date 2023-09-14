import React from 'react';

const LimitedOfferBanner = (props) => {
	return (
		<div className="container my-24 mx-auto">
			{/* Section: Design Block */}
			<section className="mb-12">
				<div className="alert alert-dismissible fade show fixed bottom-0 right-0 left-0 z-[1030] w-full items-center justify-between bg-neutral-900 py-4 px-6 text-center text-white md:flex md:text-left">
					<div className="mb-4 flex flex-wrap items-center justify-center md:mb-0 md:justify-start">
						<span className="mr-2 h-5 w-5">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								className="text-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
								/>
							</svg>
						</span>
						<strong className="mr-1">Limited offer!</strong> Get it now before it's too late
					</div>
					<div className="flex items-center justify-center">
						<a
							className="mr-4 inline-block rounded bg-neutral-50 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_rgba(251,251,251,0.05)] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.05),0_4px_18px_0_rgba(203,203,203,0.05)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.05),0_4px_18px_0_rgba(203,203,203,0.05)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.05),0_4px_18px_0_rgba(203,203,203,0.05)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.05)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
							href="#!"
							role="button"
							data-te-ripple-init
							data-te-ripple-color="light"
						>
							Claim offer
						</a>
						<a href="" className="text-white" data-te-alert-dismiss aria-label="Close">
							<span className="h-6 w-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</span>
						</a>
					</div>
				</div>
			</section>
			{/* Section: Design Block */}
		</div>
	);
};

export default LimitedOfferBanner;
