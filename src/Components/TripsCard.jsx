import React from 'react';

const TripCard = (props) => {
	const cards = props.card;

	return (
		<div className="carousel-item">
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img src={cards.image} alt="" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						{cards.cardTitle}
						<div className="badge badge-secondary">{cards.secondary}</div>
					</h2>
					<p>{cards.bodyText}</p>
					<div className="card-actions justify-end">
						<div className="badge badge-outline">{cards.badge1}</div>
						<div className="badge badge-outline">{cards.badge2}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TripCard;
