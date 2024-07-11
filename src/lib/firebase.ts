// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDIqGYD0fjdEzsA6jjn9zhUO3wu4EnJPc",
  authDomain: "personal-portfolio-7bf66.firebaseapp.com",
  projectId: "personal-portfolio-7bf66",
  storageBucket: "personal-portfolio-7bf66.appspot.com",
  messagingSenderId: "599167201028",
  appId: "1:599167201028:web:8694a0d9cddcc006ff2a51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const fetchAboutMeData = async () => {
  const docRef = doc(db, "aboutMe", "profile");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const fetchHomeData = async () => {
  const docRef = doc(db, "home", "profile");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const fetchContactData = async () => {
  const docRef = doc(db, "contact", "contactDetails");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
