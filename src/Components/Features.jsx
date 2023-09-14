import React from 'react';

const Features = ({ scrollToLearnMoreTaregt }) => {
	return (
		<div id="scrollToLearnMoreTaregt" className="container my-24 mx-auto md:px-6">
			<section className="mb-32">
				<div className="flex justify-center">
					<div className="max-w-[700px] text-center">
						<h2 className="mb-6 text-3xl font-bold">Why is it so great?</h2>
						<p className="mb-6 font-bold uppercase text-primary dark:text-primary-400">
							Features
						</p>
						<p className="mb-16 text-neutral-500 dark:text-base-content">
							"Elevate your online experience with our website, effortlessly integrating
							various tools & features into a single, user-friendly platform."
						</p>
					</div>
				</div>

				<div className="grid gap-x-6 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Support 24/7</p>
								<p className="text-neutral-500 dark:text-base">
									Round-the-clock assistance to ensure your success.{' '}
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Tracking</p>
								<p className="text-neutral-500 dark:text-base">
									Real-time insights for informed decision-making.
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Reporting</p>
								<p className="text-neutral-500 dark:text-base">
									Comprehensive reports for clear performance assessment.
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Analytics</p>
								<p className="text-neutral-500 dark:text-base">
									In-depth data analysis to drive growth strategies.
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Huge community</p>
								<p className="text-neutral-500 dark:text-base">
									Join a thriving community, sharing valuable insights through our engaging
									blogs.
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Easy to use</p>
								<p className="text-neutral-500 dark:text-base">
									Intuitive interface for effortless navigation.
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Frequent updates</p>
								<p className="text-neutral-500 dark:text-base">
									Regular enhancements for an ever-evolving experience.
								</p>
							</div>
						</div>
					</div>

					<div className="mb-12">
						<div className="flex">
							<div className="shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									className="mr-3 h-5 w-5 text-success"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="ml-2 grow">
								<p className="mb-1 font-bold">Responsive</p>
								<p className="text-neutral-500 dark:text-base">
									Seamlessly adapts to any device, enhancing accessibility.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Features;
