import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import { config } from './config';
import { Room } from "@mui/icons-material";

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