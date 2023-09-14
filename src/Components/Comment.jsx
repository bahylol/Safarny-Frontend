import React from 'react';

const Comment = ({ avatar, fname, lname, comment, commentdate }) => {
    const formatDate = (inputDate) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        const date = new Date(inputDate);
        return date.toLocaleDateString(undefined, options);
    };
    return (
        <div className="flex items-center space-x-4 shadow-lg">
            <img className="w-7 h-7 rounded-full" src={require(`../assets/Images/traveler${avatar}.jpg`)} alt={`${fname + " " + lname} avatar`} />
            <div>
                <p className="font-semibold">{fname + " " + lname}</p>
                <p className="text-neutral-content">{formatDate(commentdate)}</p>
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default Comment;