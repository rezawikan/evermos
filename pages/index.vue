<script>
import { mapActions, mapGetters } from 'vuex'
import ProductList from '~/components/product/product-list.vue'
export default {
  components: {
    ProductList,
  },
  data() {
    return {}
  },
  head() {
    return {
      title: 'Product List',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find the popular products in here',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/products/products',
    }),
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    ...mapActions({
      getProducts: 'products/products/getProducts',
    }),
  },
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <div class="featured-title">
          <h2>Popular Products</h2>
          <p>Find the popular products in here</p>
        </div>
        <ProductList :data="products" />
      </div>
      <div class="col-md-12 col-xs-12">
        <div class="paginations">
          <div class="column">
            <ul class="pages">
              <li class="active"><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li>...</li>
              <li><a href="#">12</a></li>
            </ul>
          </div>
          <div class="column next-button">
            <a class="next" href="#"
              >Next&nbsp;<i class="bx bx-right-arrow-alt"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
