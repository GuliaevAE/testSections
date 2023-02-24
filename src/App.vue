<template>
  <div id="app">
    <div class="conteiner">
      <div class="conteiner_addButton">
        <div class="conteiner_addButton_item" @click="punchOnButton($event,addSection('sect1'))">1</div>
        <div class="conteiner_addButton_item" @click="punchOnButton($event,addSection('sect2'))">2</div>
      </div>
      <div class="conteiner_allsections">
        <Section1 v-for="(item,k) in sectionArray" :key="item+k" :type="item" />
      </div>
    </div> 
  </div>
</template>

<script>
import Section1 from "./components/Section1.vue";

export default {
  name: "App",
  components: {
    Section1
  },
  data() {
    return {
      sectionArray: ["sect1", "sect2", "sect2", "sect3"]
    };
  },
  methods: {
    addSection(e) {
      this.sectionArray.push(e);
    },
    punchOnButton(e, func) {
      console.log(e);
      e.target.animate(
        [
          { transform: "translateY(8px)", boxShadow: "none" },
          {
            transform: "none",
            boxShadow: "0 0 0 1px rgb(125, 125, 125), 0 8px black"
          }
        ],
        { duration: 1000, easing: "ease-out" }
      );
      func();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgb(98, 98, 98);
  color: #f5f5f5;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.conteiner {
  display: flex;
  width: 80vw;
  height: 70vh;
  position: relative;

  gap: 30px;
  background: grey;

  border-radius: 15px;
  box-shadow: 0 12px 0 0 black;
  padding: 30px 30px;
  padding-right: 10px;

  .conteiner_allsections {
    height: 100%;
    width: 100%;
    display: flex;
    column-gap: 10px;
    row-gap: 15px;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    padding-right: 10px;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
      width: 10px;
      padding: 3px;
    }
    &::-webkit-scrollbar-track {
      background: black;
      border-radius: 15px;
    }
    &::-webkit-scrollbar-thumb {
      background: grey;
      border: 2px solid black;
      border-radius: 15px;
    }
  }

  .conteiner_addButton {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .conteiner_addButton_item {
      padding: 10px 15px;
      background: rgb(59, 59, 59);
      color: white;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgb(125, 125, 125), 0 8px black;
    }
  }
}
</style>
