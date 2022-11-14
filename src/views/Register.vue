<template>
    <div class="container login my-5">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div class="card p-5 border-0">
                    <h5 class="mb-5 fw-bold">Sign up Sebird</h5>
                    <p><input class="form-control" type="text" placeholder="Email" v-model="email" required></p>
                    <p><input class="form-control" type="password" placeholder="Password" v-model="password" required></p>
                    <!-- <p v-if="errMsg">{{errMsg}}</p> -->
                    <p><button class="btn btn-info w-100 text-light" @click="register">Sign up</button></p>
                    <p><button class="btn btn-success w-100" @click="signInWithGoogle">Sign up with google</button></p>
                </div>
            </div>
        </div>
        <div v-if="error">{{error}}</div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(null)

const store = useStore()
const router = useRouter()

const register = async () => {
    try {
        await store.dispatch('signup', {
            email: email.value,
            password: password.value
        })
        router.push('/login')
    }
    catch (err) {
        error.value = err.message
    }
}
const signInWithGoogle = async () => {
    try {
        await store.dispatch('signupWithGoogle')
        console.log("ok mầy");
        router.push('/')
    }
    catch (err) {
        error.value = err.message
    }
}
</script>

<style>
@media only screen and (max-width: 1400px) {
    .login {
        width: 400px;
    }
}
</style>