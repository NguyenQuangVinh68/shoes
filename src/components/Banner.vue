<template>
    <!-- banner -->

    <div class="container-fluid ">
        <div class="row">
            <div class="col-lg-6 col-md-6 p-0">
                <div class="text-uppercase">
                    <div class="img_banner">
                        <img src="../assets/image/banner1.jpg" alt="" class="w-100">
                        <div class="box-text">
                            <h1 class="text-white " style=" letter-spacing:2.5px">Women's</h1>
                            <button type="button" class="btn btn-outline-light text-uppercase px-5 py-3 fw-light">Shop now</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- men -->
            <div class="col-lg-6 col-md-6 p-0">
                <div class="text-uppercase">
                    <div class="img_banner">
                        <img src="../assets/image/banner2.jpg" alt="" class="w-100">
                        <div class="box-text">
                            <h1 class="text-white " style=" letter-spacing:2.5px">men's</h1>
                            <button type="button" class="btn btn-outline-light text-uppercase px-5 py-3 fw-light">Shop now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>   

<style>
/* banner */

.img_banner {
    overflow: hidden !important;
    position: relative;
    width: 100%;
    height: 100%;
}

.box-text {
    position: absolute;
    bottom: -35%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: 0.8s ease-in-out;
}
</style>
