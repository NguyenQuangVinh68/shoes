<template>
    <div class="col-lg-12 col-md-12 col-12 mb-3">
        <div class="row d-flex align-items-center">
            <div class="col-lg-3 col-md-3 col-3 ">
                <img :src="require(`@/assets/image/products/${product.image}`)" alt="" class="w-50">
            </div>
            <div class="col-lg-3 col-md-3 col-4 ">
                <router-link :to="`/product-details/${product.id}`" class="text-decoration-none fw-bold text-black">
                    <span>{{ product.name }}</span>
                </router-link>
            </div>
            <div class="col-lg-3 col-md-3 col-3 ">
                <div>
                    <p class="m-0" v-if="product.sale != 0">
                        <s class="old-price fs-6 fw-bold text-secondary">${{ product.price.toFixed(2) }}</s>
                        <span class="fw-bolder fs-6 price">&ensp;${{ (((100 - product.sale) / 100) * product.price).toFixed(2) }}</span>
                    </p>
                    <p class="m-0" v-else>
                        <span class="fw-bolder fs-6 price">${{ product.price.toFixed(2) }}</span>
                    </p>
                </div>
            </div>
            <div class="col-lg-3 col-md-3 col-2 " @click="removeFavorites(product.id)">
                <font-awesome-icon :icon="['fas', 'xmark']" class="removeItemFavorite" />
            </div>
        </div>
    </div>

</template>

<script>

import axios from "axios"
import { mapState } from "vuex";

export default {
    props: ['product'],

    methods: {
        async removeFavorites(id) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(result => {
                if (result.isConfirmed) {
                    const tmpfavorite = this.wishList.filter(item => item.email == this.user.email);
                    if (tmpfavorite != '') {
                        tmpfavorite[0].favoriteProduct = tmpfavorite[0].favoriteProduct.filter(item => item.iditem != id)
                        axios.put(`http://localhost:3000/wishList/${tmpfavorite[0].id}`, tmpfavorite[0])
                    }
                    this.$swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
            // const tmpfavorite = this.wishList.filter(item => item.email == this.user.email);
            // if (tmpfavorite != '') {
            //     tmpfavorite[0].favoriteProduct = tmpfavorite[0].favoriteProduct.filter(item => item.iditem != id)
            //     await axios.put(`http://localhost:3000/wishList/${tmpfavorite[0].id}`, tmpfavorite[0])
            // }
        }
    },
    computed: {
        ...mapState(['wishList', 'user'])
    }
}
</script>

<style>
.removeItemFavorite:hover {
    color: #ff871d !important;
    transition: 0.2s ease-in-out;
}

.removeItemFavorite {
    cursor: pointer;
    transition: 0.2s ease-in-out;
}
</style>