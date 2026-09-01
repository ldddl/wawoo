<template>
  <div class="container py-4 py-md-5">
    <div class="coupons-hero text-center mx-auto">
      <p class="coupons-kicker mb-2">LIMITED OFFER</p>
      <h1 class="section-title fw-bold mb-3">瓦屋優惠券</h1>
      <p class="opacity-75 mb-4">
        開啟可領優惠券列表，領取後可至購物車輸入優惠碼折抵。
      </p>
      <button type="button" class="btn btn-primary fw-bold px-4 py-3" @click="openModal">
        查看可領優惠券
      </button>
      <p v-if="claimedCodes.length" class="claimed-hint mt-4 mb-0 small">
        已領取：{{ claimedCodes.join('、') }}
      </p>
    </div>

    <div
      ref="couponModal"
      class="modal fade"
      id="couponListModal"
      tabindex="-1"
      aria-labelledby="couponListModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="couponListModalLabel" class="modal-title fs-5 fw-bold">可領取優惠券</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <BrandLoader v-if="isLoading" compact />
            <p v-else-if="!coupons.length" class="mb-0 opacity-75">
              目前沒有可領取的優惠券。請先至後台新增並啟用優惠券。
            </p>
            <ul v-else class="list-unstyled coupon-list mb-0">
              <li v-for="item in coupons" :key="item.id || item.code" class="coupon-item">
                <div class="coupon-item__main">
                  <p class="coupon-item__title mb-1">{{ item.title }}</p>
                  <p class="coupon-item__meta mb-0">
                    {{ formatPercent(item.percent) }}
                    <span v-if="item.due_date">・有效至 {{ formatDate(item.due_date) }}</span>
                  </p>
                  <p v-if="isClaimed(item.code)" class="coupon-item__code mb-0 mt-2">
                    優惠碼：{{ item.code }}
                  </p>
                </div>
                <button
                  type="button"
                  class="btn btn-sm fw-bold text-nowrap"
                  :class="isClaimed(item.code) ? 'btn-outline-primary' : 'btn-primary'"
                  :disabled="claimingCode === item.code || copyingCode === item.code"
                  @click="isClaimed(item.code) ? copyCoupon(item.code) : claimCoupon(item)"
                >
                  {{ buttonLabel(item.code) }}
                </button>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary fw-bold"
              :disabled="isNavigatingToCart"
              @click="goToCart"
            >
              {{ isNavigatingToCart ? '前往購物車中...' : '前往購物車使用' }}
            </button>
            <button type="button" class="btn btn-primary fw-bold" data-bs-dismiss="modal">關閉</button>
          </div>
        </div>
      </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref="couponToast"
        class="toast coupon-toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header coupon-toast__header">
          <strong class="me-auto text-paper fw-bold">{{ toastTitle }}</strong>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body fw-bold">{{ toastMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Modal, Toast } from 'bootstrap'
import {
  claimCouponCode,
  normalizeCoupons,
  pruneClaimedCodes,
  readPublicCoupons,
  syncPublicCoupons
} from '@/utils/couponCatalog'
import { useAuthStore } from '@/stores/authStore'
import BrandLoader from '@/components/BrandLoader.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  name: 'CouponsView',
  components: { BrandLoader },
  data() {
    return {
      coupons: [],
      claimedCodes: [],
      isLoading: false,
      claimingCode: '',
      copyingCode: '',
      isNavigatingToCart: false,
      bsCouponModal: null,
      bsCouponToast: null,
      toastTitle: '',
      toastMessage: ''
    }
  },
  methods: {
    formatPercent(percent) {
      const value = Number(percent || 100)
      const fold = value / 10
      return `${fold % 1 === 0 ? fold : fold.toFixed(1)} 折`
    },
    formatDate(ts) {
      if (!ts) return ''
      const date = new Date(Number(ts) * 1000)
      if (Number.isNaN(date.getTime())) return ''
      return date.toLocaleDateString('zh-TW')
    },
    isClaimed(code) {
      return this.claimedCodes.includes(String(code || '').trim())
    },
    buttonLabel(code) {
      if (this.copyingCode === code) return '複製中...'
      if (this.isClaimed(code)) return '複製'
      if (this.claimingCode === code) return '領取中...'
      return '領取'
    },
    openModal() {
      this.bsCouponModal?.show()
    },
    closeModal() {
      this.bsCouponModal?.hide()
    },
    goToCart() {
      if (this.isNavigatingToCart) return
      const modalElement = this.$refs.couponModal
      if (!this.bsCouponModal || !modalElement) {
        this.$router.push('/cart')
        return
      }

      this.isNavigatingToCart = true
      modalElement.addEventListener(
        'hidden.bs.modal',
        () => {
          this.$router.push('/cart')
        },
        { once: true }
      )
      this.bsCouponModal.hide()
    },
    cleanupModalState() {
      document.body.classList.remove('modal-open')
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
      document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove())
    },
    showToast(title, message) {
      this.toastTitle = title
      this.toastMessage = message
      this.bsCouponToast?.show()
    },
    loadClaimed() {
      this.claimedCodes = pruneClaimedCodes(this.coupons.length ? this.coupons : readPublicCoupons())
    },
    refreshClaimedAgainstCatalog() {
      this.claimedCodes = pruneClaimedCodes(this.coupons)
    },
    writeClipboard(code) {
      const text = String(code || '').trim()
      if (!text) return Promise.reject()
      if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(text)
      }
      const input = document.createElement('textarea')
      input.value = text
      input.setAttribute('readonly', '')
      input.style.position = 'absolute'
      input.style.left = '-9999px'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      return Promise.resolve()
    },
    copyCoupon(code) {
      this.copyingCode = code
      return this.writeClipboard(code)
        .then(() => {
          this.copyingCode = ''
          this.showToast('已複製', `優惠碼 ${code} 已複製，可至購物車貼上使用`)
        })
        .catch(() => {
          this.copyingCode = ''
          this.showToast('複製失敗', '請手動選取優惠碼複製')
        })
    },
    getCoupons() {
      this.isLoading = true
      this.coupons = readPublicCoupons()
      this.refreshClaimedAgainstCatalog()
      const authStore = useAuthStore()
      const token = authStore.applyStoredToken()
      if (!token) {
        this.isLoading = false
        return Promise.resolve()
      }
      return axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupons`)
        .then((res) => {
          this.coupons = syncPublicCoupons(res.data.coupons)
          this.refreshClaimedAgainstCatalog()
          this.isLoading = false
        })
        .catch(() => {
          this.coupons = normalizeCoupons(readPublicCoupons())
          this.refreshClaimedAgainstCatalog()
          this.isLoading = false
        })
    },
    claimCoupon(item) {
      if (!item?.code || this.isClaimed(item.code)) return
      this.claimingCode = item.code
      this.claimedCodes = claimCouponCode(item.code)
      this.writeClipboard(item.code)
        .then(() => {
          this.claimingCode = ''
          this.showToast('領取成功', `優惠碼 ${item.code} 已複製，可至購物車貼上使用`)
        })
        .catch(() => {
          this.claimingCode = ''
          this.showToast('領取成功', `優惠碼 ${item.code} 已存入，請手動複製後至購物車使用`)
        })
    }
  },
  mounted() {
    this.bsCouponModal = new Modal(this.$refs.couponModal)
    this.bsCouponToast = new Toast(this.$refs.couponToast, { delay: 2800 })
    this.coupons = readPublicCoupons()
    this.loadClaimed()
    this.getCoupons().then(() => {
      this.openModal()
    })
  },
  beforeUnmount() {
    this.bsCouponModal?.dispose()
    this.bsCouponToast?.dispose()
    this.cleanupModalState()
  }
}
</script>

<style lang="scss" scoped>
.coupons-hero {
  max-width: 36rem;
}

.coupons-kicker {
  letter-spacing: 0.28em;
  font-size: 0.75rem;
  color: $primary;
}

.claimed-hint {
  color: $ink;
  letter-spacing: 0.04em;
}

.coupon-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.coupon-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid $secondary;
  background: $paper;
}

.coupon-item__title {
  font-weight: 700;
  letter-spacing: 0.04em;
  color: $ink;
}

.coupon-item__meta {
  font-size: 0.9rem;
  color: rgba($ink, 0.72);
}

.coupon-item__code {
  font-size: 0.9rem;
  color: $primary;
  letter-spacing: 0.06em;
}

.coupon-toast {
  border: 1px solid $primary;
  background: #fff;
}

.coupon-toast__header {
  background: $primary;
  color: $paper;
  border-bottom: 0;
}

.text-paper {
  color: $paper;
}
</style>
