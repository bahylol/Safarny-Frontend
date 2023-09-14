import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay, color }) => {
	const [currentText, setCurrentText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(true);

	useEffect(() => {
		const toggleTypingState = () => {
			setIsTyping((prevIsTyping) => !prevIsTyping);
		};

		const interval = setInterval(
			toggleTypingState,
			text.length * delay * 2 // Toggle typing state after finishing typing and deleting
		);
		return () => clearInterval(interval);
	}, [text.length, delay]);

	useEffect(() => {
		if (isTyping) {
			if (currentIndex < text.length) {
				const timeout = setTimeout(() => {
					setCurrentText((prevText) => prevText + text[currentIndex]);
					setCurrentIndex((prevIndex) => prevIndex + 1);
				}, delay);
				return () => clearTimeout(timeout);
			} else {
				// Wait for 1 second before starting to delete
				const timeout = setTimeout(() => {
					setIsTyping(false);
					setTimeout(() => {
						setIsTyping(true);
						setCurrentIndex((prevIndex) => prevIndex - 1);
					}, delay);
				}, 1000); // 1 second delay
				return () => clearTimeout(timeout);
			}
		} else {
			if (currentIndex > 0) {
				const timeout = setTimeout(() => {
					setCurrentText((prevText) => prevText.slice(0, -1));
					setCurrentIndex((prevIndex) => prevIndex - 1);
				}, delay);
				return () => clearTimeout(timeout);
			} else {
				// Wait for 1 second before starting to type again
				const timeout = setTimeout(() => {
					setIsTyping(true);
					setCurrentIndex((prevIndex) => prevIndex + 1);
				}, 1000); // 1 second delay
				return () => clearTimeout(timeout);
			}
		}
	}, [currentIndex, delay, isTyping, text.length]);

	return <span className={color}>{currentText + '|'}</span>;
};

export default Typewriter;
