import React from 'react';
import traveler from '../../assets/Images/search_traveler.jpg';
import guide from '../../assets/Images/search_guide.jpg';
import company from '../../assets/Images/search_company.jpg';
import './index.css';

function PreSearch() {
	const handleTravelerClick = () => {
		// Redirect to the search URL
		window.location.href = 'search/travelers';
	};

	const handleGuideClick = () => {
		// Redirect to the search URL
		window.location.href = 'search/localGuides';
	};

	const handleCompanyClick = () => {
		// Redirect to the company search URL
		window.location.href = 'search/companies';
	};

	return (
		<div className="flex flex-wrap justify-center items-start gap-4">
			<div className="card w-96 bg-base-100 shadow-xl image-full card-hover">
				<figure>
					<img src={traveler} alt="" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Travelers</h2>
					<p>Discover and connect with fellow travelers who share your interests</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary btn-hidden" onClick={handleTravelerClick}>
							Find travelers now
						</button>
					</div>
				</div>
			</div>

			<div className="card w-96 bg-base-100 shadow-xl image-full card-hover">
				<figure>
					<img src={guide} alt="" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Guides</h2>
					<p>
						Unearth and connect with knowledgeable local guides who have similar interests to
						yours
					</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary btn-hidden" onClick={handleGuideClick}>
							Find guides now
						</button>
					</div>
				</div>
			</div>

			<div className="card w-96 bg-base-100 shadow-xl image-full card-hover">
				<figure>
					<img src={company} alt="" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Companies</h2>
					<p>
						Discover and collaborate with companies that can support and empower you in
						achieving your passions and aspirations
					</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary btn-hidden" onClick={handleCompanyClick}>
							Find companies now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PreSearch;
