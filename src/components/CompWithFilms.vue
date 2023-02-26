<template>
  <div class="filmsArrayComponent">
    <div class="filmsArrayComponent_inputAndRefrash">
      <input type="text" v-model="inputValue" @input="filterForFilmsArray(inputValue)" />
      <div @click="fetchFilms">
        <Icon icon="dashicons:update" color="white" height="25" />
      </div>
    </div>

    <div class="filmsArrayComponent_array">
      <FilmItem v-for="item in filteredFilmsArray" :key="item.original_title" :item="item" />
    </div>
  </div>
</template>

<script>
import FilmItem from "./FilmItem.vue";
import axios from "axios";
import { Icon } from "@iconify/vue2";

export default {
  name: "CompWithFilms",
  components: {
    Icon,
    FilmItem
  },
  data() {
    return {
      originalFilmsArray: null,
      filteredFilmsArray: null,
      inputValue: ""
    };
  },
  methods: {
    filterForFilmsArray(e) {
      this.filteredFilmsArray = this.originalFilmsArray.filter(
        x => x.title.toLowerCase().indexOf(e.toLowerCase())!==-1
      );
    },
    fetchFilms() {
      
        try {
          axios
            .get(
              "https://api.themoviedb.org/3/movie/popular?api_key=52a4e5d76c4d2f6615ea85b86d4ba014"
            )
            .then(res => {
              this.originalFilmsArray = res.data.results;
              this.filteredFilmsArray = res.data.results;
            });
        } catch (error) {
          this.originalFilmsArray = [{ original_title: "Связь потеряна!" }];
        }
     
    }
  },
  mounted() {
    this.fetchFilms();
  }
};
</script>

<style lang="scss">
.filmsArrayComponent {
  padding: 10px 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  gap: 5px;

  .filmsArrayComponent_inputAndRefrash {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 15px;
    input {
      padding: 5px;
      width: 95%;
      border: none;
      border-radius: 15px;
      background: black;
      color: white;
    }
  }
  .filmsArrayComponent_array {
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
  }
}
</style>