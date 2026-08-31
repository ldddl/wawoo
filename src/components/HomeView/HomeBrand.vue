<template>
  <section class="home-brand" aria-labelledby="home-brand-title">
    <h2 id="home-brand-title" class="section-title fw-bold mb-2 text-center text-primary">
      合作品牌
    </h2>
    <div class="brand-marquee">
      <div class="brand-marquee__track">
        <ul
          v-for="copy in 2"
          :key="copy"
          class="brand-marquee__list"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <li v-for="brand in partners" :key="`${copy}-${brand.id}`" class="brand-marquee__item">
            <img :src="brand.logo" :alt="brand.name" width="120" height="28" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import samsung from '@/assets/partners/samsung.svg'
import lg from '@/assets/partners/lg.svg'
import panasonic from '@/assets/partners/panasonic.svg'
import ikea from '@/assets/partners/ikea.svg'
import bosch from '@/assets/partners/bosch.svg'
import philips from '@/assets/partners/philips.svg'
import hitachi from '@/assets/partners/hitachi.svg'
import dyson from '@/assets/partners/dyson.svg'
import muji from '@/assets/partners/muji.svg'
import nitori from '@/assets/partners/nitori.svg'

export default {
  name: 'WawooHomeBrand',
  data() {
    return {
      partners: [
        { id: 'samsung', name: '三星 Samsung', logo: samsung },
        { id: 'lg', name: 'LG', logo: lg },
        { id: 'panasonic', name: '國際 Panasonic', logo: panasonic },
        { id: 'ikea', name: 'IKEA', logo: ikea },
        { id: 'bosch', name: '博世 Bosch', logo: bosch },
        { id: 'philips', name: '飛利浦 Philips', logo: philips },
        { id: 'hitachi', name: '日立 Hitachi', logo: hitachi },
        { id: 'dyson', name: '戴森 Dyson', logo: dyson },
        { id: 'muji', name: '無印良品 MUJI', logo: muji },
        { id: 'nitori', name: '宜得利 NITORI', logo: nitori }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-brand {
  width: 100%;
  padding-block: 3rem 3.5rem;
  overflow: hidden;
  background-color: $paper;
  background-image: linear-gradient(rgba($paper, 0.72), rgba($paper, 0.72)),
    url('https://images.unsplash.com/photo-1481305717251-830ac10fb6e6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
}

.home-brand :deep(.section-title) {
  color: $primary;

  &::after {
    content: none;
  }
}

.brand-marquee {
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.brand-marquee__track {
  display: flex;
  width: max-content;
  animation: brand-scroll 36s linear infinite;

  .brand-marquee:hover & {
    animation-play-state: paused;
  }
}

.brand-marquee__list {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  margin: 0;
  padding: 1.5rem 1.75rem 0.25rem 0;
  list-style: none;
}

.brand-marquee__item img {
  display: block;
  height: 2.5rem;
  width: auto;
  object-fit: contain;
  opacity: 0.78;
  transition: opacity 0.2s ease;
}

.brand-marquee__item:hover img {
  opacity: 1;
}

@keyframes brand-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-marquee {
    mask-image: none;
  }

  .brand-marquee__track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .brand-marquee__list[aria-hidden='true'] {
    display: none;
  }

  .brand-marquee__list {
    flex-wrap: wrap;
    justify-content: center;
    padding-inline: 1.5rem;
    gap: 2rem 2.75rem;
  }
}
</style>
