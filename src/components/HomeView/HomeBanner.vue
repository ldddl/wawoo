<template>
  <section class="home-banner">
    <swiper
      :spaceBetween="0"
      :centeredSlides="true"
      :autoplay="{
        delay: 3500,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }"
      :modules="modules"
      @click="onSwiperClick"
      class="mySwiper w-100"
    >
      <swiper-slide v-for="slide in slides" :key="slide.room">
        <button
          type="button"
          class="banner-slide-btn"
          :aria-label="`前往${slide.name}區塊`"
          @click="scrollToRoom(slide.room)"
        >
          <img :src="slide.src" class="d-block w-100" :alt="`${slide.name}布局`" />
        </button>
      </swiper-slide>
      <button class="swiper-button-next" type="button" aria-label="下一張"></button>
      <button class="swiper-button-prev" type="button" aria-label="上一張"></button>
      <div class="swiper-pagination"></div>
    </swiper>
    <div class="banner-copy">
      <p class="banner-en mb-2">WAWOO</p>
      <h1 class="font-brand text-paper mb-3">瓦屋</h1>
      <p class="banner-lead mb-0">無論大小、無論何處，都是心靈的避風港</p>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
      slides: [
        {
          room: 'living',
          name: '客廳',
          src: 'https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          room: 'bedroom',
          name: '房間',
          src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          room: 'bathroom',
          name: '衛浴',
          src: 'https://images.unsplash.com/photo-1695002817411-203c7f19dfa3?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          room: 'kitchen',
          name: '廚房',
          src: 'https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
      ]
    }
  },
  methods: {
    onSwiperClick(swiper, event) {
      if (event.target.closest('.swiper-button-next, .swiper-button-prev, .swiper-pagination')) {
        return
      }
      const slide = this.slides[swiper.clickedIndex]
      if (slide) this.scrollToRoom(slide.room)
    },
    scrollToRoom(room) {
      const target = document.getElementById(`room-${room}`)
      if (!target) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-banner {
  position: relative;
}

.banner-slide-btn {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 280px;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.72);

  @include md {
    height: 460px;
  }
}

.banner-copy {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
  pointer-events: none;
}

.banner-en {
  letter-spacing: 0.4em;
  color: #f6f1e8;
  opacity: 0.8;
  font-size: 0.75rem;
}

.banner-copy h1 {
  font-size: 2.5rem;
  letter-spacing: 0.28em;

  @include md {
    font-size: 3.5rem;
  }
}

.banner-lead {
  color: #f6f1e8;
  letter-spacing: 0.12em;
  max-width: 22rem;
}

.swiper {
  --swiper-theme-color: #f6f1e8;
}

.swiper-button-next,
.swiper-button-prev {
  color: #f6f1e8;
  border: none;
  background-color: transparent;
  pointer-events: auto;
}

.swiper-pagination {
  @media (min-width: 768px) {
    display: none;
  }
}
</style>
