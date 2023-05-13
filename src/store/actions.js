import axios from "axios";
import router from "../router/index";
import { APIURL } from "../constant";

import { auth } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";

export default {
  async getAllProducts({ commit }) {
    console.log("getall");
    try {
      await axios.get(`${APIURL}/products`).then((response) => {
        commit("PRODUCTS_ITEM", response.data);
      });
    } catch (error) {
      console.log(error);
    }
  },

  async getVisibleProducts({ commit }, currentPage) {
    commit("VISIBLE_PRODUCTS", currentPage);
  },

  async getProductCategory({ commit }) {
    try {
      const res = await axios.get(`${APIURL}/collections`);
      commit("PRODUCTS_CATEGORY", res.data);
    } catch (error) {
      return error;
    }
  },

  async getProductsById({ commit }, productID) {
    try {
      const res = await axios.get(`${APIURL}/products/${productID}`);
      commit("SET_PRODUCT", res.data);
    } catch (error) {
      return error;
    }
  },

  clearCart({ commit }) {
    commit("CLEAR_CART");
  },

  // authentication

  // signup(context, { displayName, email, password }) {
  //   createUserWithEmailAndPassword(auth, email, password).then(
  //     (user) => {
  //       const a = user.updateProfile({ displayName: displayName });
  //       context.commit("SET_USER", { a, email, password });
  //     },
  //     (error) => {
  //       console.log(error.message);
  //     }
  //   );
  //   // if (response) {
  //   //   console.log("signup successfully");
  //   //   context.commit("SET_USER", response.user);
  //   // } else {
  //   //   throw new Error("signup failed");
  //   // }
  // },
  async signup(context, { email, password }) {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response) {
      console.log("signup successfully");
      context.commit("SET_USER", response.user);
    } else {
      throw new Error("signup failed");
    }
  },

  async signupWithGoogle(context) {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        const { displayName, email } = result.user;
        context.commit("SET_USER", { displayName, email });
        // router.go();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async login(context, { email, password }) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
    if (response) {
      console.log("signin successfully");
      context.commit("SET_USER", response.user);
      router.push("/");
    } else {
      throw new Error("login failed");
    }
  },

  async logout(context) {
    await signOut(auth);
    console.log("logout");
    context.commit("SET_USER", null);
  },

  checkLogged(context) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Has user");
        const { displayName, email, photoURL } = auth.currentUser;
        context.commit("CHECK_LOGGED", { displayName, email, photoURL });
      } else {
        console.log("no user");
        const data = null;
        context.commit("CHECK_LOGGED", data);
      }
    });
  },

  // search

  async filterSearch({ commit }, textSearch) {
    // nếu như muốn truyền data lấy được đi thì dùng { textSearch , ...res.data}
    try {
      this.checkLogged;
      const res = await axios.get(`${APIURL}/products`);
      const data = res.data;
      commit("FILTER_SEARCH", { textSearch, data });
    } catch (error) {
      console.log(error);
    }
  },

  // fivorites
  async favorite({ commit }) {
    try {
      const res = await axios.get(`${APIURL}/wishList`);
      commit("FAVORITES", res.data);
    } catch (error) {
      console.log(error);
    }
  },

  async loadcomment({ commit }, idcurrent) {
    try {
      const res = await axios.get(`${APIURL}/comment`);
      res.data = res.data.filter((item) => item.idProduct == idcurrent);
      commit("COMMENT", res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
