<template>
  <div class="container mb-4 p-0">
  <swiper 
  :spaceBetween="30"
  :centeredSlides="true"
  :autoplay="{
    delay: 2500,
    disableOnInteraction: false,
  }"
  :pagination="{
    clickable: true,
  }"
  :navigation="{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }"
  :modules="modules"
  class="mySwiper w-100"
  >
    <swiper-slide><img src="https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100 img-fluid" alt=""></swiper-slide>
    <swiper-slide><img src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100 img-fluid" alt=""></swiper-slide>
    <swiper-slide><img src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100 img-fluid" alt="..."></swiper-slide>
    <button class="swiper-button-next"></button>
    <button class="swiper-button-prev"></button>
    <div class="swiper-pagination"></div>
  </swiper>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Grid,Autoplay, Pagination, Navigation } from 'swiper/modules';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
      return {
        modules: [Autoplay, Pagination, Navigation, Grid]
      };
    },
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
  --swiper-theme-color: white;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 400px; /* 設定統一高度 */
  object-fit: cover; /* 確保圖片覆蓋並保持比例 */
  object-position: center; /* 確保圖片居中顯示 */
  @include sm {
  }
}

.swiper-button-next,
.swiper-button-prev {
  color: white;
  border:none;
  background-color:transparent;
  border-style:none;
}

.swiper-pagination {
    display: inline-block;

    background: white;
    @media (min-width: 768px) {
      display: none;
    }

    &-bullet {
      background: #787878;
    }

    &-bullet-active {
      background: #333333;
    }
}
</style>