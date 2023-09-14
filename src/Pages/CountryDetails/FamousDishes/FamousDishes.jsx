import React, { useState } from 'react'; // import useState from 'react';
import './AutocompleteCountryInput.css'; // Import the CSS file for styling
const FamousDish = () => {
	const countryNames = [
		'Afghanistan',
		'Aland Islands',
		'Albania',
		'Algeria',
		'American Samoa',
		'Andorra',
		'Angola',
		'Anguilla',
		'Antarctica',
		'Antigua and Barbuda',
		'Argentina',
		'Armenia',
		'Aruba',
		'Australia',
		'Austria',
		'Azerbaijan',
		'Bahamas',
		'Bahrain',
		'Bangladesh',
		'Barbados',
		'Belarus',
		'Belgium',
		'Belize',
		'Benin',
		'Bermuda',
		'Bhutan',
		'Bolivia',
		'Bonaire, Sint Eustatius and Saba',
		'Bosnia and Herzegovina',
		'Botswana',
		'Bouvet Island',
		'Brazil',
		'British Indian Ocean Territory',
		'Brunei Darussalam',
		'Bulgaria',
		'Burkina Faso',
		'Burundi',
		'Cambodia',
		'Cameroon',
		'Canada',
		'Cape Verde',
		'Cayman Islands',
		'Central African Republic',
		'Chad',
		'Chile',
		'China',
		'Christmas Island',
		'Cocos (Keeling) Islands',
		'Colombia',
		'Comoros',
		'Congo',
		'Congo, Democratic Republic of the Congo',
		'Cook Islands',
		'Costa Rica',
		"Cote D'Ivoire",
		'Croatia',
		'Cuba',
		'Curacao',
		'Cyprus',
		'Czech Republic',
		'Denmark',
		'Djibouti',
		'Dominica',
		'Dominican Republic',
		'Ecuador',
		'Egypt',
		'El Salvador',
		'Equatorial Guinea',
		'Eritrea',
		'Estonia',
		'Ethiopia',
		'Falkland Islands (Malvinas)',
		'Faroe Islands',
		'Fiji',
		'Finland',
		'France',
		'French Guiana',
		'French Polynesia',
		'French Southern Territories',
		'Gabon',
		'Gambia',
		'Georgia',
		'Germany',
		'Ghana',
		'Gibraltar',
		'Greece',
		'Greenland',
		'Grenada',
		'Guadeloupe',
		'Guam',
		'Guatemala',
		'Guernsey',
		'Guinea',
		'Guinea-Bissau',
		'Guyana',
		'Haiti',
		'Heard Island and McDonald Islands',
		'Holy See (Vatican City State)',
		'Honduras',
		'Hong Kong',
		'Hungary',
		'Iceland',
		'India',
		'Indonesia',
		'Iran, Islamic Republic of',
		'Iraq',
		'Ireland',
		'Isle of Man',
		'Israel',
		'Italy',
		'Jamaica',
		'Japan',
		'Jersey',
		'Jordan',
		'Kazakhstan',
		'Kenya',
		'Kiribati',
		"Korea, Democratic People's Republic of",
		'Korea, Republic of',
		'Kosovo',
		'Kuwait',
		'Kyrgyzstan',
		"Lao People's Democratic Republic",
		'Latvia',
		'Lebanon',
		'Lesotho',
		'Liberia',
		'Libyan Arab Jamahiriya',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Macao',
		'Macedonia, the Former Yugoslav Republic of',
		'Madagascar',
		'Malawi',
		'Malaysia',
		'Maldives',
		'Mali',
		'Malta',
		'Marshall Islands',
		'Martinique',
		'Mauritania',
		'Mauritius',
		'Mayotte',
		'Mexico',
		'Micronesia, Federated States of',
		'Moldova, Republic of',
		'Monaco',
		'Mongolia',
		'Montenegro',
		'Montserrat',
		'Morocco',
		'Mozambique',
		'Myanmar',
		'Namibia',
		'Nauru',
		'Nepal',
		'Netherlands',
		'Netherlands Antilles',
		'New Caledonia',
		'New Zealand',
		'Nicaragua',
		'Niger',
		'Nigeria',
		'Niue',
		'Norfolk Island',
		'Northern Mariana Islands',
		'Norway',
		'Oman',
		'Pakistan',
		'Palau',
		'Palestinian Territory, Occupied',
		'Panama',
		'Papua New Guinea',
		'Paraguay',
		'Peru',
		'Philippines',
		'Pitcairn',
		'Poland',
		'Portugal',
		'Puerto Rico',
		'Qatar',
		'Reunion',
		'Romania',
		'Russian Federation',
		'Rwanda',
		'Saint Barthelemy',
		'Saint Helena',
		'Saint Kitts and Nevis',
		'Saint Lucia',
		'Saint Martin',
		'Saint Pierre and Miquelon',
		'Saint Vincent and the Grenadines',
		'Samoa',
		'San Marino',
		'Sao Tome and Principe',
		'Saudi Arabia',
		'Senegal',
		'Serbia',
		'Serbia and Montenegro',
		'Seychelles',
		'Sierra Leone',
		'Singapore',
		'St Martin',
		'Slovakia',
		'Slovenia',
		'Solomon Islands',
		'Somalia',
		'South Africa',
		'South Georgia and the South Sandwich Islands',
		'South Sudan',
		'Spain',
		'Sri Lanka',
		'Sudan',
		'Suriname',
		'Svalbard and Jan Mayen',
		'Swaziland',
		'Sweden',
		'Switzerland',
		'Syrian Arab Republic',
		'Taiwan, Province of China',
		'Tajikistan',
		'Tanzania, United Republic of',
		'Thailand',
		'Timor-Leste',
		'Togo',
		'Tokelau',
		'Tonga',
		'Trinidad and Tobago',
		'Tunisia',
		'Turkey',
		'Turkmenistan',
		'Turks and Caicos Islands',
		'Tuvalu',
		'Uganda',
		'Ukraine',
		'United Arab Emirates',
		'United Kingdom',
		'United States',
		'United States Minor Outlying Islands',
		'Uruguay',
		'Uzbekistan',
		'Vanuatu',
		'Venezuela',
		'Viet Nam',
		'Virgin Islands, British',
		'Virgin Islands, U.s.',
		'Wallis and Futuna',
		'Western Sahara',
		'Yemen',
		'Zambia',
		'Zimbabwe',
	];
	//TODO :
	// do the page that will contain the 4 buttons

	const [countryName, setCountryName] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [isStarted, setIsStarted] = useState(false); // to check if the user started typing or not
	const [isInputDisabled, setIsInputDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		const inputText = e.target.value;
		setCountryName(inputText);

		// Filter countryNames based on user input
		const filteredSuggestions = countryNames.filter((country) =>
			country.toLowerCase().includes(inputText.toLowerCase())
		);

		// Set the filtered suggestions
		setSuggestions(filteredSuggestions);
	};

	const handleSuggestionClick = (selectedCountry) => {
		setIsInputDisabled(true);
		setLoading(true);
		setCountryName(selectedCountry);
		setSuggestions([]);
		fetchAPI(selectedCountry);
	};

	const fetchAPI = async (selectedCountry) => {
		console.log(selectedCountry);
		const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/famousDishes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				countryName: selectedCountry,
			}),
			credentials: 'include',
		});
		let responseData = '';

		const reader = response.body.getReader();
		while (true) {
			const { done, value } = await reader.read();

			responseData = new TextDecoder().decode(value);
			try {
				responseData = JSON.parse(responseData);
			} catch (err) {
				console.log(err);
				continue;
			}
			const data = responseData;
			const meals = data.details.split(':');
			console.log('the meal \n\n\nn\n' + meals);
			let output = document.querySelector('.output');
			let mealName = document.createElement('h1');
			mealName.className = 'outputName text-primary-focus text-3xl font-bold text-center';
			mealName.append(document.createTextNode(meals[0]));
			output.append(mealName);

			let description = document.createElement('h2');
			description.className = 'outputName text-primary-focus text-2xl font-bold text-center';
			mealName.append(document.createTextNode(meals[1])); //name   visting pyramids title

			let photosContainer = document.createElement('photos-container');

			// check if the last photo container is items-end or items-start
			// and if items-end then make the new one items-start
			photosContainer.className = 'photosContainer flex flex-row gap-4 justify-center ';
						const photoArray = data.images;
			if (photoArray)
				for (const url of photoArray) {
					const imgElement = document.createElement('img');
					imgElement.src = url;
					// make the mac width 500 px and the height 500px too
					imgElement.style.maxHeight = '200px';
					imgElement.style.maxWidth = '200px';
					// add url to the array
					photosContainer.appendChild(imgElement);
				}
			output.append(photosContainer);
			setIsStarted(true);
		}
	};
	return (
		<div className="min-h-screen">
			{!isStarted && (
				<div className="autocomplete-container">
					<h1 className="mb-4 mt-0 smaller-text font-medium text-primary-focus">Where to?</h1>
					{loading && (
						<div className="flex flex-col justify-center items-center">
							<h1 class="text-xm font-bold text-secondary">Loading famous dishes</h1>
							<span className="loading loading-spinner loading-lg text-primary"></span>
						</div>
					)}
					<input
						type="text"
						value={countryName}
						onChange={handleInputChange}
						placeholder="Type a country name"
						className="autocomplete-input text-base-focus"
						disabled={isInputDisabled}
					/>
					<ul className="suggestion-list">
						{suggestions.map((suggestion, index) => (
							<li
								key={index}
								onClick={() => handleSuggestionClick(suggestion)}
								className="suggestion-item"
							>
								{suggestion}
							</li>
						))}
					</ul>
				</div>
			)}
			<div className="output flex flex-col self-center">
				{/* Output Section */}
				{isStarted && (
					<div>
						<h1 className="outputName text-primary-focus text-3xl font-bold text-center"></h1>
						<h2 className="outputName text-primary-focus text-2xl font-bold text-center"></h2>
						<div className="photosContainer flex flex-row gap-4 justify-start items-center"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FamousDish;
