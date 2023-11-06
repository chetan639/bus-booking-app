import React, { useEffect } from "react";
import {useLocation} from 'react-router-dom';
import '../styles/JourneyList.css';

const JourneyList = () => {
    const buses = [
        {
            busNumber: 1,
            busType: 'sleeper',
            seatingCapacity: 40,
            busAmenities: ['Wi-Fi', 'AC', 'Charging Ports'],
            rating: 4,
            isAC: true,
            source: 'City A',
            destination: 'City B',
        },
        {
            busNumber: 2,
            busType: 'semiSleeper',
            seatingCapacity: 32,
            busAmenities: ['AC', 'Charging Ports'],
            rating: 3,
            isAC: true,
            source: 'City C',
            destination: 'City D',
        },
        // Add more bus objects as needed
    ];

    useEffect(()=>{
        //api call to journeyDetails in elastic.
    })

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    return (
        <div className="bus-list">
            <h1>Available Buses from {source} to {destination} on {date}</h1>
            <ul className="bus-items">
                {buses.map((bus, index) => (
                    <li key={index} className="bus-item">
                        <div className="bus-details">
                            <h2>Bus Number: {bus.busNumber}</h2>
                            <p>
                                <strong>Bus Type:</strong> {bus.busType}
                            </p>
                            <p>
                                <strong>Seating Capacity:</strong> {bus.seatingCapacity}
                            </p>
                            <p>
                                <strong>Amenities:</strong> {bus.busAmenities.join(', ')}
                            </p>
                            <p>
                                <strong>Rating:</strong> {bus.rating}/5
                            </p>
                            <p>
                                <strong>AC:</strong> {bus.isAC ? 'Yes' : 'No'}
                            </p>
                            <p>
                                <strong>Source:</strong> {bus.source}
                            </p>
                            <p>
                                <strong>Destination:</strong> {bus.destination}
                            </p>
                        </div>
                        <button className="book-button">Book Now</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JourneyList;