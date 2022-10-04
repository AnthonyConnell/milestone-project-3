import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import PinSpots from './PinSpots';
import { config } from '../config';

const MapBox =({
  currentPlaceId,
  currentUsername,
  handleAddClick,
  handleMarkerClick,
  newPlace, 
  pins,
  setCurrentPlaceId,
  setNewPlace
}) => {
  return (
    <Map
    initialViewState={{
      longitude: -78.644,
      latitude: 35.787,
      zoom: 6
    }}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={ config.REACT_APP_MAPBOX_ACCESS_TOKEN }
    onDblClick = {handleAddClick}
    transitionDuration="200"
  >
    {pins.map((p, i) => (
      <PinSpots
      currentPlaceId={ currentPlaceId }
      currentUsername={ currentUsername }
        handleMarkerClick={ handleMarkerClick }
        key={ i }
        p={ p }
        setCurrentPlaceId={ setCurrentPlaceId }
      />    
    ))}
    {newPlace && (
    <Popup
      longitude={newPlace.long}
      latitude={newPlace.lat}
      closeButton={true}
      closeOnClick={false}
      anchor="top" 
      onClose={() => setNewPlace(null)}  
    >
      <div>
        <form>
          <label>Title</label>
          <input placeholder='Enter a title' />
          <label>Review</label>
          <textarea placeholder='Say something about this place' />
          <label>Rating</label>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button className="submitButton" type="submmit">Add Pin</button>
        </form>

      </div>
    </Popup>
    )}
  </Map>
  );
};

export default MapBox;
