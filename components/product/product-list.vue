<script>
export default {
  props: {
    data: {
      default: null,
      required: true,
    },
  },
  methods: {
    discountPrice(item) {
      return item.price - (item.price * item.discount) / 100
    },
  },
}
</script>

<template>
  <div class="featured-product-list">
    <div class="product-card" v-for="item in data" :key="item.id">
      <div
        v-if="item.discount && item.stock > 0"
        class="product-badge text-red"
      >
        {{ item.discount }}% Off
      </div>
      <div v-if="item.stock == 0" class="product-badge text-muted">
        Out Of Stock
      </div>
      <a class="product-thumb" href="#"
        ><img
          :src="require(`~/assets/img/products/${item.images[0].url}`)"
          :alt="item.images[0].alt"
      /></a>
      <h3 class="product-title">
        <a href="#">{{ item.product_name }}</a>
      </h3>
      <h4 class="product-price" v-if="item">
        <del>${{ discountPrice(item) }}</del
        >${{ item.price }}
      </h4>
      <div class="product-buttons">
        <button class="btn-wishlist">
          <i class="icon-heart"></i>
        </button>

        <NuxtLink class="btn-detail" :to="`/product/${item.id}`" no-prefetch
          >View Detail</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
