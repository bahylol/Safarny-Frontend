import React, { useState } from 'react';

const CreatePackageModal = ({ modalRef }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [languages, setLanguages] = useState('');
    const [photography, setPhotography] = useState(false);
    const [transportation, setTransportation] = useState(false);
    const [meals, setMeals] = useState(false);
    const [price, setPrice] = useState('');

    const resetFields = () => {
        setName('');
        setDetails('');
        setLanguages('');
        setPhotography(false);
        setTransportation(false);
        setMeals(false);
        setPrice('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                details,
                languages,
                photography,
                transportation,
                meals,
                price,
            }),
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Package Created successfully");
                    return response.json();
                } else {
                    // Handle non-200 response status code
                    return response.text().then((error) => {
                        alert(error);
                    });
                }
            })
            .then((data) => {
                resetFields();
            })
            .catch((error) => {
                console.error('Error:', error.message);
                alert('An error occurred: ' + error.message);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div>
                <dialog id="my_modal_4" ref={modalRef} className={`modal ${isModalOpen ? 'open' : ''}`}>
                    <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Package name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter package name..."
                            />
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24 mt-2"
                                placeholder="Write your package details here..."
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Tags</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                placeholder="Add tour languages separated by commas..."
                            />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Options</span>
                            </label>
                            <div className="flex">
                                <div className="flex-1">
                                    <label className="label">
                                        <span className="label-text">Photography</span>
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-info mx-2"
                                        checked={photography}
                                        onChange={() => setPhotography(!photography)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="label">
                                        <span className="label-text">Transportation</span>
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-info mx-2"
                                        checked={transportation}
                                        onChange={() => setTransportation(!transportation)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="label">
                                        <span className="label-text">Meals</span>
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-info mx-2"
                                        checked={meals}
                                        onChange={() => setMeals(!meals)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter package price..."
                            />
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-outline" onClick={handleSubmit}>Create Package</button>
                            <button className="btn" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </>
    );
};

export default CreatePackageModal;
