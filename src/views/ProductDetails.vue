<template>
    <div class="row" v-if="product">
        <div class="col-12 col-sm-6 col-md-5">
            <div class="row">
                <div class="col-12 mb-1">
                    <img :src="main_image" alt="Gallery image 1" class="product-main-gallery w-100" />
                </div>
            </div>
            <div class="row">
                <div class="col-2 my-1" v-for="thumbnail in product.product_images">
                    <a href="#">
                        <img :src="thumbnail.photo_url" :alt="thumbnail.caption" style="width:50px; height: 60px;" @click="getMainImage($event)"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-7">
            <div class="ps-lg-3">
                <h4 class="title text-dark">{{ product.name }}</h4>
                <div class="d-flex flex-row my-3">
                    <div class="text-warning mb-1 me-2">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span class="ms-1">4.5</span>
                    </div>
                    <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>Free Shiping</span>
                    <span class="text-success fw-bold ms-2">In stock</span>
                </div>
                <div class="mb-3">
                    <span class="h5">₹{{ product.selling_price }}</span>
                    <span class="text-muted">/per item</span>
                </div>
                <p>{{ product.description }}</p>

                <div class="row">
                    <dt class="col-3">Type:</dt>
                    <dd class="col-9">Regular</dd>

                    <dt class="col-3">Color</dt>
                    <dd class="col-9">Brown</dd>

                    <dt class="col-3">Material</dt>
                    <dd class="col-9">Cotton, Jeans</dd>

                    <dt class="col-3">Brand</dt>
                    <dd class="col-9">Reebook</dd>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4 col-6 mb-3">
                        <label class="mb-2 d-block">Quantity</label>
                        <div class="input-group mb-3" style="width: 170px;">
                            <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon1"
                                data-mdb-ripple-color="dark" @click="decreament"><i class="fas fa-minus"></i></button>
                            <input type="text" class="form-control text-center border border-secondary" :value="quantity">
                            <button class="btn btn-white border border-secondary px-3" type="button" id="button-addon2"
                                data-mdb-ripple-color="dark" @click="increament"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                <a href="#" class="btn btn-success shadow-0">Buy now</a> <a href="#" class="btn btn-primary shadow-0" @click="addToCartItem()"><i class="me-1 fa fa-shopping-basket"></i>Add to cart</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            quantity: 1,
            product: null,
            main_image: null,
            loading: true,
            errored: false
        }
    },
    methods: {
        getProduct(pid) {
            axios
                .get(`/api/v1/products/${pid}/`)
                .then(response => {
                    this.product = response.data;
                    this.main_image = this.product.product_images[0].photo_url;
                })
                .catch(error => {
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        addToCartItem() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1;
            }

            const item = {
                product_id: this.product.id,
                quantity: this.quantity
            }

            this.$store.commit("addToCart", item);
        },
        increament() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1;
            } else {
                this.quantity += 1;
            }
        },
        decreament() {
            if (isNaN(this.quantity) || this.quantity <= 1) {
                this.quantity = 1;
            } else {
                this.quantity -= 1;
            }
        },
        getMainImage(event) {
            this.main_image = event.target.src;
        }
    },
    mounted() {
        this.getProduct(this.$route.params.pid);
    }
}
</script>