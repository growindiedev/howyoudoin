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

export function monitorAuthState(node: any) {
  let auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      node.textContent = user.displayName
      //alert(`you are signed in ${user}`)
    } else {
      // User is signed out
      //alert(`you are signed out ${user}`)
      node.textContent = "signed-out"
    }
  })
}

