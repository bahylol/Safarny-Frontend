import React, { useState, useEffect } from 'react';

const Message = ({ text, sender }) => {
    const [animatedText, setAnimatedText] = useState('');
    const typingSpeed = 30;

    useEffect(() => {
        if (sender === 'bot') {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    setAnimatedText(text.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, typingSpeed);

            return () => {
                clearInterval(interval);
            };
        } else {
            setAnimatedText(text);
        }
    }, [text, sender]);

    return (
        <div className={`message ${sender === 'customer' ? 'sender' : 'receiver'}`}>
            <p className={`text-base p-4 rounded-lg ${sender === 'customer' ? 'bg-info text-white ml-auto' : 'bg-base-300 text-base-content mr-auto'} max-w-[100%] overflow-hidden`}>
                {animatedText}
            </p>
        </div>
    );
};

export default Message;
