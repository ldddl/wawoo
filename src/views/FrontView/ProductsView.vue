<template>
  <div class="container py-4 py-md-5">
    <div class="d-flex flex-column flex-md-row gap-4">
      <aside class="category-nav">
        <ul class="list-unstyled m-0">
          <li>
            <RouterLink
              to="/products"
              class="category-link"
              :class="{ 'is-active': !activeCategory }"
            >
              全部商品
            </RouterLink>
          </li>
          <li v-for="category in categories" :key="category">
            <RouterLink
              :to="`/products?category=${category}`"
              class="category-link"
              :class="{ 'is-active': activeCategory === category }"
            >
              {{ category }}
            </RouterLink>
          </li>
        </ul>
      </aside>
      <div class="flex-grow-1">
        <div class="row g-3">
          <div class="col-md-6 col-lg-4" v-for="product in products" :key="product.id">
            <div class="product-card h-100 d-flex flex-column">
              <img
                :src="product.imageUrl || fallbackImage"
                class="product-card__image"
                :alt="product.title"
              />
              <div class="p-3 d-flex flex-column flex-grow-1">
                <h3 class="fs-5 fw-bold d-flex align-items-center flex-wrap gap-2 mb-2">
                  {{ product.title }}
                  <span class="badge-clay">{{ product.category }}</span>
                </h3>
                <p class="product-card__text mb-3">{{ product.description }}</p>
                <div class="d-flex justify-content-between gap-2 mt-auto">
                  <button
                    type="button"
                    class="btn btn-outline-primary fw-bold"
                    @click.once="addFavorite(product.id)"
                  >
                    加入最愛
                  </button>
                  <RouterLink :to="`/product/${product.id}`" class="btn btn-primary fw-bold">
                    詳細資訊
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      addFavorite_productId: [],
      categories: ['客廳', '房間', '廚房', '衛浴'],
      fallbackImage:
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop'
    }
  },
  computed: {
    activeCategory() {
      return this.$route.query.category || ''
    }
  },
  watch: {
    '$route.query': {
      handler() {
        this.getProducts()
      },
      deep: true
    }
  },
  methods: {
    getProducts() {
      const { category = '' } = this.$route.query
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products?category=${category}`).then((res) => {
        this.products = res.data.products
      })
    },
    addFavorite(productId) {
      this.addFavorite_productId.push(productId)
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.category-nav {
  @include md {
    width: 10.5rem;
    flex-shrink: 0;
  }
}

.category-link {
  display: block;
  padding: 0.7rem 0.85rem;
  border-bottom: 1px solid $secondary;
  color: $ink;
  letter-spacing: 0.08em;

  &:hover,
  &.is-active {
    background: $primary;
    color: $paper;
    border-color: $primary;
  }
}

.product-card {
  background: #fff;
  border: 1px solid $secondary;
}

.product-card__image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid $secondary;
}

.product-card__text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 4.5em;
  line-height: 1.5em;
  opacity: 0.75;
}

.badge-clay {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  background: $secondary;
  color: $ink;
  padding: 0.2rem 0.5rem;
}
</style>
