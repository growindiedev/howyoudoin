import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "howyoudoin99.firebaseapp.com",
  projectId: "howyoudoin99",
  storageBucket: "howyoudoin99.appspot.com",
  messagingSenderId: "552106187581",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-TT43XGRTBN"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//const auth = getAuth();

export async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  let userCreds  = await signInWithPopup(getAuth(), provider);
  console.log(userCreds);
  return userCreds;
}

export async function signOutUser() {
  console.log("hawa hawai")
  signOut(getAuth());
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser!.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
export function getUserName() {
  return getAuth().currentUser!.displayName;
}

export function isUserSignedIn() {
  return !!getAuth().currentUser;
}

export function monitorAuthState(document: any) {
  let sidebar = document.querySelector(".sidebar")
  let mainView = document.querySelector(".main-view")
  let container = document.querySelector(".conatiner")
  let auth = getAuth()


  onAuthStateChanged(auth, (user) => {
   // location.reload()
    if (user) {
      // container.appendChild(sidebar);
      // container.appendChild(mainView);
      //container.textContent = "poop fracis"      
      //node.textContent = user.displayName
    } else {
      // sidebar.remove()
      // mainView.remove()
      // sidebar.textContent = ""
      // mainView.textContent = ""
    }
  })
}



