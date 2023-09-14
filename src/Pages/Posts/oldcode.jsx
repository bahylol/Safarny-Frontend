import React, { useState, useRef, useEffect } from 'react';
import Post from '../../Components/Post.jsx';

import foto1 from '../../assets/Images/EgyptTrip.jpg';
import foto2 from '../../assets/Images/FeatureActivites.jpg';
import foto3 from '../../assets/Images/FeatureAi.jpg';
import foto4 from '../../assets/Images/FeatureBlog.webp';
import foto5 from '../../assets/Images/FeatureBudget.jpg';
import foto6 from '../../assets/Images/FeatureFamily.jpg';
import foto7 from '../../assets/Images/FeatureHotel.jpg';
import foto8 from '../../assets/Images/FeatureItinerary.jpg';

const Posts = () => {
	const comments = [
		{
			commentID: 1,
			postID: 1,
			pfp: foto1,
			username: 'Ahmedeksa',
			comment: 'WHAT? i ate that too!',
			date: '10/18/2023',
		},
		{
			commentID: 2,
			postID: 1,
			pfp: foto2,
			username: 'Zeina',
			comment: 'ME TOO',
			date: '10/18/2023',
		},
		{
			commentID: 3,
			postID: 1,
			pfp: foto3,
			username: 'Hassan',
			comment: 'weird',
			date: '10/18/2023',
		},
		{
			commentID: 1,
			postID: 1,
			pfp: foto4,
			username: 'Julien',
			comment: 'WHAT? i ate that too!',
			date: '10/18/2023',
		},
		{
			commentID: 2,
			postID: 2,
			pfp: foto5,
			username: 'Sama',
			comment: 'I woke up hungry',
			date: '10/18/2023',
		},
		{
			commentID: 3,
			postID: 2,
			pfp: foto6,
			username: 'Mariam',
			comment: 'HAHAHAHAHA',
			date: '10/18/2023',
		},
		{
			commentID: 1,
			postID: 2,
			pfp: foto7,
			username: 'Zeyad',
			comment: 'Anyone ever like ACDC',
			date: '10/18/2023',
		},
		{
			commentID: 2,
			postID: 3,
			pfp: foto8,
			username: 'Felix',
			comment: 'I like sleep',
			date: '10/18/2023',
		},
		{
			commentID: 3,
			postID: 3,
			pfp: foto1,
			username: 'Marzia',
			comment: 'Sleep is best',
			date: '10/18/2023',
		},
		{
			commentID: 1,
			postID: 3,
			pfp: foto2,
			username: 'Metwally',
			comment: 'I lke school',
			date: '10/18/2023',
		},
		{
			commentID: 2,
			postID: 4,
			pfp: foto2,
			username: 'Ossama',
			comment: 'Who else believes in time travel',
			date: '10/18/2023',
		},
		{
			commentID: 3,
			postID: 4,
			pfp: foto3,
			username: 'Naggari',
			comment: 'I like cats',
			date: '10/18/2023',
		},
		{
			commentID: 1,
			postID: 4,
			pfp: foto4,
			username: 'Awadin',
			comment: 'No cats are evil',
			date: '10/18/2023',
		},
		{
			commentID: 2,
			postID: 4,
			pfp: foto5,
			username: 'Wakil',
			comment: 'Dogs are the best',
			date: '10/18/2023',
		},
		{
			commentID: 3,
			postID: 4,
			pfp: foto6,
			username: 'Mahmoud',
			comment: 'HUH?',
			date: '10/18/2023',
		},
	];

	const initialPosts = [
		{
			postID: 1,
			profile: foto7,
			username: 'joesky',
			image: foto1,
			caption: 'Today i ate cornflakes at lunch and a cheescake at dinner',
			likes: '38',
			dislikes: '34',
			date: '8/18/2023',
			comments: comments,
		},
		{
			postID: 2,
			profile: foto8,
			username: 'Zimmerman',
			image: foto2,
			caption: 'I love the songs from ACDC',
			likes: '459',
			dislikes: '34',
			date: '8/18/2023',
			comments: comments,
		},
		{
			postID: 3,
			profile: foto8,
			username: 'Husemeier',
			image: foto3,
			caption: 'Im gonna start a school shooting soon',
			likes: '45',
			dislikes: '34',
			date: '8/18/2023',
			comments: comments,
		},
		{
			postID: 4,
			profile: foto4,
			username: 'Kramm',
			image: foto1,
			caption: 'The night is the best thing ever. especially when its cold',
			likes: '13',
			dislikes: '34',
			date: '8/18/2023',
			comments: comments,
		},
	];

	const [posts, setPosts] = useState(initialPosts);
	const containerRef = useRef(null);

	const handleScroll = () => {
		const container = containerRef.current;
		if (container.scrollTop + container.clientHeight >= container.scrollHeight - 20) {
			const firstPost = posts[0];
			const clonedPost = { ...firstPost };
			const updatedPosts = posts.slice(1).concat(clonedPost);
			setPosts(updatedPosts);
		}
	};

	const [contentVisible, setContentVisible] = useState(false);
	const [indicatorVisible, setIndicatorVisible] = useState(false); // Added state for indicator visibility

	useEffect(() => {
		// Show the indicator after a brief delay when contentVisible becomes true
		if (contentVisible) {
			const indicatorTimeout = setTimeout(() => {
				setIndicatorVisible(true);
			}, 300); // Adjust the delay as needed

			return () => clearTimeout(indicatorTimeout);
		} else {
			setIndicatorVisible(false);
		}
	}, [contentVisible]);

	return (
		<div className="container my-24 mx-auto md:px-6">
			<h2 className="mb-6 text-3xl font-bold">Check your FYP</h2>
			<section className="mb-32">
				<ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
					<li>
						<a>
							<svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
								<path
									fill="currentColor"
									fillRule="evenodd"
									d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
									clipRule="evenodd"
								/>
								<path
									fill="currentColor"
									fillRule="evenodd"
									d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
									clipRule="evenodd"
								/>
							</svg>
							Go to
							<span className="badge badge-sm">Profile</span>
						</a>
					</li>
					<li>
						<a
							onClick={() => setContentVisible(!contentVisible)}
							className={`cursor-pointer ${
								contentVisible ? 'text-primary' : 'text-base-content'
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Updates
							<span className="badge badge-sm badge-warning">43078</span>
						</a>
					</li>
					<li>
						<a>
							Logout
							<span className="badge badge-xs badge-neutral"></span>
						</a>
					</li>
				</ul>
				<div className="flex flex-wrap">
					<div
						className={`mb-12 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-5/12 ${
							contentVisible ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'
						} transition-opacity ease-in-out duration-300`}
					>
						<div className="flex lg:py-12 flex flex-wrap justify-center items-start gap-4">
							{/* ------------------------------------------ */}
							<div
								class="relative my-6 inline-flex w-fit tooltip tooltip-accent"
								data-tip="USERNAME"
							>
								<div class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-primary-500 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white"></div>
								<div class="h-24 w-24 overflow-hidden rounded-lg">
									<img
										src="https://tecdn.b-cdn.net/img/new/avatars/8.jpg"
										class="h-full w-full max-w-full rounded-lg object-cover transition-transform transform hover:scale-110"
										alt=""
									/>
								</div>
							</div>
							{/* ------------------------------------------ */}
							<div
								className="relative m-6 inline-flex w-fit tooltip tooltip-accent"
								data-tip="4689 likes"
							>
								<div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-2.5 text-xs"></div>
								<div className="flex items-center justify-center rounded-lg bg-indigo-400 hover:bg-indigo-300 px-8 py-6 text-center text-white shadow-lg dark:text-gray-200">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 256 256"
										className="w-8 h-8 text-gray-600 rotate-360 fill-current transition duration-300 ease-in-out hover:text-green-500"
									>
										<rect width="256" height="256" fill="none" />
										<path
											d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="24"
										/>
										<path
											d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="24"
										/>
									</svg>
								</div>
							</div>
							{/* ------------------------------------------ */}
							<div
								className="relative m-6 inline-flex w-fit tooltip tooltip-accent"
								data-tip="2374 dislikes"
							>
								<div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-2.5 text-xs"></div>
								<div className="flex items-center justify-center rounded-lg bg-indigo-400 hover:bg-indigo-300 px-8 py-6 text-center text-white shadow-lg dark:text-gray-200">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 256 256"
										className="w-8 h-8 text-gray-600 transform-flip-x fill-current transition duration-300 ease-in-out hover:text-red-700"
									>
										<rect width="256" height="256" fill="none" />
										<path
											d="M32,48H80a0,0,0,0,1,0,0V152a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="24"
										/>
										<path
											d="M80,152l40,80a32,32,0,0,0,32-32V176h61.9a15.9,15.9,0,0,0,15.8-18l-12-96a16,16,0,0,0-15.8-14H80"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="24"
										/>
									</svg>
								</div>
							</div>
							{/* ------------------------------------------ */}
							<div
								className="relative m-6 inline-flex w-fit tooltip tooltip-accent"
								data-tip="37334 comments"
							>
								<div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-2.5 text-xs"></div>
								<div className="flex items-center justify-center rounded-lg bg-indigo-400 hover:bg-indigo-300 px-8 py-6 text-center text-white shadow-lg dark:text-gray-200">
									<svg
										className="w-8 h-8 text-gray-600 stroke-current transition duration-300 ease-in-out hover:text-orange-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="1.6"
											d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
										></path>
									</svg>
								</div>
							</div>
							{/* ------------------------------------------ */}
							<div
								className={`indicator ${
									indicatorVisible ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'
								}
  transition-opacity ease-in-out duration-300`}
							>
								<div className="indicator-item indicator-bottom">
									<button
										className="btn btn-primary disabled-btn"
										disabled
										style={{ cursor: 'not-allowed', color: '#FFFFFF' }}
									>
										Stay up-to-date
									</button>
								</div>
								<div className="card border">
									<div className="card-body">
										<h2 className="card-title">Weekly update</h2>
										<p>You published 23 posts this week</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						ref={containerRef}
						className="w-full shrink-0 grow-0 basis-auto lg:w-7/12"
						style={{ overflowY: 'auto', maxHeight: '500px' }} // Adjust as needed
						onScroll={handleScroll}
					>
						{/* <div className="flex h-full items-center rounded-lg bg-base-300 p-6 text-center text-white lg:pl-12 lg:text-left"> */}
						<div className="lg:pl-12">
							<div>
								{posts.map((post) => (
									<Post
										key={post.postID}
										post={post}
										pfp={post.profile}
										username={post.username}
										image={post.image}
										caption={post.caption}
										likes={post.likes}
										dislikes={post.dislikes}
										date={post.date}
										comments={post.comments}
										postDetailsLink={`/Post/${post.postID}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Posts;
