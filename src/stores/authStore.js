import { defineStore } from 'pinia'
import axios from 'axios'

const { VITE_URL } = import.meta.env
const TOKEN_KEY = 'hexToken'

function readCookieToken() {
  const match = document.cookie.match(/(?:^|;\s*)hexToken=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: readCookieToken(),
    isChecking: false,
    loginError: ''
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token)
  },
  actions: {
    setToken(token, expired) {
      this.token = token || ''
      if (token && expired) {
        document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)};expires=${new Date(expired).toUTCString()};path=/`
      } else if (token) {
        document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)};path=/`
      } else {
        document.cookie = `${TOKEN_KEY}=;expires=${new Date(0).toUTCString()};path=/`
      }
      if (token) {
        axios.defaults.headers.common.Authorization = token
      } else {
        delete axios.defaults.headers.common.Authorization
      }
    },
    applyStoredToken() {
      const token = readCookieToken()
      this.token = token
      if (token) {
        axios.defaults.headers.common.Authorization = token
      } else {
        delete axios.defaults.headers.common.Authorization
      }
      return token
    },
    login(user) {
      this.loginError = ''
      return axios
        .post(`${VITE_URL}/v2/admin/signin`, user)
        .then((res) => {
          if (!res.data.success) {
            this.loginError = res.data.message || '登入失敗'
            return Promise.reject(res.data)
          }
          this.setToken(res.data.token, res.data.expired)
        })
        .catch((err) => {
          this.loginError = err?.response?.data?.message || this.loginError || '登入失敗，請確認帳密'
          return Promise.reject(err)
        })
    },
    checkLogin() {
      const token = this.applyStoredToken()
      if (!token) {
        return Promise.resolve(false)
      }
      this.isChecking = true
      return axios
        .post(`${VITE_URL}/v2/api/user/check`)
        .then((res) => {
          this.isChecking = false
          if (!res.data.success) {
            this.setToken('')
            return false
          }
          return true
        })
        .catch(() => {
          this.isChecking = false
          this.setToken('')
          return false
        })
    },
    logout() {
      return axios
        .post(`${VITE_URL}/v2/logout`)
        .catch(() => {})
        .finally(() => {
          this.setToken('')
        })
    }
  }
})
