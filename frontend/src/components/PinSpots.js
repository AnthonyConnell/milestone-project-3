import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import { Room, Star } from "@mui/icons-material";

const PinSpots = ({
    currentPlaceId,
    currentUsername,
    handleMarkerClick,
    p,
    setCurrentPlaceId }) => {
    return (
        <>
            <Marker 
            longitude={p.long} 
            latitude={p.lat} 
            anchor="bottom"
            >
            <Room 
                style={{
                color:
                    currentUsername === p.username ? "tomato" : "slateblue",
                cursor: "pointer",
                scale: "2",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
            </Marker>
            {p._id === currentPlaceId && (
            <Popup
                longitude={p.long}
                latitude={p.lat}
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
                    {/* <span className="date">{format(p.createdAt)}</span> */}
                </div>
            </Popup>
            )}
      </>
    );
};

export default PinSpots;
