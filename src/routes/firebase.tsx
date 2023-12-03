import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAgm4rxKNAwGOvV579WkGaEcqVCwAHJbdg",
  authDomain: "moview-16df4.firebaseapp.com",
  projectId: "moview-16df4",
  storageBucket: "moview-16df4.appspot.com",
  messagingSenderId: "928707883341",
  appId: "1:928707883341:web:9e4ce52ac63849a52a4704"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
 