import React,{useEffect} from 'react';
import '../styles/UserProfile.css'; // You can create a CSS file for the styles

const UserProfile = () => {
  const bookings = [];
  useEffect(()=>{
    
  });
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src="https://via.placeholder.com/150" // Replace with the user's profile picture
            alt="User Profile"
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">John Doe</h1>
          <p className="profile-email">johndoe@example.com</p>
        </div>
      </div>
      <div className="profile-details">
        <div className="section">
          <h2>My Bookings:</h2>
          {bookings.map(booking=>{
            return (<div>
                <p>{booking.bookingId}</p>
                <p>{booking.seatNumber}</p>
                <p>{booking.bookingTiming}</p>
                <p>{booking.source}</p>
                <p>{booking.destination}</p>
            </div>)
          })}
        </div>
        <div className="section">
          <h2>Contact Information</h2>
          <p>
            Email: johndoe@example.com<br />
            Phone: (123) 456-7890<br />
            Address: 123 Main St, City, Country
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
