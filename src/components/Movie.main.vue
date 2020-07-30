<template>
  <div class="container">
    <div v-if="loading" class="wrapper">
      <Loader />
    </div>
    <div v-else class="content">
      <div class="content_img_wrap">
        <img
          :src="
            movie.Poster === 'N/A'
              ? 'https://lh3.googleusercontent.com/proxy/ugCAXbStHhcLWGcOTd66dc5oY2vCwK7vvrnBVw2Iz01obryYt7PkSZlGXVK-waUraUA4kZPaGzjImYfPpDzTBRIO8umk6fjXu83hD_7mLY60RFqPH30mTA'
              : movie.Poster
          "
          :alt="movie.Title + ' poster'"
          class="content_img"
        />
        <button @click="addTo('favorite') || reloadFavorite()" class="addTo" type="button">
          <span v-if="!favorite.includes($route.params.id) ">Добавить в избранное</span>
          <span v-else>Убрать из избранного</span>
        </button>
        <button @click="addTo('viewed') || reloadViewed()" class="addTo" type="button">
          <span v-if="!viewed.includes($route.params.id) ">Добавить в просмотренные</span>
          <span v-else>Убрать из просмотренных</span>
        </button>
        <button @click="addTo('listView') || reloadListView()" class="addTo" type="button">
          <span v-if="!listView.includes($route.params.id) ">Добавить в очередь просмотра</span>
          <span v-else>Убрать из очереди просмотра</span>
        </button>
      </div>
      <div class="content_info_wrap">
        <div class="content_wrap_title">
          <h3 class="content_title">{{ movie.Title }}</h3>
          <p class="content_year">{{ movie.Year }}</p>
        </div>
        <p class="p content_plot">{{ movie.Plot }}</p>
        <p class="p content_award">
          <span class="bold">Award:</span>
          {{ movie.Awards }}
        </p>
        <p class="p content_rating">
          <span class="bold">Rating:</span>
          <span class="rating">{{ movie.imdbRating }}</span>
          <span class="content_votes">{{ movie.imdbVotes }} votes</span>
        </p>
        <p class="p content_actors">
          <span class="bold">Actors:</span>
          {{ movie.Actors }}
        </p>
        <p class="p content_country">
          <span class="bold">Country:</span>
          {{ movie.Country }}
        </p>
        <p class="p content_genre">
          <span class="bold">Genre:</span>
          {{ movie.Genre }}
        </p>
        <p class="p content_runtime">
          <span class="bold">Runtime:</span>
          {{ movie.Runtime }}
        </p>
        <p class="p content_box_office">
          <span class="bold">Box office:</span>
          {{ movie.BoxOffice }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: null,
      loading: true,
      favorite: [],
      viewed: [],
      listView: [],
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.movie = await this.$store.dispatch("fetchMovie", id);
    this.loading = false;
    this.favorite = JSON.parse(localStorage.getItem("favorite"));
    this.viewed = JSON.parse(localStorage.getItem("viewed"));
    this.listView = JSON.parse(localStorage.getItem("listView"));
  },
  methods: {
    addTo(where) {
      const getLocalKey = () => {
        const keyLocalStorage = localStorage.getItem(where);
        if (keyLocalStorage !== null) {
          return JSON.parse(keyLocalStorage);
        }
        return [];
      };
      let id = this.$route.params.id;
      let key = getLocalKey();
      const idx = key.indexOf(id);
      if (idx === -1) {
        key.push(id);
      } else {
        key.splice(idx, 1);
      }
      localStorage.setItem(where, JSON.stringify(key));
    },
    reloadFavorite() {
      this.favorite = JSON.parse(localStorage.getItem("favorite"));
    },
    reloadViewed() {
      this.viewed = JSON.parse(localStorage.getItem("viewed"));
    },
    reloadListView() {
      this.listView = JSON.parse(localStorage.getItem("listView"));
    },
  },
  computed: {},
};
</script>

<style lang="scss" scope>
p,
h3 {
  padding: 0;
  margin: 0;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.rating {
  background-color: #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  margin-right: 5px;
}

.addTo {
  width: 100%;
  padding: 10px;
  border: 0;
  background-color: #607d8b;
  margin-bottom: 10px;
  color: aliceblue;
  &:hover {
    background-color: #546e7a;
  }
  &:active {
    opacity: 0.7;
  }
}

.content {
  display: flex;
  margin-bottom: 30px;
  min-height: 100vh;
  color: darkslategrey;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &_img_wrap {
    margin-right: 25px;
    max-width: 350px;
    width: 100%;
    & img {
      width: 100%;
      height: auto;
    }
  }
  &_wrap_title {
    display: flex;
    align-items: baseline;
  }
  &_wrap_title {
    margin-bottom: 10px;
  }
  &_title {
    color: darkslategrey;
    font-weight: bold;
  }
  &_plot {
    margin-bottom: 10px;
  }
}

.bold {
  font-weight: bold;
}
.p {
  padding-bottom: 10px;
}
</style>
