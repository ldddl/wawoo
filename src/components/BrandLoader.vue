<template>
  <div
    class="brand-loader"
    :class="{ 'brand-loader--compact': compact }"
    role="status"
    aria-live="polite"
    aria-label="載入中"
  >
    <div class="brand-loader__mark" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect class="brand-loader__paper" width="64" height="64" rx="12" />
        <g class="brand-loader__lines" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke-width="3.2" d="M8 34 L32 10 L56 34" />
          <path
            class="brand-loader__tiles"
            pathLength="1"
            stroke-width="2.4"
            d="M14 34 C18 27.5 22 27.5 26 34 C30 27.5 34 27.5 38 34 C42 27.5 46 27.5 50 34"
          />
          <rect x="20" y="34" width="24" height="18" stroke-width="3" stroke-linecap="butt" />
          <path stroke-width="3" d="M32 52 V42" />
        </g>
      </svg>
    </div>
    <p class="brand-loader__text mb-0">載入中</p>
  </div>
</template>

<script>
export default {
  name: 'BrandLoader',
  props: {
    compact: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  padding: 3rem 1rem;
  color: $primary;
}

.brand-loader--compact {
  padding: 1.5rem 0.5rem;
  gap: 0.6rem;
}

.brand-loader__mark {
  width: 3.5rem;
  height: 3.5rem;
  transform-origin: center center;
  animation: brand-breathe 2.4s ease-in-out infinite;
}

.brand-loader--compact .brand-loader__mark {
  width: 2.75rem;
  height: 2.75rem;
}

.brand-loader__paper {
  fill: $paper;
}

.brand-loader__lines {
  stroke: $primary;
}

.brand-loader__tiles {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: brand-tiles 1.2s ease-in-out infinite;
}

.brand-loader__text {
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  color: $ink;
  opacity: 0.55;
}

@keyframes brand-tiles {
  0% {
    stroke-dashoffset: 1;
  }
  55% {
    stroke-dashoffset: 0;
  }
  72% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -1;
  }
}

@keyframes brand-breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-loader__mark,
  .brand-loader__tiles {
    animation: none;
  }

  .brand-loader__tiles {
    stroke-dashoffset: 0;
  }
}
</style>
