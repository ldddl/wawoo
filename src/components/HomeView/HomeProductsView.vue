<template>
  <section class="container mb-5">
    <div class="d-flex justify-content-between align-items-end mb-4">
      <h2 class="section-title fw-bold mb-0">最新上架</h2>
      <RouterLink to="/products" class="text-primary small letter-space">看全部</RouterLink>
    </div>
    <swiper
      :slidesPerView="1.15"
      :breakpoints="{
        576: { slidesPerView: 2, spaceBetween: 16 },
        992: { slidesPerView: 3, spaceBetween: 24 }
      }"
      :spaceBetween="12"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 2800,
        disableOnInteraction: false
      }"
      :modules="modules"
      class="product-swiper"
    >
      <swiper-slide v-for="item in listings" :key="item.title">
        <div class="product-card position-relative">
          <img :src="item.image" :alt="item.title" class="img-fluid" />
          <p class="product-tag">{{ item.title }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Autoplay, Pagination],
      listings: [
        {
          title: '小木屋',
          image:
            'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop'
        },
        {
          title: '別墅',
          image:
            'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop'
        },
        {
          title: '山居',
          image:
            'https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=2012&auto=format&fit=crop'
        },
        {
          title: '鄉居',
          image:
            'https://images.unsplash.com/photo-1704476441987-4580b1380c9d?q=80&w=1984&auto=format&fit=crop'
        },
        {
          title: '林間小屋',
          image:
            'https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2028&auto=format&fit=crop'
        },
        {
          title: '高級住宅',
          image:
            'https://plus.unsplash.com/premium_photo-1713845369166-9ccb8d3ef9f2?q=80&w=1915&auto=format&fit=crop'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.letter-space {
  letter-spacing: 0.12em;
}

.product-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.product-tag {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  margin: 0;
  padding: 0.35rem 0.75rem;
  background: $primary;
  color: $paper;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
}

.product-swiper {
  padding-bottom: 2.5rem;
}
</style>
