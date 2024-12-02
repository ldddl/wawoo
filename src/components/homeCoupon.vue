<template>
  <div class="container mb-4 p-0">
    <div class="d-flex justify-content-between align-items-center bg-secondary p-4">
      <div class="d-flex flex-column me-2 me-md-0">
        <h2 class="coupon-h2 mb-2 fw-bold">Woo ! 限量 Coupon 大放送 !!!</h2>
        <p>即日起，憑專屬優惠券預約，即可享有精美小禮物乙份！</p>
      </div>
      <RouterLink to="/coupons" class="
      button-font-hover 
      btn btn-primary 
      fw-bolder fs-4 
      d-flex justify-content-center align-items-center
      flex-column
      flex-md-row
      p-2 rounded">
        <p class="coupon-font">立即</p>
        <p class="coupon-font">領取</p>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .coupon-font {
    white-space: nowrap;
  }
  .coupon-h2 {
    font-size: 1rem;
    @include md {
      font-size: 2rem;
    }
  }
</style>