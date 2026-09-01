import { defineStore } from 'pinia'

const STORAGE_KEY = 'wawoo_favorites'

function readFavorites() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

function writeFavorites(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    items: readFavorites()
  }),
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.items.length === 0,
    ids: (state) => state.items.map((item) => item.id)
  },
  actions: {
    isFavorite(productId) {
      return this.ids.includes(productId)
    },
    toggleFavorite(product) {
      if (!product?.id) return
      if (this.isFavorite(product.id)) {
        this.removeFavorite(product.id)
        return
      }
      const next = {
        id: product.id,
        title: product.title || '',
        category: product.category || '',
        imageUrl: product.imageUrl || '',
        price: Number(product.price || 0)
      }
      this.items = [next, ...this.items.filter((item) => item.id !== product.id)]
      writeFavorites(this.items)
    },
    removeFavorite(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
      writeFavorites(this.items)
    },
    clearFavorites() {
      this.items = []
      writeFavorites(this.items)
    }
  }
})
