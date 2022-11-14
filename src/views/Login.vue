<template>
    <div class="container login my-5">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div class="card p-5 border-0">
                    <h5 class="mb-5 fw-bold">Sign in Sebird</h5>
                    <p><input class="form-control" type="text" placeholder="Email" v-model="email"></p>
                    <p><input class="form-control" type="password" placeholder="Password" v-model="password"></p>
                    <p v-if="error" class="text-danger">{{ error }}</p>
                    <p><button class="btn btn-info w-100 text-light" @click="signIn">Sign in</button></p>
                    <p><button class="btn btn-success w-100" @click="signInWithGoogle">Sign in with google</button></p>
                </div>

            </div>
            <div class="col-lg-12 col-md-12">
                <div class="card mt-3 border-0">
                    <p class="m-0 p-3">New to Sebird?
                        <router-link to="/register" class="text-decoration-none">Create an Account</router-link>
                    </p>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref("")

const store = useStore()
const router = useRouter()

const signIn = async () => {
    try {
        await store.dispatch('login', {
            email: email.value,
            password: password.value
        })
        router.push('/')
    }
    catch (err) {
        switch (err.code) {
            case 'auth/invalid-email':
                error.value = 'Invalid email'
                break
            case 'auth/user-not-found':
                error.value = 'No account with that email was found'
                break
            case 'auth/wrong-password':
                error.value = 'Incorrect password'
                break
            default:
                error.value = 'Email or password was incorrect'
                break
        }
    }
}

const signInWithGoogle = async () => {
    try {
        await store.dispatch('signupWithGoogle')
        router.push('/')
    }
    catch (err) {
        error.value = err.message
    }
}

</script>


<style>
@media only screen and (max-width: 14540px) {
    .login {
        width: 400px;
    }
}
</style>