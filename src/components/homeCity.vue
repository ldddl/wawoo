<template>
  <div class="container">
    <div class="row text-center pin-top" :class="{ 'active': selectedArea === 'north' }">
      <a class="
      btn btn-primary button-font-hover p-2 
      col-6 col-md-3 
      d-flex justify-content-center align-items-center 
      border-0 border-end fw-bold fs-4"
      data-bs-toggle="collapse" href="#foldCity" role="button" aria-expanded="true" aria-controls="foldCity"
      @click="findCity('north')">
        <div class="p-2">
          <p>北部</p>
        </div>
      </a>
      <a class="pin-top btn btn-primary button-font-hover p-2 col-6 col-md-3 d-flex justify-content-center align-items-center border-0 border-end fw-bold fs-4"
      data-bs-toggle="collapse" href="#foldCity" role="button" aria-expanded="true" aria-controls="foldCity"
      @click="findCity('middle')">
        <div class="p-2">
          <p>中部</p>
        </div>
      </a>
      <a class="pin-top btn btn-primary button-font-hover p-2 col-6 col-md-3 d-flex justify-content-center align-items-center border-0 border-end fw-bold fs-4"
      data-bs-toggle="collapse" href="#foldCity" role="button" aria-expanded="true" aria-controls="foldCity"
      @click="findCity('south')">
        <div class="p-2">
          <p>南部</p>
        </div>
      </a>
      <a class="pin-top btn btn-primary button-font-hover p-2 col-6 col-md-3 d-flex justify-content-center align-items-center border-0 border-end fw-bold fs-4"
      data-bs-toggle="collapse" href="#foldCity" role="button" aria-expanded="true" aria-controls="foldCity"
      @click="findCity('east')">
        <div class="p-2">
          <p>東部</p>
        </div>
      </a>
    </div>
  </div>
  <div class="container mb-4 p-0">
    <div class="collapse border border-2 border-primary" id="foldCity" :class="{ show: !isCollapsed }">
      <div class="card card-body border-0 rounded-0 pb-0">
        <div class="row text-center">
          <div class="col-3 mb-2 text-primary border-end border-bottom border-2 shadow-sm p-0" v-for="item in cityObj" :key="item">
            <a class="btn btn-outline-primary border-0 w-100 p-2 fw-bold" href="#">{{ item }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        city: {
          north: ['臺北', '新北', '基隆', '新竹', '桃園', '新竹', '宜蘭'],
          middle: ['臺中', '苗栗', '彰化', '南投', '雲林'],
          south: ['高雄', '臺南', '嘉義', '屏東', '澎湖'],
          east: ['花蓮', '臺東'],
        },
        cityObj: [],
        isCollapsed: true,
        selectedArea: null,
      }
    },
    methods: {
      findCity(area) {
        console.clear();
        this.cityObj = [...this.city[area]]

        this.$nextTick(() => {
        const buttonElement = document.querySelector('pin-top');
        if (buttonElement) {
          buttonElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      }
    }
  }
</script>