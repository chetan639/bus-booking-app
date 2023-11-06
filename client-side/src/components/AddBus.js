import React, { useState } from 'react';
import '../styles/AddBus.css';

const AddBus = () => {
  const [busDetails, setBusDetails] = useState({
    busNumber: '',
    busType: 'sleeper',
    seatingCapacity: '',
    amenities: [],
    rating: 0,
    isAC: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'amenities') {
      if (newValue) {
        setBusDetails({
          ...busDetails,
          amenities: [...busDetails.amenities, value],
        });
      } else {
        setBusDetails({
          ...busDetails,
          amenities: busDetails.amenities.filter((item) => item !== value),
        });
      }
    } else {
      setBusDetails({ ...busDetails, [name]: newValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can submit the busDetails to your server or perform other actions.
    // You can add the submission logic as needed.
    console.log('Submitted Bus Details:', busDetails);
  };

  return (
    <div className="add-bus-container">
      <h1 className="add-bus-title">Add Bus Details</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Bus Number:
          <input
            type="text"
            name="busNumber"
            value={busDetails.busNumber}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <label className="input-label">
          Bus Type:
          <select name="busType" value={busDetails.busType} onChange={handleInputChange} className="input-field">
            <option value="sleeper">Sleeper</option>
            <option value="semiSleeper">Semi-Sleeper</option>
            <option value="seater">Seater</option>
          </select>
        </label>
        <label className="input-label">
          Seating Capacity:
          <input
            type="number"
            name="seatingCapacity"
            value={busDetails.seatingCapacity}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <label className="input-label">
          Amenities:
          <div className="amenities-checkboxes">
            <label>
              <input
                type="checkbox"
                name="amenities"
                value="Wi-Fi"
                checked={busDetails.amenities.includes('Wi-Fi')}
                onChange={handleInputChange}
              />
              Wi-Fi
            </label>
            <label>
              <input
                type="checkbox"
                name="amenities"
                value="AC"
                checked={busDetails.amenities.includes('AC')}
                onChange={handleInputChange}
              />
              AC
            </label>
            <label>
              <input
                type="checkbox"
                name="amenities"
                value="Charging Ports"
                checked={busDetails.amenities.includes('Charging Ports')}
                onChange={handleInputChange}
              />
              Charging Ports
            </label>
          </div>
        </label>
        <label className="input-label">
          Rating:
          <input
            type="number"
            name="rating"
            value={busDetails.rating}
            onChange={handleInputChange}
            className="input-field"
          />
        </label>
        <label className="input-label">
          AC:
          <input
            type="checkbox"
            name="isAC"
            checked={busDetails.isAC}
            onChange={handleInputChange}
            className="checkbox-field"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBus;
