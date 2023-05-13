<template>
    <!-- <ProductComp /> -->
    .<div class="container-fluid  bg-white  ">
        <div class="row w-100 py-5">
            <div class="col-lg-3 col-md-2 col-12 plugin">
                <div class="card ps-3 border-0 position-relative">
                    <h5>Plugin</h5>
                    <div class="text-start mt-5 me-2">
                        <div class="widget-title">
                            <h2 class=" mb-0">Categories</h2>
                        </div>
                    </div>
                    <div class="text-start mt-5">
                        <div class="widget-title">
                            <h2 class=" mb-0">Size</h2>
                        </div>
                    </div>
                    <div class="text-start mt-5">
                        <div class="widget-title">
                            <h2 class=" mb-0">Color</h2>
                        </div>
                    </div>
                    <div class="text-start mt-5">
                        <div class="widget-title">
                            <h2 class=" mb-0">Tags</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-md-10 ">
                <div class="w-25 mb-4 ms-auto d-block">
                    <select v-model="StringSort" @change="changeLocation" class="form-select border-0 border-bottom focus-false" aria-label="Default select example">
                        <option :sort="true">Default sorting</option>
                        <option value="1">Price, low to high</option>
                        <option value="2">Price, high to low</option>
                        <option value="3">Alphabetically, A-Z</option>
                    </select>
                </div>
                <div class="row " v-if="visibleProducts.length">
                    <ProductComp v-for="item in changeLocation()" :key="item.id" :product="item" />
                </div>
                <div class="mb-5" v-else>Loading ...</div>
                <Pagination />
            </div>
        </div>
    </div>
</template>

<script>
import ProductComp from "../components/product/Product-comp.vue";
import Pagination from "../components/Pagination.vue"
import { mapState } from "vuex";
export default {
    data() {
        return {
            StringSort: "Default sorting",
        }
    },

    components: {
        ProductComp,
        Pagination
    },
    methods: {
        changeLocation() {
            console.log("sort", this.StringSort);
            if (this.StringSort == "Default sorting") {
                return this.visibleProducts
            }
            else if (this.StringSort == 1) {
                return this.visibleProducts.sort((a, b) => {
                    return a.price > b.price ? 1 : -1
                })
            }
            else if (this.StringSort == 2) {
                return this.visibleProducts.sort((a, b) => {
                    return a.price < b.price ? 1 : -1
                })
            } else {
                return this.visibleProducts.sort((a, b) => {
                    return a.name > b.name ? 1 : -1
                })

            }
        }
    },
    computed: {
        ...mapState(["visibleProducts"]),

    },
    created() {
        console.log("data");
        this.$store.dispatch("getAllProducts");
        this.$store.dispatch("getVisibleProducts", 0)
    }
}
</script>

<style>
.widget-title {
    padding: 6px 0 6px 14px;
    border-left: 3px solid #111111;
    position: relative;
}

.widget-title h2 {
    font-size: 15px;
    letter-spacing: 1.5px;
    font-weight: 500;
    text-transform: uppercase;
    background: #fff;
    position: relative;
    display: inline-block;
    padding-right: 15px;
}

@media only screen and ((max-width: 992px)) {
    .plugin {
        display: none;
    }

}
</style>