<template>
  <div
    class="section"
    :class="{long: $props.type.type==='sect2'}"
    @mousedown="SectionDown"
    @mouseup="SectionUp"
  >
    <div class="section_buttons">
      <div @click="deleteSection">
        <Icon icon="ic:baseline-delete" color="white" />
      </div>
      <div v-if="type.type==='sect1'&& !optionSwitcher" @click="optionSwitcher=!optionSwitcher">
        <Icon class="section_buttons_item" icon="material-symbols:settings-outline-sharp" />
      </div>
      <div v-if="type.type==='sect1'&& optionSwitcher" @click="saveSect1Data">
        <Icon icon="material-symbols:save" color="white" />
      </div>
      <div v-if="type.type==='sect2'" @click="addCard">
        <Icon class="section_buttons_item" icon="ic:baseline-plus" />
      </div>
    </div>

    <div class="section_sect1" v-if="type.type==='sect1' && !optionSwitcher">
      <h2>{{ type.sect1Content.header }}</h2>
      <h3>{{ type.sect1Content.content }}</h3>
    </div>
    <div v-if="type.type==='sect1' && optionSwitcher" class="section_option">
      <label for="header">Header</label>
      <input id="header" type="text" v-model="header" />
      <label for="content">Content</label>
      <textarea id="content" type="text" v-model="content" />
    </div>

    <div class="section_cardssection" v-if="type.type==='sect2'">
      <SectionCard
        v-for="(item,k) in type.sect2arraySectionCard"
        :key="item.icon+k"
        :data="item"
        :SectionCardPosition="k"
        :SectionPosition="SectionPosition"
      />
    </div>
    <CompWithFilms class="section_filmsection" v-if="type.type==='sect3'"></CompWithFilms>
  </div>
</template>

<script>
import SectionCard from "./SectionCard.vue";
import { Icon } from "@iconify/vue2";

import CompWithFilms from "./CompWithFilms.vue";
import { useCounterStore } from "@/store/store";
export default {
  name: "DataSection",
  props: ["type", "SectionPosition", "SectionUp", "SectionDown"],
  components: {
    SectionCard,
    CompWithFilms,
    Icon
  },
  data() {
    return {
      store: useCounterStore(),
      optionSwitcher: false,
      header: this.type.sect1Content.header,
      content: this.type.sect1Content.content
    };
  },
  computed: {
    types() {
      return this.type;
    }
  },

  methods: {
    
    saveSect1Data() {
      this.store.changeSection1Data({
        SectionPosition: this.SectionPosition,
        header: this.header,
        content: this.content
      });
      this.optionSwitcher = false;
    },
    deleteSection() {
      this.store.deleteSection(this.SectionPosition);
    },

    addCard() {
      this.store.addSectioncard({ SectionPosition: this.SectionPosition });
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
  background: rgb(79, 79, 79);

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
  .section_sect1 {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
  .section_option {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    input {
      margin-bottom: 5px;
    }
    input,
    textarea {
      box-sizing: border-box;
      width: 95%;
      padding: 5px;
      border-radius: 15px;
      background: rgb(48, 48, 48);
      color: white;
      border: 1px solid black;
      margin-bottom: 5px;
    }
    textarea {
      resize: none;

      &::-webkit-scrollbar {
        width: 0;
      }
    }
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
    
  }

  .section_sect1, .section_cardssection{
    &::-webkit-scrollbar {
      height: 10px;
      width: 10px;
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

@media (max-width: 600px) {
  .section{
    width: 100% !important;
  }
}
</style>