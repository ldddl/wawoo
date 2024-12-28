<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import 'swiper/css';

  import 'swiper/css/grid';
  import 'swiper/css/pagination';

  import { Autoplay, Grid, Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Autoplay, Grid, Pagination],
      };
    },
  };

</script>

<template>
  <div class="container">
    <h2 class="text-primary fw-bold mb-2">最新上架</h2>
  </div>
  <div class="container mb-4 p-0">
    <swiper
      :slidesPerView="3"
      :grid="{
        rows: 1,
        fill: 'column',  // 確保填充行
      }"
      :slidesPerGroup="1"
      :spaceBetween="10"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :effect="'fade'"
      :fadeEffect="{
        crossFade: true,
      }"
      :modules="modules"
      class="mySwiper"
    >
    <swiper-slide>
      <div class="position-relative">
          <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          class="img-fluid home-img-setting">
          <p class="position-absolute top-0 start-0 m-2 p-2 text-white bg-primary">小木屋</p>
        </div>
    </swiper-slide>
    <swiper-slide>
      <div class="position-relative">
          <img src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          class="img-fluid home-img-setting">
          <p class="position-absolute top-0 start-0 m-2 p-2 text-white bg-primary">別墅</p>
        </div>
    </swiper-slide>
    <swiper-slide>
      <div class="position-relative">
          <img src="https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          class="img-fluid home-img-setting">
          <p class="position-absolute top-0 start-0 m-2 p-2 text-white bg-primary">小木屋</p>
        </div>
    </swiper-slide>
    <swiper-slide>
      <div class="position-relative">
          <img src="https://images.unsplash.com/photo-1704476441987-4580b1380c9d?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          class="img-fluid home-img-setting">
          <p class="position-absolute top-0 start-0 m-2 p-2 text-white bg-primary">別墅</p>
        </div>
    </swiper-slide>
    <swiper-slide>
      <div class="position-relative">
          <img src="https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          class="img-fluid home-img-setting">
          <p class="position-absolute top-0 start-0 m-2 p-2 text-white bg-primary">小木屋</p>
        </div>
    </swiper-slide>
    <swiper-slide>
      <div class="position-relative">
          <img src="https://plus.unsplash.com/premium_photo-1713845369166-9ccb8d3ef9f2?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
          class="img-fluid home-img-setting">
          <p class="position-absolute top-0 start-0 m-2 p-2 text-white bg-primary">高級住宅</p>
        </div>
    </swiper-slide>
    </swiper>
  </div>
</template>


<style lang="scss" scoped>
  .home-img-setting {
    width: 100%;
    height: 277px;
    object-fit: cover;
  }

.swiper {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  height: calc((100% - 30px) / 2) !important;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
    z-index: 1;
  }
  .bg-image h2, .bg-image .coupon {
    z-index: 2; /* 確保文字在黑色背景上方 */
  }
  .image-slide {
    width: 100%;           /* 確保圖片寬度填滿容器 */
    height: 200px;         /* 設置統一的高度 */
    object-fit: cover;     /* 使用 cover 來保持圖片比例，並確保圖片覆蓋容器 */
  }
</style>