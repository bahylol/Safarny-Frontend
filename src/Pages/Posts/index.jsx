import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CommentModal from '../../Components/CommentModal'

const Posts = () => {
	const [articles, setArticles] = useState([]);
	const [isCopied, setIsCopied] = useState(false);
	const [activeTab, setActiveTab] = useState('For You');
	const [activeSettings, setActiveSettings] = useState('For You');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [postId, setPostId] = useState()

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const handleOpenModal = (postId) => {
		setPostId(postId);
		setIsModalOpen(true);
	};

	useEffect(() => {
		fetchFeed(activeSettings);
	}, [activeSettings]);

	const confirm = (message) => {
		toast.success(message, {
			position: 'top-center',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});
	};

	const fetchFeed = async (settings) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/feed/${settings}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (response.status === 200) {
				const data = await response.json();
				setArticles(data);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	const handleVote = async (input, index) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/vote`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					upordown: input,
					post_id: index,
				}),
			});

			if (response.status === 200) {
				fetchFeed(activeSettings);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	const handleRemoveVote = async (index) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/vote`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					post_id: index,
				}),
			});

			if (response.status === 200) {
				fetchFeed(activeSettings);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	const formatDate = (inputDate) => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		};

		const date = new Date(inputDate);
		return date.toLocaleDateString(undefined, options);
	};

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text)
			.then(() => {
				confirm("Post link copied to your clipboard")
				setIsCopied(true);
				setTimeout(() => setIsCopied(false), 2000);
			})
			.catch(error => console.error("Error copying text:", error));
	};

	const handleTabClick = (settings) => {
		setActiveTab(settings);
		setActiveSettings(settings);
	};

	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<ul className="flex text-sm font-medium text-center" id="myTab" role="tablist">
					<li className="flex-grow mr-2" role="presentation">
						<button
							className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'For You' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'
								}`}
							id="For You-tab"
							type="button"
							role="tab"
							aria-controls="For You"
							aria-selected={activeTab === 'For You'}
							onClick={() => handleTabClick('For You')}
						>
							For You
						</button>
					</li>
					<li className="flex-grow mr-2" role="presentation">
						<button
							className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'date' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'
								}`}
							id="date-tab"
							type="button"
							role="tab"
							aria-controls="date"
							aria-selected={activeTab === 'date'}
							onClick={() => handleTabClick('date')}
						>
							Newest
						</button>
					</li>
					<li className="flex-grow mr-2" role="presentation">
						<button
							className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'upVotes' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'
								}`}
							id="upVotes-tab"
							type="button"
							role="tab"
							aria-controls="upVotes"
							aria-selected={activeTab === 'upVotes'}
							onClick={() => handleTabClick('upVotes')}
						>
							Most Up Voted
						</button>
					</li>
				</ul>
				<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
					{articles.length === 0 ? (
						<p className="text-center text-gray-500 dark:text-gray-400">No posts available.</p>
					) : (
						articles.map((article, index) => (
							<div key={article.id}>
								<article key={article.id} className={`p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${index !== 0 ? 'mt-4' : ''}`}>
									<div className="flex flex-col md:flex-row items-center justify-between mb-2">
										<div className="md:mb-0 mb-2 md:mr-2">
											<h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
												<a href="#">
													{article.title}
													<span className="text-sm text-gray-500">
														&nbsp;- {article.country}, {article.city}
													</span>
												</a>
											</h2>
										</div>
										<div className="md:mb-2">
											<span className="text-sm text-gray-500">
												{formatDate(article.postdate)}
											</span>
										</div>
									</div>
									{article.tags.map((tag, tagIndex) => (
										<span
											key={tagIndex}
											className="inline-block bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-white mr-2 mb-2"
										>
											{tag}
										</span>
									))}
									<div className="max-height-container" style={{ maxHeight: '600px', overflow: 'hidden' }}>
										<img
											className="w-full h-full object-fit-cover"
											src={article.images[0]}
											alt="Article"
											style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
										/>
									</div>
									<br />
									<p className="mb-5 font-light text-gray-500 dark:text-gray-400">{article.description}</p>
									<br />
									<div className="flex items-center space-x-4">
										<img className="w-7 h-7 rounded-full" src={require(`../../assets/Images/traveler${article.avatar}.jpg`)} alt={`${article.fname + " " + article.lname} avatar`} />
										<span className="font-medium dark:text-white">
											{article.fname + " " + article.lname}
										</span>
										<div className="flex-grow"></div>
										<div className="flex items-center space-x-2">
											<button
												className={`text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 ${article.user_vote === 1 ? 'text-green-500' : ''
													}`}
												onClick={() => {
													if (article.user_vote === 1) {
														handleRemoveVote(article.id);
													} else {
														handleVote(1, article.id);
													}
												}}
											>
												{article.upvotes}
												<ThumbUpOutlinedIcon />
											</button>
											<button
												className={`text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 ${article.user_vote === -1 ? 'text-red-500' : ''
													}`}
												onClick={() => {
													if (article.user_vote === -1) {
														handleRemoveVote(article.id);
													} else {
														handleVote(-1, article.id);
													}
												}}
											>
												{article.downvotes}
												<ThumbDownOutlinedIcon />
											</button>

											<button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
												<AddCommentOutlinedIcon onClick={() => { handleOpenModal(article.id) }}
												/>
												<CommentModal isOpen={isModalOpen} onRequestClose={handleCloseModal} post_id={postId} />
											</button>
											<button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
												onClick={() => copyToClipboard(`${process.env.REACT_APP_FRONTEND_URL}/post/${article.id}`)}												>
												<ShareOutlinedIcon />
											</button>
										</div>
									</div>
								</article>
							</div>

						))
					)}
				</div>
			</section>
			<ToastContainer />
		</>
	);
};

export default Posts;
