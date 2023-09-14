import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import ProgressBar from './Components/ProgressBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Navbar />
		<ProgressBar />
		<App />
		<Footer />
	</React.StrictMode>
);
