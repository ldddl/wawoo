<script>
import homeBanner from '../../components/HomeView/HomeBanner.vue'
import homeContent from '../../components/HomeView/HomeContent.vue'
// import homeProductsView from '../../components/HomeView/HomeProductsView.vue'
// import homeCity from '../../components/HomeView/HomeCity.vue'
// import homeCoupon from '../../components/HomeView/HomeCoupon.vue'
import homeBrandCore from '../../components/HomeView/HomeBrandCore.vue'
import homeSubscribe from '../../components/HomeView/HomeSubscribe.vue'
import homeBrand from '../../components/HomeView/HomeBrand.vue'
export default {
  components: {
    homeBanner,
    homeContent,
    // homeProductsView,
    // homeCity,
    // homeCoupon,
    // homeBrandCore,
    homeSubscribe,
    homeBrand
  }
}
</script>

<template>
  <homeBanner />
  <homeContent />
  <!-- <homeCity /> -->
  <!-- <homeCoupon /> -->
  <!-- <homeProductsView /> -->
  <!-- <homeBrandCore /> -->
  <homeBrand />
  <homeSubscribe />
</template>
