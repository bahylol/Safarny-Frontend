import * as React from "react";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import ChipsArray from "./ChipsArray";
import {
  myMap,
  addBookmarkToMap,
  MapComponent,
} from "../../Components/Map.jsx";
import Animated_preloading from "../../assets/Images/Animated_preloading.gif";
import "swiper/css";
import "swiper/css/effect-cards";
import "./Stepper.css";

const Form = (cityNames) => {
  cityNames = cityNames.cityNames;
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [allCoordinateds, setAllCoordinateds] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedRange, setSelectedRange] = useState(8);
  const [otherChipInput, setOtherChipInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [Started, setStarted] = useState(false);
  const [curtripDeescription, setCurtripDeescription] = useState("");
  const [image, setImage] = useState([[]]);
  const [lol200, setLol200] = useState([]);
  const [budget, setBudget] = useState(500);
  const [allCoordinateds2, setAllCoordinateds2] = useState([]);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Swimming" },
    { key: 1, label: "History" },
    { key: 2, label: "Outdoors" },
    { key: 3, label: "Great Food" },
  ]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const activitesList = [
    { key: 0, label: "Swimming" },
    { key: 1, label: "History" },
    { key: 2, label: "Outdoors" },
    { key: 3, label: "Great Food" },
    { key: 4, label: "Adventure" },
    { key: 5, label: "Attractions" },
    { key: 6, label: "Theatre" },
    { key: 7, label: "Hidden Gems" },
    { key: 8, label: "Night Life" },
    { key: 9, label: "Day Life" },
  ];
  const order = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
  ];

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setCityName(inputText);
    const filteredSuggestions = cityNames
      .filter((city) => city.toLowerCase().includes(inputText.toLowerCase()))
      .slice(0, 50);

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (selectedCountry) => {
    setCityName(selectedCountry);
    setSuggestions([]);
    nextPrev(1);
  };

  const formatTheString = (sections) => {
    let newSections = "";
    let words = sections.split(" ");
    let cnt = 0,
      f = 0;
    for (let i = 0; i < words.length; i++) {
      cnt++;

      if (words[i].includes("\n\n")) {
        words[i] = words[i].replace("\n\n", " ");
        cnt = 0;
        f = 1;
      }

      if (cnt > 10) {
        cnt = 0;
        f = 1;
      }
      newSections += words[i];
      newSections += " ";
      if (f) {
        newSections += "\n";
        f = 0;
      }
    }

    return newSections;
  };

  const nextPrev = (step) => {
    let totalSteps = step + currentStep;

    if (totalSteps === 5) {
      myMap.visble = true;
    }
    setCurrentStep(totalSteps);
  };

  const ButtonSub = async () => {
    setIsLoading(true);

    let dayCount = 1;
    let zoomNum = 12;
    nextPrev(1);
    let Activites = chipData.map((chip) => chip.label);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/planTrip`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: selectedRange || 3,
          Destination: cityName || "Alex,Egypt",
          Month: selectedMonth || "March",
          activites: Activites,
          budget: budget || 200,
        }),
        credentials: "include",
      }
    );
    const reader = response.body.getReader();
    let responseData = "";
    let cnt = 0;
    while (true) {
      console.log("Strarting \n\n\n\n");
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      console.log("HERRRE \n\n\n\n");
      // Handle the streaming data here
      responseData = new TextDecoder().decode(value);
      try {
        responseData = JSON.parse(responseData);
      } catch (err) {
        console.log(err);
        let outputerro = document.querySelector(".output");
        let nameserror = document.createElement("p");
        nameserror.append(document.createElement("br"));
        nameserror.append(
          document.createTextNode(
            "An error occurred while establishing the connection. Please kindly attempt the operation again."
          )
        );
        outputerro.append(nameserror);
        setIsDone(false);
        continue;
      }

      const data = responseData;
      let dayDescription = `For the ${order[cnt++]} day\n\n`;
      let output = document.querySelector(".output");
      output.className = "output flex flex-col gap-4 self-center";
      let dayNumber = document.createElement("h1");
      dayNumber.className =
        "outputName text-primary-focus text-3xl font-bold text-center text-5xl";
      dayNumber.append(document.createTextNode("Day " + dayCount));
      output.append(dayNumber);

      // for one day
      for (let i = 0; i < data.length; i++) {
        let cost = document.createElement("h2");
        cost.className = "outputName text-primary-focus font-bold";
        let names = document.createElement("h2");
        names.className =
          "outputName text-primary-focus text-2xl font-bold text-center italic";
        let descriptions = document.createElement("p");
        descriptions.className =
          "DeescriptionName text-base-content text-gray-600 text-lg";
        dayDescription += ` ${data[0][i]}`;
        dayDescription += "\n\n";
        dayDescription += ` ${data[1][i]}`;
        dayDescription += "\n\n Cost: ";
        dayDescription += ` ${data[4][i]}`;

        let linkToPlace = document.createElement("button");

        let photosContainer = document.createElement("photos-container");
        let coordinates = {
          lat: 0,
          lng: 0,
        };
        if (data[2][i] !== undefined && data[2][i] !== null) {
          coordinates = {
            lat: parseFloat(data[2][i].lat),
            lng: parseFloat(data[2][i].lng),
          };
        }

        console.log("coord " + coordinates.lat + " " + coordinates.lng);
        photosContainer.className =
          "photosContainer flex flex-row gap-4 justify-start ";

        if (i % 2 === 0) {
          linkToPlace.className =
            "linkToPlace btn btn-outline btn-accent justify-start self-start w-fit h-fit";
        } else {
          linkToPlace.className =
            "linkToPlace btn btn-outline btn-accent justify-end self-end w-fit h-fit";
        }
        // for one activite
        if (
          data[0][i] === null ||
          data[0][i] === "" ||
          data[0][i] === undefined
        ) {
          continue;
        }
        names.append(document.createTextNode(data[0][i])); //name   visting pyramids title
        descriptions.append(document.createTextNode(data[1][i])); // description for the active description
        cost.append(document.createTextNode("Cost: " + data[4][i] || "13"));
        addBookmarkToMap(myMap, coordinates);

        myMap.setCenter(coordinates);
        myMap.visibility = true;
        myMap.visibility = "visible";
        let temp5 = allCoordinateds;
        temp5.push(data[2][i]);
        setAllCoordinateds(temp5);
        setAllCoordinateds2(coordinates);
        const photoArray = data[3][i];
        if (photoArray)
          for (const url of photoArray) {
            const imgElement = document.createElement("img");
            imgElement.src = url;
            imgElement.style.maxHeight = "300px";
            imgElement.style.maxWidth = "300px";
            const temp = image;
            temp.push(url);
            setImage(temp);
            photosContainer.appendChild(imgElement);
          }
        output.append(names);
        output.append(descriptions);
        linkToPlace.append(document.createTextNode("Link to finalPlace"));
        output.append(photosContainer);
        output.append(cost);
        output.append(linkToPlace);

        let endOfTheDay = document.createElement("hr");
        endOfTheDay.className = "endOfTheDay";
        output.append(endOfTheDay);
      }
      if (data[5]) {
        dayDescription += "\n\n Transportation and Staying cost:";
        dayDescription += ` ${data[5][0]}`;
        if (data[5]) {
          let TransportationAndStayingcost = document.createElement("h2");
          TransportationAndStayingcost.className =
            "outputName text-primary-focus text-2xl font-bold";
          TransportationAndStayingcost.append(
            document.createTextNode(
              "Transportation and Staying cost: " + 50 * selectedRange
            )
          );
          output.append(TransportationAndStayingcost);
        }
      }
      dayCount++;
      let temp2 = curtripDeescription || "";
      temp2 += dayDescription + " End of the day\n";
      setCurtripDeescription(temp2);
      console.log("temp " + temp2);
      console.log("temp2 " + curtripDeescription);
      myMap.setZoom(Math.max(zoomNum, 9));
      zoomNum--;
      let ff = lol200;
      ff.push(dayDescription);
      setLol200(ff);
      // hide elemetn with id loading
      let loading = document.getElementById("loading");
      if (loading) loading.style.visibility = "hidden";
      setIsLoading(false);
    }
    const mapDiv = document.getElementById("map");
    mapDiv.style.visibility = "visible";
    setIsDone(true);
    setStarted(true);
    // wait one sec then add the center
    setTimeout(() => {
      myMap.setCenter(allCoordinateds2);
    }, 1000);
    console.log("allCoordinateds2 " + allCoordinateds2.lat);
  };

  const hanldeDownloadButton = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Create a new PDF document

    // Add pages for each section of your text
    console.log("first " + lol200);
    let sections = lol200;
    console.log("sections " + sections);

    for (let i = 0; i < sections.length; i++) {
      const page = pdfDoc.addPage();
      const fontSize = 15;
      const { height } = page.getSize();
      page.drawText(formatTheString(sections[i]), {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });
    }
    const pdfBytes = await pdfDoc.save();

    // Create a download link for the PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const formattedTime = `1`;
    console.log(formattedTime);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trip_description_at${formattedTime}.pdf`; // Specify the desired file name
    a.click();

    // Release the URL object
    URL.revokeObjectURL(url);
  };
  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleAddChipFromInput = (newChipInput) => {
    if (newChipInput !== "") {
      const labelExists = chipData.some((chip) => chip.label === newChipInput);

      if (!labelExists) {
        const newChip = { key: Date.now(), label: newChipInput };
        setChipData((prevChips) => [...prevChips, newChip]);
      }
    }
  };

  return (
    <>
      <form id="signUpForm" className="p-12 my-8 custom-form " action="#!">
        {currentStep === 1 && (
          <>
            <div class="container mx-auto min-h-screen flex flex-col justify-start items-center">
              <h1 className="mt-0 mb-4 smaller-text font-medium text-primary-focus">
                Where to?
              </h1>
              <input
                type="text"
                value={cityName}
                onChange={handleInputChange}
                placeholder="Type a City name"
                className="autocomplete-input mb-4"
              />
              <ul class=" px-4 py-2 w-full">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item text-center hover:bg-blue-200 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className="step">
              <h1 className="mb-4 mt-0 smaller-text font-medium text-primary-focus">
                Choose the number of days & the month
              </h1>
              <input
                type="range"
                id="range"
                name="range"
                min={1}
                max={7}
                className="range"
                step={1}
                value={selectedRange}
                onChange={handleRangeChange}
              />
              <div className="flex flex-wrap gap-4 mt-10 justify-center">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className={`box ${
                      selectedMonth === month ? "bg-blue-200" : "bg-white"
                    } hover:bg-blue-200 border transition w-60 duration-300 ease-in-out rounded-lg p-4 mb-5 cursor-pointer text-center`}
                    onClick={() => setSelectedMonth(month)} // Pass the month as an argument
                  >
                    <h2 className="text-2xl  mb-0 text-black font-semibold ">
                      {month}
                    </h2>
                  </div>
                ))}
              </div>
              <h4 class="mb-10 mt-0 text-xl font-medium leading-tight text-base-content flex flex-col justify-center items-center">
                Your {selectedRange} day trip starts in {selectedMonth}
              </h4>
            </div>
          </>
        )}
        {currentStep === 3 && (
          <div className="step">
            <h1 className="mb-4 mt-0 smaller-text font-medium text-primary-focus">
              Choose your budget range
            </h1>

            <div className="container flex flex-wrap gap-10 mt-10 mb-10 justify-center text-center items-center">
              <div
                className={`box bg-white border transition duration-300 ease-in-out rounded-lg w-96 p-8 cursor-pointer ${
                  budget === 50 ? "bg-blue-200" : ""
                }`}
                onClick={() => setBudget(50)}
              >
                <h2 className="text-4xl mb-0 text-black font-semibold">
                  Economy
                </h2>
                <div className="my-5">
                  <span className="text-2xl font-light text-black">
                    $24 - $50
                  </span>
                </div>
              </div>
              <div
                className={`box bg-white border transition duration-300 ease-in-out rounded-lg w-96 p-8 cursor-pointer ${
                  budget === 200 ? "bg-blue-200" : ""
                }`}
                onClick={() => setBudget(200)}
              >
                <h2 className="text-4xl mb-0 text-black font-semibold">
                  Mid-Range
                </h2>
                <div className="my-5">
                  <span className="text-2xl font-light text-black">
                    $100 - $200
                  </span>
                </div>
              </div>
              <div
                className={`box bg-white border transition duration-300 ease-in-out rounded-lg w-96 p-8 cursor-pointer ${
                  budget === 500 ? "bg-blue-200" : ""
                }`}
                onClick={() => setBudget(500)}
              >
                <h2 className="text-4xl mb-0 text-black font-semibold">
                  Premium
                </h2>
                <div className="my-5">
                  <span className="text-2xl font-light text-black">
                    $350 - $500
                  </span>
                </div>
              </div>
              <div
                className={`box bg-white border transition duration-300 ease-in-out rounded-lg w-96 p-8 cursor-pointer ${
                  budget === 50000 ? "bg-blue-200" : ""
                }`}
                onClick={() => setBudget(50000)}
              >
                <h2 className="text-4xl mb-0 text-black font-semibold">
                  Luxury
                </h2>
                <div className="my-5">
                  <span className="text-2xl font-light text-black">
                    $24000 - $50000
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="step">
            <h1 className="mb-10 mt-0 smaller-text font-medium text-primary-focus">
              What activites are you looking for?
            </h1>

            <ChipsArray chipData={chipData} handleDelete={handleDelete} />
            <div className="flex flex-wrap justify-center items-start gap-4 mb-8  w-[35rem] mx-auto">
              {activitesList.map((activity) => (
                <button
                  key={activity.label}
                  post={activity}
                  className="btn btn-outline bg-base-100 text-base-content"
                  onClick={() => handleAddChipFromInput(activity.label)}
                >
                  {activity.label}
                </button>
              ))}
            </div>
            <div className="flex flex-row justify-center items-center mb-10">
              <input
                type="text"
                placeholder="Other . . ."
                className="input input-bordered w-full max-w-xl"
                onChange={(event) => setOtherChipInput(event.target.value)}
              />
              <button
                onClick={() => {
                  handleAddChipFromInput(otherChipInput);
                }}
                className="btn btn-outline btn-primary ml-2"
              >
                Add
              </button>
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div className="output">
            {isLoading && !Started ? (
              <img
                id="loading"
                src={Animated_preloading}
                alt="My GIF"
                style={{ width: "100%", maxWidth: "100%" }}
              />
            ) : null}
          </div>
        )}
        <div className="form-footer flex gap-3 flex-row justify-end">
          {currentStep > 1 && !Started ? (
            <button
              type="button"
              id="prevBtn"
              className="btn btn-outline rounded-6"
              onClick={() => nextPrev(-1)}
            >
              Back
            </button>
          ) : null}
          {currentStep < 4 && !isLoading && (
            <button
              type="button"
              id="nextBtn"
              className="btn btn-primary rounded-6"
              onClick={() => nextPrev(1)}
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              type="submit"
              className="btn btn-primary rounded-6"
              onClick={ButtonSub}
            >
              Finish Plan
            </button>
          )}
        </div>
      </form>
      <MapComponent />

      <link
        rel="stylesheet"
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
        rel="stylesheet"
      />
      {isDone && (
        <>
          <button className="btn btn-primary" onClick={hanldeDownloadButton}>
            Download PDF
          </button>
        </>
      )}
    </>
  );
};

export default Form;
