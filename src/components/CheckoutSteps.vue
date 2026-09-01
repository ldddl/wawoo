<template>
  <ol class="checkout-steps list-unstyled mb-4 mb-md-5">
    <li
      v-for="(step, index) in steps"
      :key="step.to"
      class="checkout-steps__item"
      :class="{
        'is-active': current === step.key,
        'is-done': stepIndex(current) > index
      }"
    >
      <RouterLink v-if="stepIndex(current) > index" :to="step.to" class="checkout-steps__link">
        <span class="checkout-steps__num">{{ index + 1 }}</span>
        <span class="checkout-steps__label">{{ step.label }}</span>
      </RouterLink>
      <span v-else class="checkout-steps__link">
        <span class="checkout-steps__num">{{ index + 1 }}</span>
        <span class="checkout-steps__label">{{ step.label }}</span>
      </span>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'CheckoutSteps',
  props: {
    current: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      steps: [
        { key: 'cart', label: '購物車', to: '/cart' },
        { key: 'checkout', label: '填寫資料', to: '/checkout' },
        { key: 'complete', label: '完成', to: '/order-complete' }
      ]
    }
  },
  methods: {
    stepIndex(key) {
      return this.steps.findIndex((step) => step.key === key)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;

  @include md {
    gap: 0.75rem;
  }
}

.checkout-steps__item {
  min-width: 0;
  display: flex;
}

.checkout-steps__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  min-height: 4.25rem;
  padding: 0.55rem 0.35rem;
  border: 1px solid $secondary;
  background: #fff;
  color: $ink;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-align: center;

  @include md {
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
    min-height: 3.25rem;
    padding: 0.65rem 0.85rem;
    text-align: left;
  }
}

.checkout-steps__label {
  font-size: 0.8rem;
  line-height: 1.25;
  word-break: keep-all;

  @include md {
    font-size: 0.95rem;
  }
}

.checkout-steps__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: $secondary;
  font-size: 0.8rem;
  font-weight: 700;
}

.is-active .checkout-steps__link {
  border-color: $primary;
  background: $primary;
  color: $paper;
}

.is-active .checkout-steps__num {
  background: $paper;
  color: $primary;
}

.is-done .checkout-steps__link {
  border-color: $primary;
  color: $primary;
}

.is-done .checkout-steps__num {
  background: $primary;
  color: $paper;
}
</style>
