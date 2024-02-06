// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  getAuth,
} from "firebase/auth";

// Components
import EventsList from "./components/EventsList";
import UserProfile from "./components/UserProfile";

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

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  function handleLogin() {
    signInWithPopup(getAuth(app), provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // The signed-in user info.
        const user = result.user;
        const JWT = user.accessToken;

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

  return (
    <div className="App p-12">
      {auth ? (
        <>
          <UserProfile token={token} />
          <EventsList token={token} />
        </>
      ) : (
        <button
          className="bg-cyan-500 text-white rounded-lg p-3 shadow-2xl font-medium hover:font-bold hover:bg-cyan-700 active:bg-cyan-600 hover:rounded-xl transition-all duration-800"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

export default App;
