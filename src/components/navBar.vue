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
            <RouterLink to="/coupons" class="nav-link fw-bold fs-2">酷彭</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center list-unstyled m-0 w-">
          <a href="#"><img class="text-primary" src="/src/assets/icons/person.svg" alt="user"></a>
          <a href="#" class="ms-4"><img src="/src/assets/icons/calendar_check.svg" alt="calendar_check"></a>
          <a href="#" class="ms-4"><img src="/src/assets/icons/favorite.svg" alt="favorite" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></a>
        </div>
      </div>
    </div>
  </nav>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title fw-bold text-primary" id="offcanvasRightLabel">最愛收藏</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <p class="fw-bold text-primary">目前是空的</p>
    </div>
  </div>
  <router-view></router-view>
</template>