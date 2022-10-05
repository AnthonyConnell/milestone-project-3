import React, { useState, useEffect } from 'react';
import "./app.css"
import axios from "axios";
import MapBox from './components/MapBox';
// import { format } from "timeago.js";

const App = () => {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState('');
  const [currentUsername, setCurrentUsername] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [desc, setDesc] = useState(null);
  // const [rating, setRating] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 6,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,long
    });
  };

  return (
    <MapBox
      currentPlaceId={ currentPlaceId }
      currentUsername={ currentUsername }
      handleAddClick={ handleAddClick }
      handleMarkerClick={ handleMarkerClick }
      newPlace={ newPlace }
      pins={ pins }
      setCurrentPlaceId={ setCurrentPlaceId }
      setNewPlace={ setNewPlace }
    />
  )
}

export default App;