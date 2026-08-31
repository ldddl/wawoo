<template>
  <section class="brand-core">
    <div class="brand-grid">
      <div class="brand-panel d-flex flex-column justify-content-center align-items-center">
        <h2 class="font-brand text-primary fw-bold mb-4">瓦屋 WAWOO</h2>
        <p class="text-center fs-5 mb-2">
          <span class="d-none d-md-inline">「瓦屋」</span>
          象徵家的溫暖與安穩。
        </p>
        <p class="text-center fs-5 mb-4 mb-md-0">一片片瓦片，堆疊出我們所嚮往的穩固與安全。</p>
        <div class="text-center d-md-none">
          <p class="mb-2 opacity-75">這就是我們的核心價值</p>
          <p class="fs-5 fw-bold text-primary mb-0">溫暖、穩定、安心</p>
        </div>
      </div>
      <div class="brand-photo-wrap d-none d-md-block">
        <img
          class="brand-photo"
          src="https://images.unsplash.com/photo-1567981231971-228a0e25ba82?q=80&w=2070&auto=format&fit=crop"
          alt="瓦片屋頂"
        />
      </div>
      <div class="brand-photo-wrap d-none d-md-block">
        <img
          class="brand-photo"
          src="https://plus.unsplash.com/premium_photo-1723514583345-a2e642c6e10e?q=80&w=1794&auto=format&fit=crop"
          alt="居家一隅"
        />
      </div>
      <div
        class="brand-panel brand-panel--accent d-none d-md-flex flex-column justify-content-center align-items-center"
      >
        <p class="fs-5 mb-2">這就是我們的核心價值</p>
        <p class="fs-4 fw-bold text-primary mb-0">溫暖、穩定、安心</p>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.brand-core {
  width: 100%;
  margin: 0;
}

.brand-grid {
  display: grid;
  grid-template-columns: 1fr;

  @include md {
    grid-template-columns: 1fr 1fr;
  }
}

.brand-panel {
  position: relative;
  min-height: 50vh;
  padding: 2.5rem 1.5rem;
  background-color: $secondary;
  color: $ink;

  @include md {
    padding: 3.5rem 2.5rem;
  }
}

.brand-panel:not(.brand-panel--accent) {
  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  // 左側：上到下，黑到磚赭
  &::before {
    top: 0;
    left: 0;
    bottom: 0;
    width: 8px;
    background: linear-gradient(180deg, #000 0%, #8a2310 100%);
  }

  // 上方：黑瓦配色漸變
  &::after {
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    z-index: 1;
    background: linear-gradient(90deg, #141618 0%, #3a3f45 28%, $ink 62%, #1a1c1e 100%);
  }

  // 單欄時補右側、下方，對應 accent 面板
  background-image: linear-gradient(180deg, #141618 0%, #3a3f45 28%, $ink 62%, #1a1c1e 100%),
    linear-gradient(90deg, #8a2310 0%, #000 100%);
  background-repeat: no-repeat;
  background-size: 8px 100%, 100% 8px;
  background-position:
    right top,
    left bottom;

  @include md {
    background-image: none;
  }
}

.brand-panel--accent {
  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  // 下方：左到右，磚赭到黑
  &::before {
    left: 0;
    right: 0;
    bottom: 0;
    height: 8px;
    background: linear-gradient(90deg, #8a2310 0%, #000 100%);
  }

  // 右側：黑瓦配色漸變
  &::after {
    top: 0;
    right: 0;
    bottom: 0;
    width: 8px;
    z-index: 1;
    background: linear-gradient(180deg, #141618 0%, #3a3f45 28%, $ink 62%, #1a1c1e 100%);
  }
}

.brand-photo-wrap {
  position: relative;
  min-height: 50vh;
  overflow: hidden;
}

.brand-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
</style>
