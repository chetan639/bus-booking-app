import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import '../styles/Home.css';
function Home(){
    const [source,setSource] = useState("");
    const [destination,setDestination] = useState("");
    const [date,setDate] = useState("");
    const history = useHistory();

    const handleSubmit = (e)=>{
        //make api call to find journey
        e.preventDefault();

        history.push(`/journeyList?source=${source}&destination=${destination}&date=${date}`);
    }
    return (
        <>
            <div className="form-container">
                <form>
                    <label htmlFor="source">Source:</label>
                    <input type="text" name="source" id="source" value={source} onChange={e=>{console.log(source);setSource(e.target.value)}}/>
                    <label htmlFor="destination">Destination:</label>
                    <input type="text" name="destination" id="destination" value={destination} onChange={e=>setDestination(e.target.value)}/>

                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" id="date" value={date} onChange={e=>setDate(e.target.value)}/>

                    <button type="submit" className="submit-button" onClick={handleSubmit}>
                        Search Buses
                    </button>
                </form>
            </div>
        </>
    )
}

export default Home;