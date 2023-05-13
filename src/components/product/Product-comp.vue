<template>
  <div class="col-lg-3 col-md-4 mb-4 ">
    <div class="card border-0 shadow position-relative overflow-hidden m-sm-0 m-4 ">
      <router-link class="nav-link " :to="`/product-details/${product.id}`">
        <!-- <img :src=" require (`@/assets/image/products/${product.image}`)" class="card-img-top w-1000  mx-auto d-block " alt="..."> -->
        <img :src="require(`@/assets/image/products/${product.image}`)" class="card-img-top w-75 rounded mx-auto d-block mt-4" alt="...">
        <figure class="label-sale" v-if="product.sale != 0">
          <span>-{{ product.sale }}%</span>
        </figure>
        <div class="card-body ">
          <h5 class="card-title fw-bold">{{ product.name }}</h5>
          <div class="card-text">
            <div>
              <p class="m-0" v-if="product.sale != 0">
                <s class="old-price fs-6 fw-bold text-secondary">${{ product.price.toFixed(2) }}</s>
                <span class="fw-bolder fs-6 price">&ensp;${{ (((100 - product.sale) / 100) * product.price).toFixed(2) }}</span>
              </p>
              <p class="m-0" v-else>
                <span class="fw-bolder fs-6 price">${{ product.price.toFixed(2) }}</span>
              </p>
            </div>
            <small>
              {{ product.description }}
            </small>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Product-comp',
  props: ['product'],

}
</script>

<style>
/* .OutOfStock {
  position: absolute;
  width: 100%;
  background: rgba(48, 48, 48, 0.759);
  height: 100%;
  cursor: not-allowed;
}

.OutOfStock h4 {
  width: 100%;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  font-weight: 600;
} */

.label-sale {
  position: absolute !important;
  width: 110px;
  top: 10px;
  right: -30px;

  color: #fff;
  background: #e12c43;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 5px 12px;
  transform: rotate(45deg);
  text-align: center;
}

.price {
  color: #fe8820 !important;
}
</style>