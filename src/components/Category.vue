<template>

    <div class="col-lg-4  col-md-4 mb-4 category">
        <div class="card border-0 shadow w-100 cartegory-box">
            <img :src=" require (`@/assets/image/products/${product.image}`)" class="card-img-top w-100 rounded img " alt="...">
            <div class="card-body text-category">
                <h5 class="card-title">{{product.name}}</h5>
                <router-link class="nav-link explore" to="/collections">
                    Explore <i class="fa-solid fa-arrow-right"></i>
                </router-link>
                <!-- <a class="nav-link explore">Explore <i class="fa-solid fa-arrow-right"></i></a> -->
            </div>
        </div>
    </div>
</template>

<script>


export default {
    props: ['product'],
}
</script>

<style>
/* hover image in category */
.cartegory-box {
    overflow: hidden;
}

.cartegory-box img {
    background-size: cover;
    overflow: hidden;
    transition: 1s;
    box-sizing: content-box;

}

.cartegory-box img:hover {
    transform: scale(1.1);
    transition: 0.5s;
}

.text-category {
    position: absolute;
    bottom: 0;
    left: 0;
    clip-path: polygon(0 0, 76% 0, 100% 100%, 0 100%);
    background: #222;
    max-width: 410px px;
    padding: 20px 40px;
    width: 100%;

    color: white;
    text-align: left;
    transition: 0.8s ease-in-out;
    clip-path: polygon(0 0, 76% 0, 100% 100%, 0 100%);
}


.explore {
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 600;
}
</style>