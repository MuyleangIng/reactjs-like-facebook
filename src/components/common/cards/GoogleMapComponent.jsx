// import React, { useEffect, useRef } from 'react';
// import { LoadScript } from '@react-google-maps/api';

// const mapContainerStyle = {
//   height: "400px",
//   width: "100%"
// };

// const GoogleMapComponent = ({ sportClubs, currentLocation }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (window.google && window.google.maps && sportClubs.length > 0) {
//       const center = currentLocation
//         ? { lat: currentLocation.latitude, lng: currentLocation.longitude }
//         : { lat: 11.578222, lng: 104.901791 };
      
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: center,
//         zoom: 12,
//       });

//       if (currentLocation) {
//         const marker = new window.google.maps.Marker({
//           map,
//           position: {
//             lat: 11.578345, 
//             lng: 104.901606
//           },
//           title: "Your Location",
//           icon: {
//             url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
//           }
//         });
//         const infoWindow = new window.google.maps.InfoWindow({
//             content: `<div style="width:200px"><img src="https://istad.co/resources/img/CSTAD_120.png" alt="CSTAD" style="width:100%"/></div>`
//           });
//           marker.addListener('mouseover', () => {
//             infoWindow.open(map, marker);
//           });
  
//           marker.addListener('mouseout', () => {
//             infoWindow.close();
//           });  
//       }

//       sportClubs.forEach(club => {
//         const marker = new window.google.maps.Marker({
//           map,
//           position: {
//             lat: parseFloat(club.location.latitude),
//             lng: parseFloat(club.location.longitude)
//           },
//           title: club.sport_name,
//         });
      
//         const infoWindow = new window.google.maps.InfoWindow({
//           content: `<div id="infoWindowContent-${club.id}" style="width:200px"><h3>${club.sport_name}</h3><img src="${club.image}" alt="${club.sport_name}" style="width:100%"/></div>`
//         });
      
//         let isMouseOverMarker = false;
//         let isMouseOverInfoWindow = false;
      
//         marker.addListener('mouseover', () => {
//           isMouseOverMarker = true;
//           infoWindow.open(map, marker);
//         });
      
//         marker.addListener('mouseout', () => {
//           isMouseOverMarker = false;
//           setTimeout(() => {
//             if (!isMouseOverInfoWindow) {
//               infoWindow.close();
//             }
//           }, 100);
//         });
      
//         map.addListener('mousemove', (event) => {
//           const latLng = event.latLng;
//           const markerPosition = marker.getPosition();
//           if (isMouseOverMarker) {
//             if (google.maps.geometry.spherical.computeDistanceBetween(latLng, markerPosition) > 10) {
//               isMouseOverMarker = false;
//               setTimeout(() => {
//                 if (!isMouseOverInfoWindow) {
//                   infoWindow.close();
//                 }
//               }, 100);
//             }
//           }
//         });
      
//         // Handle mouseover and mouseout events on the InfoWindow content
//         document.addEventListener('mouseover', (event) => {
//           if (event.target.closest(`#infoWindowContent-${club.id}`)) {
//             isMouseOverInfoWindow = true;
//           }
//         });
      
//         document.addEventListener('mouseout', (event) => {
//           if (event.target.closest(`#infoWindowContent-${club.id}`)) {
//             isMouseOverInfoWindow = false;
//             setTimeout(() => {
//               if (!isMouseOverMarker) {
//                 infoWindow.close();
//               }
//             }, 100);
//           }
//         });
//       });
      

//       mapRef.current = map;
//     }
//   }, [sportClubs, currentLocation]);

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <div id="map" style={mapContainerStyle}></div>
//     </LoadScript>
//   );
// };

// export default GoogleMapComponent;
import React, { useEffect, useRef } from 'react';
import { LoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const GoogleMapComponent = ({ sportClubs, currentLocation, hoveredClubId }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (window.google && window.google.maps && sportClubs.length > 0) {
      const center = currentLocation
        ? { lat: currentLocation.latitude, lng: currentLocation.longitude }
        : { lat: 11.578222, lng: 104.901791 };
      
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 12,
      });

      if (currentLocation) {
        new window.google.maps.Marker({
          map,
          
          position: {
            lat: 11.578227,
            lng: 104.901798
          },
          title: "Your Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });
      }

      markersRef.current = sportClubs.map(club => {
        const marker = new window.google.maps.Marker({
          map,
          position: {
            lat: parseFloat(club.location.latitude),
            lng: parseFloat(club.location.longitude)
          },
          title: club.sport_name,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div id="infoWindowContent-${club.id}" style="width:200px"><h3>${club.sport_name}</h3><img src="${club.image}" alt="${club.sport_name}" style="width:100%"/></div>`
        });

        marker.addListener('mouseover', () => {
          infoWindow.open(map, marker);
        });

        marker.addListener('mouseout', () => {
          infoWindow.close();
        });

        return { clubId: club.id, marker, infoWindow };
      });

      mapRef.current = map;
    }
  }, [sportClubs, currentLocation]);

  useEffect(() => {
    if (hoveredClubId) {
      const markerObj = markersRef.current.find(m => m.clubId === hoveredClubId);
      if (markerObj) {
        markerObj.infoWindow.open(mapRef.current, markerObj.marker);
      }
    }
  }, [hoveredClubId]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div id="map" style={mapContainerStyle}></div>
    </LoadScript>
  );
};

export default GoogleMapComponent;


