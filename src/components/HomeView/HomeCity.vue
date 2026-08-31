<template>
  <section class="container mb-5">
    <h2 class="section-title fw-bold mb-4">地區找房</h2>
    <div class="row g-0 text-center">
      <button
        v-for="area in areas"
        :key="area.key"
        type="button"
        class="city-tab col-6 col-md-3 py-3 fw-bold"
        :class="{ 'is-active': selectedArea === area.key }"
        @click="findCity(area.key)"
      >
        {{ area.label }}
      </button>
    </div>
    <div class="city-panel">
      <div class="row g-0 text-center">
        <div class="col-6 col-md-3 city-cell" v-for="item in cityObj" :key="item">
          <a class="city-link" href="#">{{ item }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      areas: [
        { key: 'north', label: '北部' },
        { key: 'middle', label: '中部' },
        { key: 'south', label: '南部' },
        { key: 'east', label: '東部' }
      ],
      city: {
        north: ['臺北', '新北', '基隆', '新竹', '桃園', '宜蘭'],
        middle: ['臺中', '苗栗', '彰化', '南投', '雲林'],
        south: ['高雄', '臺南', '嘉義', '屏東', '澎湖'],
        east: ['花蓮', '臺東']
      },
      cityObj: [],
      selectedArea: 'north'
    }
  },
  methods: {
    findCity(area = 'north') {
      this.selectedArea = area
      this.cityObj = [...this.city[area]]
    }
  },
  mounted() {
    this.findCity()
  }
}
</script>
<style lang="scss" scoped>
.city-tab {
  border: 1px solid $secondary;
  background: $paper;
  color: $ink;
  letter-spacing: 0.18em;

  &.is-active,
  &:hover {
    background: $primary;
    color: $paper;
    border-color: $primary;
  }
}

.city-panel {
  border: 1px solid $secondary;
  border-top: 0;
  background: #fff;
}

.city-cell {
  border-right: 1px solid $secondary;
  border-bottom: 1px solid $secondary;
}

.city-link {
  display: block;
  padding: 0.85rem;
  color: $ink;
  letter-spacing: 0.08em;

  &:hover {
    color: $primary;
    background: $secondary;
  }
}
</style>
