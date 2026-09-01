<template>
  <section class="home-subscribe">
    <div class="subscribe-band d-flex flex-column align-items-center text-center position-relative">
      <div class="overlay"></div>
      <h2 class="font-brand text-paper mb-3 position-relative">訂閱我們，獲得最新資訊</h2>
      <form
        class="subscribe-form d-flex flex-column flex-md-row align-items-stretch gap-2 gap-md-3 position-relative w-100"
        @submit.prevent="onSubscribe"
      >
        <label class="visually-hidden" for="mail">電子郵件</label>
        <input
          v-model.trim="email"
          type="email"
          id="mail"
          placeholder="請輸入您的電子郵件"
          class="form-control form-control-lg flex-grow-1"
          required
        />
        <button type="submit" class="btn btn-primary fw-bold subscribe-btn">立即訂閱</button>
      </form>
      <p v-if="successMessage" class="subscribe-success position-relative mt-3 mb-0">
        {{ successMessage }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeSubscribe',
  data() {
    return {
      email: '',
      successMessage: ''
    }
  },
  methods: {
    onSubscribe() {
      if (!this.email) return
      this.successMessage = '訂閱成功！感謝你的關注，瓦屋會不定期寄送最新資訊。'
      this.email = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.home-subscribe {
  width: 100%;
  margin: 0;
}

.subscribe-band {
  padding: 3rem 1.5rem;
  background:
    center / cover no-repeat
    url('https://images.unsplash.com/photo-1512331327491-d03cb97d92b4?q=80&w=2070&auto=format&fit=crop');

  @include md {
    padding: 6rem 3rem;
  }

  h2 {
    font-size: 1.35rem;
    line-height: 1.5;
    letter-spacing: 0.1em;

    @include md {
      font-size: 2rem;
    }
  }
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(43, 36, 28, 0.62);
}

.subscribe-form {
  max-width: 36rem;
  z-index: 1;
}

.subscribe-btn {
  width: 100%;
  padding: 0.85rem 1.25rem;
  white-space: nowrap;

  @include md {
    width: auto;
    flex-shrink: 0;
    padding-inline: 1.75rem;
  }
}

.subscribe-success {
  z-index: 1;
  max-width: 36rem;
  padding: 0.75rem 1rem;
  background: rgba(246, 241, 232, 0.95);
  border: 1px solid $secondary;
  color: $ink;
  letter-spacing: 0.04em;
  font-size: 0.95rem;
}
</style>
