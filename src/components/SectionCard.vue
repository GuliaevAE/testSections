<template>
  <div class="card" :id="cardCosition">
    <div v-if="!changeSwitcher" class="card_text">
      <span class="card_header">{{header}}</span>
      <span class="card_content">{{content}}</span>
    </div>
    <div v-else class="card_otions">
      <label for="header">Header</label>
      <input id="header" type="text" v-model="newHeader" />
      <label for="content">Content</label>
      <textarea id="content" type="text" v-model="newContent" />
    </div>

    <div class="card_buttons" :id="cardCosition">
      <div v-if="!changeSwitcher" @click="changeSwitcher=!changeSwitcher">
        <Icon class="section_buttons_item" icon="material-symbols:settings-outline-sharp" />
      </div>
      <div v-else @click="saveNewData">
        <Icon icon="material-symbols:save" color="white" />
      </div>
      <div @click="$emit('delasd', $props.position)">
        <Icon icon="ic:baseline-delete" color="white" />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  name: "SectionCard",
  props: ["data", "position"],
  components: {
    Icon
  },
  data(props) {
    return {
      header: props.data.header,
      content: props.data.content,
      cardCosition: props.position,
      changeSwitcher: false,
      newHeader: "Header",
      newContent: "Content"
    };
  },
  methods: {
    saveNewData() {
      this.$emit("saveSectionCard", {
        position: this.cardCosition,
        header: this.newHeader,
        content: this.newContent
      });
     this.newHeader = 'Header' 
     this.newContent = 'Content'
     this.changeSwitcher=false
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
  .card_otions {
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 5px;
      padding: 5px;
    }
    input,
    textarea {
      width: 95%;
      border-radius: 15px;
      background: rgb(48, 48, 48);
      color: white;
      border: 1px solid black;
    }
    textarea {
      height: 100%;
      resize: none;
      padding: 5px;
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