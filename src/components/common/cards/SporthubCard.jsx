import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSportHubProducts,
  selectAllSportHubs,
  getSportHubsStatus,
  getSportHubsError
} from "../../../redux/feature/sporthubs/sportclubSlice";
import { Link } from "react-router-dom";
const BASE_URL = "http://136.228.158.126:50003/media/uploads/";

const SportHubList = () => {
  const dispatch = useDispatch();
  const sporthubs = useSelector(selectAllSportHubs);
  const status = useSelector(getSportHubsStatus);
  const error = useSelector(getSportHubsError);

  useEffect(() => {
    if (status === "idle") {
      console.log("Dispatching fetchSportHubProducts");
      dispatch(fetchSportHubProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Sport hubs state:", sporthubs);
  }, [sporthubs]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sporthubs?.map((hub) => (
          <div key={hub.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <Link to={`product/${hub.id}`}>
              <img
                src={hub.image ? hub.image : "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"}
                alt={hub.sport_name || "Sport Hub Image"}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{hub.sport_name || "Unknown Sport Hub"}</div>
              <p className="text-gray-700 text-base truncate">{hub.description || "Unknown Location"}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {hub.created_by || "Unknown Creator"}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Sport Hubs</h2>
      {content}
    </section>
  );
};

export default SportHubList;
