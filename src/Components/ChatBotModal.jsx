import React from 'react';
import Chatbot from './Chatbot'; // Import your existing ChatBot component

const ChatBotModal = ({ modalRef }) => {
    return (
        <div>
            {/* You can open the modal using ID.showModal() method */}
            <dialog id="chatbotModal" ref={modalRef} className="modal">
                <form method="dialog" className="modal-box w-full max-w-5xl overflow-hidden">
                    <div className="modal-action">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                    <div className="modal-body">
                        <Chatbot />
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ChatBotModal;
