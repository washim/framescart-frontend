<template>
  <section v-if="errored">
    <div class="row">
      <div class="cl-md-12">We're sorry, we're not able to retrieve this information at the moment, please try back later
      </div>
    </div>
  </section>
  <section v-else>
    <div class="row" v-if="loading">
      <div class="cl-md-12">
        <div class="spinner-border" role="status">
          <span class="visually-hidden"></span>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12 col-sm-6 col-md-4 mb-3" v-for="product in products">
        <div class="card">
          <img v-if="product.product_images[0]" :src="product.product_images[0].photo_url" class="card-img-top">
          <div class="card-body">
            <div class="d-flex flex-row">
              <h5 class="card-title me-1">₹{{ product.selling_price }}</h5>
              <span class="text-danger"><s>₹{{ product.mrp }}</s></span>
            </div>
            <p class="card-text">{{ product.name }}</p>
          </div>
          <div class="card-footer p-3">
            <RouterLink :to="{name: 'product-details', params: {pid: product.id}}" class="btn btn-success shadow-0 me-1">View</RouterLink>
            <a href="#!" class="btn btn-primary shadow-0 me-1">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: null,
      loading: true,
      errored: false
    }
  },
  methods: {
    getAllProducts() {
      axios
      .get("/api/v1/products/")
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        this.errored = true
      })
      .finally(() => this.loading = false)
    }
  },
  mounted() {
    this.getAllProducts();
  }
}
</script>