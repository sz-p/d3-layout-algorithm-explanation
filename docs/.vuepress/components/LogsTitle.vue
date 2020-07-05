<template>
  <div class="logs-title">
    <div class="logs-title-left">
      <span class="logs-title__version">v{{ version }}</span>
      <span v-for="item in newIcons" :key="'i' + item" v-if="item" class="logs-title__icon">
        {{ item }}
      </span>
    </div>
    <span class="logs-title__time">{{ time }}</span>
  </div>
</template>
<script>
export default {
  props: {
    version: { type: String },
    time: { type: String },
    news: { type: String, default: '' }
  },
  computed: {
    newIcons() {
      const newsArray = this.news.split(',')
      return newsArray
    }
  }
}

</script>
<style lang="less" scoped>
.logs-title {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  margin: 10px 0;
  align-items: flex-end;
  .logs-title-left {
    display: flex;
  }
  .logs-title__version {
    font-size: 1.4rem;
    color: #3eaf7c;
  }
  .logs-title__icon {
    background: #3eaf7c;
    color: #FFF;
    font-size: 0.8rem;
    align-items: flex-end;
    border-radius: 0.6rem;
    height: 1.2rem;
    padding: 0 0.6rem;
    margin: 0.2rem;
  }
  &__time {
    font-size: 0.9rem;
  }

}
</style>
