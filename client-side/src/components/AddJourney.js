import React, { useState } from 'react';
import '../styles/AddJourney.css'; // Create a CSS file for the styles

const AddJourney = () => {
  const [journeyDetails, setJourneyDetails] = useState({
    busId: '',
    routeId: '',
    departureTime: '',
    arrivalTime: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJourneyDetails({ ...journeyDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can submit the journeyDetails to your server or perform other actions.
    // You can add the submission logic as needed.
    console.log('Submitted Journey Details:', journeyDetails);
  };

  return (
    <div className="add-journey-container">
      <h1 className="add-journey-title">Add Journey Details</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Bus ID:
          {/* Ideally should be a dropdown*/}
          <input
            type="text"
            name="busId"
            value={journeyDetails.busId}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <label className="input-label">
          Route ID:
          <input
            type="text"
            name="routeId"
            value={journeyDetails.routeId}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <label className="input-label">
          Departure Time:
          <input
            type="datetime-local"
            name="departureTime"
            value={journeyDetails.departureTime}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <label className="input-label">
          Arrival Time:
          <input
            type="datetime-local"
            name="arrivalTime"
            value={journeyDetails.arrivalTime}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJourney;
