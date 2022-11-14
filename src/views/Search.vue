<template>
    <div class="container mb-5" style="margin-top:100px">
        <div v-if="filterProducts.length >0">
            <h4 class="mb-5">YOUR SEARCH FOR "{{keyword}}" REVEALED THE FOLLOWING:</h4>
            <div class="row">
                <ProductComp v-for="item in filterProducts" :key="item" :product="item" />
            </div>
        </div>
        <div v-else class="mt-5">
            <h4>YOUR SEARCH FOR "{{keyword}}" DID NOT YIELD ANY RESULTS.</h4>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import { mapState } from "vuex";
import ProductComp from "../components/product/Product-comp.vue"
export default {
    name: "Search",
    components: {
        ProductComp
    },

    setup() {
        return {
            keyword: ref("")
        }
    },
    methods: {
        search() {
            let textSearch = this.$route.query.name;
            this.$store.dispatch("filterSearch", textSearch)
        },
    },
    computed: {
        ...mapState(['filterProducts'])
    },
    watch: {
        $route: {
            immediate: true,
            // muốn chạy handler thì có immediate
            handler() {
                this.keyword = this.$route.query.name;
                this.search()
            }
        }
    }
}
</script>

<style>
.search:focus {
    box-shadow: none;
    border-width: 5px !important;
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

    .form-search {
        width: 100% !important;
    }
}
</style>