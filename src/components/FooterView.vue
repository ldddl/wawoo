<template>
  <footer class="bg-ink text-paper mt-auto">
    <div class="container py-5">
      <div class="row gy-4 align-items-start">
        <div class="col-md-4">
          <div class="footer-title-row">
            <span class="footer-mark" aria-hidden="true"></span>
            <h2 class="footer-brand font-brand mb-0">瓦屋 WAWOO</h2>
          </div>
          <p class="footer-copy mb-0">
            這是關於每個人夢想中的「瓦屋」，無論大小、無論何處，都是心靈的避風港。
          </p>
        </div>
        <div class="col-md-4">
          <div class="footer-title-row">
            <h2 class="footer-heading mb-0">聯絡我們</h2>
          </div>
          <p class="mb-2">電話：0912345678</p>
          <p class="mb-2">信箱：wawoo@gmail.com</p>
          <p class="mb-0">地址：地球上的一個瓦屋</p>
        </div>
        <div class="col-md-4">
          <div class="footer-title-row">
            <h2 class="footer-heading mb-0">關注我們</h2>
          </div>
          <div class="footer-icons">
            <a href="#" aria-label="Facebook">
              <img class="icon_style p-1" :src="iconFb" alt="Facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <img class="icon_style p-1" :src="iconTwitter" alt="Twitter" />
            </a>
            <a href="#" aria-label="Instagram">
              <img class="icon_style p-1" :src="iconInstagram" alt="Instagram" />
            </a>
            <a href="#" aria-label="LINE">
              <img class="icon_style p-1" :src="iconLine" alt="LINE" />
            </a>
          </div>
        </div>
      </div>
      <hr class="footer-divider my-4" />
      <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
        <div class="text-center text-sm-start">
          <p class="small mb-1 opacity-75">ⓒ 2026 Wawoo by Wa</p>
          <p class="small mb-0 opacity-75">本網站僅作為求職作品集使用，不供商業用途</p>
        </div>
        <RouterLink to="/login" class="btn btn-outline-light btn-sm fw-bold px-3">
          後台登入
        </RouterLink>
      </div>
    </div>
  </footer>
</template>

<script>
import iconFb from '@/assets/icons/icon_fb.png'
import iconTwitter from '@/assets/icons/icon_twitter.png'
import iconInstagram from '@/assets/icons/icon_instagram.png'
import iconLine from '@/assets/icons/icon_line.png'

export default {
  data() {
    return { iconFb, iconTwitter, iconInstagram, iconLine }
  }
}
</script>

<style lang="scss" scoped>
.footer-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  margin-bottom: 1rem;
}

.footer-mark {
  width: 1.75rem;
  height: 1.75rem;
  display: inline-block;
  flex-shrink: 0;
  background-color: currentColor;
  mask: url('@/assets/logo.svg') center / contain no-repeat;
}

.footer-heading,
.footer-brand {
  color: $paper;
  font-size: 1.25rem;
  line-height: 1.2;
  letter-spacing: 0.18em;
}

.footer-copy {
  max-width: 18rem;
  line-height: 1.75;
  opacity: 0.8;
}

.icon_style {
  filter: invert(1);
}

.footer-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;

  .icon_style {
    width: 36px;
    height: 36px;

    @include md {
      width: 44px;
      height: 44px;
    }
  }
}

.footer-divider {
  height: 1px;
  margin-inline: 0;
  border: 0;
  background: linear-gradient(
    90deg,
    rgba($paper, 0.15) 0%,
    rgba($paper, 0.15) 35%,
    rgba($paper, 0.95) 50%,
    rgba($paper, 0.15) 65%,
    rgba($paper, 0.15) 100%
  );
  background-size: 200% 100%;
  animation: divider-flow 2.8s linear infinite;
}

@keyframes divider-flow {
  from {
    background-position: 100% 0;
  }

  to {
    background-position: -100% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer-divider {
    animation: none;
    opacity: 0.35;
  }
}
</style>
