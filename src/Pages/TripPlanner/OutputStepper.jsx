import React from 'react';

const OutputStepper = ({ dataChunks, currentChunkIndex, onNext, onPrev }) => {
    const currentChunk = dataChunks[currentChunkIndex] || [];

    return (
        <div className="output-stepper">
            {currentChunk.map((dayData, index) => (
                <div key={index} className="output-day">
                    <h3>Day {index + 1}</h3>
                    <p>Name: {dayData.name}</p>
                    <p>Description: {dayData.description}</p>
                    {/* Display other relevant data for this day */}
                </div>
            ))}

            <div className="navigation-buttons">
                <button onClick={onPrev} disabled={currentChunkIndex === 0}>
                    Previous
                </button>
                <button onClick={onNext} disabled={currentChunkIndex === dataChunks.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default OutputStepper;
