import React from 'react';
import './TypeScriptEffect.css'; // Import the CSS file
// import './TypeScriptEffect.js';

const TypeScriptEffect = (props) => {
	return (
		<div>
			<h1 className="ml11">
				<span className="text-wrapper">
					<span className="line line1"></span>
					<span className="letters">{props.text ? props.text : 'default text'}</span>
				</span>
			</h1>
		</div>
	);
};

export default TypeScriptEffect;
