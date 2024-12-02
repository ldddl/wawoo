<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-off-white">
    <div class="container">
      <RouterLink to="/" class="navbar-brand fw-bold text-primary fs-1">瓦屋</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link fw-bold fs-2">首頁</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/products" class="nav-link fw-bold fs-2">產品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/product" class="nav-link fw-bold fs-2">單一產品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/coupons" class="nav-link fw-bold fs-2">酷彭</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center list-unstyled m-0 w-">
          <!-- <a href="#"><img class="text-primary" src="/src/assets/icons/person.svg" alt="user"></a> -->
          <a href="#" class="ms-4"><img src="/src/assets/icons/event_available.svg" alt="event_available"></a>
          <!-- <a href="#" class="ms-4"><img src="/src/assets/icons/favorite.svg" alt="favorite"></a> -->
        </div>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>