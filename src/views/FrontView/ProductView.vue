<template>
  <div class="container">
    <div id="carouselExampleDark" class="product-img carousel carousel-dark slide mb-4" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" class="product-img d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>房屋外觀</h5>
          </div>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="https://media.istockphoto.com/photos/beautiful-minimalistic-living-room-at-home-picture-id1065230700?k=20&m=1065230700&s=612x612&w=0&h=vDvDTmCNvudeOKJp530xJHlycxuJ6uK8QVo151j_AaY=" class="product-img d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>客廳</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://media.istockphoto.com/photos/beautiful-kitchen-in-luxury-home-with-island-and-stainless-steel-picture-id535698335?k=20&m=535698335&s=612x612&w=0&h=2s57CARJxkh47D-uEOydcmDvpjZszi-oC84mWBhUAzM=" class="product-img d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>廚房</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://media.istockphoto.com/photos/guest-bedroom-with-a-queen-sized-bed-and-nightstand-at-a-short-term-picture-id1336925615?k=20&m=1336925615&s=612x612&w=0&h=C4QD-GfpYylnpzAXvZUm6MZl_sGQ7ZvXl_htTNkwTCA=" class="product-img d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>主臥</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" class="product-img d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h5>次臥</h5>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="mb-4">
      <h2 class="fw-bold mb-2 border-start ps-3 border-5 border-primary">基本資訊</h2>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">建案名稱 :</h5>
        <p class="fs-4">水文居住宅</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">開發商資訊 :</h5>
        <p class="fs-4">水文建設有限公司</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">預計完工時間 :</h5>
        <p class="fs-4">已完工</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">類別 :</h5>
        <p class="fs-4">電梯大樓</p>
      </div>
    </div>
    <div class="mb-4">
      <h2 class="fw-bold mb-2 border-start ps-3 border-5 border-primary">地點與周邊環境</h2>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">地址 :</h5>
        <p class="fs-4">台北市中山區中山北路二段36號</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 mb-2 fs-4">周邊環境 :</h5>
        <div class="d-flex flex-wrap">
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">車站</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">捷運</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">餐廳</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">超商</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">公園</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">國小</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">國中</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">高中</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">大學</p>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <h2 class="fw-bold mb-2 border-start ps-3 border-5 border-primary">建案特色</h2>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">戶型 :</h5>
        <p class="fs-4">2房 1廳 1衛</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">坪數 :</h5>
        <p class="fs-4">20-30 坪</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">公設比 :</h5>
        <p class="fs-4">38 %</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 mb-2 fs-4">公共設施 :</h5>
        <div class="d-flex flex-wrap">
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">健身房</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">游泳池</p>
          <p class="fs-4 p-1 me-2 bg-primary text-white border border-1 rounded">瑜伽室</p>
        </div>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">車位 :</h5>
        <p class="fs-4">平面式</p>
      </div>
      <div class="d-flex align-items-center flex-wrap mb-2">
        <h5 class="me-2 fs-4">充電樁 :</h5>
        <p class="fs-4">30 個</p>
      </div>
    </div>
    <div class="mb-4">
      <h2 class="fw-bold mb-2 border-start ps-3 border-5 border-primary">價格資訊</h2>
        <div class="d-flex align-items-center flex-wrap mb-2">
          <h5 class="me-2 fs-4">售價 :</h5>
          <p class="fs-4">1800 萬 - 2400 萬</p>
        </div>
      </div>
      <div class="d-flex align-items-center mb-4">
        <button type="button" class="btn btn-outline-primary fs-2 fw-bold py-3 border border-4 rounded w-100 shadow" data-bs-toggle="modal" data-bs-target="#reserveModal">立即預約</button>
      </div>
  </div>

  <!-- 預約 - Modal -->
  <div class="modal fade" id="reserveModal" tabindex="-1" aria-labelledby="reserveModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fw-bold text-primary" id="reserveModalLabel">賞屋預約</h2>
          <button type="button" class="btn-close fs-3" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <label class="me-2 mb-4" for="name">姓名：</label>
            <input type="text" name="name" id="name">
          </div>
          <div>
            <label class="me-2 mb-4" for="male">性別：</label>
            <input type="radio" name="gender" id="male" value="male"> 男
            <input type="radio" name="gender" id="female" value="female"> 女
          </div>
          <div>
            <label class="me-2 mb-4" for="call-phone">電話號碼：</label>
            <input type="tel" name="call-phone" id="call-phone">
          </div>
          <div>
            <label class="me-2 mb-4" for="mail">mail：</label>
            <input type="mail" name="mail" id="mail">
          </div>
          <div>
            <label class="me-2 mb-4" for="contact-date">電話聯絡時間：</label>
            <input class="me-2" type="date" name="contact-date" id="contact-date">
            <input type="time" name="contact-time" id="contact-time">
          </div>
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary p-2 rounded fs-3" data-bs-dismiss="modal">取消</button> -->
          <button type="button" class="btn btn-primary p-2 rounded fs-3" @click="showToast"  data-bs-dismiss="modal">預約</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 預約成功 - Toast -->
   <div class="container m-4">
      <!-- Toast 元素 -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div ref="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header bg-primary">
            <strong class="me-auto text-white fw-bold fs-4">預約成功</strong>
            <!-- <small class="text-muted">Just now</small> -->
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            <p class="fs-5">感謝您的預約</p>
            <p class="fs-5">您的聯絡時間已經成功安排！</p>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
  import { Toast } from 'bootstrap';

  export default {
    data() {
      return {
        liveToast:null,
      }
    },
    mounted() {
      // 在 mounted 中取得 liveToast 元素
      this.liveToast = this.$refs.liveToast;
    },
    methods: {
      showToast() {
        console.log(this.liveToast);
        if(this.liveToast){
          const toast = new Toast(this.liveToast);
          console.log('show');          
          toast.show();
        }else{
          console.log('null');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
/* 改變箭頭顏色為白色 */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: brightness(0) invert(1);
  width: 3rem;
  height: 3rem;
}

/* 改變指示點顏色為白色 */
.carousel-indicators button {
  background-color: white;
}
/* 改變指示點的選中顏色為白色加亮 */
.carousel-indicators .active {
  background-color: rgba(255, 255, 255, 0.75);
}
.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
.product-img {
  height: 200px;
  background: no-repeat center / cover;
  margin: 0 auto;
  @include sm {
    height: 300px;
  }
  @include md {
    height: 400px;
    max-width: 750px;
  }
}
</style>