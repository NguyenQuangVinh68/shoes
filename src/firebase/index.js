import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

let config = {
  apiKey: "AIzaSyCXjf6ILToEV6Rp9xSpzqWqjee958F1EVI",
  authDomain: "products-3f8e8.firebaseapp.com",
  databaseURL: "https://products-3f8e8-default-rtdb.firebaseio.com",
  projectId: "products-3f8e8",
  storageBucket: "products-3f8e8.appspot.com",
  messagingSenderId: "651700405699",
  appId: "1:651700405699:web:a8d5850feb984bfd7f2976",
};

const app = initializeApp(config);
const auth = getAuth(app);

export { auth };

// export default firebase.databaes();
