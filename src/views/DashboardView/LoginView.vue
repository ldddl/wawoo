<template>
  <div class="login-page min-vh-100 d-flex align-items-center bg-paper">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <p class="text-center text-primary letter-space mb-2">WAWOO</p>
          <h1 class="h3 mb-4 text-center font-brand text-primary">後臺管理</h1>
          <form class="login-card p-4" @submit.prevent="onLogin">
            <div class="form-floating mb-3">
              <input
                v-model.trim="user.username"
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
              />
              <label for="password">Password</label>
            </div>
            <p v-if="loginError" class="text-danger mt-3 mb-0">{{ loginError }}</p>
            <button class="btn btn-primary w-100 mt-4 fw-bold py-2" type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? '登入中...' : '登入' }}
            </button>
          </form>
          <p class="text-center mt-3 mb-0">
            <RouterLink to="/" class="text-primary">回前台</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'LoginView',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isSubmitting: false
    }
  },
  computed: {
    ...mapState(useAuthStore, ['loginError'])
  },
  methods: {
    ...mapActions(useAuthStore, ['login', 'checkLogin']),
    onLogin() {
      this.isSubmitting = true
      this.login(this.user)
        .then(() => {
          this.isSubmitting = false
          const redirect = this.$route.query.redirect
          if (typeof redirect === 'string' && redirect.startsWith('/')) {
            this.$router.push(redirect)
          } else {
            this.$router.push({ name: 'admin-products' })
          }
        })
        .catch(() => {
          this.isSubmitting = false
        })
    }
  },
  mounted() {
    this.checkLogin().then((ok) => {
      if (ok) {
        this.$router.replace({ name: 'admin-products' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.letter-space {
  letter-spacing: 0.32em;
  font-size: 0.75rem;
}

.login-card {
  background: #fff;
  border: 1px solid $secondary;
  padding: 1.25rem !important;

  @include sm {
    padding: 1.5rem !important;
  }
}

.login-page {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
