<template>
  <div class="d-flex flex-column min-vh-100">
    <NavBar />
    <FooterView />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import FooterView from '../components/FooterView.vue'
export default {
  components: {
    NavBar,
    FooterView
  }
}
</script>
