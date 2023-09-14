import React, { Component } from 'react';
import { country_list } from '../country_list';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

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
		const { fromCurrency, toCurrency, amount, exchangeRateTxt } = this.state;
		return (
			<div className="min-h-screen flex flex-col justify-center items-center text-white">
				{/* Add purple background to the whole page */}
				<div className="bg-neutral-focus rounded-md p-12 flex flex-col justify-center items-center">
					{/* Increased padding to make the box larger */}
					<h1 className="text-info text-4xl font-semibold mb-4">Currency Converter</h1>
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
								className="icon text-blue-500 cursor-pointer"
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
							src={`https://flagcdn.com/48x36/${country_list[toCurrency].toLowerCase()}.png`}
							alt={toCurrency}
						/>
					</div>
					<div className="mt-4 text-info">
						{/* The result in blue font color */}
						{exchangeRateTxt}
					</div>
				</div>
			</div>
		);
	}
}

export default CurrencyConverter;
