// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import SignupFormModal from "./components/SignupFormModal";
// import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";
// import GetAllSpots from "./components/Spots/GetAllSpots";
// import GetSingleSpot from "./components/Spots/GetSingleSpot";
// import GetUserSpots from "./components/Spots/GetUserSpots";
// import CreateSpot from "./components/Spots/CreateSpot";
// import EditSpot from "./components/Spots/EditSpot";
// // import RemoveSpot from "./components/RemoveSpot";
// // import UserReviews from './components/Reviews/UserReviews';
// import LoginFormModal from "./components/LoginFormModal";
// import PageNotFound from './components/PageNotFound';
// import Footer from './components/Footer';

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);
// //comment
//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && (
//         <Switch>
//           <Route exact path="/" component={GetAllSpots}>
//             {/* <GetAllSpots /> */}
//           </Route>
//           <Route path="/login" component={LoginFormModal}>
//         {/* <LoginFormModal /> */}
//       </Route>
//           <Route path="/spots/new" component={CreateSpot}>
//             {/* <CreateSpot /> */}
//           </Route>
//           <Route path="/signup" component={SignupFormModal}>
//             {/* <SignupFormModal /> */}
//           </Route>
//           <Route path="/spots/current" component={GetUserSpots}>
//             {/* <GetUserSpots /> */}
//           </Route>
//           <Route path="/spots/:spotId/edit" component={EditSpot}>
//             {/* <EditSpot /> */}
//           </Route>
//           <Route path="/spots/:spotId" component={GetSingleSpot}>
//             {/* <GetSingleSpot /> */}
//           </Route>
//           <Route component={PageNotFound}>
//             {/* <PageNotFound /> */}
//             </Route>
//         </Switch>
//       )}
//       <Footer />
//     </>
//   );
// }

// export default App;
// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

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
          <Route path="/signup">
            <SignupFormModal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
