<template>
    <div class="row d-flex align-items-center p-3">
        <div class="col-lg-2 col-md-2 position-relative p-0">
            <img :src="require (`@/assets/image/products/${product.image}`)" alt="" class="w-100 rounded-3 border">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{{product.quantity}}</span>
        </div>
        <div class="col-lg-5 col-md-5 text-start ">{{ product.name }}</div>
        <div class="col-lg-5 col-md-5 text-end">${{ product_cost.toFixed(2) }}</div>
    </div>
</template>



<script>

export default {
    props: ["product"],
    computed: {
        product_cost() {
            if (this.product.sale != 0) {
                return (((100 - this.product.sale) / 100) * this.product.price) * this.product.quantity
            }
            return this.product.price * this.product.quantity
        }
    },
}
</script>