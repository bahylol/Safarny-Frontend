import React, { Component } from 'react';
import { country_list } from '../country_list';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';

class CurrencyConverter extends Component {
	constructor() {
		super();
		this.state = {
			fromCurrency: 'USD',
			toCurrency: 'NPR',
			amount: 1,
			exchangeRate: 0,
			exchangeRateTxt: 'Converting...',
		};
	}

	componentDidMount() {
		this.getExchangeRate();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.fromCurrency !== this.state.fromCurrency) {
			this.loadFlag('from');
		}
		if (prevState.toCurrency !== this.state.toCurrency) {
			this.loadFlag('to');
		}
	}

	loadFlag(field) {
		const code = field === 'from' ? this.state.fromCurrency : this.state.toCurrency;
		const imgTag = document.querySelector(`.${field} img`);
		if (imgTag && country_list[code]) {
			imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
		}
	}

	getExchangeRate = () => {
		const { fromCurrency, toCurrency, amount } = this.state;

		if (amount === '' || amount === '0') {
			this.setState({ amount: '1' });
		}

		this.setState({ exchangeRateTxt: 'Converting...' });

		/* Replace 'YOUR-API-KEY' with your own API Key by following steps written in README.md */
		/* let url = `https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${fromCurrency}`; */

		/* Following is an example of My API Key */
		let url = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_RATE_API}/latest/${fromCurrency}`;

		fetch(url)
			.then((response) => response.json())
			.then((result) => {
				let exchangeRate = result.conversion_rates[toCurrency];
				let totalExRate = (amount * exchangeRate).toFixed(2);
				this.setState({
					exchangeRateTxt: `${amount} ${fromCurrency} = ${totalExRate} ${toCurrency}`,
					exchangeRate: totalExRate,
				});
			})
			.catch(() => {
				this.setState({ exchangeRateTxt: 'Something went wrong' });
			});
	};

	handleInputChange = (e) => {
		this.setState({ amount: e.target.value });
	};

	handleCurrencyChange = (e, field) => {
		this.setState({ [field]: e.target.value }, () => {
			this.getExchangeRate();
		});
	};

	handleSwapCurrencies = () => {
		const { fromCurrency, toCurrency } = this.state;
		this.setState({ fromCurrency: toCurrency, toCurrency: fromCurrency }, () => {
			this.getExchangeRate();
		});
	};

	render() {
		const { fromCurrency, toCurrency,  exchangeRateTxt } = this.state;
		return (
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Currency Converter</h1>
						<MDBCard className="bg-neutral-focus p-5">
							<MDBCardHeader>- Safarny</MDBCardHeader>
							<MDBCardBody>
								<MDBTypography blockquote className="mb-0">
									<p>
										Our automatic currency converter will immediately convert your
										selection with <span className="text-green-700 font-bold">ease</span>,{' '}
										<span className="text-green-700 font-bold">speed</span> and{' '}
										<span className="text-green-700 font-bold">accuracy!</span>
										<br />
									</p>
									<div className="divider"></div>
									<footer className="blockquote-footer">
										Now you can manage and plan all your budget expences on the spot!
									</footer>
								</MDBTypography>
							</MDBCardBody>
						</MDBCard>
					</div>
					{/* //////////////////////////////////////////////// */}

					<div className="flex flex-col justify-center items-center text-white">
						{/* Add purple background to the whole page */}
						<div className="bg-neutral-focus rounded-md p-12 flex flex-col justify-center items-center">
							{/* Increased padding to make the box larger */}
							<div
								className="tooltip tooltip-bottom"
								data-tip="Simply select the currency you want to convert and convert to..."
							>
								<h1 class="mb-2 mt-0 text-md font-bold leading-tight text-gray-400 mb-6">
									<span className="loading loading-dots loading-xs"></span>
									Tooltip
									<span className="loading loading-dots loading-xs"></span>
								</h1>
							</div>
							<div className="flex space-x-4 mb-4 items-center">
								<div className="flex flex-col">
									{/* From (1st list) */}
									<label className="text-secondary mb-2">From</label>
									<select
										className=" text-neutral-content px-4 py-2 rounded-md border border-gray-300"
										value={fromCurrency}
										onChange={(e) => this.handleCurrencyChange(e, 'fromCurrency')}
									>
										{Object.keys(country_list).map((currency_code) => (
											<option key={currency_code} value={currency_code}>
												{currency_code}
											</option>
										))}
									</select>
								</div>
								<div className="flex items-center">
									{/* Swap button */}
									<div
										className="icon text-error cursor-pointer"
										onClick={this.handleSwapCurrencies}
									>
										<br />
										<MultipleStopIcon />
									</div>
								</div>
								<div className="flex flex-col">
									{/* To (2nd list) */}
									<label className="text-secondary mb-2">To</label>
									<select
										className="text-neutral-content px-4 py-2 rounded-md border border-gray-300"
										value={toCurrency}
										onChange={(e) => this.handleCurrencyChange(e, 'toCurrency')}
									>
										{Object.keys(country_list).map((currency_code) => (
											<option key={currency_code} value={currency_code}>
												{currency_code}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="flex space-x-12 items-center">
								<img
									className="from"
									src={`https://flagcdn.com/48x36/${country_list[
										fromCurrency
									].toLowerCase()}.png`}
									alt={fromCurrency}
								/>
								<img
									className="to"
									src={`https://flagcdn.com/48x36/${country_list[
										toCurrency
									].toLowerCase()}.png`}
									alt={toCurrency}
								/>
							</div>
							<div className="mt-4 text-green-500">
								{/* The result in blue font color */}
								{exchangeRateTxt}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CurrencyConverter;
