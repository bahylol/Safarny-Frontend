import React from 'react';
import './TripsCard2.css';

// props
const Card = ({ imageSrc, category, title, author, time }) => {
	return (
		<div className="card2">
			<div className="card__info-hover">
				<svg className="card__like" viewBox="0 0 24 24">
					{/* SVG path data */}
				</svg>
				<div className="card__clock-info">
					<svg className="card__clock" viewBox="0 0 24 24">
						{/* SVG path data */}
					</svg>
					<span className="card__time">{time}</span>
				</div>
			</div>
			<div className="card__img" style={{ backgroundImage: `url(${imageSrc})` }}></div>
			<a className="card_link">
				<div className="card__img--hover" style={{ backgroundImage: `url(${imageSrc})` }}></div>
			</a>
			<div className="card__info">
				<span className="card__category">{category}</span>
				<h3 className="card__title">{title}</h3>
				<span className="card__by">
					<a className="card__author" title="author">
						{author}
					</a>
				</span>
			</div>
		</div>
	);
};

export default Card;
