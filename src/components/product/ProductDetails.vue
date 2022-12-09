<template>
    <div class="container-fluid my-5" v-if="product">
        <div class="card shadow border-0 p-5">
            <div class="row">
                <div class="col-lg-5 col-md-5 pe-5 pb-3 image-product__detail">
                    <div class="card-content shadow">
                        <img :src="require(`@/assets/image/products/${product.image}`)" alt="" class="w-100">
                    </div>
                </div>
                <div class="col-lg-7 col-md-7 text-start">
                    <h3>{{ product.name }}</h3>
                    <star-rating :star-size="20" :rating="averageRating" :show-rating="false" :increment="0.5" inactive-color="#222" active-color="#fe8820" :rounded-corners="true"
                        class="mb-3 pe-none"></star-rating>
                    <div>
                        <p class="m-0" v-if="product.sale != 0">
                            <s class="old-price fs-6 fw-bold text-secondary">${{ product.price.toFixed(2) }}</s>
                            <span class="fw-bolder fs-6 price">&ensp;${{ (((100 - product.sale) / 100) * product.price).toFixed(2) }}</span>
                        </p>
                        <p class="m-0" v-else>
                            <span class="fw-bolder fs-6 price">${{ product.price.toFixed(2) }}</span>
                        </p>
                    </div>
                    <p>{{ product.description }}</p>
                    <p>Likes: {{ viewAllLikeDetaile }}</p>
                    <button :disabled="product.checkStock" type="button" class="btn btn-primary px-3 py-2" @click="addToCart(product)">Add to Cart</button>
                    <!-- like -->
                    <button class="btn btn-danger px-3 py-2 ms-3" @click="addToFavorite()" v-if="!viewLike">
                        <font-awesome-icon :icon="['fas', 'heart']" />
                    </button>
                    <button class="btn btn-danger px-3 py-2 ms-3 " @click="removeFavorites()" v-else>
                        <font-awesome-icon :icon="['fas', 'heart-crack']" />
                    </button>
                </div>
            </div>
        </div>

        <!-- comment -->

        <Comment />

    </div>
    <div v-else class="text-danger">Loading product item ...</div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { useStore } from 'vuex'
import StarRating from 'vue-star-rating'
import { APIURL } from "@/constant";
import Comment from "../Comment.vue"

export default {
    data() {
        return {
            rating: 5,
        }
    },

    setup() {
        const store = useStore();
        // 
        store.dispatch('favorite')
    },

    components: {
        Comment,
        StarRating
    },

    created() {
        this.$store.dispatch('getProductsById', this.$route.params.id);
        this.$store.dispatch("loadcomment", this.$route.params.id);
    },

    methods: {
        addToCart(product) {

            const itemCurrentInCart = this.cart.find(item => item.id == product.id)

            if (this.$store.state.isLoggedIn) {
                // nếu có thì kiểm tra kĩ hơn 1 xíu
                // nếu không tôn tại thì vẫn được qua, bởi nếu số lượng tồn trong data mà hết thì sẽ không vào trang
                // nếu trường hợp có tình vào trang bằng url thì cũng đã có ràng buộc disabled = checkStock
                if (itemCurrentInCart) {
                    if (itemCurrentInCart.stock != 0) {
                        this.$store.commit("addToCart", product)
                    } else {
                        itemCurrentInCart.checkStock == true
                        console.log(this.cart);
                        alert("Quantity buy bigger than stock")
                    }
                } else {
                    this.$store.commit("addToCart", product)
                }
            } else {
                alert("You need to login before add to cart")
                this.$router.push("/login")
            }
        },
        // addToCart(product) {
        //     if (this.$store.state.isLoggedIn) {
        //         this.$store.commit("addToCart", product)
        //         this.$router.push("/cart")
        //     } else {
        //         alert("Bạn cần đăng nhập khi mua hàng")
        //         this.$router.push("/login")
        //     }
        // },

        async addToFavorite() {
            if (this.user == null) {
                alert("You need to login before like")
                this.$router.push("/login")
                return
            } else {
                const tmpfavorite = this.wishList.filter(item => item.email == this.user.email);

                this.isFavorite = true;
                if (tmpfavorite != '' || tmpfavorite.length != 0) {
                    tmpfavorite[0].favoriteProduct.push({ isFavorite: true, iditem: this.product.id })
                    await axios.put(`${APIURL}/wishList/${tmpfavorite[0].id - 1}`, tmpfavorite[0])
                    return
                } else {
                    const like = {
                        email: this.user.email,
                        favoriteProduct: [
                            {
                                isFavorite: this.isFavorite,
                                iditem: this.product.id
                            }
                        ],
                    }
                    alert("add to favorites sucessfully")
                    await axios.post(`${APIURL}/wishList`, like)
                    this.$router.go(-1)
                    return
                }
            }
        },
        async removeFavorites() {
            const tmpfavorite = this.wishList.filter(item => item.email == this.user.email);
            if (tmpfavorite != '') {
                tmpfavorite[0].favoriteProduct = tmpfavorite[0].favoriteProduct.filter(item => item.iditem != this.$route.params.id)
                await axios.put(`${APIURL}/wishList/${tmpfavorite[0].id}`, tmpfavorite[0])
            }
        }
    },

    computed: {
        ...mapState(['product', 'user', 'wishList', 'cart', "comment"]),
        viewLike() {
            if (this.user) {
                const tmpfavorite = this.wishList.filter(item => item.email == this.user.email)
                if (tmpfavorite.length > 0) {
                    const currentFavorite = tmpfavorite[0].favoriteProduct.find(item => item.iditem == this.$route.params.id)
                    if (currentFavorite) {
                        return currentFavorite.isFavorite;
                    }
                    return false
                }
                return false
            }
            return false
        },

        viewAllLikeDetaile() {
            const tmpProducts = [...this.wishList];
            let count = 0;

            tmpProducts.filter(item => {
                if (item.favoriteProduct.some(itemfavorite => itemfavorite.iditem == this.$route.params.id)) {
                    count++;
                }
            })
            return count;
        },
        averageRating() {
            let average = 0
            let sumRating = 0
            if (this.comment) {
                const tmpComment = this.comment.filter(item => item.idProduct == this.$route.params.id)
                if (tmpComment.length > 0) {
                    tmpComment.forEach(element => {
                        sumRating += element.rating
                    })
                    average = sumRating / tmpComment.length
                    return average
                }
                return 0
            }
            return 0
        }
    },
}

</script>

<style>
@media only screen and (max-width: 768px) {
    .image-product__detail {
        padding-right: 0px !important;

    }
}
</style>