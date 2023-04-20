<script setup>
import { RouterView } from 'vue-router';
import Topmenu from './Topmenu.vue';
</script>

<template>
    <div class="wrapper">
        <Topmenu />
        <div class="container">
            <div class="content-wrapper mt-3">
                <RouterView :key="$route.path"/>
            </div>
        </div>
        <footer class="bg-dark text-center text-white">
            <div class="container p-4 pb-0">
                <section class="mb-4">
                    <img src="/logo-light.png"/>
                </section>
            </div>
            <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                &copy; 2023-2024 - All rights reserved by FramesCart Printing Services
            </div>
        </footer>
    </div>
</template>