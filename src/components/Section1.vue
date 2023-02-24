<template>
  <div class="section" :class="{long: types==='sect2'}">
    <div class="section_buttons">
      <div>
        <Icon class="section_buttons_item" icon="material-symbols:settings-outline-sharp" />
      </div>

      <div>
        <Icon icon="ic:baseline-delete" color="white" />
      </div>
      <div @click="addCard" v-if="types==='sect2'">
        <Icon  class="section_buttons_item" icon="ic:baseline-plus" />
      </div>
      <div  v-if="types==='sect3'"> 
        <Icon icon="dashicons:update" color="white" />
      </div>
    </div>
    <div v-if="types==='sect1'">
      <h2>Header</h2>
      <h3>Content</h3>
    </div>
    <div class="section_cardssection" v-if="types==='sect2'">
      <SectionCard
        @delasd="deleteCard($event)"
        @saveSectionCard="saveSectionCard($event)"
        v-for="(item,k) in arrayOfSectionCard"
        :key="item.header+k"
        :data="item"
        :position="k"
      />
    </div>
    <div class="section_filmsection" v-if="types==='sect3'">

    </div>
  </div>
</template>

<script>
import SectionCard from "../components/SectionCard.vue";
import { Icon } from "@iconify/vue2";
export default {
  name: "DataSection1",
  props: ["type"],
  components: {
    SectionCard,
    Icon
  },
  data() {
    return {
      arrayOfSectionCard: [{ header: "Header", content: "Content" }]
    };
  },
  computed: {
    types() {
      return this.type;
    }
  },
  methods: {
    saveSectionCard(e) {
      // console.log( this.arrayOfSectionCard[e.position])
      this.arrayOfSectionCard[e.position].header = e.header
      this.arrayOfSectionCard[e.position].content = e.content
    },
    deleteCard(e) {
      this.arrayOfSectionCard = this.arrayOfSectionCard.filter(
        (x, k) => k !== e
      );
    },
    addCard() {
      this.arrayOfSectionCard.push({ header: "Header", content: "Content" });
    }
  }
};
</script> 

<style lang="scss">
.section {
  height: 45%;
  width: 32%;

  border: 1px solid rgb(14, 14, 14);
  border-radius: 15px;
  background: rgb(59, 59, 59);

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 25px 5px;
  padding-bottom: 5px;
  box-shadow: 0 7px black, 0 7px 1px rgb(255, 255, 255);
  &.long {
    width: 64%;
  }
  .section_buttons {
    position: absolute;
    width: 100%;
    top: 5px;
    display: flex;

    box-sizing: border-box;
    padding: 0 5px;

    .section_buttons_item {
      transition: all 0.3s;
      &:hover {
        color: blueviolet;
      }
    }
  }

  .section_cardssection {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5%;
    padding-bottom: 10px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background: black;
      border-radius: 15px;
    }
    &::-webkit-scrollbar-thumb {
      background: grey;
      border-radius: 15px;
    }
  }
}
</style>