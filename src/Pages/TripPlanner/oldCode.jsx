import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './Stepper.css';
import { EffectCards } from 'swiper/modules';
import ChipsArray from './ChipsArray';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Form = () => {
	const [chipData, setChipData] = React.useState([
		{ key: 0, label: 'Swimming' },
		{ key: 1, label: 'History' },
		{ key: 2, label: 'Outdoors' },
		{ key: 4, label: 'Great Food' },
	]);
	const activitesList = [
		{ key: 7, label: 'Adventure' },
		{ key: 6, label: 'Attractions' },
		{ key: 5, label: 'Theatre' },
		{ key: 0, label: 'Swimming' },
		{ key: 1, label: 'History' },
		{ key: 2, label: 'Outdoors' },
		{ key: 4, label: 'Great Food' },
	];

	const [currentStep, setCurrentStep] = useState(1);
	const [selectedMonth, setSelectedMonth] = useState('January');
	const [selectedRange, setSelectedRange] = useState(1);
	const [newChipInput, setNewChipInput] = useState('');
	const newChipInputRef = useRef('');

	const nextPrev = (step) => {
		setCurrentStep(currentStep + step);
	};

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const handleSlideChange = (swiper) => {
		const activeSlideIndex = swiper.realIndex;
		setSelectedMonth(monthNames[activeSlideIndex]);
	};
	const handleRangeChange = (event) => {
		setSelectedRange(event.target.value);
	};

	const handleDelete = (chipToDelete) => () => {
		setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
	};

	const handleAddChipFromInput = () => {
		if (newChipInput !== '') {
			const labelExists = chipData.some((chip) => chip.label === newChipInput);

			if (!labelExists) {
				const newChip = { key: Date.now(), label: newChipInput };
				setChipData((prevChips) => [...prevChips, newChip]);
			}
		}
	};

	return (
		<>
			<form
				id="signUpForm"
				className="p-12 shadow-md rounded-2xl bg-base-300 border-solid border-gray-100 my-8 custom-form"
				action="#!"
			>
				{currentStep === 1 && (
					<div className="step">
						<h1 className="mb-4 mt-0 smaller-text font-medium text-primary-focus">
							Where to?
						</h1>
						<div className="mb-6 mx-3">
							<input
								type="text"
								placeholder="City/Town"
								className="input input-bordered w-full w-full"
							/>
						</div>
					</div>
				)}
				{currentStep === 2 && (
					<div className="step">
						<h1 className="mb-4 mt-0 smaller-text font-medium text-primary-focus">
							When do you want to go?
						</h1>

						<h5 class="mb-10 mt-0 text-md font-medium leading-tight text-neutral-content">
							Choose the number of days & the month
						</h5>
						<input
							type="range"
							min={1}
							max="7"
							className="range"
							step="1"
							value={selectedRange}
							onChange={handleRangeChange}
						/>
						<div className="w-full mb-10 flex justify-between text-xs px-2">
							<span>|</span>
							<span>|</span>
							<span>|</span>
							<span>|</span>
							<span>|</span>
							<span>|</span>
							<span>|</span>
						</div>
						<Swiper
							effect={'cards'}
							grabCursor={true}
							modules={[EffectCards]}
							className="mySwiper mb-5"
							onSlideChange={handleSlideChange}
						>
							{monthNames.map((monthName, index) => (
								<SwiperSlide
									key={index}
									className={`bg-base-content ${
										selectedMonth === monthName ? 'selected' : ''
									}`}
								>
									<div className="card-number">{index + 1}</div>
									<div className="month-name">{monthName}</div>
								</SwiperSlide>
							))}
						</Swiper>
						<h4 class="mb-10 mt-0 text-xl font-medium leading-tight text-base-content flex flex-col justify-center items-center">
							Your {selectedRange} day trip starts in {selectedMonth}
						</h4>
					</div>
				)}
				{currentStep === 3 && (
					<div className="step">
						<h1 className="mb-4 mt-0 smaller-text font-medium text-primary-focus">
							What activites are you looking for?
						</h1>
						<h5 class="mb-10 mt-0 text-md font-medium leading-tight text-neutral-content">
							You can choose multiple activites
						</h5>
						<ChipsArray chipData={chipData} handleDelete={handleDelete} />
						<div className="flex flex-row justify-center items-center mb-8">
							<Autocomplete
								onChange={(event, newValue) => {
									setNewChipInput(newValue);
								}}
								id="free-solo-demo"
								freeSolo
								options={activitesList.map((activity) => activity.label)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Other . . . (press 'enter' to add)"
										style={{ minWidth: '250px' }}
										inputRef={newChipInputRef}
										sx={{
											backgroundColor: 'var(--TripsCard2TextColor)', // Corrected CSS variable usage
											color: 'grey',
										}}
									/>
								)}
							/>

							<button
								onClick={() => {
									handleAddChipFromInput();
								}}
								className="btn btn-outline btn-primary ml-2 hidden"
							>
								Add
							</button>
						</div>
					</div>
				)}
				<div className="form-footer flex gap-3">
					{currentStep > 1 && (
						<button
							type="button"
							id="prevBtn"
							className="btn btn-outline flex-1"
							onClick={() => nextPrev(-1)}
						>
							Back
						</button>
					)}
					{currentStep < 3 && (
						<button
							type="button"
							id="nextBtn"
							className="btn btn-primary flex-1"
							onClick={() => nextPrev(1)}
						>
							Next
						</button>
					)}
					{currentStep === 3 && (
						<button type="submit" className="btn btn-primary flex-1">
							Finish Plan
						</button>
					)}
				</div>
			</form>
			<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" />
			<link
				href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
				rel="stylesheet"
			/>
		</>
	);
};

export default Form;
