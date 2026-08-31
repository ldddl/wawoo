<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-paper border-bottom border-secondary">
    <div class="container py-1">
      <RouterLink
        :to="{ name: 'home' }"
        class="navbar-brand d-flex align-items-center gap-2 text-primary m-0 py-2"
        aria-label="回到首頁"
        @click="goHome"
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
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="切換選單"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-lg-auto mb-3 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link fw-medium">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link fw-medium">產品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link fw-medium">品牌</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center gap-3 pb-3 pb-lg-0">
          <RouterLink
            to="/coupons"
            class="nav-icon"
            :style="maskStyle(ticketIcon)"
            aria-label="酷彭"
          ></RouterLink>
          <RouterLink to="/login" class="nav-icon" :style="maskStyle(personIcon)" aria-label="會員登入"></RouterLink>
          <a href="#" class="nav-icon" :style="maskStyle(cartIcon)" aria-label="購物車"></a>
          <button
            type="button"
            class="nav-icon btn p-0 border-0"
            :style="maskStyle(favoriteIcon)"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            aria-label="最愛收藏"
          ></button>
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
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="關閉"></button>
    </div>
    <div class="offcanvas-body">
      <p class="mb-0 opacity-75">目前還沒有收藏的物件</p>
    </div>
  </div>

  <main class="site-main flex-grow-1">
    <router-view></router-view>
  </main>
</template>

<script>
import logo from '@/assets/logo.svg'
import ticketIcon from '@/assets/icons/icon_ticketsvg.svg'
import personIcon from '@/assets/icons/person.svg'
import cartIcon from '@/assets/icons/shopping_cart.svg'
import favoriteIcon from '@/assets/icons/favorite.svg'

export default {
  data() {
    return { logo, ticketIcon, personIcon, cartIcon, favoriteIcon }
  },
  methods: {
    maskStyle(src) {
      return {
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`
      }
    },
    goHome() {
      if (this.$route.name !== 'home') return
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      })
    }
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

.navbar {
  backdrop-filter: blur(8px);
}
</style>
