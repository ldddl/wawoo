<template>
  <div class="container py-4 py-md-5 d-flex flex-column align-items-center">
    <h2 class="section-title fw-bold mb-4">請刮開瓦灰色區塊</h2>
    <div class="scratch-card-container mb-4">
      <canvas
        ref="scratchCanvas"
        id="scratch-canvas"
        width="300"
        height="200"
        @mousedown="startScratching"
        @mousemove="scratch"
        @mouseup="stopScratching"
        @mouseleave="stopScratching"
      ></canvas>
      <div
        v-if="showCoupon"
        id="coupon-result"
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <p class="mb-2">恭喜您獲得神秘小禮物乙份</p>
        <img :src="giftIcon" alt="禮物" class="gift-style" />
      </div>
    </div>
    <p class="opacity-75 small">用滑鼠按住並刮開覆蓋層</p>
  </div>
</template>

<script>
import giftIcon from '@/assets/icons/gifts.svg'

export default {
  data() {
    return {
      giftIcon,
      showCoupon: false,
      isScratching: false,
      ctx: null
    }
  },
  methods: {
    initScratchCard() {
      const canvas = this.$refs.scratchCanvas
      this.ctx = canvas.getContext('2d')

      this.ctx.fillStyle = '#9a8b7a'
      this.ctx.fillRect(0, 0, canvas.width, canvas.height)

      this.ctx.globalCompositeOperation = 'destination-out'
    },
    startScratching(e) {
      this.isScratching = true
      this.scratch(e)
    },
    scratch(e) {
      if (!this.isScratching) return
      const x = e.offsetX
      const y = e.offsetY
      this.ctx.beginPath()
      this.ctx.arc(x, y, 20, 0, Math.PI * 2)
      this.ctx.fill()
    },
    stopScratching() {
      this.isScratching = false

      if (this.checkScratchPercentage()) {
        this.showCoupon = true
      }
    },
    checkScratchPercentage() {
      const canvas = this.$refs.scratchCanvas
      const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      let scratchedPixels = 0

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) {
          scratchedPixels++
        }
      }

      const scratchPercentage = scratchedPixels / (pixels.length / 4)
      return scratchPercentage > 0.5
    }
  },
  mounted() {
    this.initScratchCard()
  }
}
</script>

<style lang="scss" scoped>
.scratch-card-container {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  border: 1px solid $secondary;
  background: #fff;
}

#coupon-result {
  position: absolute;
  inset: 0;
  background-color: #fff;
  color: $primary;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  z-index: 1;
}

.gift-style {
  width: 36px;
  height: 36px;
  @include sm {
    width: 56px;
    height: 56px;
  }
}
</style>
