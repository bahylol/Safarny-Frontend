import React from 'react';

const Headline = (props) => {
	return (
		<h1 className="lg:text-4xl text-xl capitalize text-center font-bold text-neutral-focus bg-gradient-to-r from-secondary to-primary rounded-md p-2 mx-6 my-6 shadow-lg ">
			{props.content}
		</h1>
	);
};

export default Headline;
