<template>
  <div>
    <div class="admin-toolbar d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <h2 class="admin-title font-brand text-primary mb-0">優惠券管理</h2>
      <button type="button" class="btn btn-primary fw-bold admin-toolbar__btn" @click="openCreate">
        新增優惠券
      </button>
    </div>

    <div class="admin-filter mb-3 mb-md-4">
      <button
        type="button"
        class="admin-filter__btn"
        :class="{ 'is-active': statusFilter === 'all' }"
        @click="setStatusFilter('all')"
      >
        全部
      </button>
      <button
        type="button"
        class="admin-filter__btn"
        :class="{ 'is-active': statusFilter === 'active' }"
        @click="setStatusFilter('active')"
      >
        生效中
      </button>
      <button
        type="button"
        class="admin-filter__btn"
        :class="{ 'is-active': statusFilter === 'expired' }"
        @click="setStatusFilter('expired')"
      >
        已失效
      </button>
    </div>

    <BrandLoader v-if="isLoading" />
    <p v-else-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <template v-else>
      <div class="d-none d-md-block table-responsive admin-table">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th>名稱</th>
              <th>優惠碼</th>
              <th>折扣％</th>
              <th>到期日</th>
              <th>狀態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredCoupons" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.percent }}</td>
              <td>{{ formatDate(item.due_date) }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm"
                  :class="isCouponActive(item) ? 'btn-primary' : 'btn-outline-primary'"
                  :disabled="isUpdatingId === item.id"
                  @click="toggleCouponStatus(item)"
                >
                  {{ statusButtonLabel(item) }}
                </button>
              </td>
              <td class="text-nowrap">
                <button type="button" class="btn btn-outline-primary btn-sm me-2" @click="openEdit(item)">
                  編輯
                </button>
                <button type="button" class="btn btn-primary btn-sm" @click="openDelete(item)">
                  刪除
                </button>
              </td>
            </tr>
            <tr v-if="!filteredCoupons.length">
              <td colspan="6" class="text-center opacity-75 py-5">{{ emptyMessage }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-md-none admin-cards">
        <article v-for="item in filteredCoupons" :key="`card-${item.id}`" class="admin-card">
          <div class="admin-card__body">
            <p class="admin-card__meta mb-1">有效至 {{ formatDate(item.due_date) }}</p>
            <h3 class="admin-card__title h6 mb-1">{{ item.title }}</h3>
            <p class="mb-0 small">
              優惠碼 <strong>{{ item.code }}</strong>
              <span class="ms-2 opacity-75">{{ item.percent }}%</span>
            </p>
            <div class="admin-card__status">
              <span>優惠券狀態</span>
              <button
                type="button"
                class="btn btn-sm"
                :class="isCouponActive(item) ? 'btn-primary' : 'btn-outline-primary'"
                :disabled="isUpdatingId === item.id"
                @click="toggleCouponStatus(item)"
              >
                {{ statusButtonLabel(item) }}
              </button>
            </div>
          </div>
          <div class="admin-card__actions">
            <button type="button" class="btn btn-outline-primary btn-sm flex-fill" @click="openEdit(item)">
              編輯
            </button>
            <button type="button" class="btn btn-primary btn-sm flex-fill" @click="openDelete(item)">
              刪除
            </button>
          </div>
        </article>
        <p v-if="!filteredCoupons.length" class="admin-card admin-card--empty mb-0 text-center opacity-75">
          {{ emptyMessage }}
        </p>
      </div>
    </template>

    <div v-if="showForm" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-5 fw-bold font-brand text-primary">
              {{ isEdit ? '編輯優惠券' : '新增優惠券' }}
            </h3>
            <button type="button" class="btn-close" @click="closeForm"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">名稱</label>
              <input v-model.trim="form.title" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">優惠碼 code</label>
              <input v-model.trim="form.code" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">折扣百分比（例如 80 代表 8 折）</label>
              <input v-model.number="form.percent" type="number" min="1" max="100" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">到期日</label>
              <input v-model="form.due_date_input" type="date" class="form-control" />
            </div>
            <div class="form-check">
              <input id="couponEnabled" v-model="form.is_enabled" class="form-check-input" type="checkbox" />
              <label class="form-check-label" for="couponEnabled">啟用</label>
            </div>
            <p v-if="formError" class="text-danger mt-3 mb-0">{{ formError }}</p>
          </div>
          <div class="modal-footer gap-2">
            <button type="button" class="btn btn-outline-primary" @click="closeForm">取消</button>
            <button type="button" class="btn btn-primary fw-bold" :disabled="isSaving" @click="saveItem">
              {{ isSaving ? '儲存中...' : '儲存' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showForm" class="modal-backdrop fade show"></div>

    <div v-if="showDelete" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered mx-3 mx-sm-auto">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-5 fw-bold font-brand text-primary">確認刪除</h3>
            <button type="button" class="btn-close" @click="closeDelete"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">
              確定要刪除優惠券「<strong>{{ deleteTarget?.code }}</strong>」嗎？此操作無法復原。
            </p>
          </div>
          <div class="modal-footer gap-2">
            <button type="button" class="btn btn-outline-primary" :disabled="isDeleting" @click="closeDelete">
              取消
            </button>
            <button type="button" class="btn btn-primary fw-bold" :disabled="isDeleting" @click="confirmDelete">
              {{ isDeleting ? '刪除中...' : '確認刪除' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDelete" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { syncPublicCoupons } from '@/utils/couponCatalog'
import BrandLoader from '@/components/BrandLoader.vue'
const { VITE_URL, VITE_PATH } = import.meta.env

const emptyForm = () => ({
  title: '',
  code: '',
  percent: 80,
  due_date_input: '',
  is_enabled: true
})

export default {
  name: 'AdminCouponsView',
  components: { BrandLoader },
  data() {
    return {
      coupons: [],
      statusFilter: 'all',
      isLoading: false,
      errorMessage: '',
      showForm: false,
      isEdit: false,
      editId: '',
      form: emptyForm(),
      formError: '',
      isSaving: false,
      showDelete: false,
      deleteTarget: null,
      isDeleting: false,
      isUpdatingId: ''
    }
  },
  computed: {
    filteredCoupons() {
      if (this.statusFilter === 'active') {
        return this.coupons.filter((item) => this.isCouponActive(item))
      }
      if (this.statusFilter === 'expired') {
        return this.coupons.filter((item) => !this.isCouponActive(item))
      }
      return this.coupons
    },
    emptyMessage() {
      if (this.statusFilter === 'active') return '目前沒有生效中的優惠券'
      if (this.statusFilter === 'expired') return '目前沒有已失效的優惠券'
      return '目前沒有優惠券'
    }
  },
  methods: {
    isCouponActive(item) {
      const due = Number(item.due_date || 0)
      const now = Math.floor(Date.now() / 1000)
      return Boolean(item.is_enabled) && due >= now
    },
    statusLabel(item) {
      return this.isCouponActive(item) ? '生效中' : '已失效'
    },
    statusButtonLabel(item) {
      if (this.isUpdatingId === item.id) return '更新中...'
      return this.statusLabel(item)
    },
    setStatusFilter(filter) {
      this.statusFilter = filter
    },
    formatDate(ts) {
      if (!ts) return '-'
      const date = new Date(Number(ts) * 1000)
      if (Number.isNaN(date.getTime())) return '-'
      return date.toLocaleDateString('zh-TW')
    },
    toInputDate(ts) {
      if (!ts) return ''
      const date = new Date(Number(ts) * 1000)
      if (Number.isNaN(date.getTime())) return ''
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    },
    getCoupons() {
      this.isLoading = true
      this.errorMessage = ''
      axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupons`)
        .then((res) => {
          const raw = res.data.coupons
          this.coupons = Array.isArray(raw) ? raw : Object.values(raw || {})
          syncPublicCoupons(this.coupons)
          this.isLoading = false
        })
        .catch(() => {
          this.errorMessage = '優惠券列表載入失敗'
          this.isLoading = false
        })
    },
    openCreate() {
      this.isEdit = false
      this.editId = ''
      this.form = emptyForm()
      this.formError = ''
      this.showForm = true
    },
    openEdit(item) {
      this.isEdit = true
      this.editId = item.id
      this.form = {
        title: item.title || '',
        code: item.code || '',
        percent: Number(item.percent || 80),
        due_date_input: this.toInputDate(item.due_date),
        is_enabled: Boolean(item.is_enabled)
      }
      this.formError = ''
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
    },
    toggleCouponStatus(item) {
      if (!item?.id || this.isUpdatingId) return
      const now = Math.floor(Date.now() / 1000)
      if (!item.is_enabled && Number(item.due_date || 0) < now) {
        this.errorMessage = '優惠券已過期，請先編輯到期日再啟用'
        return
      }
      this.isUpdatingId = item.id
      this.errorMessage = ''
      const data = {
        title: item.title,
        code: item.code,
        percent: Number(item.percent),
        due_date: Number(item.due_date),
        is_enabled: item.is_enabled ? 0 : 1
      }
      axios
        .put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${item.id}`, { data })
        .then(() => this.getCoupons())
        .catch(() => {
          this.errorMessage = '更新優惠券狀態失敗'
        })
        .finally(() => {
          this.isUpdatingId = ''
        })
    },
    saveItem() {
      if (!this.form.title || !this.form.code || !this.form.due_date_input) {
        this.formError = '請填寫名稱、優惠碼與到期日'
        return
      }
      this.isSaving = true
      this.formError = ''
      const due = Math.floor(new Date(`${this.form.due_date_input}T23:59:59`).getTime() / 1000)
      const data = {
        title: this.form.title,
        code: this.form.code,
        percent: this.form.percent,
        due_date: due,
        is_enabled: this.form.is_enabled ? 1 : 0
      }
      const request = this.isEdit
        ? axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${this.editId}`, { data })
        : axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon`, { data })
      request
        .then(() => {
          this.isSaving = false
          this.showForm = false
          this.getCoupons()
        })
        .catch(() => {
          this.isSaving = false
          this.formError = '儲存失敗，請稍後再試'
        })
    },
    openDelete(item) {
      this.deleteTarget = item
      this.showDelete = true
    },
    closeDelete() {
      if (this.isDeleting) return
      this.showDelete = false
      this.deleteTarget = null
    },
    confirmDelete() {
      if (!this.deleteTarget?.id || this.isDeleting) return
      this.isDeleting = true
      axios
        .delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${this.deleteTarget.id}`)
        .then(() => {
          this.isDeleting = false
          this.showDelete = false
          this.deleteTarget = null
          this.getCoupons()
        })
        .catch(() => {
          this.isDeleting = false
          this.errorMessage = '刪除失敗'
          this.showDelete = false
          this.deleteTarget = null
        })
    }
  },
  mounted() {
    this.getCoupons()
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

.admin-toolbar__btn {
  width: 100%;

  @include sm {
    width: auto;
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
