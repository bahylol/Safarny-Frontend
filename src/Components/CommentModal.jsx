import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Comment from './Comment';
import { AddComment } from '@mui/icons-material';

const CommentModal = ({ isOpen, onRequestClose, post_id }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const fetchComments = async () => {
        console.log(post_id)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/comment/${post_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setComments(data);
                console.log(data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const AddComment = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: comment,
                    post_id: post_id,
                }),
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                setComments(data);
                console.log(data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    useEffect(() => {
        fetchComments();
    }, []);

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
                            Comments
                            <hr className="border-2 shadow-xl rounded-xl" />
                        </h2>

                        <div className="my-8 space-y-6">
                            {comments.map((comment) => (
                                <div>
                                    <Comment
                                        key={comment.id}
                                        avatar={comment.avatar}
                                        fname={comment.fname}
                                        lname={comment.lname}
                                        comment={comment.comment}
                                        commentdate={comment.commentdate}
                                    />
                                    <hr className="w-full border-2 shadow-xl mt-3 rounded-xl" />
                                </div>
                            ))}
                        </div>

                        {/* Comment input field */}
                        <div className="flex flex-col flex-grow my-12 space-y-3 fixed bottom-0 left-1/4 right-1/4 p-4 w-1/2 mx-auto">
                            <label className="text-xl text-base-content font-bold">Comment</label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"
                                value={comment}
                                onChange={handleComment}
                            />
                            <button className="btn btn-primary self-end"
                                onClick={AddComment}
                            >Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CommentModal;
