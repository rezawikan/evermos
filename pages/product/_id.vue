<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  head() {
    return {
      title: this.product?.product_name,
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
      product: 'products/products/product',
    }),

    discountPrice() {
      return (
        this.product.price - (this.product.price * this.product.discount) / 100
      )
    },
    productStar() {
      return Math.ceil(
        this.product.reviews
          .map((item) => item.star)
          .reduce((a, b) => a + b, 0) / this.product.reviews.length
      )
    },
  },
  mounted() {
    this.getProduct(this.$route.params.id)

    const activeImage = document.querySelector('.product-image .active')
    const productImages = document.querySelectorAll('.image-list img')

    productImages.forEach((image) => {
      image.addEventListener('click', function (e) {
        e.target.classList.add('active')
        activeImage.src = e.target.src
      })
    })
  },
  destroyed() {
    const activeImage = document.querySelector('.product-image .active')
    const productImages = document.querySelectorAll('.image-list img')

    productImages.forEach((image) =>
      image.removeEventListener('click', function (e) {
        activeImage.src = e.target.src
      })
    )
  },
  methods: {
    ...mapActions({
      getProduct: 'products/products/getProduct',
    }),
    openTab(event, id) {
      const tabcontent = document.getElementsByClassName('tab-content')
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active')
        console.log(tabcontent[i].className)
      }

      const tablinks = document.getElementsByClassName('tab-link')
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active')
      }

      document.getElementById(id).classList.add('active')
      event.currentTarget.classList.add('active')
    },

    selectImage(e) {
      const activeImage = document.querySelector('.product-image .active')
      const productImages = document.querySelectorAll('.image-list img')

      for (let i = 0; i < productImages.length; i++) {
        productImages[i].classList.remove('active')
      }

      e.target.classList.add('active')
      activeImage.src = e.target.src
    },
  },
}
</script>

<template>
  <section class="product-detail">
    <div class="container-fluid menu-back">
      <div class="row">
        <div class="col-md-12">
          <div class="icon-back">
            <NuxtLink to="/"
              ><h2>
                <i class="bx bx-arrow-back"></i> <span>Back</span>
              </h2></NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="product">
      <div class="row">
        <div class="col-md-12">
          <div class="rating-summaries mobile">
            <div class="rating-stars">
              <i class="icon-star filled"></i><i class="icon-star filled"></i
              ><i class="icon-star filled"></i><i class="icon-star filled"></i
              ><i class="icon-star"></i>
            </div>
            <span class="text-muted"
              >{{ this.productStar }}| {{ product.reviews.length }} customer
              reviews</span
            >
          </div>
          <h2 class="product-title mobile">{{ product.product_name }}</h2>
          <span class="product-price mobile">
            <del class="text-muted">${{ product.price }}</del
            >&nbsp;${{ this.discountPrice }}
          </span>
        </div>
        <div class="col-md-4">
          <div class="product-gallery">
            <div class="product-image">
              <img
                class="active"
                :src="require(`~/assets/img/products/${product.images[0].url}`)"
                :alt="product.images[0].alt"
              />
            </div>
            <ul class="image-list">
              <li class="image-item">
                <img
                  v-for="image in product.images"
                  :key="image.url"
                  @click="selectImage($event)"
                  :src="require(`~/assets/img/products/${image.url}`)"
                  :alt="image.alt"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-7">
          <div class="rating-summaries">
            <div class="rating-stars">
              <i class="icon-star filled"></i><i class="icon-star filled"></i
              ><i class="icon-star filled"></i><i class="icon-star filled"></i
              ><i class="icon-star"></i>
            </div>
            <span class="text-muted"
              >{{ this.productStar }} | {{ product.reviews.length }} customer
              reviews</span
            >
          </div>
          <h2 class="product-title">{{ product.product_name }}</h2>
          <span class="product-price">
            <del class="text-muted">${{ product.price }}</del
            >&nbsp;${{
              product.price - (product.price * product.discount) / 100
            }}
          </span>
          <p class="product-brief">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
            voluptatibus quos ea dolore rem, molestias laudantium et explicabo
            assumenda fugiat deserunt in, facilis laborum excepturi aliquid
            nobis ipsam deleniti aut? Aliquid sit hic id velit qui fuga nemo
            suscipit obcaecati. Officia nisi quaerat minus nulla saepe aperiam
            sint possimus magni veniam provident.
          </p>
          <div class="row gutters-remove">
            <div class="col-sm-6 col-xs-6 gutters-remove">
              <div class="form-group">
                <label for="size">Size</label>
                <select class="form-control">
                  <option>Chooze size</option>
                  <option
                    v-for="variation in product.variations"
                    :key="variation"
                    :value="variation"
                  >
                    {{ variation }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 gutters-remove">
              <div class="form-group">
                <label for="quantity">Quantity</label>
                <select class="form-control">
                  <option value="0">0</option>
                  <option
                    v-for="index in product.stock"
                    :key="index"
                    :value="index"
                  >
                    {{ index }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="product-sku">
            <span class="text-medium">SKU:</span> {{ product.sku }}
          </div>
          <div class="product-category">
            <span class="text-medium">Categories:</span>
            {{ product.categories.toString() }}
          </div>

          <div class="product-actions">
            <div class="entry-share">
              <span class="text-muted">Share:</span>
              <div class="share-links">
                <a class="social-button shape-circle" href="#" title="Facebook"
                  ><i class="bx bxl-facebook"></i></a
                ><a class="social-button shape-circle" href="#" title="Twitter"
                  ><i class="bx bxl-twitter"></i></a
                ><a
                  class="social-button shape-circle"
                  href="#"
                  title="Instagram"
                  ><i class="bx bxl-instagram"></i
                ></a>
                <a class="social-button shape-circle" href="#" title="WhatsApp"
                  ><i class="bx bxl-whatsapp"></i
                ></a>
              </div>
            </div>
            <div class="product-buttons">
              <button class="btn-wishlist">
                <i class="icon-heart"></i>
              </button>
              <button class="btn-detail">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <!-- Tab links -->
          <div class="tab">
            <div class="tab-link active" @click="openTab($event, 'main-desc')">
              Description
            </div>
            <div class="tab-link" @click="openTab($event, 'reviews')">
              Reviews
            </div>
          </div>

          <!-- Tab content -->
          <div id="main-desc" class="tab-content active">
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              voluptatibus quos ea dolore rem, molestias laudantium et explicabo
              assumenda fugiat deserunt in, facilis laborum excepturi aliquid
              nobis ipsam deleniti aut? Aliquid sit hic id velit qui fuga nemo
              suscipit obcaecati. Officia nisi quaerat minus nulla saepe aperiam
              sint possimus magni veniam provident.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
              voluptatibus quos ea dolore rem, molestias laudantium et explicabo
              assumenda fugiat deserunt in, facilis laborum excepturi aliquid
              nobis ipsam deleniti aut? Aliquid sit hic id velit qui fuga nemo
              suscipit obcaecati. Officia nisi quaerat minus nulla saepe aperiam
              sint possimus magni veniam provident.
            </p>
          </div>

          <div id="reviews" class="tab-content">
            <h3>Reviews</h3>
            <div
              v-for="review in product.reviews"
              :key="review.title"
              class="comment"
            >
              <div class="comment-author-ava">
                <img
                  :src="require(`~/assets/img/users/${review.ava_image}`)"
                  alt="Review author"
                />
              </div>
              <div class="comment-body">
                <div class="comment-header">
                  <h4 class="comment-title">{{ review.title }}</h4>
                  <div class="rating-summaries">
                    <div class="rating-stars">
                      <i
                        v-for="item in 5"
                        :key="item"
                        class="icon-star"
                        :class="item <= review.star ? 'filled' : ''"
                      ></i>
                      <!-- <i class="icon-star filled"></i
                      ><i class="icon-star filled"></i><i class="icon-star"></i
                      ><i class="icon-star"></i> -->
                    </div>
                  </div>
                </div>
                <p class="comment-text">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga.
                </p>
                <div class="comment-footer">
                  <span class="comment-meta">Francis Burton</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
