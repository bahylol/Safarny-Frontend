import React from 'react';

const Banner = (props) => {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
					<div
						className={`relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full ${props.positionOfBanner}`} // Change lg:order-last to lg:order-first
					>
						<img
							alt="Party"
							src={props.Image}
							className={`inset-0 h-full w-full object-cover ${props.ImagePref}`}
						/>
					</div>

					<div className="lg:py-24">
						<h2 className="text-3xl font-bold sm:text-4xl text-left">{props.Title}</h2>{' '}
						<p className="mt-4 text-base-content text-left"> {props.Content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
