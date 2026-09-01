<script>
import homeBanner from '../../components/HomeView/HomeBanner.vue'
import homeContent from '../../components/HomeView/HomeContent.vue'
import homeSubscribe from '../../components/HomeView/HomeSubscribe.vue'
import homeBrand from '../../components/HomeView/HomeBrand.vue'
export default {
  components: {
    homeBanner,
    homeContent,
    homeSubscribe,
    homeBrand
  }
}
</script>

<template>
  <homeBanner />
  <homeContent />
  <homeBrand />
  <homeSubscribe />
</template>
