import React from 'react'
import Modal from 'react-modal';
import User from './User'

const FollowersModal = ({ isOpen, onRequestClose }) => {
    const users = [
        {
            id: 1,
            avatar: 'url-to-avatar-1.jpg',
            userName: 'User1',
            content: 'This is the first comment.',
            postDate: 'September 8, 2023',
        },
        {
            id: 2,
            avatar: 'url-to-avatar-2.jpg',
            userName: 'User2',
            content: 'This is the second comment.',
            postDate: 'September 9, 2023',
        },
    ];

    return (
        <Modal className={'overflow-hidden'} isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="relative flex flex-col justify-between min-h-screen bg-base-100 py-12">
                <div className="relative px-6 pt-10 pb-9 shadow-xl w-1/2 mx-auto rounded-2xl">
                    <button onClick={onRequestClose} className="btn btn-primary absolute top-0 left-0 m-5">
                        <svg className="w-6 h-6 text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                    <div className="flex flex-col my-12 space-y-16">
                        <h2 className="self-center text-4xl font-bold">
                            Followers
                            <hr className="border-2 rounded-xl" />
                        </h2>

                        <div className="my-8 space-y-6">
                            {users.map((user) => (
                                <div>
                                    <User
                                        key={user.id}
                                        avatar={user.avatar}
                                        userName={user.userName}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FollowersModal