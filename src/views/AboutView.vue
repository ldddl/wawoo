<template>
  <div class="about">
    <h1>This is an about page</h1>
    <LoadingOverlay :active="isLoading"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    const api = 'https://vue3-course-api.hexschool.io/'
    const path = 'v2/api/{api_path}/products/all'
    this.$http.get(`${api}v2/api/ldddl/products/all`)
    .then((res) => {
      console.log(res)
      this.isLoading = false
    })

    // setTimeout(() => { // 一秒後 loading 結束
    // }
    // , 1000)
  }
}
</script>