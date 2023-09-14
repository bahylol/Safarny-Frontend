import React, { useState } from 'react';

const CreatePostModal = ({ modalRef }) => {
	const [showFileInput, setShowFileInput] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [tags, setTags] = useState('');

	const toggleFileInput = () => {
		setShowFileInput((prevState) => !prevState);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				description: content,
				country,
				city,
				tags
			}),
			credentials: 'include',
		})
			.then((response) => {
				// Check if the response status code is 200
				if (response.status === 200) {
					return response.json();
				} else {
					// Handle non-200 response status code
					return response.text().then((error) => {
						alert(error);
					});
				}
			})
			.then((data) => {
				setTitle('');
				setContent('');
				setCountry('');
				setCity('');
				setTags('');
			})
			.catch((error) => {
				console.error('Error:', error.message);
				alert('An error occurred: ' + error.message);
			});
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const date = `${day}/${month}/${year}`;

	return (
		<>
			<div>
				<dialog id="my_modal_4" ref={modalRef} className={`modal ${isModalOpen ? 'open' : ''}`}>
					<form method="dialog" className="modal-box w-11/12 max-w-5xl">
						<div className="form-control">
							<label className="label">
								<span className="label-text-alt"></span>
								<div className="label-text-alt text-xs badge badge-outline">{date}</div>
							</label>
							<label className="label">
								<span className="label-text">Title</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter title..."
							/>
							<label className="label">
								<span className="label-text">Content</span>
							</label>
							<textarea
								className="textarea textarea-bordered h-24 mt-2"
								placeholder="Write your post here..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
							></textarea>
						</div>
						<div className="flex">
							<div className="form-control mr-2 flex-1">
								<label className="label">
									<span className="label-text">Country</span>
								</label>
								<input
									type="text"
									className="input input-bordered w-full"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									placeholder="Enter country..."
								/>
							</div>
							<div className="form-control ml-2 flex-1">
								<label className="label">
									<span className="label-text">City</span>
								</label>
								<input
									type="text"
									className="input input-bordered w-full"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									placeholder="Enter city..."
								/>
							</div>
						</div>
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Tags</span>
							</label>
							<input
								type="text"
								className="input input-bordered w-full"
								value={tags}
								onChange={(e) => setTags(e.target.value)}
								placeholder="Add tags separated by commas..."
							/>
						</div>
						<br />
						<label className="label">
							<span className="label-text">Add Image</span>
						</label>
						<input
							type="checkbox"
							className="toggle toggle-info mx-2"
							onChange={toggleFileInput}
						/>{' '}
						{showFileInput && (
							<input
								type="file"
								className="file-input file-input-bordered file-input-info w-full max-w-xs ml-2"
							/>
						)}
						<div className="modal-action">
							<button className="btn btn-outline" onClick={handleSubmit}>Post</button>
							<button className="btn" onClick={closeModal}>Discard Post</button>
						</div>
					</form>
				</dialog>
			</div>
		</>
	);
};

export default CreatePostModal;
