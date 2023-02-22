import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import GetSingleSpot from "./components/GetSingleSpot";``
import GetUserSpots from "./components/GetUserSpots";
import CreateSpot from "./components/CreateSpot";
import EditSpot from "./components/EditSpot";
// import RemoveSpot from "./components/RemoveSpot";
import UserReviews from './components/Reviews/UserReviews';
// import LoginFormModal from "./components/LoginFormModal/index";
// import SignUpFormModal from "./components/SignUpFormModal";
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
          <Route exact path="/spots">
            <GetAllSpots />
          </Route>
          <Route path="/spots/new">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/current">
            <GetUserSpots />
          </Route>
          <Route path="/spots/:spotId">
            <GetSingleSpot />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route exact path="/myreviews">
            <UserReviews />
          </Route>
          <Route><PageNotFound /></Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
