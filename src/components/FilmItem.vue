<template>
  <div class="filmItem" @click="switcher=!switcher">
    <div class="filmItem_title">
      <span>{{item.title}}</span>
      <strong>{{item.vote_average}}</strong>
    </div>
    <div class="filmItem_overview" v-if="switcher">{{item.overview}}</div>
  </div>
</template>
    
<script>
export default {
  name: "FilmItem",
  props: ["item"],
  data() {
    return { switcher: false };
  }
};
</script>

<style lang="scss">
.filmItem {
  border-radius: 15px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 95%;
  .filmItem_title {
    font-size: medium;
    display: flex;
    justify-content: space-between;
  }
  .filmItem_overview {
    font-size: small;
    padding: 5px;
  }

  &:hover {
    box-shadow: inset 0 0 0 1px grey;
  }
}
</style>