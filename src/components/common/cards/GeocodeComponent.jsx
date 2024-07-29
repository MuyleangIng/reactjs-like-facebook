import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeocodeComponent = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            latlng: `${latitude},${longitude}`,
            key: 'AIzaSyAGzBliT0jF_1Ci1FDjg7Ic3SFU2Zrecpk',
          },
        });
        if (response.data.results.length > 0) {
          setAddress(response.data.results[0].formatted_address);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Error fetching address');
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return (
    <p>Location: {address}</p>
  );
};

export default GeocodeComponent;
