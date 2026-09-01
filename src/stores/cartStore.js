import { defineStore } from 'pinia'
import axios from 'axios'

const { VITE_URL, VITE_PATH } = import.meta.env

export const useCartStore = defineStore('cart', {
  state: () => ({
    carts: [],
    total: 0,
    final_total: 0,
    isLoading: false,
    errorMessage: '',
    updatingId: '',
    isApplyingCoupon: false,
    couponCode: '',
    couponMessage: '',
    appliedCouponCode: ''
  }),
  getters: {
    isEmpty: (state) => state.carts.length === 0,
    cartCount: (state) => state.carts.reduce((sum, item) => sum + Number(item.qty || 0), 0),
    hasCouponApplied: (state) =>
      Boolean(state.appliedCouponCode) ||
      Math.round(Number(state.final_total || 0)) < Math.round(Number(state.total || 0))
  },
  actions: {
    getCart(silent = false) {
      if (!silent) {
        this.isLoading = true
      }
      this.errorMessage = ''
      return axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`)
        .then((res) => {
          const data = res.data.data || {}
          this.carts = data.carts || []
          this.total = data.total || 0
          this.final_total = data.final_total || 0
          if (Math.round(Number(this.final_total || 0)) >= Math.round(Number(this.total || 0))) {
            this.appliedCouponCode = ''
          }
          this.isLoading = false
        })
        .catch(() => {
          this.carts = []
          this.total = 0
          this.final_total = 0
          this.appliedCouponCode = ''
          this.errorMessage = '購物車資料載入失敗，請稍後再試'
          this.isLoading = false
        })
    },
    updateCartQty(item, qty) {
      const nextQty = Number(qty)
      if (!item?.id || !item?.product_id || nextQty < 1 || this.updatingId) return
      this.updatingId = item.id
      const data = {
        product_id: item.product_id,
        qty: nextQty
      }
      return axios
        .put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`, { data })
        .then(() => this.getCart(true))
        .catch(() => {
          this.updatingId = ''
          this.errorMessage = '更新數量失敗，請稍後再試'
        })
        .finally(() => {
          this.updatingId = ''
        })
    },
    removeCartItem(item) {
      if (!item?.id || this.updatingId) return
      this.updatingId = item.id
      return axios
        .delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`)
        .then(() => this.getCart(true))
        .catch(() => {
          this.updatingId = ''
          this.errorMessage = '刪除失敗，請稍後再試'
        })
        .finally(() => {
          this.updatingId = ''
        })
    },
    applyCoupon(code) {
      const couponCode = String(code || '').trim()
      if (!couponCode || this.isApplyingCoupon) return
      this.isApplyingCoupon = true
      const data = { code: couponCode }
      return axios
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/coupon`, { data })
        .then(() => {
          this.appliedCouponCode = couponCode
          return this.getCart(true)
        })
        .catch(() => {
          this.errorMessage = '優惠碼無效或套用失敗'
          return Promise.reject()
        })
        .finally(() => {
          this.isApplyingCoupon = false
        })
    },
    createOrder(form) {
      const data = {
        user: {
          name: form.name,
          email: form.email,
          tel: form.tel,
          address: form.address
        },
        message: form.message || ''
      }
      return axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, { data }).then((res) => {
        if (!res.data.success) {
          return Promise.reject(res.data)
        }
        return this.getCart(true).then(() => res.data)
      })
    }
  }
})
