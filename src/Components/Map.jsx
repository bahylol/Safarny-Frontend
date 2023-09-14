import React from "react";
import {
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
let myMap;
const addBookmarkToMap = (map, position) => {
  myMap = map;
console.log("bookmark added");
 map.setCenter(position);
  new window.google.maps.Marker({
    position,
    map,
  });
};


 const MapComponent = () => {
  // add bookmark to the map
  const bookmarkPosition = {
    lat:   51.50319972859491, // Latitude
    lng: -0.11954066051600232, // Longitude
  };

  const handleMapLoad = (map) => {
    myMap = map;
    // addBookmarkToMap(map, bookmarkPosition);
  };

  const containerStyle = {
    width: "50%",
    height: "400px",
  };
  const center = {
    lat:   51.50319972859491, // Latitude
    lng: -0.11954066051600232, // Longitude
  };
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
        visibility: "hidden", // Set the visibility to "hidden"
      }}
    >
      <LoadScript googleMapsApiKey={process.env.REACT_APP_Google_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={bookmarkPosition}
          zoom={10}
          onLoad={handleMapLoad}
          options={{
            styles: [
              {
                featureType: "administrative.locality",
                stylers: [
                  {
                    visibility: "on",
                  },
                  {
                    weight: 1.5,
                  },
                ],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#736868",
                  },
                ],
              },
              {
                featureType: "administrative.province",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "landscape",
                stylers: [
                  {
                    color: "#fef8f6",
                  },
                  {
                    visibility: "simplified",
                  },
                ],
              },
              {
                featureType: "poi",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "road",
                stylers: [
                  {
                    visibility: "on",
                  },
                ],
              },
              {
                featureType: "transit",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "water",
                stylers: [
                  {
                    color: "#86c5e6",
                  },
                ],
              },
            ],
          }}
        />
      </LoadScript>
    </div>
  );
};
export { MapComponent, addBookmarkToMap, myMap };