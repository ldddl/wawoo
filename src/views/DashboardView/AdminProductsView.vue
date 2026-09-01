<template>
  <div class="admin-products">
    <div class="admin-toolbar d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <h2 class="admin-title font-brand text-primary mb-0">商品管理</h2>
      <button type="button" class="btn btn-primary fw-bold admin-toolbar__btn" @click="openCreate">
        新增商品
      </button>
    </div>

    <div class="admin-category mb-3">
      <button
        type="button"
        class="admin-category__btn"
        :class="{ 'is-active': !activeCategory }"
        @click="setCategory('')"
      >
        全部
      </button>
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="admin-category__btn"
        :class="{ 'is-active': activeCategory === category }"
        @click="setCategory(category)"
      >
        {{ category }}
      </button>
    </div>

    <BrandLoader v-if="isLoading" />
    <p v-else-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

    <div v-else class="admin-panel">
      <div class="d-none d-md-block table-responsive admin-table">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th>主圖</th>
              <th>分類</th>
              <th>名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>商品狀態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pagedProducts" :key="item.id">
              <td>
                <div class="admin-thumb">
                  <img
                    v-if="item.imageUrl"
                    :src="item.imageUrl"
                    :alt="item.title"
                    class="admin-thumb__img"
                    @error="onImageError"
                  />
                  <span v-else class="admin-thumb__empty">無圖</span>
                </div>
              </td>
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>${{ Math.round(Number(item.origin_price || 0)).toLocaleString() }}</td>
              <td>${{ Math.round(Number(item.price || 0)).toLocaleString() }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm"
                  :class="item.is_enabled ? 'btn-primary' : 'btn-outline-primary'"
                  :disabled="isUpdatingId === item.id"
                  @click="toggleProductStatus(item)"
                >
                  {{ productStatusLabel(item) }}
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
            <tr v-if="!pagedProducts.length">
              <td colspan="7" class="text-center opacity-75 py-5">此分類目前沒有商品</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-md-none admin-cards">
        <article v-for="item in pagedProducts" :key="`card-${item.id}`" class="admin-card">
          <div class="admin-card__media">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.title"
              class="admin-card__img"
              @error="onImageError"
            />
            <span v-else class="admin-card__img-empty">無圖</span>
          </div>
          <div class="admin-card__body">
            <p class="admin-card__meta mb-1">{{ item.category }}</p>
            <h3 class="admin-card__title h6 mb-2">{{ item.title }}</h3>
            <p class="mb-0 small">
              售價 ${{ Math.round(Number(item.price || 0)).toLocaleString() }}
              <span class="opacity-75 ms-2">
                原價 ${{ Math.round(Number(item.origin_price || 0)).toLocaleString() }}
              </span>
            </p>
            <div class="admin-card__status">
              <span>商品狀態</span>
              <button
                type="button"
                class="btn btn-sm"
                :class="item.is_enabled ? 'btn-primary' : 'btn-outline-primary'"
                :disabled="isUpdatingId === item.id"
                @click="toggleProductStatus(item)"
              >
                {{ productStatusLabel(item) }}
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
        <p v-if="!pagedProducts.length" class="admin-card admin-card--empty mb-0 text-center opacity-75">
          此分類目前沒有商品
        </p>
      </div>

      <nav class="admin-pagination" aria-label="商品分頁">
        <ul class="pagination pagination-sm mb-0 justify-content-center flex-wrap">
          <li class="page-item" :class="{ disabled: currentPage <= 1 }">
            <button type="button" class="page-link" :disabled="currentPage <= 1" @click="goPage(currentPage - 1)">
              上一頁
            </button>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button type="button" class="page-link" @click="goPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
            <button
              type="button"
              class="page-link"
              :disabled="currentPage >= totalPages"
              @click="goPage(currentPage + 1)"
            >
              下一頁
            </button>
          </li>
        </ul>
        <p class="admin-pagination__meta mb-0 mt-2 text-center small opacity-75">
          共 {{ filteredProducts.length }} 筆，每頁 {{ pageSize }} 筆
        </p>
      </nav>
    </div>

    <div v-if="showForm" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-fullscreen-sm-down modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title fs-5 fw-bold font-brand text-primary">
              {{ isEdit ? '編輯商品' : '新增商品' }}
            </h3>
            <button type="button" class="btn-close" @click="closeForm"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label">標題</label>
                <input v-model.trim="form.title" type="text" class="form-control" />
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">分類</label>
                <select v-model="form.category" class="form-select">
                  <option disabled value="">請選擇分類</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>
              <div class="col-6 col-md-4">
                <label class="form-label">單位</label>
                <input v-model.trim="form.unit" type="text" class="form-control" />
              </div>
              <div class="col-6 col-md-4">
                <label class="form-label">原價</label>
                <input v-model.number="form.origin_price" type="number" min="0" class="form-control" />
              </div>
              <div class="col-12 col-md-4">
                <label class="form-label">售價</label>
                <input v-model.number="form.price" type="number" min="0" class="form-control" />
              </div>
              <div class="col-12">
                <label class="form-label">主圖網址</label>
                <input v-model.trim="form.imageUrl" type="url" class="form-control" placeholder="https://" />
                <div class="admin-preview mt-3">
                  <img
                    v-if="form.imageUrl && !previewBroken"
                    :src="form.imageUrl"
                    :alt="form.title || '主圖預覽'"
                    class="admin-preview__img"
                    @load="previewBroken = false"
                    @error="previewBroken = true"
                  />
                  <p v-else-if="form.imageUrl && previewBroken" class="admin-preview__hint mb-0">
                    圖片無法載入，請確認網址
                  </p>
                  <p v-else class="admin-preview__hint mb-0">輸入主圖網址後會即時預覽</p>
                </div>
              </div>
              <div class="col-12">
                <label class="form-label">描述</label>
                <textarea v-model.trim="form.description" class="form-control" rows="2"></textarea>
              </div>
              <div class="col-12">
                <label class="form-label">詳情</label>
                <textarea v-model.trim="form.content" class="form-control" rows="3"></textarea>
              </div>
              <div class="col-12 form-check ms-2">
                <input id="productEnabled" v-model="form.is_enabled" class="form-check-input" type="checkbox" />
                <label class="form-check-label" for="productEnabled">啟用</label>
              </div>
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
              確定要刪除商品「<strong>{{ deleteTarget?.title }}</strong>」嗎？此操作無法復原。
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
import BrandLoader from '@/components/BrandLoader.vue'
const { VITE_URL, VITE_PATH } = import.meta.env

const PAGE_SIZE = 10
const CATEGORIES = ['客廳', '房間', '廚房', '衛浴']

const emptyForm = () => ({
  title: '',
  category: '',
  unit: '件',
  origin_price: 0,
  price: 0,
  imageUrl: '',
  description: '',
  content: '',
  is_enabled: true,
  imagesUrl: []
})

export default {
  name: 'AdminProductsView',
  components: { BrandLoader },
  data() {
    return {
      products: [],
      categories: CATEGORIES,
      activeCategory: '',
      currentPage: 1,
      pageSize: PAGE_SIZE,
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
      previewBroken: false,
      isUpdatingId: ''
    }
  },
  watch: {
    'form.imageUrl'() {
      this.previewBroken = false
    }
  },
  computed: {
    filteredProducts() {
      if (!this.activeCategory) return this.products
      return this.products.filter((item) => item.category === this.activeCategory)
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize))
    },
    pagedProducts() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredProducts.slice(start, start + this.pageSize)
    }
  },
  methods: {
    getProducts() {
      this.isLoading = true
      this.errorMessage = ''
      axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/products/all`)
        .then((res) => {
          const raw = res.data.products
          this.products = Array.isArray(raw) ? raw : Object.values(raw || {})
          this.clampPage()
          this.isLoading = false
        })
        .catch(() => {
          this.errorMessage = '商品列表載入失敗'
          this.isLoading = false
        })
    },
    setCategory(category) {
      this.activeCategory = category
      this.currentPage = 1
    },
    goPage(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
    },
    clampPage() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages
      }
    },
    openCreate() {
      this.isEdit = false
      this.editId = ''
      this.form = emptyForm()
      this.formError = ''
      this.previewBroken = false
      this.showForm = true
    },
    openEdit(item) {
      this.isEdit = true
      this.editId = item.id
      this.form = {
        title: item.title || '',
        category: item.category || '',
        unit: item.unit || '件',
        origin_price: Number(item.origin_price || 0),
        price: Number(item.price || 0),
        imageUrl: item.imageUrl || '',
        description: item.description || '',
        content: item.content || '',
        is_enabled: Boolean(item.is_enabled),
        imagesUrl: item.imagesUrl || []
      }
      this.formError = ''
      this.previewBroken = false
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
    },
    onImageError(event) {
      if (event?.target) {
        event.target.style.display = 'none'
      }
    },
    productStatusLabel(item) {
      if (this.isUpdatingId === item.id) return '更新中...'
      return item.is_enabled ? '已啟用' : '未啟用'
    },
    toggleProductStatus(item) {
      if (!item?.id || this.isUpdatingId) return
      this.isUpdatingId = item.id
      this.errorMessage = ''
      const data = {
        ...item,
        is_enabled: item.is_enabled ? 0 : 1
      }
      axios
        .put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${item.id}`, { data })
        .then(() => this.getProducts())
        .catch(() => {
          this.errorMessage = '更新商品狀態失敗'
        })
        .finally(() => {
          this.isUpdatingId = ''
        })
    },
    saveItem() {
      if (!this.form.title || !this.form.category) {
        this.formError = '請填寫標題與分類'
        return
      }
      this.isSaving = true
      this.formError = ''
      const data = {
        ...this.form,
        is_enabled: this.form.is_enabled ? 1 : 0
      }
      const request = this.isEdit
        ? axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${this.editId}`, { data })
        : axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product`, { data })
      request
        .then(() => {
          this.isSaving = false
          this.showForm = false
          this.getProducts()
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
        .delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${this.deleteTarget.id}`)
        .then(() => {
          this.isDeleting = false
          this.showDelete = false
          this.deleteTarget = null
          this.getProducts()
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
    this.getProducts()
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

.admin-category {
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

.admin-category__btn {
  flex: 0 0 auto;
  border: 1px solid $secondary;
  background: #fff;
  color: $ink;
  padding: 0.4rem 0.85rem;
  letter-spacing: 0.06em;
  white-space: nowrap;

  &.is-active,
  &:hover {
    background: $primary;
    border-color: $primary;
    color: $paper;
  }
}

.admin-panel {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 16rem);

  @include md {
    min-height: calc(100vh - 14rem);
  }
}

.admin-table {
  border: 1px solid $secondary;
  background: #fff;
}

.admin-thumb {
  width: 56px;
  height: 56px;
  border: 1px solid $secondary;
  background: $paper;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-thumb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.admin-thumb__empty {
  font-size: 0.75rem;
  color: rgba($ink, 0.55);
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

.admin-card__media {
  width: 100%;
  aspect-ratio: 16 / 10;
  border: 1px solid $secondary;
  background: $paper;
  overflow: hidden;
  margin-bottom: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.admin-card__img-empty {
  font-size: 0.85rem;
  color: rgba($ink, 0.55);
}

.admin-card__meta {
  font-size: 0.8rem;
  color: rgba($ink, 0.7);
  letter-spacing: 0.04em;
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

.admin-preview {
  border: 1px solid $secondary;
  background: $paper;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.admin-preview__img {
  width: 100%;
  max-height: 280px;
  object-fit: contain;
  display: block;
  background: #fff;
}

.admin-preview__hint {
  font-size: 0.9rem;
  color: rgba($ink, 0.6);
  padding: 1rem;
  text-align: center;
}

.admin-pagination {
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.page-link {
  color: $ink;
  border-color: $secondary;
}

.page-item.active .page-link {
  background-color: $primary;
  border-color: $primary;
  color: $paper;
}

.page-item.disabled .page-link {
  color: rgba($ink, 0.4);
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
