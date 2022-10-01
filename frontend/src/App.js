import * as React from 'react';
import Map from 'react-map-gl';
import { config } from './config';

function App() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 10
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={ config.REACT_APP_MAPBOX_ACCESS_TOKEN }
    />
  );
}

export default App;