<template>
  <div class="container p-0 mb-4">
    <div class="d-flex flex-column flex-md-row">
      <div class="left-content mb-4">
        <ul class="list-unstyled m-0 text-center">
          <li class="border-2 border-bottom p-2 bg-primary">
            <RouterLink :to="`/products`" class="btn btn-primary w-100 text-secondary">全部商品</RouterLink>
          </li>
          <li class="border-2 border-bottom p-2 bg-primary" v-for="category in categories" :key="category">
            <RouterLink :to="`/products?category=${category}`" class="btn btn-primary w-100 text-secondary">{{ category }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="container right-content p-0">
        <div class="row m-0 d-flex flex-row">
          <div class="col-md-6 col-lg-4 mb-2" v-for="product in products" :key="product.id">
            <div class="card w-100 border-2 border-primary shadow">
              <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-images-style img-fluid border-bottom border-2 border-primary">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold d-flex align-items-center">{{ product.title }} <div class="badge bg-secondary text-dark ms-2">{{ product.category }}</div></h5>
                <p class="card-text card-text-style mb-2">{{ product.description }}</p>
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-secondary text-primary fw-bold p-2 px-4" @click.once="addFavorite(product.id)">加入最愛</button>
                  <RouterLink :to="`/product/${product.id}`" class="btn btn-primary fw-bold p-2 px-4">詳細資訊</RouterLink>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-6 col-lg-4 mb-2">
            <div class="card w-100 border-2 border-primary shadow">
              <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-images-style img-fluid border-bottom border-2 border-primary">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold d-flex align-items-center">田園別墅 <div class="badge bg-secondary text-dark ms-2">別墅</div></h5>
                <p class="card-text card-text-style mb-2">遠離城市喧囂，融入自然懷抱。我們的田園別墅坐落於翠綠山丘間，四周環繞著蓊鬱森林與清澈溪流。寬敞的露台俯瞰起伏田野，晨曦中品茗，暮色裡賞月。純樸鄉村風格與現代舒適完美結合，為您打造寧靜舒心的度假天堂。在此，重拾與大自然的親密連結，享受悠然恬適的田園生活。</p>
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-secondary p-2 px-4">看更多</a>
                  <a href="#" class="btn btn-primary fw-bold p-2 px-4">預約</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-2">
            <div class="card w-100 border-2 border-primary shadow">
              <img src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="card-images-style img-fluid border-bottom border-2 border-primary">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold d-flex align-items-center">田園別墅 <div class="badge bg-secondary text-dark ms-2">別墅</div></h5>
                <p class="card-text card-text-style mb-2">遠離城市喧囂，融入自然懷抱。我們的田園別墅坐落於翠綠山丘間，四周環繞著蓊鬱森林與清澈溪流。寬敞的露台俯瞰起伏田野，晨曦中品茗，暮色裡賞月。純樸鄉村風格與現代舒適完美結合，為您打造寧靜舒心的度假天堂。在此，重拾與大自然的親密連結，享受悠然恬適的田園生活。</p>
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-secondary p-2 px-4">看更多</a>
                  <a href="#" class="btn btn-primary fw-bold p-2 px-4">預約</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-2">
            <div class="card w-100 border-2 border-primary shadow">
              <img src="https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="card-images-style img-fluid border-bottom border-2 border-primary">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold d-flex align-items-center">田園別墅 <div class="badge bg-secondary text-dark ms-2">別墅</div></h5>
                <p class="card-text card-text-style mb-2">遠離城市喧囂，融入自然懷抱。我們的田園別墅坐落於翠綠山丘間，四周環繞著蓊鬱森林與清澈溪流。寬敞的露台俯瞰起伏田野，晨曦中品茗，暮色裡賞月。純樸鄉村風格與現代舒適完美結合，為您打造寧靜舒心的度假天堂。在此，重拾與大自然的親密連結，享受悠然恬適的田園生活。</p>
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-secondary p-2 px-4">看更多</a>
                  <a href="#" class="btn btn-primary fw-bold p-2 px-4">預約</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-2">
            <div class="card w-100 border-2 border-primary shadow">
              <img src="https://images.unsplash.com/photo-1704476441987-4580b1380c9d?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="card-images-style img-fluid border-bottom border-2 border-primary">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold d-flex align-items-center">田園別墅 <div class="badge bg-secondary text-dark ms-2">別墅</div></h5>
                <p class="card-text card-text-style mb-2">遠離城市喧囂，融入自然懷抱。我們的田園別墅坐落於翠綠山丘間，四周環繞著蓊鬱森林與清澈溪流。寬敞的露台俯瞰起伏田野，晨曦中品茗，暮色裡賞月。純樸鄉村風格與現代舒適完美結合，為您打造寧靜舒心的度假天堂。在此，重拾與大自然的親密連結，享受悠然恬適的田園生活。</p>
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-secondary p-2 px-4">看更多</a>
                  <a href="#" class="btn btn-primary fw-bold p-2 px-4">預約</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-2">
            <div class="card w-100 border-2 border-primary shadow">
              <img src="https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="card-images-style img-fluid border-bottom border-2 border-primary">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold d-flex align-items-center">田園別墅 <div class="badge bg-secondary text-dark ms-2">別墅</div></h5>
                <p class="card-text card-text-style mb-2">遠離城市喧囂，融入自然懷抱。我們的田園別墅坐落於翠綠山丘間，四周環繞著蓊鬱森林與清澈溪流。寬敞的露台俯瞰起伏田野，晨曦中品茗，暮色裡賞月。純樸鄉村風格與現代舒適完美結合，為您打造寧靜舒心的度假天堂。在此，重拾與大自然的親密連結，享受悠然恬適的田園生活。</p>
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-secondary p-2 px-4">看更多</a>
                  <a href="#" class="btn btn-primary fw-bold p-2 px-4">預約</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-2">
            <div class="card w-100 border-2 border-primary shadow">
              <img src="https://plus.unsplash.com/premium_photo-1713845369166-9ccb8d3ef9f2?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="card-images-style img-fluid border-bottom border-2 border-primary">
              <div class="card-body">
                <h5 class="card-title text-primary fw-bold d-flex align-items-center">田園別墅 <div class="badge bg-secondary text-dark ms-2">別墅</div></h5>
                <p class="card-text card-text-style mb-2">遠離城市喧囂，融入自然懷抱。我們的田園別墅坐落於翠綠山丘間，四周環繞著蓊鬱森林與清澈溪流。寬敞的露台俯瞰起伏田野，晨曦中品茗，暮色裡賞月。純樸鄉村風格與現代舒適完美結合，為您打造寧靜舒心的度假天堂。在此，重拾與大自然的親密連結，享受悠然恬適的田園生活。</p>
                <div class="d-flex justify-content-between">
                  <a href="#" class="btn btn-secondary p-2 px-4">看更多</a>
                  <a href="#" class="btn btn-primary fw-bold p-2 px-4">預約</a>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: [],
      addFavorite_productId: [],
      categories: ['別墅', '維多利亞式建築', '小木屋', '社區小宅', '平房', 'twer', 'twertwer']
    }
  },
  watch: {
    '$route.query': {
      handler () {
        this.getProducts()
      },
      deep: true
    }
  },
  methods: {
    getProducts () {
      const { category = '' } = this.$route.query
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products?category=${category}`)
      .then((res) => {
        console.log(res.data.products)
        this.products = res.data.products   
      })
    },
    addFavorite (productId) {
      console.log(productId)
      this.addFavorite_productId.push(productId)
      console.log(this.addFavorite_productId)
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style lang="scss">
.card-images-style {
  height: 240px;
  @include md {
    height: 200px;
  }
}
.card-text-style {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  height: 4.5em;  /* 假設行高為 1.5em，3行就是 4.5em */
  line-height: 1.5em;
}
.left-content {
  @include md{
    width: 15%;
    margin-right: 2%;
  }
}
.right-content {
  @include md{
    width: 83%;
  }
}
</style>