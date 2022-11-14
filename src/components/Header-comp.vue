<template>
  <header class="site-navbar site-navbar-target bg-white sticky-top  header shadow-sm" role="banner">


    <div class="row align-items-center position-relative w-100 py-3 px-2">
      <!-- left menu -->
      <div class="col-lg-5 col-md-5 col  ">
        <nav class="site-navigation navbar navbar-expand-lg text-right ml-auto " role="navigation">
          <button class="navbar-toggler border-0  bars" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarSupportedContent" aria-controls="offcanvasExample" aria-expanded="true"
            aria-label="Toggle navigation">
            <font-awesome-icon :icon="['fas', 'list']" />
          </button>
          <div class="collapse navbar-collapse offcanvas offcanvas-start " id="navbarSupportedContent">
            <div class="offcanvas-header w-100">
              <h4 class="offcanvas-title fw-bold">Menu</h4>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <ul class="nav left_menu">
              <li class="nav-item m-0 mx-2">
                <router-link to="/" class="nav-link " @click="activeNav('home')" :class="{ active: isActive == 'home' }">Home</router-link>
              </li>
              <li class="nav-item m-0 mx-2">
                <router-link to="/collections" class="nav-link" @click="activeNav('shop')" :class="{ active: isActive == 'shop' }">Shop</router-link>
              </li>
              <li class="nav-item m-0 mx-2">
                <router-link to="/chart" class="nav-link text-capitalize" @click="activeNav('chart')" :class="{ active: isActive == 'chart' }">chart</router-link>
              </li>
              <li class="nav-item m-0 mx-2">
                <a class="nav-link" href="#" @click="activeNav('featured')" :class="{ active: isActive == 'featured' }">Featured</a>
              </li>
              <li class="nav-item m-0 mx-2">
                <a class="nav-link" href="#" @click="activeNav('page')" :class="{ active: isActive == 'page' }">Page</a>
              </li>
              <li class="nav-item m-0 mx-2">
                <a class="nav-link" href="#" @click="activeNav('blog')" :class="{ active: isActive == 'blog' }">Blog</a>
              </li>

            </ul>
          </div>
        </nav>
      </div>
      <!-- end left menu -->

      <!-- logo -->
      <div class="col-lg-2 col-md-2 col text-center d-flex justify-items-center ">
        <div>
          <router-link to="/" @click="activeNav('home')">
            <img src="../assets/image/logo.png" alt="" class="w-100">
          </router-link>
        </div>
        <div class="ml-auto toggle-button d-inline-block d-lg-none"><a href="#" class="site-menu-toggle py-5 js-menu-toggle text-black"><span class="icon-menu h3 text-black"></span></a></div>
      </div>
      <!-- end logo -->

      <!-- right menu -->
      <div class="col-lg-5 col-md-5 col position-relative px-0">

        <nav class="site-navigation navbar navbar-expand-lg text-right ml-auto float-end" role="navigation">

          <!-- tìm kiếm -->
          <ul class="nav d-flex align-items-center">
            <li class="nav-item ">
              <div class="nav-link px-2 py-0 " data-bs-toggle="collapse" data-bs-target="#demo">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color:#222222;cursor: pointer;" />
              </div>
            </li>
          </ul>
          <!-- button profy -->
          <button class="navbar-toggler border-0  bars " type="button" data-bs-toggle="offcanvas" data-bs-target="#account" aria-controls="offcanvasExample" aria-expanded="true"
            aria-label="Toggle navigation">
            <!-- <font-awesome-icon :icon="['fas', 'layer-group']" class="" /> -->
            <font-awesome-icon :icon="['fab', 'slack']" class="" />
          </button>

          <div class="collapse navbar-collapse offcanvas offcanvas-end " id="account">
            <div class="offcanvas-header w-100">
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              <h5 class="offcanvas-title text-uppercase fw-bold">Profy</h5>
            </div>
            <ul class="nav d-flex align-items-center">

              <li class="nav-item position-relative">
                <router-link to="/favorites" class="nav-link px-2 py-0 " data-bs-toggle="tooltip" title="Login">
                  <font-awesome-icon :icon="['far', 'heart']" style="color:#222222;cursor: pointer;" />
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-warning px-2 pe-3" style="font-size:15px">{{ viewLike }}</span>
                </router-link>
              </li>

              <li class="nav-item ">
                <router-link to="/login" class="nav-link px-2 py-0 " data-bs-toggle="tooltip" title="Login" v-if="isLoggedIn == false">
                  <i class=" fa-regular fa-user"></i>
                  <font-awesome-icon :icon="['far', 'user']" style="color:#222222;cursor: pointer;" />
                </router-link>
                <router-link to="/" class="nav-link px-2 py-0 position-relative " v-else @click="handleSignOut">

                  <font-awesome-icon :icon="['fas', 'right-from-bracket']" style="color:#222222;cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout" />
                </router-link>
              </li>

              <li class="nav-item ">
                <div class="nav-link px-2 py-0 position-relative ">
                  <font-awesome-icon :icon="['fas', 'cart-flatbed']" style="color:#222222;cursor: pointer;" @click="CheckCart()" />
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-warning px-2 pe-3" style="font-size:15px">{{ itemCount }}</span>
                </div>
              </li>

              <li>
                <div v-if="user">
                  <div v-if="user.photoURL">
                    <img :src="user.photoURL" alt="" class="rounded-circle  mx-auto d-block" style="width:32px;height:32px">
                  </div>
                  <div v-else>
                    <img src="../assets/image/noavata.png" alt="" class="rounded-circle  mx-auto d-block">
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </nav>
      </div>
      <!-- end right menu -->
    </div>

    <!-- click popup -->
    <div id=" demo" class="collapse position-fixed top-0 z-index-4">
      <div class=" demo-main position-relative p-5">
        <font-awesome-icon :icon="['fas', 'xmark']" class=" translate-middle  position-absolute  fs-2" data-bs-toggle="collapse" data-bs-target="#demo" style="cursor: pointer;" />
        <h3 class="text-white">Start typing and hit Enter</h3>
        <div class=" position-relative form-search mt-3">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="start-100 top-50 translate-middle  position-absolute pe-5" @click="searchItem()" style="cursor: pointer;" />
          <input v-model="searching" type="text" class="d-inline form-control border-bottom border-0 p-2 search" @keyup.enter="searchItem()" placeholder="Search anything" autofocus required>
        </div>
      </div>
    </div>
    <!-- end click popup -->
    <!-- popup -->
    <div id="demo" class="collapse position-fixed top-0 z-index-4 w-100">
      <div class="background-search" data-bs-toggle="collapse" data-bs-target="#demo"></div>
      <div class=" demo-main top-0 position-absolute p-5">
        <font-awesome-icon :icon="['fas', 'xmark']" class=" translate-middle  position-absolute  fs-2" data-bs-toggle="collapse" data-bs-target="#demo" style="cursor: pointer;" />
        <h3 class="text-white">Start typing and hit Enter</h3>
        <div class=" position-relative form-search mt-3">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="start-100 top-50 translate-middle  position-absolute pe-5" @click="searchItem()" style="cursor: pointer;" />
          <input v-model="searching" type="text" class="d-inline form-control border-bottom border-0 p-2 search" @keyup.enter="searchItem()" placeholder="Search anything" required autofocus>
        </div>
      </div>
    </div>
    <!-- end popup -->
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { useStore } from 'vuex'

export default {

  data() {
    return {
      searching: null,
      isActive: "home",
      like: null,
    }
  },
  setup() {
    const store = useStore();
    store.dispatch('favorite')
  },

  components: {
    // Search
  },
  methods: {
    CheckCart() {
      if (!this.isLoggedIn) {
        alert("Bạn cần đăng nhập để thêm vào giỏ hàng");
        this.$router.push("/login");
      } else {
        this.$router.push("/cart");
      }
    },
    // sign out when click button
    handleSignOut() {
      this.$swal({
        title: 'Are you sure?',
        text: "You really want to sign out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch('logout')
          this.$swal(
            'Logouted!',
            'Log out sucessfully!',
            'success'
          )
        }
      })
    },

    searchItem() {
      if (this.searching) {
        this.$router.push({ path: "/search", query: { name: this.searching } })
      }
    },

    activeNav(isActive) {
      this.isActive = isActive
    },
  },
  created() {
    this.$store.dispatch('checkLogged');
  },
  computed: {
    ...mapGetters(['itemCount']),
    ...mapState(['isLoggedIn', "user", 'wishList']),
    viewLike() {
      if (this.user) {
        const tmpfavorite = this.wishList.filter(item => item.email == this.user.email)
        if (tmpfavorite.length > 0) {
          return tmpfavorite[0].favoriteProduct.length
        }
      }
      return 0

    }
  },

  watch: {
    searching: {
      immediate: true,
      handler() {
        this.searchItem();
      }
    }
  }
}
</script>



<style>
ul>li>a {
  color: #222222 !important;
}

.left_menu>li {
  margin: 0 18px;
}

.left_menu>li>a {
  font-weight: bold;
  padding: 8px;
}

.left_menu>li>a>router-link {
  font-weight: bold;
  padding: 8px;

}

.left_menu>li>a:hover,
.left_menu>li>a.active {
  color: #fe8820 !important;
}


.bars {
  color: #222222;
}

.bars:focus {
  box-shadow: none;
}

.search:focus {
  box-shadow: none;
  border-width: 5px !important;
}

/* form search */
.background-search {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.demo-main {
  height: 200px;
  width: 100%;
  background-color: #ff6533;
}

.demo-main svg {
  right: 300px !important;
}



/*  */
@media only screen and (max-width: 14542px) {
  .form-search {
    width: 700px !important;
    margin-top: 20px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 900px) {
  .header {
    background-color: lightblue;
  }

  .form-search {
    width: 100% !important;
  }

  .demo-main svg {
    right: 30px !important;
  }

  .left_menu {
    display: inline;
    text-align: start;
    width: 100%;
  }

}
</style>