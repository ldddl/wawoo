<template>
  <section class="home-content">
    <div v-for="room in rooms" :key="room.id" :id="`room-${room.id}`" class="content-row">
      <div class="content-frame">
        <div class="content-label">
          <span>{{ room.name }}</span>
        </div>
        <div class="content-media">
          <swiper
            :slides-per-view="1"
            :space-between="0"
            :pagination="{ clickable: true }"
            :breakpoints="{
              768: {
                slidesPerView: 3,
                spaceBetween: 12,
                allowTouchMove: false
              }
            }"
            :modules="modules"
            class="content-swiper"
          >
            <swiper-slide v-for="item in room.products" :key="`${room.name}-${item.title}`">
              <div class="content-slide">
                <img :src="item.src" class="d-block w-100" :alt="`${room.name}｜${item.title}`" />
                <p class="content-slide__title">{{ item.title }}</p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="content-sill" aria-hidden="true"></div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Pagination],
      rooms: [
        {
          id: 'living',
          name: '客廳',
          products: [
            {
              title: '沙發',
              src: 'https://images.unsplash.com/photo-1698936061086-2bf99c7b9fc5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
              title: '茶几',
              src: 'https://images.unsplash.com/photo-1698770531036-c627d35188f2?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
              title: '掛畫',
              src: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
          ]
        },
        {
          id: 'bedroom',
          name: '房間',
          products: [
            {
              title: '床組',
              src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'
            },
            {
              title: '衣櫃',
              src: 'https://images.unsplash.com/photo-1649361811423-a55616f7ab11?q=80&w=1058&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
              title: '書桌',
              src: 'https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
          ]
        },
        {
          id: 'kitchen',
          name: '廚房',
          products: [
            {
              title: '鍋具',
              src: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
              title: '洗碗機',
              src: 'https://images.unsplash.com/photo-1758631130778-42d518bf13aa?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
              title: '餐具',
              src: 'https://images.unsplash.com/photo-1571987530791-58e3e7744d99?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
          ]
        },
        {
          id: 'bathroom',
          name: '衛浴',
          products: [
            {
              title: '沐浴用品',
              src: 'https://images.unsplash.com/photo-1645567455251-334ed4702f9b?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            },
            {
              title: '浴缸',
              src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop'
            },
            {
              title: '洗手台',
              src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1200&auto=format&fit=crop'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$wood: #7a4e32;
$wood-light: #a67a52;
$wood-dark: #3d2418;

@mixin wood-grain($angle: 90deg) {
  background-color: $wood;
  background-image: repeating-linear-gradient(
      $angle,
      rgba($wood-dark, 0.18) 0 1px,
      transparent 1px 9px,
      rgba(#fff, 0.07) 9px 10px,
      transparent 10px 22px
    ),
    repeating-linear-gradient($angle + 2deg, transparent 0 28px, rgba($wood-dark, 0.1) 28px 29px),
    linear-gradient(180deg, $wood-light 0%, $wood 48%, $wood-dark 100%);
}

.home-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-block: 2.5rem;
  padding-inline: 1rem;
  background-color: $paper;
  background-image: linear-gradient(rgba($paper, 0.72), rgba($paper, 0.72)),
    url('https://images.unsplash.com/photo-1481305717251-830ac10fb6e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;

  @include md {
    gap: 4rem;
    padding-block: 3.5rem;
    padding-inline: 2.5rem;
  }
}

.content-row {
  position: relative;
  scroll-margin-top: 5.5rem;
  @include wood-grain(90deg);
  padding: 12px 12px 0;
  border: 1px solid $wood-dark;
  box-shadow:
    inset 0 2px 0 rgba(#fff, 0.22),
    inset 0 -1px 0 rgba(#000, 0.28),
    inset 2px 0 0 rgba(#fff, 0.08),
    inset -2px 0 0 rgba(#000, 0.2),
    0 14px 28px rgba($ink, 0.22);

  @include md {
    padding: 16px 16px 0;
  }
}

.content-frame {
  display: grid;
  grid-template-columns: 1fr;
  min-width: 0;
  padding-bottom: 12px;

  @include md {
    grid-template-columns: auto 1fr;
    align-items: center;
    padding-bottom: 16px;
  }

  @include lg {
    grid-template-columns: minmax(3.5rem, 9%) 1fr;
  }
}

.content-label {
  $plaque: #2c1a12;
  $plaque-light: #4a2e20;
  $plaque-dark: #140c08;
  $nail: #b08a4e;

  --nail: radial-gradient(
    circle,
    lighten($nail, 10%) 0 1.1px,
    $nail 1.2px 2px,
    $plaque-dark 2.1px 2.6px,
    transparent 2.7px
  );

  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: 4.35rem;
  min-height: 2.4rem;
  margin: 0 auto 12px;
  padding: 0.4rem 0.5rem;
  color: #ead9b8;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-shadow:
    0 1px 0 rgba(#fff, 0.12),
    0 -1px 0 rgba(#000, 0.55);
  background-color: $plaque;
  background-image: var(--nail), var(--nail), var(--nail), var(--nail),
    repeating-linear-gradient(
      0deg,
      rgba(#000, 0.28) 0 1px,
      transparent 1px 7px,
      rgba(#fff, 0.04) 7px 8px,
      transparent 8px 16px
    ),
    linear-gradient(180deg, $plaque-light 0%, $plaque 48%, $plaque-dark 100%);
  background-size:
    8px 8px,
    8px 8px,
    8px 8px,
    8px 8px,
    auto,
    auto;
  background-position:
    5px 5px,
    calc(100% - 5px) 5px,
    5px calc(100% - 5px),
    calc(100% - 5px) calc(100% - 5px),
    0 0,
    0 0;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, repeat, no-repeat;
  border: 1px solid $plaque-dark;
  box-shadow:
    inset 0 1px 0 rgba(#fff, 0.12),
    inset 0 -2px 0 rgba(#000, 0.45),
    inset 1px 0 0 rgba(#fff, 0.06),
    inset -1px 0 0 rgba(#000, 0.3),
    0 4px 10px rgba(#000, 0.4);

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 5px 4px;
    border: 1px solid rgba(#d4b07a, 0.38);
    box-shadow:
      inset 0 0 0 1px rgba(#000, 0.4),
      0 0 0 1px rgba(#000, 0.28);
    pointer-events: none;
  }

  @include md {
    align-self: center;
    justify-self: center;
    margin: 0 10px 0 0;
  }

  @include lg {
    writing-mode: vertical-rl;
    width: max-content;
    min-width: 0;
    max-width: 2.55rem;
    min-height: 6.25rem;
    margin: 0 8px 0 0;
    padding: 1rem 0.22rem 0.85rem;
    letter-spacing: 0.32em;
  }
}

.content-media {
  min-width: 0;
}

.content-swiper {
  --swiper-theme-color: #ead9b8;
  --swiper-pagination-bullet-inactive-color: #ead9b8;
  --swiper-pagination-bullet-inactive-opacity: 0.35;
  --swiper-pagination-bottom: 6px;
  padding-bottom: 1.35rem;

  @include md {
    padding-bottom: 0;

    :deep(.swiper-pagination) {
      display: none;
    }
  }
}

.content-slide {
  position: relative;
  overflow: hidden;
  background-color: $ink;
  box-shadow:
    0 0 0 1px rgba($wood-dark, 0.55),
    1px 1px 0 rgba(#fff, 0.1);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    box-shadow:
      inset 0 0 0 1px rgba(#000, 0.28),
      inset 2px 2px 10px rgba(#000, 0.4),
      inset -1px -1px 4px rgba(#fff, 0.08);
  }
}

.content-slide img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  transition: transform 0.45s ease;

  @include md {
    height: 240px;
  }
}

@media (hover: hover) {
  .content-slide:hover img {
    transform: scale(1.06);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-slide img {
    transition: none;
  }
}

.content-sill {
  height: 8px;
  margin: 0 -4px -2px;
  @include wood-grain(0deg);
  border: 1px solid $wood-dark;
  border-top-color: rgba(#fff, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(#fff, 0.2),
    0 4px 8px rgba(#000, 0.24);

  @include md {
    height: 10px;
    margin: 0 -5px -3px;
  }
}

.content-slide__title {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1;
  margin: 0;
  padding: 0.35rem 0.75rem;
  background: $primary;
  color: $paper;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
}
</style>
