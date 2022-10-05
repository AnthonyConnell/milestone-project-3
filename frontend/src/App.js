import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { config } from "./config";
import { Room, Star } from "@mui/icons-material";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState("");
  const [currentUsername, setCurrentUsername] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  // const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    // latitude: 47.040182,
    // longitude: 17.071727,
    zoom: 6,
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    console.log(e);
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("http://localhost:5500/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:5500/pins");
        console.log(allPins.data);
        // setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
    <Map
      initialViewState={{
        longitude: -78.644,
        latitude: 35.787,
        zoom: 6,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={config.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={currentUsername && handleAddClick}
    >
      {pins.map((p) => (
        <>
          <Marker 
          latitude={p.lat} 
          longitude={p.long} 
          anchor="bottom"
          >
            <Room
              style={{
                color: currentUsername === p.username ? "tomato" : "slateblue",
                cursor: "pointer",
                scale: "2",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                <Star className="star" />
                <Star className="star" />
                <Star className="star" />
                <Star className="star" />
                <Star className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
      {newPlace && (
        <>
          <Marker
            latitude={newPlace.lat}
            longitude={newPlace.long}
            anchor="bottom"
          >
            <Room
              style={{
                color: "tomato",
                cursor: "pointer",
              }}
            />
          </Marker>
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        </>
      )}
        {currentUsername ? (
        <button className="button logout">Logout</button>
        ) : ( 
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button className="button register" onClick={() => setShowRegister(true)}>
              Register
            </button>
          </div>
        )}
       {showRegister && <Register />}
       {showLogin && <Login />}
    </Map>
  </div>
  );
};

export default App;
