<template>
  <div class="login-page min-vh-100 d-flex align-items-center bg-paper">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <p class="text-center text-primary letter-space mb-2">WAWOO</p>
          <h1 class="h3 mb-4 text-center font-brand text-primary">後臺管理</h1>
          <form class="login-card p-4" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input
                v-model="user.username"
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
            <button class="btn btn-primary w-100 mt-4 fw-bold py-2" type="submit">登入</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      console.log(this.user)
    }
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
}
</style>
