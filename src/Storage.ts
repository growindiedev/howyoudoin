import { createSignInUI, createMainView, createSidebar } from './DOM';
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
  getDoc,
} from 'firebase/firestore';
import Project from "./Project";
import HowYouDoin from './HowYouDoin';
import Task from './Task';

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
const app: any = initializeApp(firebaseConfig);
const db: any = getFirestore();
//const auth = getAuth();

export async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  let userCreds  = await signInWithPopup(getAuth(), provider);
  let userRef = await doc(db, "users", userCreds.user.uid)
  let user = await getDoc(userRef)

  if(!user.exists()){
     await setDoc(doc(db, "users", userCreds.user.uid), {})
     await addDoc(collection(db, "users", userCreds.user.uid, "inbox"), {})
     await addDoc(collection(db, "users", userCreds.user.uid, "today"), {})
     await addDoc(collection(db, "users", userCreds.user.uid, "upcoming"), {})
     await addDoc(collection(db, "users", userCreds.user.uid, "star"), {})
    //{inbox: Object.assign({}, new Project("inbox")), today: Object.assign({}, new Project("today")), upcoming: Object.assign({}, new Project("upcoming")), star: Object.assign({}, new Project("star"))} 
    }
    return userCreds;
  }

  
export const getProjects = () => {

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

 
export function monitorAuthState() {
  let auth = getAuth()
  let sideBar = document.querySelector(".sidebar")
  let mainView = document.querySelector(".main-view")
  let container = document.querySelector(".container");
  let footer = document.querySelector(".footer")
  let loginContainer = createSignInUI(signIn)

  onAuthStateChanged(auth, (user) => {

    if (user) {
      //alert(`you are signed in ${user}`)
      // let sidebar = createSidebar()
      // let mainview = createMainView()

      loginContainer.remove()
      let sidebar = document.querySelector(".sidebar")
      let mainview = document.querySelector(".main-view")

      !sidebar && container?.insertBefore(sideBar!, footer)
      !mainview && container?.insertBefore(mainView!, footer)

      container?.classList.add("main")
    } else {
      sideBar && sideBar.remove()
      mainView && mainView.remove()
      container?.classList.remove("main")
      container?.insertBefore(loginContainer, footer)
      // User is signed out
      //alert(`you are signed out ${user}`)
      //node.textContent = "signed-out"
    }
  })

}



