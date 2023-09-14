import React from 'react';

const FeatureCard = ({ title, text, image }) => {
	return (
		<div className="card card-compact w-44 bg-base-300 hover:shadow-xl hover:scale-110 hover:bg-base-100 transform transition-transform duration-300 hover:z-10 relative">
			<figure>
				<img src={image} alt="" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{text}</p>
			</div>
		</div>
	);
};

export default FeatureCard;
