<template>
  <div class="admin-layout min-vh-100 bg-paper">
    <header class="admin-header border-bottom border-secondary bg-white">
      <div class="container admin-header__top py-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div class="admin-brand">
          <p class="mb-0 text-primary letter-space">WAWOO ADMIN</p>
          <h1 class="h5 mb-0 font-brand text-primary">後台管理</h1>
        </div>
        <div class="admin-header__actions d-flex flex-wrap align-items-center gap-2">
          <RouterLink to="/" class="btn btn-outline-primary btn-sm fw-bold">回前台</RouterLink>
          <button type="button" class="btn btn-primary btn-sm fw-bold" @click="onLogout">登出</button>
        </div>
      </div>
      <div class="container pb-3">
        <nav class="admin-nav" aria-label="後台導覽">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="admin-nav-link"
            active-class="is-active"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </header>
    <main class="container admin-main py-3 py-md-4 py-lg-5">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'AdminView',
  data() {
    return {
      links: [
        { to: '/admin/products', label: '商品' },
        { to: '/admin/coupons', label: '優惠券' },
        { to: '/admin/orders', label: '訂單' }
      ]
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    onLogout() {
      this.logout().finally(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-header {
  position: sticky;
  top: 0;
  z-index: 1020;
}

.letter-space {
  letter-spacing: 0.28em;
  font-size: 0.65rem;

  @include sm {
    font-size: 0.7rem;
  }
}

.admin-header__actions {
  .btn {
    min-width: 4.5rem;
  }
}

.admin-nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;

  @include md {
    display: flex;
    flex-wrap: wrap;
  }
}

.admin-nav-link {
  display: block;
  text-align: center;
  padding: 0.55rem 0.5rem;
  border: 1px solid $secondary;
  background: #fff;
  color: $ink;
  letter-spacing: 0.06em;
  text-decoration: none;
  font-size: 0.9rem;

  @include md {
    display: inline-block;
    padding: 0.45rem 0.85rem;
    font-size: 1rem;
  }

  &.is-active,
  &:hover {
    background: $primary;
    border-color: $primary;
    color: $paper;
  }
}

.admin-main {
  max-width: 100%;
}
</style>
