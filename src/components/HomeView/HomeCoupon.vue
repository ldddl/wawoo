<template>
  <section class="container mb-5">
    <div class="coupon-band d-flex justify-content-between align-items-center gap-3 p-4 p-md-5">
      <div>
        <p class="coupon-kicker mb-2">LIMITED OFFER</p>
        <h2 class="coupon-h2 mb-2 fw-bold">Woo！限量 Coupon 大放送</h2>
        <p class="mb-0 opacity-75">即日起憑專屬優惠券預約，即可享有精美小禮物乙份</p>
      </div>
      <RouterLink to="/coupons" class="btn btn-primary fw-bold px-4 py-3 text-nowrap">
        立即領取
      </RouterLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.coupon-band {
  background: $secondary;
  color: $ink;
}

.coupon-kicker {
  letter-spacing: 0.28em;
  font-size: 0.75rem;
  color: $primary;
}

.coupon-h2 {
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  @include md {
    font-size: 1.75rem;
  }
}
</style>
