import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5CZv_Rqjg7_HFRZim73w1DQWcRt8lofQ",
  authDomain: "ps-projectdata.firebaseapp.com",
  projectId: "ps-projectdata",
  storageBucket: "ps-projectdata.appspot.com",
  messagingSenderId: "418508761554",
  appId: "1:418508761554:web:b6626279f4e9d2696c000b",
  measurementId: "G-63PW3QPBED"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is already logged in:", user.displayName);
          if (loginButton) {
            loginButton.style.display = "none";
          }
        } else {
          console.log("No user is logged in.");
          if (loginButton) {
            loginButton.style.display = "block";
            loginButton.addEventListener("click", () => {
              signInWithPopup(auth, provider)
                .then((result) => {
                  console.log("User logged in:", result.user.displayName);
                  loginButton.style.display = "none";
                })
                .catch((error) => {
                  console.error("Login failed:", error.message);
                });
            });
          }
        }
      });
    })
    .catch((error) => {
      console.error("Persistence error:", error.message);
    });
});
