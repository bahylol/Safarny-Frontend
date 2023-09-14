import React, { useState, useEffect } from 'react';

const Post = ({
	pfp,
	username,
	image,
	caption,
	likes,
	dislikes,
	date,
	comments,
	postDetailsLink,
}) => {
	const [commentVisible, setCommentVisible] = useState(false);

	const toggleComment = () => {
		setCommentVisible((prev) => !prev);
	};

	return (
		<div
			className="mx-auto flex justify-center max-w-3xl md:mb-8 rounded-lg items-center relative md:p-0 p-8"
			x-data={{ comment: false }}
			style={{ backgroundColor: 'var(--TripsCard2TextColor)' }}
		>
			<div className="h-full w-full relative">
				<div className="py-2 px-2">
					<div className="flex justify-between items-center py-2">
						<div className="relative mt-1 flex">
							<div className="mr-2">
								<img src={pfp} alt="Foto" className="w-10 h-10 rounded-full object-cover" />
							</div>
							<div className="ml-3 flex justify-start flex-col items-start">
								<p className="text-gray-900 text-sm">{username}</p>
								<p className="text-gray-600 text-xs">{username}</p>
							</div>
						</div>
						{/* TOP RIGHT POST DETAILS BUTTON */}
						<button
							type="button"
							class="focus:outline-none Open"
							onClick={() => (window.location.href = postDetailsLink)}
						>
							<svg
								class="svg-icon w-8 h-8 text-gray-600 rotate-360 fill-current transition duration-300 ease-in-out hover:text-blue-500"
								viewBox="0 0 20 20"
							>
								<path d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"></path>
							</svg>
						</button>
					</div>
				</div>
				<div className="relative w-full h-full">
					<img src={image} alt="Foto" className="rounded-lg w-full h-full object-cover" />
					<br />
					<div className="px-3">{caption}</div>
					<br />
				</div>
				<div className="">
					{/* Comment */}
					<div
						className={`overflow-y-scroll w-full absolute inset-0 transform transition-all duration-900 ${commentVisible ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
							}`}
						x-data={{ comment: false }}
						style={{ backgroundColor: 'var(--TripsCard2TextColor)' }}
					>
						<div className="flex justify-start items-center py-2 px-4 border-b">
							<svg
								className="w-8 h-8 text-gray-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								onClick={toggleComment}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M7 16l-4-4m0 0l4-4m-4 4h18"
								></path>
							</svg>
						</div>
						<div className="p-2 mb-10">
							{comments.map((comment) => (
								<div
									key={comments.commentID}
									comment={comment}
									className="flex justify-start flex-col space-y-3 items-start px-2 border-b border-gray-100"
								>
									<div className="relative mt-1 mb-3 pt-2 flex">
										<div className="mr-2">
											<img
												src={comment.pfp}
												alt="foto"
												className="w-8 h-8 rounded-full object-cover"
											/>
										</div>
										<div className="ml-2 w-full">
											<p className="text-gray-600 md:text-sm text-xs w-full">
												<span className="font-normal text-gray-900">
													{comment.username}{' '}
												</span>
												{comment.comment}
											</p>
											<div className="time mt-1 text-gray-400 text-xs">
												<p> {comment.date}</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* -------------------------------------------------------------------------------------- */}
					<div></div>
					<div className="flex justify-between items-start p-2 py-">
						<div className="flex space-x-2 items-center">
							<button type="button" className="focus:outline-none Like">
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
							</button>

							<button type="button" className="focus:outline-none Dislike">
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
							</button>
						</div>
						<div className="flex space-x-2 items-center">
							<button type="button" className="focus:outline-none share">
								<svg
									className="w-7 h-7 mb-1 ml-1 text-gray-600 z-10 stroke-current transition duration-300 ease-in-out hover:text-blue-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.6"
										d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
									></path>
								</svg>
							</button>

							<button
								type="button"
								className="focus:outline-none Comment"
								onClick={toggleComment}
							>
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
							</button>
						</div>
					</div>
					<div className="p-2 flex flex-col space-y-3">
						<div className="w-full">
							<p className="font-bold text-sm text-gray-700">{likes}</p>
						</div>
						<div className="w-full">
							<p className="font-normal text-xs text-gray-500">{date}</p>
						</div>
					</div>
					{/* End System Like and tools Feed */}
					<div className="z-50">
						<form>
							<div
								className={`flex justify-between border-t items-center w-full ${commentVisible ? 'absolute bottom-0' : ''
									}`}
							>
								<div className="w-full">
									<input
										type="text"
										name="comment"
										id="comment"
										placeholder="Add A Comment..."
										className="w-full text-sm py-4 px-3 rounded-none focus:outline-none"
									/>
								</div>
								<div className="w-20">
									<button
										className="border-none text-sm px-4 bg-white py-4 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 hover:transition duration-500 focus:outline-none rounded-full"
										onClick={(e) => e.preventDefault()}
									>
										Post
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
