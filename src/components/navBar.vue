<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-paper border-bottom border-secondary">
    <div class="container py-1">
      <RouterLink
        :to="{ name: 'home' }"
        class="navbar-brand d-flex align-items-center gap-2 text-primary m-0 py-2"
        aria-label="回到首頁"
        @click="handleHomeClick"
      >
        <span class="brand-mark" :style="maskStyle(logo)" aria-hidden="true"></span>
        <span class="d-flex flex-column lh-1">
          <span class="font-brand fw-bold fs-4">瓦屋</span>
          <span class="brand-en">WAWOO</span>
        </span>
      </RouterLink>
      <button
        class="navbar-toggler border-0"
        type="button"
        aria-controls="navbarSupportedContent"
        :aria-expanded="isNavbarOpen"
        aria-label="切換選單"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div ref="navbarCollapse" class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-lg-auto mb-3 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link fw-medium" @click="closeNavbar">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link fw-medium" @click="closeNavbar">
              產品
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link fw-medium" @click="closeNavbar">
              品牌
            </RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center gap-3 pb-3 pb-lg-0">
          <RouterLink
            to="/coupons"
            class="nav-icon"
            :style="maskStyle(ticketIcon)"
            aria-label="優惠券"
            @click="closeNavbar"
          ></RouterLink>
          <RouterLink to="/cart" class="nav-icon-wrap" aria-label="購物車" @click="closeNavbar">
            <span class="nav-icon" :style="maskStyle(cartIcon)"></span>
            <span v-if="cartCount > 0" class="nav-cart-count">{{ cartCount }}</span>
          </RouterLink>
          <button
            type="button"
            class="nav-icon-wrap btn p-0 border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            aria-label="最愛收藏"
            @click="closeNavbar"
          >
            <span class="nav-icon" :style="maskStyle(favoriteIcon)"></span>
            <span v-if="favoriteCount > 0" class="nav-cart-count">{{ favoriteCount }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div
    class="offcanvas offcanvas-end bg-paper"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header border-bottom border-secondary">
      <h5 class="offcanvas-title font-brand text-primary" id="offcanvasRightLabel">最愛收藏</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="關閉"
      ></button>
    </div>
    <div class="offcanvas-body">
      <p v-if="isFavoriteEmpty" class="mb-0 opacity-75">目前還沒有收藏的商品</p>
      <template v-else>
        <ul class="list-unstyled favorite-list mb-3">
          <li v-for="item in favoriteItems" :key="item.id" class="favorite-item">
            <RouterLink
              :to="{ name: 'products' }"
              class="favorite-item__link"
              data-bs-dismiss="offcanvas"
            >
              <img
                :src="item.imageUrl || fallbackImage"
                :alt="item.title"
                class="favorite-item__img"
              />
              <div class="favorite-item__text">
                <p class="favorite-item__title mb-1">{{ item.title }}</p>
                <p class="favorite-item__meta mb-0">
                  {{ item.category }}
                  <span v-if="item.price">・${{ Math.round(item.price).toLocaleString() }}</span>
                </p>
              </div>
            </RouterLink>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="removeFavorite(item.id)"
            >
              移除
            </button>
          </li>
        </ul>
        <button type="button" class="btn btn-outline-primary btn-sm w-100" @click="clearFavorites">
          清空收藏
        </button>
      </template>
    </div>
  </div>

  <main class="site-main flex-grow-1">
    <router-view></router-view>
  </main>
</template>

<script>
import { Collapse } from 'bootstrap'
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import logo from '@/assets/logo.svg'
import ticketIcon from '@/assets/icons/icon_ticketsvg.svg'
import cartIcon from '@/assets/icons/shopping_cart.svg'
import favoriteIcon from '@/assets/icons/favorite.svg'

export default {
  data() {
    return {
      logo,
      ticketIcon,
      cartIcon,
      favoriteIcon,
      bsNavbarCollapse: null,
      isNavbarOpen: false,
      fallbackImage:
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop'
    }
  },
  computed: {
    ...mapState(useCartStore, ['cartCount']),
    ...mapState(useFavoriteStore, {
      favoriteItems: 'items',
      favoriteCount: 'count',
      isFavoriteEmpty: 'isEmpty'
    })
  },
  watch: {
    '$route.fullPath'() {
      this.closeNavbar()
    }
  },
  methods: {
    ...mapActions(useCartStore, ['getCart']),
    ...mapActions(useFavoriteStore, ['removeFavorite', 'clearFavorites']),
    maskStyle(src) {
      return {
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`
      }
    },
    toggleNavbar() {
      this.bsNavbarCollapse?.toggle()
    },
    closeNavbar() {
      this.bsNavbarCollapse?.hide()
    },
    onNavbarShown() {
      this.isNavbarOpen = true
    },
    onNavbarHidden() {
      this.isNavbarOpen = false
    },
    handleHomeClick() {
      this.closeNavbar()
      this.goHome()
    },
    goHome() {
      if (this.$route.name !== 'home') return
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      })
    }
  },
  mounted() {
    const collapseElement = this.$refs.navbarCollapse
    this.bsNavbarCollapse = new Collapse(collapseElement, { toggle: false })
    collapseElement.addEventListener('shown.bs.collapse', this.onNavbarShown)
    collapseElement.addEventListener('hidden.bs.collapse', this.onNavbarHidden)
    this.getCart(true)
  },
  beforeUnmount() {
    const collapseElement = this.$refs.navbarCollapse
    collapseElement?.removeEventListener('shown.bs.collapse', this.onNavbarShown)
    collapseElement?.removeEventListener('hidden.bs.collapse', this.onNavbarHidden)
    this.bsNavbarCollapse?.dispose()
  }
}
</script>

<style lang="scss" scoped>
.brand-mark {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-block;
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

.brand-en {
  margin-top: 0.35rem;
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  color: $ink;
  opacity: 0.55;
}

.nav-icon-wrap {
  position: relative;
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  background-color: $ink;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: $primary;
  }
}

.nav-icon-wrap:hover .nav-icon {
  background-color: $primary;
}

.nav-cart-count {
  position: absolute;
  top: -0.4rem;
  right: -0.5rem;
  min-width: 1rem;
  height: 1rem;
  padding: 0 0.2rem;
  border-radius: 999px;
  background-color: $primary;
  color: $paper;
  font-size: 0.625rem;
  line-height: 1rem;
  text-align: center;
  font-weight: 700;
}

.favorite-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid $secondary;
}

.favorite-item__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
  text-decoration: none;
  color: inherit;
}

.favorite-item__img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border: 1px solid $secondary;
  flex-shrink: 0;
  background: #fff;
}

.favorite-item__title {
  font-weight: 700;
  letter-spacing: 0.04em;
  color: $ink;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.favorite-item__meta {
  font-size: 0.85rem;
  color: rgba($ink, 0.7);
}

.navbar {
  backdrop-filter: blur(8px);
}
</style>
