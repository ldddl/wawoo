<script>
import homeBanner from '../../components/homeBanner.vue'
import homeProductsView from '../../components/homeProductsView.vue'
import homeCity from '../../components/homeCity.vue'
import homeCoupon from '../../components/homeCoupon.vue'
import homeBrandCore from '../../components/homeBrandCore.vue'
import homeSubscribe from '../../components/homeSubscribe.vue'
export default {
  components: {
    homeBanner,
    homeProductsView,
    homeCity,
    homeCoupon,
    homeBrandCore,
    homeSubscribe
  }
}
</script>

<template>
  
  <!-- banner -->
  <homeBanner />
  
  <!-- 地區 -->
  <homeCity />

  <!-- 產品 -->
  <homeProductsView />

  <!-- 庫彭 -->
  <homeCoupon />

  <!-- 品牌理念 -->
  <homeBrandCore />
  
  <!-- 訂閱 -->
  <homeSubscribe />

</template>