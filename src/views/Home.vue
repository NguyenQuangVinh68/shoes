<template>
    <Banner />
    <!-- category -->
    <div class=" container-fluid mt-4">
        <div class="row" v-if="productsCategory.length">
            <Category v-for="(item, index) in productsCategory" :key="index" :product="item" />
        </div>
        <div v-else>Loading Category ... </div>
    </div>
    <!-- list product -->
    <div class="container mt-5">
        <h3 class="text-center text-uppercase fw-bolder mb-3">OUR BEST SELLER</h3>

        <ul class="nav  title-tab justify-content-center mb-5">
            <li class="nav-item px-2 mb-2">
                <a data-toggle="tab" style="cursor: pointer;" class=" ds-prod-1" @click="viewProductByCollection('new arrivals')" :class="{ active: isActive == 'new arrivals' }">NEW ARRIVALS</a>
            </li>
            <li class="nav-item px-2 mb-2">
                <a data-toggle="tab" style="cursor: pointer;" class=" ds-prod-1" @click="viewProductByCollection('best sellers')" :class="{ active: isActive == 'best sellers' }">BEST SELLERS</a>
            </li>
            <li class="nav-item px-2 mb-2">
                <a data-toggle="tab" style="cursor: pointer;" class=" ds-prod-1" @click="viewProductByCollection('top rates')" :class="{ active: isActive == 'top rates' }">TOP RATES</a>
            </li>
        </ul>
        <div class="row" v-if="products.length">
            <Product v-for="(item, index) in ListProduct()" :key="index" :product="item" />
        </div>
        <div v-else>Loading products ... </div>

    </div>

    <!-- near footer -->
    <div class="container-fluid " style="padding: 80px 0;margin-top:60px;background-image: url('https://cdn.shopify.com/s/files/1/0560/3137/9504/files/ba7.jpg?v=1647242990');">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-6">
                    <img src="../assets/image/near-footer1.png" alt="" class="w-100">
                </div>
                <div class="col-12 col-md-12 col-lg-6">
                    <div class="context-near_footer text-start mt-5">
                        <p style="color: #ff871d" class="fs-4">Saving 50%</p>
                        <h3 class="text-white fw-bold fs-1">All Online Store</h3>
                        <p class="text-white fs-4 text-uppercase mb-5">Offer Available All Shoes & Products</p>
                        <button class="btn btn-light rounded-0 text-uppercase px-5 py-3 fw-light">Shop now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Product from "../components/product/Product-comp.vue";
import Banner from "../components/Banner.vue"
import Category from "../components/Category.vue"
import { mapGetters, mapState } from "vuex";
import { useStore } from 'vuex'

export default {
    name: "HomeView",
    components: {
        Product,
        Banner,
        Category
    },
    data() {
        return {
            isActive: "new arrivals"
        }
    },
    setup() {
        const store = useStore();
        store.dispatch('favorite')
    },
    methods: {
        viewProductByCollection(textCollection) {

            if (textCollection == "best sellers") {
                this.isActive = textCollection
                return
            }

            if (textCollection == "top rates") {
                this.isActive = textCollection
                return
            }
            this.isActive = textCollection
        },
        ListProduct() {
            const limit = 8;
            if (this.isActive == "new arrivals") {
                const tmpNewArrivals = [...this.products];
                const start = tmpNewArrivals.length - limit;
                return tmpNewArrivals.slice(start, tmpNewArrivals.length);
            }
            else if (this.isActive == "best sellers") {
                const tmpBestSallers = [...this.products];
                tmpBestSallers.sort((a, b) => {
                    return a.stock < b.stock ? 1 : -1;
                })
                return tmpBestSallers.slice(0, limit);

            }
            else if (this.isActive == "top rates") {
                const tmpTopRates = [...this.products];
                tmpTopRates.sort((a, b) => {
                    return a.price < b.price ? 1 : -1;
                })
                return tmpTopRates.slice(0, limit);
            }
            // const tmpProducts = this.products.filter(item => {
            //     return item.category.includes(this.isActive)
            // })
            // return tmpProducts
        }
    },
    computed: {
        ...mapGetters(['productsCategory']),
        ...mapState(['products']),
    },
    created() {
        this.$store.dispatch('getAllProducts')
        this.$store.dispatch('getProductCategory')
    },

    // theo dõi sự thay đổi của this.isActive
    watch: {
        isActive: {
            immediate: true,
            handler() {
                this.ListProduct();
            }
        }
    }


}
</script>

<style>
.context-near_footer .btn:hover {
    background-color: #ff871d !important;
    color: #ffffff;
}

.ds-prod-1 {
    display: inline-block;
    font-size: 13px;
    text-transform: uppercase;
    text-decoration: none;
    min-width: 110px;
    height: 42px;
    line-height: 40px;
    border: 1px solid #ff871d !important;
    color: #ff871d !important;
    font-weight: 500;
    text-align: center;
    padding: 0 15px;
    transition: all .25s linear 0s;
    -webkit-transition: all .25s linear 0s;
}

.ds-prod-1:hover,
.ds-prod-1.active {
    color: #ffffff !important;
    background-color: #ff871d;
}

@media only screen and (max-width: 991px) {
    .context-near_footer {
        text-align: center !important;
    }
}
</style>