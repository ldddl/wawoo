<template>
  <div class="container p-0 d-flex flex-column align-items-center justify-content-center">
    <h2 class="mb-4 text-primary fw-bold">請刮開灰色區塊</h2>
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
      <div v-if="showCoupon" id="coupon-result" 
      class="text-primary fw-bold border border-2 border-primary
      d-flex flex-column align-items-center justify-content-center">
        <p>恭喜您獲得 神秘小禮物乙份</p>
        <img src="/src/assets/icons/gifts.svg" alt="gifts" class="gift-style">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showCoupon = ref(false);
const isScratching = ref(false);
const scratchCanvas = ref(null);
let ctx = null;

const initScratchCard = () => {
  const canvas = scratchCanvas.value;
  ctx = canvas.getContext('2d');

  // 填充整個畫布
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 設置刮卡效果
  ctx.globalCompositeOperation = 'destination-out';
};

const startScratching = (e) => {
  isScratching.value = true;
  scratch(e);
};

const scratch = (e) => {
  if (!isScratching.value) return;
  const x = e.offsetX;
  const y = e.offsetY;
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
};

const stopScratching = () => {
  isScratching.value = false;

  // 當刮除的區域足夠多時顯示結果
  if (checkScratchPercentage()) {
    showCoupon.value = true;
  }
};

const checkScratchPercentage = () => {
  const canvas = scratchCanvas.value;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let scratchedPixels = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) {
      scratchedPixels++;
    }
  }

  const scratchPercentage = scratchedPixels / (pixels.length / 4);
  return scratchPercentage > 0.5; // 超過 50% 刮除
};

onMounted(() => {
  initScratchCard();
});
</script>

<style lang="scss" scoped>
.scratch-card-container {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
}

#coupon-result {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 20px;
  z-index: 1;
}

.gift-style {
  width: 30px;
  height: 30px;
    @include sm {
      width: 60px;
      height: 60px;
    }
  }
</style>