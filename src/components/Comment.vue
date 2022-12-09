<template>
    <div class="container my-5 p-5 bg-white  mx-auto ">

        <!-- input comment -->
        <form @submit.prevent="onSubmit">

            <div class="row">

                <!-- input -->
                <div class="col-lg-5 p-3 mb-5">
                    <div class="row d-flex align-items-center">
                        <div class="col-lg-3 col-md-3 col-3" v-if="user">
                            <div v-if="user.photoURL">
                                <img :src="user.photoURL" alt="" class="rounded-circle w-50 float-end image_avata_comment ">
                            </div>
                            <div v-else>
                                <img src="../assets/image/noavata.png" alt="" class="rounded-circle w-50 float-end image_avata_comment ">
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-3" v-else>
                            <img src="../assets/image/noaccount.png" alt="" class="rounded-circle w-50 float-end image_avata_comment ">
                        </div>
                        <div class="col-lg-9 col-md-9 col-9 ps-0">
                            <star-rating :star-size="20" :show-rating="false" :rating="rating" @update:rating="setRating" inactive-color="#222" active-color="#fe8820" :rounded-corners="true"
                                style="padding-left:12px" />

                            <input type="text" name="txtcomment" id="txtcomment" class="form-control w-100 border-0 inputComment" placeholder="Enter your comment..." v-model="textComment" autofocus
                                autocomplete="off">
                            <div class="mt-2">
                                <button class="float-end btn btn-dark rounded-pill text-capitalize px-3 btn-text" type="submit" :disabled="!textComment">post comment</button>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- content -->
                <div class="col-lg-7 ">
                    <div class="row bg-light shadow py-5 mb-3" v-for="comment in dataComment" :key="comment.id">
                        <div class="col-lg-2 col-md-2 col-3">
                            <div v-if="comment.avata">
                                <img :src="comment.avata" alt="" class="rounded-circle w-200 float-end image_avata_comment">
                            </div>
                            <div v-else>
                                <img src="../assets/image/noavata.png" alt="" class="rounded-circle w-100 float-end image_avata_comment">
                            </div>
                        </div>
                        <div class="col-lg-10 col-md-10 col-9">
                            <div class="text-start" style="font-size:13px">
                                <p class="m-0 fw-bold">{{ comment.displayName }}</p>
                                <span class="mb-0 mt-2">{{ comment.date }}</span>
                                <star-rating :star-size="15" :show-rating="false" :rating="comment.rating" :rounded-corners="true" active-color="#fe8820" class=" pe-none" />
                            </div>
                            <p class="text-start mt-3 mb-0">{{ comment.commentContent }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<script>

import StarRating from 'vue-star-rating'
import axios from 'axios';
import { format, formatDistance, subDays } from 'date-fns'
import { mapState } from 'vuex';
import { APIURL } from "@/constant"
export default {

    components: {
        StarRating
    },

    data() {
        return {
            format,
            formatDistance, subDays,
            textComment: "",
            rating: 5,
        }
    },

    methods: {
        async onSubmit() {
            if (this.user) {
                const comment = {
                    displayName: this.user.displayName,
                    idProduct: this.$route.params.id,
                    commentContent: this.textComment,
                    date: format(new Date(), "dd-MM-yyyy "),
                    rating: this.rating,
                    avata: this.user.photoURL
                }

                await axios.post(`${APIURL}/comment`, comment)
                this.rating = 5
                this.textComment = '';
            } else {
                alert("You need to login before commenting")
                this.$router.push("/login");
            }
        },
        loadComment() {
            this.$store.dispatch("loadcomment", this.$route.params.id)
        },

        setRating(rating) {
            this.rating = rating;
        }

    },

    computed: {
        ...mapState(['user']),
        dataComment() {
            return this.$store.state.comment;
        }

    },

    watch: {
        textComment: {
            immediate: true,
            handler() {
                this.loadComment();
            }
        }
    }
}

</script>

<style>
.inputComment {
    border-radius: 0;
    border-bottom: 1px solid #7b7b7b !important;
}



.inputComment:focus {
    box-shadow: none;
    border-width: 3px !important;
}

.image_avata_comment {
    image-rendering: crisp-edges;
}

@media only screen and (max-width: 900px) {
    .image_avata_comment {
        width: 100% !important;
    }

    .inputComment {
        margin-bottom: 8px;
    }


}

@media only screen and (max-width: 376px) {

    .inputComment {
        font-size: 12px;
        margin-bottom: 8px;
    }

    .btn-text {
        font-size: 10px;
        letter-spacing: 1px;
    }


}

@media only screen and (min-width: 992px) {
    .image_avata_comment {
        width: 60% !important;
    }
}
</style>