import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  selectAllProducts,
  fetchProducts
} from "./redux/feature/product/productSlice.js";
import SportHubList from './components/common/cards/SporthubCard.jsx'; // Ensure the correct path
import NearbySearch from './components/common/cards/SportClubSearch.jsx'; // Ensure the correct path
import CourseComponent from './components/common/cards/CourseComponent.jsx'; // Ensure the correct path
import ReactionsPicker from './components/common/cards/ReactionsPicker.jsx'; // Ensure the correct path
function App() {
  const products = useSelector(selectAllProducts);
  const sporthub = useSelector((state) => state.sporthubs.sporthubs); // Access sporthubs array
  const dispatch = useDispatch();
  console.log("products", products);
  console.log("sporthub", sporthub);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
       <div className="App">
      <h1>Facebook Reactions Picker</h1>
      <ReactionsPicker />
    </div>
      <section >
      {/* <NearbySearch /> */}
      {/* <CourseComponent /> */}
      <div>
      <h1>React Like Facebook Reactions Picker</h1>
      <ReactionsPicker />
    </div>
        {/* <SportHubList /> */}
      </section>
    </>
  );
}

export default App;
