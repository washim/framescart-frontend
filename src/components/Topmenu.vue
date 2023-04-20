<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="/logo-light.png" alt="FramesCart Printing Services">
                <button class="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/about" class="nav-link">About</RouterLink>
                    </li>
                </ul>
            </div>
            <RouterLink to="/cart" class="btn btn-success"><i class="fa-solid fa-cart-shopping"></i> Cart ({{ cartTotalLength }})</RouterLink>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    beforeCreate() {
        this.$store.commit("initializeStore");
    },
    mounted() {
        this.cart = this.$store.state.cart;
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.length;
        }
    }
}
</script>