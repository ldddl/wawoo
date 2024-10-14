<script>
import homeBanner from '../components/homeBanner.vue'
import homeProductsView from '../components/homeProductsView.vue'
import homeCity from '../components/homeCity.vue'
export default {
  components: {
    homeBanner,
    homeProductsView,
    homeCity
  }
}
</script>

<template>
  
  <homeBanner />
  <homeCity />

  <div class="container mb-4 p-0">
    <div class="d-flex justify-content-between align-items-center bg-secondary p-4">
      <div class="d-flex flex-column me-2 me-md-0">
        <h2 class="coupon-h2 mb-2 fw-bold">Woo ! 限量 Coupon 大放送 !!!</h2>
        <p>即日起，憑專屬優惠券購買房產，即可享有最高折扣！</p>
      </div>
      <RouterLink to="/coupons" class="btn btn-primary button-font-hover fw-bolder fs-4 p-2 rounded">立即領取</RouterLink>
    </div>
  </div>
  <homeProductsView />
  <div class="container mb-4 p-0">
    <div class="coupon bg-image p-4 d-flex flex-column text-center position-relative">
      <div class="overlay"></div>
      <label for="mail"><h2 class="text-white mb-2 shadow-lg position-relative">訂閱我們獲得最新資訊！</h2></label>
      <div class="coupon d-flex justify-content-center align-item-center position-relative">
        <input type="mail" id="mail" placeholder="請輸入您的電子郵件" class="opacity-75 text-primary me-2 fs-4 p">
        <a class="btn fw-bold btn-primary rounded p-2">立即訂閱</a>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  .coupon-h2 {
    font-size: 1rem;
    @include md {
      font-size: 2rem;
    }
  }
  .bg-image {
    background: center / cover no-repeat url('https://images.unsplash.com/photo-1512331327491-d03cb97d92b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') ;
    background-attachment: fixed;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .bg-image h2, .bg-image .coupon {
    z-index: 2;
  }
</style>