<template>
  <div class="container py-4 py-md-5">
    <CheckoutSteps current="complete" />
    <div class="complete-card text-center p-4 p-md-5">
      <h1 class="font-brand text-primary fw-bold mb-3">訂單已建立</h1>
      <p class="complete-card__text mb-2">感謝你的訂購，瓦屋會盡快為你準備。</p>
      <p v-if="orderId" class="mb-1">訂單編號：{{ orderId }}</p>
      <p v-if="totalDisplay !== null" class="complete-card__total fw-bold mb-4">
        應付金額：${{ totalDisplay.toLocaleString() }}
      </p>
      <div class="d-flex flex-column flex-sm-row justify-content-center gap-2">
        <RouterLink to="/" class="btn btn-outline-primary fw-bold">回首頁</RouterLink>
        <RouterLink to="/products" class="btn btn-primary fw-bold">繼續購物</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutSteps from '@/components/CheckoutSteps.vue'

export default {
  name: 'OrderCompleteView',
  components: { CheckoutSteps },
  computed: {
    orderId() {
      return this.$route.query.orderId || ''
    },
    totalDisplay() {
      const value = this.$route.query.total
      if (value === undefined || value === '') return null
      return Math.round(Number(value))
    }
  }
}
</script>

<style lang="scss" scoped>
.complete-card {
  border: 1px solid $secondary;
  background: #fff;
}

.complete-card__text {
  opacity: 0.75;
  letter-spacing: 0.04em;
}

.complete-card__total {
  color: $primary;
  font-size: 1.25rem;
}
</style>
