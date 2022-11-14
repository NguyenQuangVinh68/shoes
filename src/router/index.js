import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product-details/:id",
    name: "Details",
    component: () => import("../components/product/ProductDetails.vue"),
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/collections",
    name: "collections",
    component: () => import("../views/ProductsPage.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/check_out",
    name: "CheckOut",
    component: () => import("../views/CheckOut.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("../views/Favorites.vue"),
  },
  {
    path: "/chart",
    name: "chart",
    component: () => import("@/views/PageChart.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to,from,next)=>{
//     if(to.query){

//     }
// })

export default router;
