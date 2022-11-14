<template>
    <ul class="pagination d-flex justify-content-center">
        <li class="page-item" v-show="currentPage > 1 "><a class="page-link" href="#" @click="previous(currentPage-1)">Previous</a></li>
        <li class="page-item" v-if="currentPage  < getTotalPage"><a class="page-link" href="#" @click="next(currentPage+1)">Next</a></li>
    </ul>
    <span>{{currentPage}} of {{getTotalPage}}</span>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            // currentPage: 1,
            visible: false,
        }
    },
    methods: {
        previous(currentPage) {
            this.$store.commit('VISIBLE_PRODUCTS', currentPage)
        },
        next(currentPage) {
            this.$store.commit('VISIBLE_PRODUCTS', currentPage)
        },
    },
    computed: {
        ...mapGetters(['getTotalPage']),
        ...mapState(['currentPage']),
    },
    created() {
        this.$store.dispatch("getVisibleProducts")
    }
}
</script>