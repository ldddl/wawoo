<template>
  <div class="container py-4 py-md-5">
    <CheckoutSteps current="checkout" />
    <h1 class="font-brand text-primary fw-bold mb-4">填寫收件資料</h1>

    <BrandLoader v-if="isLoading" />

    <div v-else class="row g-4">
      <div class="col-lg-7">
        <form class="checkout-form p-3 p-md-4" @submit.prevent="submitOrder">
          <div class="mb-3">
            <label class="form-label" for="name">姓名</label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              autocomplete="name"
            />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="email">Email</label>
            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              autocomplete="email"
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="tel">電話</label>
            <input
              id="tel"
              v-model.trim="form.tel"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors.tel }"
              autocomplete="tel"
            />
            <div v-if="errors.tel" class="invalid-feedback">{{ errors.tel }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="address">地址</label>
            <input
              id="address"
              v-model.trim="form.address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.address }"
              autocomplete="street-address"
            />
            <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
          </div>
          <div class="mb-4">
            <label class="form-label" for="message">訂單備註（選填）</label>
            <textarea id="message" v-model.trim="form.message" class="form-control" rows="3"></textarea>
          </div>
          <p v-if="submitError" class="text-danger mb-3">{{ submitError }}</p>
          <div class="d-flex flex-column flex-sm-row gap-2">
            <RouterLink to="/cart" class="btn btn-outline-primary fw-bold">回購物車</RouterLink>
            <button type="submit" class="btn btn-primary fw-bold flex-grow-1" :disabled="isSubmitting">
              {{ isSubmitting ? '送出中...' : '送出訂單' }}
            </button>
          </div>
        </form>
      </div>
      <div class="col-lg-5">
        <div class="checkout-summary p-3">
          <h2 class="fs-5 fw-bold mb-3">訂單摘要</h2>
          <div v-for="item in carts" :key="item.id" class="d-flex justify-content-between gap-2 mb-2">
            <span>{{ item.product?.title }} × {{ item.qty }}</span>
            <span>${{ Math.round(Number(item.final_total || item.total || 0)).toLocaleString() }}</span>
          </div>
          <div class="d-flex justify-content-between checkout-summary__final fw-bold mt-3 pt-3">
            <span>應付金額</span>
            <span>${{ Math.round(Number(final_total)).toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import CheckoutSteps from '@/components/CheckoutSteps.vue'
import BrandLoader from '@/components/BrandLoader.vue'

export default {
  name: 'CheckoutView',
  components: { CheckoutSteps, BrandLoader },
  data() {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      submitError: ''
    }
  },
  computed: {
    ...mapState(useCartStore, ['carts', 'final_total', 'isLoading', 'isEmpty'])
  },
  methods: {
    ...mapActions(useCartStore, ['getCart', 'createOrder']),
    validate() {
      const errors = {}
      if (!this.form.name) errors.name = '請填寫姓名'
      if (!this.form.email) {
        errors.email = '請填寫 Email'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        errors.email = 'Email 格式不正確'
      }
      if (!this.form.tel) {
        errors.tel = '請填寫電話'
      } else if (!/^09\d{8}$/.test(this.form.tel) && !/^0\d{8,9}$/.test(this.form.tel)) {
        errors.tel = '請輸入有效電話'
      }
      if (!this.form.address) errors.address = '請填寫地址'
      this.errors = errors
      return Object.keys(errors).length === 0
    },
    submitOrder() {
      this.submitError = ''
      if (!this.validate() || this.isSubmitting) return
      this.isSubmitting = true
      this.createOrder(this.form)
        .then((res) => {
          this.isSubmitting = false
          const orderId = res.orderId || res.data?.order?.id || ''
          const total = res.total ?? this.final_total
          this.$router.push({
            name: 'order-complete',
            query: {
              orderId,
              total: Math.round(Number(total || 0))
            }
          })
        })
        .catch(() => {
          this.isSubmitting = false
          this.submitError = '訂單送出失敗，請確認購物車後再試'
        })
    }
  },
  mounted() {
    this.getCart().then(() => {
      if (this.isEmpty) {
        this.$router.replace({ name: 'cart' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.checkout-form,
.checkout-summary {
  border: 1px solid $secondary;
  background: #fff;
}

.checkout-summary {
  @include md {
    position: sticky;
    top: 5.5rem;
  }
}

.checkout-summary__final {
  border-top: 1px solid $secondary;
  color: $primary;
  font-size: 1.125rem;
}

.form-label {
  letter-spacing: 0.04em;
}
</style>
