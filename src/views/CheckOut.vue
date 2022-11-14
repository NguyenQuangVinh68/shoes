<template>
    <div class="container my-5">
        <div class="row">
            <!-- left -->
            <div class="col-lg-7 mb-5">
                <h3 class="text-start mb-4">Sebird - Sports Shoes</h3>
                <div class="card border-0">
                    <div class="card-body">
                        <form @submit.prevent="submit">
                            <!-- username -->
                            <div>
                                <label class="form-label float-start text-secondary">User Name:</label>
                                <input v-model="order.username" type="text" class="form-control form-check" id="username" placeholder="User Name" required>
                                <!-- <input v-model="order.username" type="text" class="form-control form-check" id="username" placeholder="User Name" :value="getUser.displayName" required> -->
                            </div>
                            <div class="row mt-3">
                                <!-- email -->
                                <div class="col-lg-8 col-md-8 mb-3">
                                    <label class="form-label float-start text-secondary">Email:</label>
                                    <!-- <input v-model="order.email" type="email" class="form-control form-check" id="email" placeholder="Email" :value="getUser.email" required> -->
                                    <input v-model="order.email" type="email" class="form-control form-check" id="email" placeholder="Email" required>
                                </div>
                                <!-- phone -->
                                <div class="col-lg-4 col-md-4 mb-3">
                                    <label class="form-label float-start text-secondary">Phone:</label>
                                    <input v-model="order.phone" type="text" class="form-control form-check" id="phone" placeholder="Phone" required>
                                </div>
                            </div>
                            <div>
                                <label class="form-label float-start text-secondary">Address:</label>
                                <input v-model="order.address" type="text" class="form-control form-check" id="address" placeholder="Address" required>
                            </div>

                            <div class="text-start mt-3 ">
                                <button class="btn btn-info  w-25 ">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- right -->
            <div class="col-lg-5">
                <ItemCheckOut v-for="item in cart" :key="item.id" :product="item" />
                <hr>
                <div class="row">
                    <div class="col-lg-6 col-md-6 text-start fs-5 ">Total</div>
                    <div class="col-lg-6 col-md-6 text-end fw-bolder">${{ cart_total.toFixed(2) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns'
import { mapGetters, mapState } from 'vuex';
import ItemCheckOut from "../components/checkout/ItemCheckOut.vue"
import { APIURL } from "../constant"
export default {

    data() {
        return {
            format,
            order: {
                username: "",
                email: "",
                phone: "",
                address: "",
                billDate: "",
                productOrder: []
            }
        }
    },

    components: {
        ItemCheckOut
    },
    methods: {
        async submit() {
            try {
                /**
                 * get products lại bởi vì
                 *      + nếu khách hàng A cũng mua sẩn phẩm B mua, mà bên A đặt hàng trước 
                 *      => thì lúc này số lượng tồn trong kho của sản phẩm đó hết <=> stock == 0
                 *      => lúc này B mua thì cần phải thông báo cho họ biết
                 */
                const res = await axios.get(`${APIURL}/products`);
                const tmpProduct = res.data

                // kiểm tra để chắc chắn rằng đã get được data
                if (tmpProduct) {

                    // lọc những sản phẩm trùng với sản phẩm trong giỏ hàng và stock trong get data != 0
                    const data = this.cart.filter(itemCart => tmpProduct.some(item => item.id == itemCart.id && item.stock != 0))

                    // phải chắc chắn rằng mảng tồn tại
                    if (data.length > 0) {

                        // gắn product in cart vào order
                        this.order.productOrder = this.cart;
                        const { username, email, phone, address } = this.order
                        if (!username || !email || !phone || !address) {
                            alert("Not be blank")
                            return
                        }

                        data.forEach(element => {
                            axios.patch(`${APIURL}/products/${element.id}`, { stock: element.stock })
                        });

                        // post order in data

                        // get current date
                        this.order.billDate = format(new Date(), "yyyy-MM-dd");
                        await axios.post(`${APIURL}/orders/`, this.order)
                        this.$swal({
                            icon: 'success',
                            title: 'Order sucessfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$store.dispatch("clearCart");
                        this.$router.push("/");
                    } else {
                        alert("Sorry, The product is out of stock")
                        this.$store.dispatch("clearCart");
                        this.$router.push("/");
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }
    },
    computed: {
        ...mapGetters(['getUser', 'cart_total']),
        ...mapState(['cart', 'products']),
    },
    mounted() {
        if (this.getUser.displayName) {
            this.order.username = this.getUser.displayName;
        }
        this.order.email = this.getUser.email;
    }

}
</script>

<style>
.form-check:focus {
    box-shadow: none;
    border-color: #b8aa83 !important;
    border-width: 2px !important;
}
</style>