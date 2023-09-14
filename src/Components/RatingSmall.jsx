import React from 'react';

const RatingSmall = (props) => {
	return (
		<div className="rating rating-xs" style={{ cursor: 'default' }}>
			<input
				name="rating-5"
				className="mask mask-star-2 bg-orange-400"
				disabled
				style={{ cursor: 'default' }}
			/>
			<input
				name="rating-5"
				className="mask mask-star-2 bg-orange-400"
				disabled
				style={{ cursor: 'default' }}
			/>
			<input
				name="rating-5"
				className="mask mask-star-2 bg-orange-400"
				disabled
				style={{ cursor: 'default' }}
			/>
			<input
				name="rating-5"
				className="mask mask-star-2 bg-orange-400"
				disabled
				style={{ cursor: 'default' }}
			/>
			<input
				name="rating-5"
				className="mask mask-star-2 bg-orange-400"
				disabled
				style={{ cursor: 'default' }}
			/>
		</div>
	);
};
{
	/* <div className="rating rating-xs">
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
</div> */
}

export default RatingSmall;
