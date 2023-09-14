import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function RatingStars({ rating }) {
    // Calculate the number of full stars and half stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Create an array to store the star icons
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<StarIcon key={i} style={{ color: 'gold' }} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
        stars.push(<StarIcon key="half" style={{ color: 'gold' }} />);
    }

    // Add empty stars to fill the rest
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<StarOutlineIcon key={`empty-${i}`} style={{ color: 'gold' }} />);
    }

    return <div>{stars}</div>;
}

export default RatingStars;
