<template>
    <div class="container mt-5">
        <div v-if="viewWishList.length > 0">
            <div class="row ">
                <div class="col-lg-3 col-md-3 col-3 fw-bold border py-3">Image</div>
                <div class="col-lg-3 col-md-3 col-4 fw-bold border py-3">Name</div>
                <div class="col-lg-3 col-md-3 col-3 fw-bold border py-3">Price</div>
                <div class="col-lg-3 col-md-3 col-2 fw-bold border py-3"></div>
            </div>
            <div class="mt-5 container">
                <div class="row">
                    <FavoritesItem v-for="item in viewWishList" :key="item.id" :product="item" />
                </div>
                <router-link to="/collections">
                    <button class="btn btn-dark text-uppercase py-3 px-4">Continue shopping</button>
                </router-link>
            </div>
        </div>
        <div v-else>
            <h3 class="text-uppercase alert alert-danger">Not wish list</h3>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import FavoritesItem from "../components/favorites/FavoritesItem.vue"
export default {

    components: {
        FavoritesItem
    },

    computed: {
        ...mapState(['products', 'wishList', 'user']),
        viewWishList() {
            if (this.user) {
                const tmpfavorite = this.wishList.filter(item => item.email == this.user.email)
                if (tmpfavorite.length > 0) {
                    const whishlist = tmpfavorite[0].favoriteProduct.filter(item => item.iditem)
                    if (whishlist) {
                        console.log(this.products.filter(item => whishlist.some(i => item.id == i.iditem)));
                        return this.products.filter(item => whishlist.some(i => item.id == i.iditem))
                    }
                }
            }
            return null
        }

    }

}
</script>