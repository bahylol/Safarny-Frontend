import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function TripDetailsPage() {
  const { tripId } = useParams(); // Get the tripId from URL params
  const [tripData, setTripData] = useState(null);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const handleFetchData = async () => {
    try {
      const response = await fetch(`/trip/${tripId}`); // Use the tripId parameter in the URL

      if (response.status === 200) {
        const data = await response.json();
        setTripData(data);
        console.log(tripData);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatTheString = (day) => {
    let formattedString = "";
    for (let i = 0; i < day.name.length; i++) {
      formattedString += ` ${day.name[i]}\n\n`;
      //   formattedString += ` ${day.description[i]}\n\n`;
      const newDes = day.description[i].split(" ");
      let cur_words = newDes[0] + " ";
      console.log(newDes);
      console.log("lol200");
      for (let j = 1; j < newDes.length; j++) {
        if (j % 15 === 0) {
          cur_words += "\n";
          formattedString += cur_words;
          cur_words = "";
        }
        cur_words += newDes[j] + " ";
      }
      formattedString += cur_words + "\n";

      formattedString += `Cost : ${day.cost[i]}\n`;
    }
    return formattedString;
  };
  const handleSaveButton = async () => {
        setSaveDisabled(true); // Disable the save button

    setSaveDisabled(true); // Disable the save button
    try {
      const requestBody = {
        trip_id: tripId,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/saveTrip`,
        {
          method: "POST", // or 'GET' if your API endpoint uses GET
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify(requestBody),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
      } else {
        console.error("Failed to save trip:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const hanldeDownloadButton = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Create a new PDF document

    // Add pages for each section of your text
    console.log("first " + tripData);
    let sections = tripData;
    console.log("sections " + sections.days[0]);
    console.log("sections " + sections.days.length);
    for (let i = 0; i < sections.days.length; i++) {
      const page = pdfDoc.addPage();
      const fontSize = 15;
      const { height } = page.getSize();
      let text = formatTheString(sections.days[i]);
      text = `for day  ${i + 1} \n` + text + `\n `;
      console.log(text);
      page.drawText(text, {
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
  useEffect(() => {
    if (tripId) {
      handleFetchData();
    }
  }, [tripId]);
  return (
    <form id="signUpForm" className="p-12 my-8 custom-form " action="#!">
      <div className="container mx-auto mt-5">
      {tripData && (
  <div>
    {tripData.days.map((day, dayIndex) => (
      <div key={dayIndex} className="my-6">
        <h2 className="text-primary-focus text-3xl font-bold text-center text-5xl">
          Day {dayIndex + 1}
        </h2>
        {day.name.map((placeName, placeIndex) => (
          <div key={placeIndex} className="mb-4">
            <h3 className="text-2xl font-bold text-center italic text-primary-focus">
              {placeName}
            </h3>
            <p className="text-gray-400 text-lg text-base-content">
              {day.description[placeIndex]}
            </p>
          
            <p className="text-lg text-gray-600 mt-2">
              Cost: {day.cost[placeIndex]}
            </p>
          </div>
        ))}
          <div className="flex flex-wrap gap-4 justify-start mt-2">
              {day.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`Image ${imageIndex + 1}`}
                  className="max-w-[300px] max-h-[300px]"
                />
              ))}
            </div>
        <hr className="endOfTheDay" />
      </div>
    ))}
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={hanldeDownloadButton}
    >
      Download PDF
    </button>
    <button
      className={`bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 ${
        saveDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleSaveButton}
      disabled={saveDisabled}
    >
      Save the Trip
    </button>
  </div>
)}

      </div>
    </form>
  );
}

export default TripDetailsPage;
