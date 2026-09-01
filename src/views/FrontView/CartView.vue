<template>
  <div class="container py-4 py-md-5">
    <CheckoutSteps current="cart" />
    <h1 class="cart-page-title font-brand text-primary fw-bold mb-4">購物車</h1>

    <BrandLoader v-if="isLoading" />

    <div v-else-if="isEmpty" class="cart-empty text-center py-5 px-3">
      <p class="cart-empty__title fw-bold mb-2">購物車目前是空的</p>
      <p class="cart-empty__text mb-4">去逛逛瓦屋選物，把喜歡的帶回日常。</p>
      <RouterLink to="/products" class="btn btn-primary fw-bold px-4 py-2">前往產品列表</RouterLink>
    </div>

    <div v-else class="row g-4">
      <div class="col-lg-8">
        <div class="cart-list">
          <article v-for="item in carts" :key="item.id" class="cart-item">
            <img
              :src="item.product?.imageUrl || fallbackImage"
              class="cart-item__image"
              :alt="item.product?.title || '商品圖片'"
            />
            <div class="cart-item__body">
              <div class="cart-item__head">
                <h2 class="cart-item__title mb-0">{{ item.product?.title }}</h2>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm fw-bold cart-item__remove"
                  :disabled="updatingId === item.id"
                  @click="removeCartItem(item)"
                >
                  刪除
                </button>
              </div>
              <p class="cart-item__category mb-1">{{ item.product?.category }}</p>
              <p class="cart-item__unit mb-3">
                單價 ${{ Math.round(Number(item.product?.price || 0)).toLocaleString() }}
              </p>
              <div class="cart-item__footer">
                <div class="qty-control d-flex align-items-center">
                  <button
                    type="button"
                    class="btn btn-outline-primary qty-control__btn"
                    :disabled="item.qty <= 1 || updatingId === item.id"
                    @click="updateCartQty(item, item.qty - 1)"
                  >
                    -
                  </button>
                  <span class="qty-control__value text-center mx-2">{{ item.qty }}</span>
                  <button
                    type="button"
                    class="btn btn-outline-primary qty-control__btn"
                    :disabled="item.qty >= 99 || updatingId === item.id"
                    @click="updateCartQty(item, item.qty + 1)"
                  >
                    +
                  </button>
                </div>
                <p class="cart-item__subtotal mb-0 fw-bold">
                  小計 ${{
                    Math.round(Number(item.final_total || item.total || 0)).toLocaleString()
                  }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="cart-summary p-3">
          <h2 class="fs-5 fw-bold mb-3">訂單摘要</h2>
          <div class="d-flex justify-content-between mb-2">
            <span>合計</span>
            <span>${{ Math.round(Number(total)).toLocaleString() }}</span>
          </div>
          <div class="d-flex justify-content-between cart-summary__final fw-bold">
            <span>應付金額</span>
            <span>${{ Math.round(Number(final_total)).toLocaleString() }}</span>
          </div>
          <p v-if="hasCouponApplied" class="cart-summary__coupon mb-0 mt-2">
            已套用優惠券
            <span v-if="appliedCouponCode">（{{ appliedCouponCode }}）</span>
          </p>
          <div class="mt-3">
            <label class="form-label mb-2" for="couponCode">優惠碼</label>
            <div class="cart-coupon">
              <input
                id="couponCode"
                v-model.trim="couponCode"
                type="text"
                class="form-control"
                placeholder="輸入優惠碼"
                :disabled="isApplyingCoupon"
              />
              <button
                type="button"
                class="btn btn-primary fw-bold text-nowrap"
                :disabled="!couponCode || isApplyingCoupon"
                @click="onApplyCoupon"
              >
                {{ isApplyingCoupon ? '套用中...' : '套用' }}
              </button>
            </div>
            <p v-if="couponMessage" class="mt-2 mb-0">{{ couponMessage }}</p>
          </div>
          <RouterLink to="/checkout" class="btn btn-primary fw-bold w-100 py-3 mt-4">
            前往結帳
          </RouterLink>
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
  name: 'CartView',
  components: { CheckoutSteps, BrandLoader },
  data() {
    return {
      fallbackImage:
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop',
      couponCode: '',
      couponMessage: ''
    }
  },
  computed: {
    ...mapState(useCartStore, [
      'carts',
      'total',
      'final_total',
      'isLoading',
      'errorMessage',
      'isEmpty',
      'updatingId',
      'isApplyingCoupon',
      'hasCouponApplied',
      'appliedCouponCode'
    ])
  },
  methods: {
    ...mapActions(useCartStore, ['getCart', 'updateCartQty', 'removeCartItem', 'applyCoupon']),
    onApplyCoupon() {
      this.couponMessage = ''
      this.applyCoupon(this.couponCode)
        .then(() => {
          this.couponMessage = '優惠碼已套用'
          this.couponCode = ''
        })
        .catch(() => {
          this.couponMessage = '優惠碼無效或套用失敗'
        })
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.cart-page-title {
  font-size: 1.5rem;

  @include md {
    font-size: 2rem;
  }
}

.cart-empty {
  border: 1px solid $secondary;
  background: #fff;
}

.cart-empty__title {
  font-size: 1.25rem;
  color: $ink;
  letter-spacing: 0.06em;
}

.cart-empty__text {
  opacity: 0.7;
  letter-spacing: 0.04em;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @include md {
    gap: 0;
    border: 1px solid $secondary;
    background: #fff;
  }
}

.cart-item {
  display: flex;
  flex-direction: column;
  border: 1px solid $secondary;
  background: #fff;
  overflow: hidden;

  @include md {
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid $secondary;

    &:last-child {
      border-bottom: none;
    }
  }
}

.cart-item__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
  background: $paper;

  @include md {
    width: 120px;
    height: 120px;
    aspect-ratio: auto;
    flex-shrink: 0;
    border: 1px solid $secondary;
  }
}

.cart-item__body {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-width: 0;

  @include md {
    flex: 1;
    padding: 0;
  }
}

.cart-item__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.cart-item__title {
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.03em;
  color: $ink;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  @include md {
    font-size: 1.1rem;
    -webkit-line-clamp: 3;
  }
}

.cart-item__remove {
  flex-shrink: 0;
  white-space: nowrap;
}

.cart-item__category {
  letter-spacing: 0.06em;
  opacity: 0.7;
  font-size: 0.9rem;
}

.cart-item__unit {
  opacity: 0.75;
  font-size: 0.9rem;
}

.cart-item__footer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-top: auto;

  @include sm {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.cart-item__subtotal {
  color: $primary;
  font-size: 1rem;
}

.cart-summary {
  border: 1px solid $secondary;
  background: #fff;

  @include lg {
    position: sticky;
    top: 5.5rem;
  }
}

.cart-summary__final {
  padding-top: 0.75rem;
  border-top: 1px solid $secondary;
  color: $primary;
  font-size: 1.125rem;
}

.cart-summary__coupon {
  color: $primary;
  letter-spacing: 0.04em;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: right;
}

.cart-coupon {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @include sm {
    flex-direction: row;
  }
}

.qty-control__btn {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  font-size: 1.15rem;
  line-height: 1;

  @include md {
    width: 2.75rem;
    height: 2.75rem;
    font-size: 1.25rem;
  }
}

.qty-control__value {
  min-width: 2rem;
  font-weight: 700;
}
</style>
