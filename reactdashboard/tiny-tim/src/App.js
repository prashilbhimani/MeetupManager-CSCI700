import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import indexRoutes from "routes/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import store from './store';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LandingPage from "./views/LandingPage/Landingpage";


firebase.initializeApp({
  apiKey: "AIzaSyCdQ0Ywgh2EHFmArK-ektjrM_VLqJ1WMWQ",
  authDomain: "sharan-firebase-auth-928f8.firebaseapp.com"
})


class App extends Component {
  state = {
    isSignedIn: false
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      })
      console.log("user", user)
    });
  }

//     render() {
//         return (
//   <Provider store={store}>
//     <HashRouter>
//       <Switch>
//         {indexRoutes.map((prop, key) => {
//           // let myprop = JSON.stringify(prop);
//           // Here key is refering to the index. It starts from 0. Since theres just 1 element it will be zero.
//           // prop is referring to the entire JSON object in routes/index.js      
//           return <Route to={prop.path} component={prop.component} key={key} />;        
//         })}
//       </Switch>
//     </HashRouter>
//   </Provider>
//   )
// } 
// <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
render() {
  return (
  <div className= "App">
  {
    this.state.isSignedIn 
    ? 
    <span>
      <div> Signed in </div>
      <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
      <img alt="profile picture" src={firebase.auth().currentUser.photoURL}/>
    </span>
     :
     <span>
      <LandingPage/>       
     </span>
  }
  </div>
  );
}
}

export default App;