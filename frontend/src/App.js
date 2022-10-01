import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { config } from './config';
import { Room, Star } from "@mui/icons-material";
import "./app.css"

function App() {
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
    <Marker 
      longitude={2.2294694} 
      latitude={48.858093} 
      anchor="bottom" 
      >
    <Popup
      longitude={2.2294694}
      latitude={48.858093}
      closeButton={true}
      closeOnClick={false}
      anchor="top" >
        <div className="card">
          <label>Place</label>
            <h4 className="place">Eiffell Tower</h4>
          <label>Review</label>
            <p>Beautiful place.</p>
          <label>Rating</label>
            <div className="stars">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          <label>Information</label>
            <span className="username"></span>
            <span className="date"></span>
        </div>
      </Popup>
      <Room 
        style={{
          color:"slateblue",
          cursor: "pointer",
         }}
      />
    </Marker>
  </Map>;
}

export default App;