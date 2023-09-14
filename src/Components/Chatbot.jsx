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
            <p className={`text-base p-4 rounded-lg ${sender === 'customer' ? 'bg-info text-white ml-auto' : 'bg-base-100 text-base-content mr-auto'} max-w-[50%]`}>
                {animatedText}
            </p>
        </div>
    );
};

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: 'Hello there, I am Rahal. I will help you before, during, and after your trips. How may I help you?', sender: 'bot' },
    ]);
    const [newMessageText, setNewMessageText] = useState('');

    const handleInputChange = (event) => {
        setNewMessageText(event.target.value);
    };

    const sendMessage = async () => {
        if (newMessageText.trim() !== '') {
            const newCustomerMessage = { text: newMessageText, sender: 'customer' };
            setMessages([...messages, newCustomerMessage]);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatBot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: newMessageText,
                }),
                credentials: 'include',
            });

            try {
                // Check if the response status code is 200
                if (response.status === 200) {
                    const data = await response.json();
                    const newBotResponse = { text: data.choices[0].message.content, sender: 'bot' };
                    setMessages(messages => [...messages, newBotResponse]);
                }
            } catch {
                console.log('Error');
            }

            setNewMessageText('');
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Add this line
            await sendMessage();
        }
    };
    const handlebuttonClick = async (event) => {
        event.preventDefault(); // Add this line
        await sendMessage();
    }
    return (
        <div className="flex justify-center h-screen bg-neutral ">
            <div className="w-3/4">
                <div className="flex flex-col h-2/3">
                    <div className="flex-grow border-4 border-info rounded-xl p-4 bg-white shadow-md mb-4 space-y-2 overflow-auto scrollbar">
                        {messages.map((message, index) => (
                            <Message key={index} text={message.text} sender={message.sender} />
                        ))}
                    </div>
                    <div className="input-container p-4 bg-white rounded-lg flex">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-grow border rounded-l-lg p-2 focus:outline-none"
                            value={newMessageText}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            type="button"
                            onClick={handlebuttonClick}
                            className="bg-info text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
