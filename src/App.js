// import logo from "./logo.svg";
import "./App.css";

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  getAuth,
} from "firebase/auth";
import { useState, useEffect } from "react";

import ListOfTodo from "./components/ListOfTodo";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyD7oKzPgzjdFpM_qZY0sSiW_K1zocjGYWA",
  authDomain: "fx-test-merge.firebaseapp.com",
  projectId: "fx-test-merge",
  storageBucket: "fx-test-merge.appspot.com",
  messagingSenderId: "330334661977",
  appId: "1:330334661977:web:6e28e0992105d2826b7048",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // useEffect(() => {
  //   if (!token) setAuth(false);
  // }, [token]);

  function handleLogin() {
    signInWithPopup(getAuth(app), provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const JWT = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        setAuth(true);
        setToken(JWT);
        window.localStorage.setItem("auth", "true");
        window.localStorage.setItem("token", JWT);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  // useEffect(() => {
  //   auth.auth().onAuthStateChanged((userCred) => {
  //     if (userCred) {
  //       setAuth(true);
  //       window.localStorage.setItem("auth", "true");
  //       userCred.getIdToken().then((token) => {
  //         setToken(token);
  //       });
  //     }
  //   });
  // }, []);

  // const loginWithGoogle = () => {
  //   firebase
  //     .auth()
  //     .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //     .then((userCred) => {
  //       if (userCred) {
  //         setAuth(true);
  //         window.localStorage.setItem("auth", "true");
  //       }
  //     });
  // };

  return (
    <div className="App">
      {auth ? (
        <ListOfTodo token={token} />
      ) : (
        // <p>hello</p>
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
