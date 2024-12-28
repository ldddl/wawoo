<template>
  <div class="container">
    <h2 class="text-primary fw-bold mb-2">地區找房</h2>
    <div class="row text-center " :class="{ 'active': selectedArea === 'north' }">
      <a class="
      city-style-border
      btn btn-primary button-font-hover p-2 
      col-6 col-md-3 
      d-flex justify-content-center align-items-center 
      fw-bold fs-4"
      @click="findCity('north')">
        <div class="p-2">
          <p>北部</p>
        </div>
      </a>
      <a class="
      city-style-border
      btn btn-primary button-font-hover p-2 
      col-6 col-md-3 
      d-flex justify-content-center align-items-center 
      fw-bold fs-4"
      @click="findCity('middle')">
        <div class="p-2">
          <p>中部</p>
        </div>
      </a>
      <a class="
      city-style-border
      btn btn-primary button-font-hover p-2 
      col-6 col-md-3 
      d-flex justify-content-center align-items-center 
      fw-bold fs-4"
      @click="findCity('south')">
        <div class="p-2">
          <p>南部</p>
        </div>
      </a>
      <a class="
      city-style-border
      btn btn-primary button-font-hover 
      p-2 col-6 col-md-3 
      d-flex justify-content-center align-items-center 
      fw-bold fs-4"
      @click="findCity('east')">
        <div class="p-2">
          <p>東部</p>
        </div>
      </a>
    </div>
  </div>
  <div class="container mb-4 p-0">
    <div class="border border-2 border-primary" id="foldCity">
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
      findCity(area = 'north') {
        this.cityObj = [...this.city[area]]
      }
    },
    mounted() {
      this.findCity()
    }
  }
</script>
<style lang="scss" scoped>
  .city-style-border {
    border: 1px solid #fff;
  }
</style>