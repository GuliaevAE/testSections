<template>
  <div class="card"  @click="c">
    <div v-if="!changeSwitcher" class="card_text">
      <span class="card_header">{{data.header}}</span>
      <div class="card_content">{{`${$props.data.content}`}}</div>
      <div class="card_icon" v-if="cardIcon!=='none'">
        <Icon :icon="data.icon" color="white" height="30" />
      </div>
    </div>
    <div v-else class="card_otions">
      <label for="iconChanger">Icon</label>
      <select id="iconChanger" v-model="cardIcon">
        <option value="mdi:cat">cat</option>
        <option value="mdi:dog">dog</option>
        <option value="none">none</option>
      </select>
      <label for="header">Header</label>
      <input id="header" type="text" v-model="newHeader" />
      <label for="content">Content</label>
      <textarea id="content" type="text" v-model="newContent" />
    </div>

    <div class="card_buttons" >
      <div v-if="!changeSwitcher" @click="changeSwitcher=!changeSwitcher">
        <Icon class="section_buttons_item" icon="material-symbols:settings-outline-sharp" />
      </div>
      <div v-else @click="saveNewData">
        <Icon icon="material-symbols:save" color="white" />
      </div>
      <div @click="deleteSectionCard">
        <Icon icon="ic:baseline-delete" color="white" />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
import { useCounterStore } from "@/store/store";
export default {
  name: "SectionCard",
  props: ["data", "SectionCardPosition", "SectionPosition"],
  components: {
    Icon
  },
  data(props) {
    return {
      store: useCounterStore(),
      cardIcon: props.data.icon,
      changeSwitcher: false,
      newHeader: props.data.header,
      newContent: props.data.content
    };
  },

  methods: {
    c(){
console.log(this.data.icon)
    },
    saveNewData() {
      this.store.changeSectionCard({
        header: this.newHeader,
        content: this.newContent,
        SectionCardPosition: this.SectionCardPosition,
        SectionPosition: this.SectionPosition,
        cardIcon: this.cardIcon
      });

      this.changeSwitcher = false;
    },
    deleteSectionCard() {
      this.store.deleteSectionCard({
        SectionCardPosition: this.SectionCardPosition,
        SectionPosition: this.SectionPosition
      });
    },
    punchOnButton(e) {
      e.currentTarget.animate(
        [
          { transform: "translateY(5px)", boxShadow: "0 0px black" },
          {
            transform: "none",
            boxShadow: "0 5px black"
          }
        ],
        { duration: 1000, easing: "ease-out" }
      );
    }
  }
};
</script>

<style lang="scss">
.card {
  padding-top: 25px;
  padding-bottom: 10px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  background: rgb(59, 59, 59);
  border: 1px solid rgb(147, 147, 147);
  box-shadow: 0 5px black;
  border-radius: 15px;
  position: relative;
  min-width: 46%;

  span {
    display: block;
  }

  .card_icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
  .card_otions {
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
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
    input {
      margin-bottom: 5px;
    }
    input,
    textarea,
    select {
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
      min-height: 50%;
      resize: none;

      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }
  .card_text {
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;

    .card_header {
      text-transform: uppercase;
    }
  }
  .card_buttons {
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: space-between;
    top: 5px;
    box-sizing: border-box;
    padding: 0 5px;
  }
}
</style>