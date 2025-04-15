import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  get,
  set,
  child
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5CZv_Rqjg7_HFRZim73w1DQWcRt8lofQ",
  authDomain: "ps-projectdata.firebaseapp.com",
  projectId: "ps-projectdata",
  storageBucket: "ps-projectdata.appspot.com",
  messagingSenderId: "418508761554",
  appId: "1:418508761554:web:b6626279f4e9d2696c000b",
  measurementId: "G-63PW3QPBED",
  databaseURL: "https://ps-projectdata-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-button");
  const usernameEl = document.getElementById("user-username");
  const emailEl = document.getElementById("user-email");
  const nameEl = document.getElementById("user-name");
  const avatarEl = document.getElementById("user-avatar");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const displayName = user.displayName || "Unknown";
      const email = user.email || "Unknown";

      usernameEl.textContent = displayName;
      emailEl.textContent = email;
      nameEl.textContent = displayName;
      if (user.photoURL) avatarEl.src = user.photoURL;

      const userRef = ref(db, `users/${uid}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, {
          username: displayName,
          email: email,
          avatar: user.photoURL || null
        });
        console.log("User profile saved to Realtime Database.");
      } else {
        console.log("User already exists in database.");
      }

    } else {
      console.warn("User not logged in. Redirecting...");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    }
  });

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          console.log("Logged out.");
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 1000);
        })
        .catch((error) => {
          console.error("Logout error:", error.message);
        });
    });
  }
});
