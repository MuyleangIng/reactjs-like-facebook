// GoogleMap.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const defaultCenter = {
  lat: 11.55, // Default latitude
  lng: 104.92 // Default longitude
};

const GoogleMapComponent = ({ sporthubs }) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={defaultCenter}
      >
        {sporthubs.map((hub) => (
          <Marker
            key={hub.id}
            position={{
              lat: parseFloat(hub.location.split(",")[0]),
              lng: parseFloat(hub.location.split(",")[1])
            }}
            title={hub.sport_name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
