import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {setMessage} from "./app/appSlice";

function App() {

  const message = useSelector((state: RootState) => state.app.message);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(message);
  }, [message]);

  function buttonClick() {
    dispatch(setMessage("HELLO"));
  }

  return (
    <div className="App">
      <button onClick={buttonClick}>Click Me!</button>
    </div>
  );
}

export default App;
