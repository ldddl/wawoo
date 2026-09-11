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
      <div class="flex-grow-1 d-flex flex-column">
        <div class="row g-3">
          <div class="col-md-6 col-lg-4" v-for="product in pagedProducts" :key="product.id">
            <div
              class="product-card h-100 d-flex flex-column"
              role="button"
              tabindex="0"
              @click="openProductModal(product)"
              @keyup.enter="openProductModal(product)"
            >
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
                    class="btn fw-bold"
                    :class="isFavorite(product.id) ? 'btn-primary' : 'btn-outline-primary'"
                    @click.stop="toggleFavorite(product)"
                  >
                    {{ isFavorite(product.id) ? '已收藏' : '加入最愛' }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary fw-bold"
                    @click.stop="openProductModal(product)"
                  >
                    詳細資訊
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="isLoaded && !pagedProducts.length" class="text-center opacity-75 py-5 mb-0">
          此分類目前沒有商品
        </p>
        <nav
          v-if="filteredProducts.length"
          class="product-pagination"
          aria-label="商品分頁"
        >
          <ul class="pagination mb-0 justify-content-center flex-wrap">
            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
              <button
                type="button"
                class="page-link"
                :disabled="currentPage <= 1"
                @click="goPage(currentPage - 1)"
              >
                上一頁
              </button>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
            >
              <button type="button" class="page-link" @click="goPage(page)">
                {{ page }}
              </button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
              <button
                type="button"
                class="page-link"
                :disabled="currentPage >= totalPages"
                @click="goPage(currentPage + 1)"
              >
                下一頁
              </button>
            </li>
          </ul>
          <p class="product-pagination__meta mb-0 mt-2 text-center small opacity-75">
            共 {{ filteredProducts.length }} 筆，每頁 {{ pageSize }} 筆
          </p>
        </nav>
      </div>
    </div>

    <div
      ref="productModal"
      class="modal fade"
      id="productDetailModal"
      tabindex="-1"
      aria-labelledby="productDetailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content" v-if="selectedProduct">
          <div class="modal-header">
            <h2 class="modal-title fs-4 fw-bold" id="productDetailModalLabel">
              {{ selectedProduct.title }}
            </h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row g-4">
              <div class="col-md-6">
                <div
                  v-if="productImages.length > 1"
                  :id="`productCarousel-${selectedProduct.id}`"
                  class="carousel slide product-media"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-indicators">
                    <button
                      v-for="(image, index) in productImages"
                      :key="`indicator-${index}`"
                      type="button"
                      :data-bs-target="`#productCarousel-${selectedProduct.id}`"
                      :data-bs-slide-to="index"
                      :class="{ active: index === 0 }"
                      :aria-current="index === 0 ? 'true' : undefined"
                      :aria-label="`Slide ${index + 1}`"
                    ></button>
                  </div>
                  <div class="carousel-inner">
                    <div
                      v-for="(image, index) in productImages"
                      :key="`image-${index}`"
                      class="carousel-item"
                      :class="{ active: index === 0 }"
                    >
                      <img :src="image" class="product-media__image" :alt="selectedProduct.title" />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    :data-bs-target="`#productCarousel-${selectedProduct.id}`"
                    data-bs-slide="prev"
                  >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    :data-bs-target="`#productCarousel-${selectedProduct.id}`"
                    data-bs-slide="next"
                  >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
                <div v-else class="product-media">
                  <img
                    :src="productImages[0] || fallbackImage"
                    class="product-media__image"
                    :alt="selectedProduct.title"
                  />
                </div>
              </div>
              <div class="col-md-6 d-flex flex-column">
                <p class="product-category mb-2">{{ selectedProduct.category }}</p>
                <div class="d-flex align-items-baseline flex-wrap gap-2 mb-3">
                  <p class="product-price mb-0">
                    ${{ Math.round(selectedProduct.price).toLocaleString() }}
                  </p>
                  <p
                    v-if="
                      selectedProduct.origin_price &&
                      selectedProduct.origin_price !== selectedProduct.price
                    "
                    class="product-origin-price mb-0"
                  >
                    ${{ Math.round(selectedProduct.origin_price).toLocaleString() }}
                  </p>
                </div>
                <p class="product-desc mb-4">{{ selectedProduct.description }}</p>
                <div class="mt-auto">
                  <div class="qty-control d-flex align-items-center mb-3">
                    <button
                      type="button"
                      class="btn btn-outline-primary qty-control__btn"
                      :disabled="qty <= 1"
                      @click="decreaseQty"
                    >
                      -
                    </button>
                    <input
                      v-model.number="qty"
                      type="number"
                      class="form-control qty-control__input text-center mx-2"
                      min="1"
                      :max="maxQty"
                      @change="clampQty"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-primary qty-control__btn"
                      :disabled="qty >= maxQty"
                      @click="increaseQty"
                    >
                      +
                    </button>
                  </div>
                  <div
                    class="product-subtotal d-flex justify-content-between align-items-center mb-3"
                  >
                    <span>小計（{{ qty }} 件）</span>
                    <strong>${{ Math.round(totalPrice).toLocaleString() }}</strong>
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary fw-bold py-3 w-100"
                    :disabled="isAddingCart"
                    @click="addToCart"
                  >
                    {{ isAddingCart ? '加入中...' : '加入購物車' }}
                  </button>
                </div>
              </div>
            </div>
            <div v-if="selectedProduct.content" class="mt-4">
              <h3 class="fs-5 fw-bold mb-2">商品詳情</h3>
              <div class="product-content">{{ selectedProduct.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref="cartToast"
        class="toast cart-toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header cart-toast__header">
          <strong class="me-auto text-paper fw-bold">{{ toastTitle }}</strong>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body fw-bold">{{ toastMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Modal, Toast } from 'bootstrap'
import { mapActions } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
const { VITE_URL, VITE_PATH } = import.meta.env
const PAGE_SIZE = 6

export default {
  data() {
    return {
      isAddingCart: false,
      isLoaded: false,
      products: [],
      pageSize: PAGE_SIZE,
      categories: ['客廳', '房間', '廚房', '衛浴'],
      selectedProduct: null,
      qty: 1,
      maxQty: 99,
      bsProductModal: null,
      bsCartToast: null,
      toastTitle: '',
      toastMessage: '',
      fallbackImage:
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop'
    }
  },
  computed: {
    activeCategory() {
      return this.$route.query.category || ''
    },
    filteredProducts() {
      if (!this.activeCategory) return this.products
      return this.products.filter((item) => item.category === this.activeCategory)
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize))
    },
    currentPage() {
      const page = Number(this.$route.query.page)
      if (!Number.isInteger(page) || page < 1) return 1
      if (!this.isLoaded) return page
      return Math.min(page, this.totalPages)
    },
    pagedProducts() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredProducts.slice(start, start + this.pageSize)
    },
    productImages() {
      if (!this.selectedProduct) return []
      const list = [this.selectedProduct.imageUrl, ...(this.selectedProduct.imagesUrl || [])]
      return list.filter((url) => url)
    },
    totalPrice() {
      if (!this.selectedProduct) return 0
      return this.selectedProduct.price * this.qty
    }
  },
  watch: {
    '$route.query.page'() {
      this.clampPage()
    },
    totalPages() {
      this.clampPage()
    }
  },
  methods: {
    ...mapActions(useCartStore, ['getCart']),
    ...mapActions(useFavoriteStore, ['toggleFavorite', 'isFavorite']),
    getProducts() {
      axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
        .then((res) => {
          const raw = res.data.products
          this.products = Array.isArray(raw) ? raw : Object.values(raw || {})
          this.isLoaded = true
          this.clampPage()
        })
        .catch(() => {
          this.products = []
          this.isLoaded = true
        })
    },
    productsQuery(page) {
      const query = {}
      if (this.activeCategory) query.category = this.activeCategory
      if (page > 1) query.page = String(page)
      return query
    },
    goPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      this.$router.push({ name: 'products', query: this.productsQuery(page) })
    },
    clampPage() {
      if (!this.isLoaded || !this.$route.query.page) return
      const page = Number(this.$route.query.page)
      if (!Number.isInteger(page) || page < 1) {
        this.$router.replace({ name: 'products', query: this.productsQuery(1) })
        return
      }
      if (page > this.totalPages) {
        this.$router.replace({ name: 'products', query: this.productsQuery(this.totalPages) })
      }
    },
    openProductModal(product) {
      this.selectedProduct = product
      this.qty = 1
      this.$nextTick(() => {
        if (!this.bsProductModal) {
          this.bsProductModal = new Modal(this.$refs.productModal)
        }
        this.bsProductModal.show()
      })
    },
    showToast(title, message) {
      this.toastTitle = title
      this.toastMessage = message
      this.$nextTick(() => {
        if (!this.bsCartToast) {
          this.bsCartToast = new Toast(this.$refs.cartToast)
        }
        this.bsCartToast.show()
      })
    },
    decreaseQty() {
      if (this.qty > 1) {
        this.qty -= 1
      }
    },
    increaseQty() {
      if (this.qty < this.maxQty) {
        this.qty += 1
      }
    },
    clampQty() {
      if (!this.qty || this.qty < 1) {
        this.qty = 1
        return
      }
      if (this.qty > this.maxQty) {
        this.qty = this.maxQty
      }
    },
    addToCart() {
      if (!this.selectedProduct || this.isAddingCart) return
      this.isAddingCart = true
      const data = {
        product_id: this.selectedProduct.id,
        qty: this.qty
      }
      axios
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data })
        .then(() => this.getCart(true))
        .then(() => {
          this.isAddingCart = false
          if (this.bsProductModal) {
            this.bsProductModal.hide()
          }
          this.showToast('加入成功', '商品已加入購物車')
        })
        .catch(() => {
          this.isAddingCart = false
          this.showToast('加入失敗', '請稍後再試')
        })
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
  cursor: pointer;
  transition: border-color 0.15s ease;
  overflow: hidden;

  &:hover {
    border-color: $primary;

    .product-card__image {
      transform: scale(1.06);
    }
  }
}

.product-card__image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid $secondary;
  transition: transform 0.35s ease;
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

.product-media {
  border: 1px solid $secondary;
  background: #fff;
  overflow: hidden;
}

.product-media__image {
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
  @include md {
    height: 280px;
  }
}

.product-category {
  letter-spacing: 0.08em;
  opacity: 0.7;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: $primary;
}

.product-origin-price {
  font-size: 1rem;
  opacity: 0.55;
  text-decoration: line-through;
}

.product-subtotal {
  padding: 0.75rem 0;
  border-top: 1px solid $secondary;
  color: $ink;
  letter-spacing: 0.04em;

  strong {
    font-size: 1.25rem;
    color: $primary;
  }
}

.product-desc {
  opacity: 0.75;
  line-height: 1.6;
}

.product-content {
  opacity: 0.75;
  line-height: 1.7;
  white-space: pre-line;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: brightness(0) invert(1);
}

.carousel-indicators [data-bs-target] {
  background-color: $paper;
}

.qty-control__btn {
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
}

.qty-control__input {
  max-width: 4.5rem;
  height: 2.75rem;
}

.cart-toast {
  border: 1px solid $secondary;
  background: $paper;
  color: $ink;
}

.cart-toast__header {
  background: $primary;
  border-bottom: none;
}

.product-pagination {
  margin-top: auto;
  padding-top: 1.5rem;
}

.page-link {
  color: $ink;
  border-color: $secondary;
}

.page-item.active .page-link {
  background-color: $primary;
  border-color: $primary;
  color: $paper;
}

.page-item.disabled .page-link {
  color: rgba($ink, 0.4);
}
</style>
