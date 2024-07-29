import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  selectValue
} from "../../redux/feature/counter/counterSlice";
import { Button } from "flowbite-react";
import { useState } from "react";

function Count() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(10);
  const countValue = useSelector(selectValue);
  console.log("count", countValue);
  return (
    <>
      <h1 className="text-3xl text-blue-800 text-center font-bold mt-5">
        First day learning Redux Toolkit
      </h1>
      <h2 className="text-3xl text-blue-800 text-center font-bold mt-5">
        {countValue}
      </h2>
      <div className="grid place-content-center h-screen gap-2">
        <Button onClick={() => dispatch(increment())} color="purple">
          Increase By 1
        </Button>
        <Button onClick={() => dispatch(decrement())} color="purple">
          Decrease By 1
        </Button>
        <Button
          onClick={() => dispatch(incrementByAmount(amount))}
          color="purple"
        >
          Increase By Amount
        </Button>
      </div>
    </>
  );
}

export default Count;
