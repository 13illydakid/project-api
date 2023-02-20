import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSingleSpot from "./components/GetSingleSpot";
import GetUserSpots from "./components/GetUserSpots";
import CreateSpot from "./components/CreateSpot";
import EditSpot from "./components/EditSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route path="/spots/new">
            <CreateSpot />
          </Route>
          <Route path="/spots/current">
            <GetUserSpots />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route path="/spots/:spotId">
            <GetSingleSpot />
          </Route>
          <Route>Page not found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
