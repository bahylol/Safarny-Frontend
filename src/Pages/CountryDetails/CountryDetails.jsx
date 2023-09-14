import React from "react";
import { Link } from "react-router-dom";
import moenyIcon from "../../assets/Images/moenyIcon.png";
import foodIcon from "../../assets/Images/foodIcon.png";

const CountryDetails = () => {
  return (
    <div className="step">
      <h1 className="mb-4 mt-0 smaller-text font-medium text-primary-focus flex justify-center items-center">
        Get more Details
      </h1>

      <div className="container flex flex-wrap gap-10 mt-10 mb-10 justify-center text-center items-center">
        <Link to="/CurrencyConverter">
          <div
            className={`box bg-white border transition duration-300 ease-in-out rounded-lg w-96 p-8 cursor-pointer hover:bg-blue-200 transform hover:scale-105`}
          >
            <img src={moenyIcon} alt="Currency Exchange" className="w-200 h-200" />
            <h2 className="text-4xl mb-0 text-black font-semibold">
              Currency Exchange
            </h2>
          </div>
        </Link>
        <Link to="/FamousDish">
          <div
            className={`box bg-white border transition duration-300 ease-in-out rounded-lg w-96 p-8 cursor-pointer hover:bg-blue-200 transform hover:scale-105`}
          >
            <img src={foodIcon} alt="Famous Dishes" className="w-200 h-200" />
            <h2 className="text-4xl mb-0 text-black font-semibold">
              Famous Dishes
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CountryDetails;
