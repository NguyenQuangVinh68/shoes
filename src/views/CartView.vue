<template>
    <div class="container my-5">
        <div class="row " v-if="itemCount">
            <div class="col-lg-9 shadow py-4 bg-white rounded">
                <div class="row fw-bold menu_cart">
                    <div class="col-lg-11 col-md-11">
                        <div class="row">
                            <div class="col-lg-4 col-md-2">Image</div>
                            <div class="col-lg-2 col-md-3">Product Name</div>
                            <div class="col-lg-2 col-md-2">Price</div>
                            <div class="col-lg-2 col-md-3">Quantity</div>
                            <div class="col-lg-2 col-md-2">Cost</div>
                        </div>
                    </div>
                    <div class="col-lg-1 col-md-1"></div>
                </div>
                <CartItem class="mb-3" v-for="item in cart" :key="item.id" :item="item" />

            </div>
            <div class=" ps-5 col-lg-3 check-out">
                <div class="card border-0 shadow p-5">
                    <div class="card-content">
                        <div class="card-text">
                            <h5>Total Cart is : ${{ cart_total.toFixed(2) }}</h5>
                            <router-link to="/check_out">
                                <button type="button" class="btn btn-info px-4 py-3 w-100 fs-5 text-white">Check out</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <h3 class="alert alert-danger" v-else>Mời bạn mua hàng</h3>

        <!-- về trang để mua hàng -->
        <div class="mt-5">
            <router-link to="/collections" class="mt-5">
                <button class="btn btn-dark text-uppercase py-3 px-4">Continue shopping</button>
            </router-link>
        </div>
    </div>



</template>

<script>
import { mapGetters } from "vuex";
import CartItem from "../components/cart/CartItem.vue"

export default {
    name: "CartView",
    components: {
        CartItem,
    },
    computed: {
        ...mapGetters(['cart', 'cart_total', 'itemCount']),
    }
}
</script>

<style>
@media only screen and (max-width: 768px) {
    .menu_cart {
        display: none;

    }

    .check-out {
        padding: 0px !important;
        margin-top: 10px;
    }
}

@media only screen and (max-width: 992px) {
    .check-out {
        padding: 0px !important;
        margin-top: 10px;
    }
}
</style>