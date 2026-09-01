<template>
  <div>
    <h2 class="admin-title font-brand text-primary mb-3">訂單管理</h2>

    <div class="admin-filter mb-3 mb-md-4">
      <button
        type="button"
        class="admin-filter__btn"
        :class="{ 'is-active': paidFilter === 'all' }"
        @click="setPaidFilter('all')"
      >
        全部
      </button>
      <button
        type="button"
        class="admin-filter__btn"
        :class="{ 'is-active': paidFilter === 'unpaid' }"
        @click="setPaidFilter('unpaid')"
      >
        未付款
      </button>
      <button
        type="button"
        class="admin-filter__btn"
        :class="{ 'is-active': paidFilter === 'paid' }"
        @click="setPaidFilter('paid')"
      >
        已付款
      </button>
    </div>

    <BrandLoader v-if="isLoading" />
    <p v-else-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <template v-else>
      <div class="d-none d-md-block table-responsive admin-table">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th>編號</th>
              <th>買家</th>
              <th>金額</th>
              <th>付款狀態</th>
              <th>建立時間</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredOrders" :key="item.id">
              <td class="small">{{ item.id }}</td>
              <td>
                <div>{{ item.user?.name }}</div>
                <div class="small opacity-75">{{ item.user?.email }}</div>
              </td>
              <td>${{ Math.round(Number(item.total || 0)).toLocaleString() }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm"
                  :class="item.is_paid ? 'btn-primary' : 'btn-outline-primary'"
                  :disabled="isUpdatingId === item.id"
                  @click="togglePaymentStatus(item)"
                >
                  {{ paymentButtonLabel(item) }}
                </button>
              </td>
              <td>{{ formatDate(item.create_at) }}</td>
              <td class="text-nowrap">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openDetail(item)">
                  訂單詳情
                </button>
              </td>
            </tr>
            <tr v-if="!filteredOrders.length">
              <td colspan="6" class="text-center opacity-75 py-5">{{ emptyMessage }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-md-none admin-cards">
        <article v-for="item in filteredOrders" :key="`card-${item.id}`" class="admin-card">
          <div class="admin-card__body">
            <p class="admin-card__meta mb-1">{{ formatDate(item.create_at) }}</p>
            <h3 class="admin-card__title h6 mb-1">{{ item.user?.name || '未提供姓名' }}</h3>
            <p class="mb-1 small opacity-75 text-break">{{ item.user?.email }}</p>
            <p class="mb-1 small text-break">編號 {{ item.id }}</p>
            <p class="mb-0 fw-bold">
              ${{ Math.round(Number(item.total || 0)).toLocaleString() }}
            </p>
            <div class="admin-card__status">
              <span>付款狀態</span>
              <button
                type="button"
                class="btn btn-sm"
                :class="item.is_paid ? 'btn-primary' : 'btn-outline-primary'"
                :disabled="isUpdatingId === item.id"
                @click="togglePaymentStatus(item)"
              >
                {{ paymentButtonLabel(item) }}
              </button>
            </div>
          </div>
          <div class="admin-card__actions">
            <button type="button" class="btn btn-outline-primary btn-sm w-100" @click="openDetail(item)">
              訂單詳情
            </button>
          </div>
        </article>
        <p v-if="!filteredOrders.length" class="admin-card admin-card--empty mb-0 text-center opacity-75">
          {{ emptyMessage }}
        </p>
      </div>
    </template>

    <div v-if="showDetail" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-fullscreen-sm-down modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-5 fw-bold font-brand text-primary">訂單詳情</h3>
            <button type="button" class="btn-close" @click="closeDetail"></button>
          </div>
          <div class="modal-body" v-if="detailOrder">
            <section class="detail-section">
              <h4 class="detail-heading">訂單資訊</h4>
              <dl class="detail-grid mb-0">
                <div>
                  <dt>訂單編號</dt>
                  <dd class="text-break">{{ detailOrder.id }}</dd>
                </div>
                <div>
                  <dt>建立時間</dt>
                  <dd>{{ formatDate(detailOrder.create_at) }}</dd>
                </div>
                <div>
                  <dt>付款狀態</dt>
                  <dd>{{ detailOrder.is_paid ? '已付款' : '未付款' }}</dd>
                </div>
                <div>
                  <dt>應付金額</dt>
                  <dd class="detail-total">
                    ${{ Math.round(Number(detailOrder.total || 0)).toLocaleString() }}
                  </dd>
                </div>
              </dl>
            </section>

            <section class="detail-section">
              <h4 class="detail-heading">消費者資料</h4>
              <dl class="detail-grid mb-0">
                <div>
                  <dt>姓名</dt>
                  <dd>{{ detailOrder.user?.name || '-' }}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd class="text-break">{{ detailOrder.user?.email || '-' }}</dd>
                </div>
                <div>
                  <dt>電話</dt>
                  <dd>{{ detailOrder.user?.tel || '-' }}</dd>
                </div>
                <div>
                  <dt>地址</dt>
                  <dd>{{ detailOrder.user?.address || '-' }}</dd>
                </div>
                <div class="detail-grid__full">
                  <dt>備註</dt>
                  <dd>{{ detailOrder.message || '無' }}</dd>
                </div>
              </dl>
            </section>

            <section class="detail-section">
              <h4 class="detail-heading">購買內容</h4>
              <p v-if="!detailProducts.length" class="mb-0 opacity-75">此訂單沒有商品資料</p>
              <ul v-else class="list-unstyled detail-products mb-0">
                <li v-for="line in detailProducts" :key="line.id" class="detail-product">
                  <img
                    :src="line.imageUrl || fallbackImage"
                    :alt="line.title"
                    class="detail-product__img"
                  />
                  <div class="detail-product__body">
                    <p class="detail-product__title mb-1">{{ line.title }}</p>
                    <p class="detail-product__meta mb-0">
                      {{ line.category || '未分類' }}・數量 {{ line.qty }}
                    </p>
                    <p class="detail-product__price mb-0">
                      小計 ${{ Math.round(Number(line.subtotal)).toLocaleString() }}
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section class="detail-section mb-0">
              <h4 class="detail-heading">優惠券</h4>
              <p v-if="detailCoupon" class="detail-coupon mb-0">
                已使用：{{ detailCoupon.title || '優惠券' }}
                <span v-if="detailCoupon.code">（{{ detailCoupon.code }}）</span>
                <span v-if="detailCoupon.percent">・{{ formatPercent(detailCoupon.percent) }}</span>
              </p>
              <p v-else class="mb-0 opacity-75">此訂單未使用優惠券</p>
            </section>
          </div>
          <div class="modal-footer gap-2">
            <button
              v-if="detailOrder"
              type="button"
              class="btn fw-bold"
              :class="detailOrder.is_paid ? 'btn-primary' : 'btn-outline-primary'"
              :disabled="isUpdatingId === detailOrder.id"
              @click="togglePaymentStatus(detailOrder)"
            >
              {{ paymentButtonLabel(detailOrder) }}
            </button>
            <button type="button" class="btn btn-outline-primary" @click="closeDetail">關閉</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetail" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios'
import BrandLoader from '@/components/BrandLoader.vue'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  name: 'AdminOrdersView',
  components: { BrandLoader },
  data() {
    return {
      orders: [],
      paidFilter: 'all',
      isLoading: false,
      errorMessage: '',
      isUpdatingId: '',
      showDetail: false,
      detailOrder: null,
      fallbackImage:
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop'
    }
  },
  computed: {
    filteredOrders() {
      if (this.paidFilter === 'paid') {
        return this.orders.filter((item) => Boolean(item.is_paid))
      }
      if (this.paidFilter === 'unpaid') {
        return this.orders.filter((item) => !item.is_paid)
      }
      return this.orders
    },
    emptyMessage() {
      if (this.paidFilter === 'paid') return '目前沒有已付款訂單'
      if (this.paidFilter === 'unpaid') return '目前沒有未付款訂單'
      return '目前沒有訂單'
    },
    detailProducts() {
      if (!this.detailOrder) return []
      const raw = this.detailOrder.products
      const list = Array.isArray(raw) ? raw : Object.values(raw || {})
      return list.map((line) => {
        const product = line.product || {}
        return {
          id: line.id || line.product_id || product.id,
          title: product.title || line.title || '未命名商品',
          category: product.category || '',
          imageUrl: product.imageUrl || '',
          qty: Number(line.qty || 1),
          subtotal: Number(line.final_total ?? line.total ?? product.price ?? 0)
        }
      })
    },
    detailCoupon() {
      if (!this.detailOrder) return null
      const raw = this.detailOrder.products
      const list = Array.isArray(raw) ? raw : Object.values(raw || {})
      const withCoupon = list.find((line) => line?.coupon && (line.coupon.code || line.coupon.title))
      if (withCoupon?.coupon) return withCoupon.coupon
      if (this.detailOrder.coupon) return this.detailOrder.coupon
      return null
    }
  },
  methods: {
    formatDate(ts) {
      if (!ts) return '-'
      const date = new Date(Number(ts) * 1000)
      if (Number.isNaN(date.getTime())) return '-'
      return date.toLocaleString('zh-TW')
    },
    formatPercent(percent) {
      const value = Number(percent || 100)
      const fold = value / 10
      return `${fold % 1 === 0 ? fold : fold.toFixed(1)} 折`
    },
    setPaidFilter(filter) {
      this.paidFilter = filter
    },
    openDetail(item) {
      this.detailOrder = item
      this.showDetail = true
    },
    closeDetail() {
      this.showDetail = false
      this.detailOrder = null
    },
    paymentButtonLabel(item) {
      if (this.isUpdatingId === item.id) return '更新中...'
      return item.is_paid ? '已付款' : '未付款'
    },
    getOrders() {
      this.isLoading = true
      this.errorMessage = ''
      axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders`)
        .then((res) => {
          const raw = res.data.orders
          this.orders = Array.isArray(raw) ? raw : Object.values(raw || {})
          this.isLoading = false
          if (this.detailOrder?.id) {
            const latest = this.orders.find((order) => order.id === this.detailOrder.id)
            if (latest) this.detailOrder = latest
          }
        })
        .catch(() => {
          this.errorMessage = '訂單列表載入失敗'
          this.isLoading = false
        })
    },
    togglePaymentStatus(item) {
      if (!item?.id || this.isUpdatingId) return
      this.isUpdatingId = item.id
      const data = {
        ...item,
        is_paid: !Boolean(item.is_paid)
      }
      axios
        .put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${item.id}`, { data })
        .then(() => this.getOrders())
        .catch(() => {
          this.errorMessage = '更新付款狀態失敗'
        })
        .finally(() => {
          this.isUpdatingId = ''
        })
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<style lang="scss" scoped>
.admin-title {
  font-size: 1.15rem;

  @include md {
    font-size: 1.5rem;
  }
}

.admin-filter {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  -webkit-overflow-scrolling: touch;

  @include md {
    flex-wrap: wrap;
    overflow: visible;
  }
}

.admin-filter__btn {
  flex: 0 0 auto;
  border: 1px solid $secondary;
  background: #fff;
  color: $ink;
  padding: 0.4rem 0.85rem;
  letter-spacing: 0.06em;
  white-space: nowrap;

  @include md {
    min-width: 5.5rem;
  }

  &.is-active,
  &:hover {
    background: $primary;
    border-color: $primary;
    color: $paper;
  }
}

.admin-table {
  border: 1px solid $secondary;
  background: #fff;
}

.admin-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admin-card {
  border: 1px solid $secondary;
  background: #fff;
  padding: 1rem;
}

.admin-card__meta {
  font-size: 0.8rem;
  color: rgba($ink, 0.7);
}

.admin-card__title {
  letter-spacing: 0.04em;
  color: $ink;
}

.admin-card__status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid $secondary;
  font-size: 0.9rem;
  font-weight: 700;
}

.admin-card__actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.admin-card--empty {
  padding: 2rem 1rem;
}

.detail-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid $secondary;

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
}

.detail-heading {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: $ink;
  margin-bottom: 0.85rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @include sm {
    grid-template-columns: 1fr 1fr;
  }

  dt {
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    color: rgba($ink, 0.65);
    margin-bottom: 0.15rem;
  }

  dd {
    margin: 0;
    color: $ink;
    word-break: break-word;
  }
}

.detail-grid__full {
  @include sm {
    grid-column: 1 / -1;
  }
}

.detail-total {
  color: $primary;
  font-weight: 700;
}

.detail-products {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-product {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid $secondary;
  background: $paper;
}

.detail-product__img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid $secondary;
  background: #fff;

  @include md {
    width: 88px;
    height: 88px;
  }
}

.detail-product__body {
  min-width: 0;
  flex: 1;
}

.detail-product__title {
  font-weight: 700;
  letter-spacing: 0.03em;
  color: $ink;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.detail-product__meta {
  font-size: 0.85rem;
  color: rgba($ink, 0.7);
}

.detail-product__price {
  margin-top: 0.35rem;
  color: $primary;
  font-weight: 700;
}

.detail-coupon {
  color: $primary;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.modal.show {
  background: rgba($ink, 0.35);
}

.modal-footer {
  flex-wrap: wrap;

  .btn {
    @media (max-width: 575.98px) {
      flex: 1 1 auto;
    }
  }
}
</style>
