import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/Spots/GetAllSpots";
import GetSingleSpot from "./components/Spots/GetSingleSpot";
import GetUserSpots from "./components/Spots/GetUserSpots";
import CreateSpot from "./components/Spots/CreateSpot";
import EditSpot from "./components/Spots/EditSpot";
// import RemoveSpot from "./components/RemoveSpot";
// import UserReviews from './components/Reviews/UserReviews';
// import LoginFormModal from "./components/LoginFormModal/index";
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
//comment
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
          <Route path="/signup">
            <SignupFormModal />
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
          <Route><PageNotFound /></Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
