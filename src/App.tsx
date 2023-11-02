import React, {useEffect, useState} from 'react';
import {connect} from "./api/RSocket";
import APIClient from "./api/APIClient";

function App() {

    const [apiClient, setApiClient] = useState<APIClient | undefined>(undefined);

  useEffect(() => {
      connect()
          .then((reactiveSocket) => {
              setApiClient(APIClient(reactiveSocket));
          })
  }, []);

  function buttonClick() {
      apiClient?.sendMessage("Hello World!")
          .then(response => {
              console.log("REQUEST COMPLETE");
          })
  }

  return (
    <div className="App">
      <button onClick={buttonClick}>Click Me!</button>
    </div>
  );
}

export default App;
