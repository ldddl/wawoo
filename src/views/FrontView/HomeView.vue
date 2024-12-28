<script>
import homeBanner from '../../components/HomeView/HomeBanner.vue'
import homeProductsView from '../../components/HomeView/HomeProductsView.vue'
import homeCity from '../../components/HomeView/HomeCity.vue'
import homeCoupon from '../../components/HomeView/HomeCoupon.vue'
import homeBrandCore from '../../components/HomeView/HomeBrandCore.vue'
import homeSubscribe from '../../components/HomeView/HomeSubscribe.vue'
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

  <!-- 庫彭 -->
  <homeCoupon />

  <!-- 產品 -->
  <homeProductsView />

  <!-- 品牌理念 -->
  <homeBrandCore />
  
  <!-- 訂閱 -->
  <homeSubscribe />

</template>
