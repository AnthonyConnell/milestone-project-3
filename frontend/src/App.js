import { React, useEffect, useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { config } from './config';
import { Room, Star } from "@mui/icons-material";
import "./app.css"
import axios from "axios";
import {format} from "timeago.js";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch(err){
        console.log(err)
      }
    };
    getPins()
  }, [])

  const handleMarkerClick = (id) => {
    setcurrentPlaceId(id)
  }

  return <Map
    initialViewState={{
      longitude: -78.644,
      latitude: 35.787,
      zoom: 6
    }}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={ config.REACT_APP_MAPBOX_ACCESS_TOKEN }
  >
    {pins.map((p) => (
      <>

    <Marker 
      longitude={p.longitude} 
      latitude={p.latitude} 
      anchor="bottom"
    >
      <Room 
        style={{
          color:"slateblue",
          cursor: "pointer",
          scale: "2",
         }}
         onClick={()=>handleMarkerClick(p._id)}
      />
    </Marker>
    {p._id === currentPlaceId && (
      <Popup
        longitude={p.longitude}
        latitude={p.latitude}
        closeButton={true}
        closeOnClick={false}
        anchor="top" 
        onClose={() => setCurrentPlaceId(null)}  
      >
          <div className="card">
            <label>Place</label>
              <h4 className="place">{p.title}</h4>
            <label>Review</label>
              <p className="desc">{p.desc}</p>
            <label>Rating</label>
              <div className="stars">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            <label>Information</label>
              <span className="username">Created by <b>{p.username}</b></span>
              <span className="date">{format(p.createdAt)}</span>
          </div>
      </Popup>
    )}
        </>    
    ))}
  </Map>;
}

export default App;