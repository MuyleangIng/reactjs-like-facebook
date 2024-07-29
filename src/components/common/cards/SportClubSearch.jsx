// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import GoogleMapComponent from './GoogleMapComponent'; // Adjust the import path as needed

// const SportClubSearch = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [sportClubs, setSportClubs] = useState([]);
//   const [error, setError] = useState(null);

//   console.log("latitude", latitude)
//   console.log("longitude", longitude)
  
//   const staticLatitude = 11.578324;  // Static latitude
//   const staticLongitude = 104.901670;  // Static longitude
  
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           console.log('Current Location:', position.coords.latitude, position.coords.longitude); // Log current location
//         },
//         () => {
//           setError("Geolocation is not supported by this browser.");
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   };

//   const searchSportClubs = async () => {
//     if (latitude && longitude) {
//       try {
//         const response = await axios.post("http://136.228.158.126:50003/api/search_nearby/", {
//           latitude: staticLatitude,  // Use static latitude
//           longitude: staticLongitude,  // Use static longitude
//           radius: 8  // Radius in kilometers
//         });
//         setSportClubs(response.data);
//       } catch (err) {
//         setError("Failed to fetch sport clubs.");
//       }
//     } else {
//       setError("Please allow location access and try again.");
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return (
//     <div>
//       <button onClick={getLocation}>Get Current Location</button>
//       <button onClick={searchSportClubs}>Search Nearby Sport Clubs</button>

//       {error && <p>{error}</p>}

//       <GoogleMapComponent sportClubs={sportClubs} currentLocation={{ latitude, longitude }} />

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {sportClubs.length > 0 ? (
//           sportClubs.map(club => (
//             <div key={club.id} className="club-card max-w-sm rounded overflow-hidden shadow-lg">
//               <img
//                 alt={club.sport_name || "product image"}
//                 src={club.image || "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="px-6 py-4">
//                 <div className="font-bold text-xl mb-2">{club.sport_name || "Unknown Sport Hub"}</div>
//                 <p className="text-gray-700 text-base truncate">{club.description || "Unknown Location"}</p>
//               </div>
//               <div className="px-6 pt-4 pb-2">
//                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                   <p>Location: {club.location.latitude}, {club.location.longitude}</p>
//                   <p>Distance: {club.distance.toFixed(2)} km</p>
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No sport clubs found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SportClubSearch;






import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapComponent from './GoogleMapComponent'; // Adjust the import path as needed
import GeocodeComponent from './GeocodeComponent'; // Adjust the import path as needed
const SportClubSearch = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [sportClubs, setSportClubs] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredClubId, setHoveredClubId] = useState(null);

  console.log("latitude", latitude);
  console.log("longitude", longitude);
  
  const staticLatitude = 11.578227;  // Static latitude
  const staticLongitude = 104.901798;  // Static longitude
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log('Current Location:', position.coords.latitude, position.coords.longitude); // Log current location
        },
        () => {
          setError("Geolocation is not supported by this browser.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const searchSportClubs = async () => {
    if (latitude && longitude) {
      try {
        const response = await axios.post("http://136.228.158.126:50003/api/search_nearby/", {
          latitude: staticLatitude,  // Use static latitude
          longitude: staticLongitude,  // Use static longitude
          radius: 2  // Radius in kilometers
        });
        setSportClubs(response.data);
      } catch (err) {
        setError("Failed to fetch sport clubs.");
      }
    } else {
      setError("Please allow location access and try again.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <button onClick={getLocation}>Get Current Location</button>
      <button onClick={searchSportClubs}>Search Nearby Sport Clubs</button>

      {error && <p>{error}</p>}

      <GoogleMapComponent sportClubs={sportClubs} currentLocation={{ latitude, longitude }} hoveredClubId={hoveredClubId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sportClubs.length > 0 ? (
          sportClubs.map(club => (
            <div
              key={club.id}
              className="club-card max-w-sm rounded overflow-hidden shadow-lg"
              onMouseEnter={() => setHoveredClubId(club.id)}
              onMouseLeave={() => setHoveredClubId(null)}
            >
              <img
                alt={club.sport_name || "product image"}
                src={club.image || "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"}
                className="w-full h-48 object-cover"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{club.sport_name || "Unknown Sport Hub"}</div>
                <p className="text-gray-700 text-base truncate">{club.description || "Unknown Location"}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {/* <p>Location: {club.location.latitude}, {club.location.longitude}</p> */}
                  <GeocodeComponent latitude={club.location.latitude} longitude={club.location.longitude} />

                  <p>Distance: {club.distance.toFixed(2)} km</p>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No sport clubs found.</p>
        )}
      </div>
    </div>
  );
};

export default SportClubSearch;








// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import GoogleMapComponent from './GoogleMapComponent'; // Adjust the import path as needed

// const SportClubSearch = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [sportClubs, setSportClubs] = useState([]);
//   const [error, setError] = useState(null);
//   const [hoveredClubId, setHoveredClubId] = useState(null);

//   console.log("latitude", latitude)
//   console.log("longitude", longitude)
  
//   const staticLatitude = 11.578324;  // Static latitude
//   const staticLongitude = 104.901670;  // Static longitude
  
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           console.log('Current Location:', position.coords.latitude, position.coords.longitude); // Log current location
//         },
//         () => {
//           setError("Geolocation is not supported by this browser.");
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   };

//   const searchSportClubs = async () => {
//     if (latitude && longitude) {
//       try {
//         const response = await axios.post("http://136.228.158.126:50003/api/search_nearby/", {
//           latitude: staticLatitude,  // Use static latitude
//           longitude: staticLongitude,  // Use static longitude
//           radius: 8  // Radius in kilometers
//         });
//         setSportClubs(response.data);
//       } catch (err) {
//         setError("Failed to fetch sport clubs.");
//       }
//     } else {
//       setError("Please allow location access and try again.");
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return (
//     <div>
//       <button onClick={getLocation}>Get Current Location</button>
//       <button onClick={searchSportClubs}>Search Nearby Sport Clubs</button>

//       {error && <p>{error}</p>}

//       <GoogleMapComponent sportClubs={sportClubs} currentLocation={{ latitude, longitude }} onMarkerHover={setHoveredClubId} />

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {sportClubs.length > 0 ? (
//           sportClubs.map(club => (
//             <div
//               key={club.id}
//               className="club-card max-w-sm rounded overflow-hidden shadow-lg"
//               onMouseEnter={() => setHoveredClubId(club.sport_name)}
//               onMouseLeave={() => setHoveredClubId(null)}
//             >
//               <img
//                 alt={club.sport_name || "product image"}
//                 src={club.image || "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="px-6 py-4">
//                 <div className="font-bold text-xl mb-2">{club.sport_name || "Unknown Sport Hub"}</div>
//                 <p className="text-gray-700 text-base truncate">{club.description || "Unknown Location"}</p>
//               </div>
//               <div className="px-6 pt-4 pb-2">
//                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                   <p>Location: {club.location.latitude}, {club.location.longitude}</p>
//                   <p>Distance: {club.distance.toFixed(2)} km</p>
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No sport clubs found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SportClubSearch;
