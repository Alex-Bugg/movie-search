<template>
  <main>
    <div class="container">
      <div class="profile_wrapper">
        <div class="profile_wrap_trigers">
          <a
            @click.prevent="setActive('queue')"
            class="triger"
            :class="{ triger_active: isActive('queue') }"
            href="#queue"
          >Очередь просмотра</a>
          <a
            @click.prevent="setActive('favorites')"
            class="triger"
            :class="{ triger_active: isActive('favorites') }"
            href="#favorites"
          >Избранное</a>
          <a
            @click.prevent="setActive('viewed')"
            class="triger"
            :class="{ triger_active: isActive('viewed') }"
            href="#viewed"
          >Просмотренные</a>
        </div>
        <div class="profile_wrap_content">
          <div class="profile_content_wrap">
            <div
              id="queue"
              class="profile_content"
              :class="{ profile_content_active: isActive('queue') }"
            >
              <p class="empty" v-if="!viewed.length">Пока пусто</p>
              <div v-else v-for="v in viewed" :key="v.imdbID" class="cards_wrap">
                <div class="card_movie">
                  <a @click.prevent="$router.push(`/movie/${v.imdbID}`)" href="#">
                    <h3 class="card_movie_title">
                      {{v.Title}}
                      <span class="year">{{v.Year}}</span>
                    </h3>
                    <img
                      :src="v.Poster === 'N/A'
                      ? 'https://lh3.googleusercontent.com/proxy/ugCAXbStHhcLWGcOTd66dc5oY2vCwK7vvrnBVw2Iz01obryYt7PkSZlGXVK-waUraUA4kZPaGzjImYfPpDzTBRIO8umk6fjXu83hD_7mLY60RFqPH30mTA'
                      : v.Poster"
                      :alt="v.Title"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              id="favorites"
              class="profile_content"
              :class="{ profile_content_active: isActive('favorites') }"
            >
              <p class="empty" v-if="!favorite.length">Пока пусто</p>
              <div v-else v-for="f in favorite" :key="f.imdbID" class="cards_wrap">
                <div class="card_movie">
                  <a @click.prevent="$router.push(`/movie/${f.imdbID}`)" href="#">
                    <h3 class="card_movie_title">
                      {{f.Title}}
                      <span class="year">{{f.Year}}</span>
                    </h3>
                    <img
                      :src="f.Poster === 'N/A'
                      ? 'https://lh3.googleusercontent.com/proxy/ugCAXbStHhcLWGcOTd66dc5oY2vCwK7vvrnBVw2Iz01obryYt7PkSZlGXVK-waUraUA4kZPaGzjImYfPpDzTBRIO8umk6fjXu83hD_7mLY60RFqPH30mTA'
                      : f.Poster"
                      :alt="f.Title"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              id="viewed"
              class="profile_content"
              :class="{ profile_content_active: isActive('viewed') }"
            >
              <p class="empty" v-if="!viewed.length">Пока пусто</p>
              <div v-else v-for="v in viewed" :key="v.imdbID" class="cards_wrap">
                <div class="card_movie">
                  <a @click.prevent="$router.push(`/movie/${v.imdbID}`)" href="#">
                    <h3 class="card_movie_title">
                      {{v.Title}}
                      <span class="year">{{v.Year}}</span>
                    </h3>
                    <img
                      :src="v.Poster === 'N/A'
                      ? 'https://lh3.googleusercontent.com/proxy/ugCAXbStHhcLWGcOTd66dc5oY2vCwK7vvrnBVw2Iz01obryYt7PkSZlGXVK-waUraUA4kZPaGzjImYfPpDzTBRIO8umk6fjXu83hD_7mLY60RFqPH30mTA'
                      : v.Poster"
                      :alt="v.Title"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      activeItem: "queue",
      favorite: [],
      listView: [],
      viewed: [],
    };
  },
  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
  },
  async created() {
    const localFavorite = JSON.parse(localStorage.getItem("favorite"));
    let favoriteFetch = [];
    if (localFavorite !== null) {
      localFavorite.forEach(async (el) => {
        favoriteFetch.push(await this.$store.dispatch("fetchMovie", el));
      });
      this.favorite = favoriteFetch;
    }

    const localListView = JSON.parse(localStorage.getItem("listView"));
    if (localListView !== null) {
      let listViewFetch = [];
      localListView.forEach(async (el) => {
        localListView.push(await this.$store.dispatch("fetchMovie", el));
      });
      this.listView = listViewFetch;
    }

    const localViewed = JSON.parse(localStorage.getItem("viewed"));
    if (localViewed !== null) {
      let viewedFetch = [];
      localViewed.forEach(async (el) => {
        viewedFetch.push(await this.$store.dispatch("fetchMovie", el));
      });
      this.viewed = viewedFetch;
    }
  },
};
</script>

<style lang="scss" scoped>
.profile_wrapper {
  min-height: calc(100vh - 100px);
}

.cards_wrap {
  display: block;
}

.profile_wrap_trigers {
  display: flex;
  justify-content: center;
  background-color: #263238;
  border: 3px solid;
  border-bottom: 0;
}

.triger {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-height: 50px;
  background-color: #263238;
  color: aliceblue;
  &:hover {
    background-color: #37474f;
  }
  &:active {
    opacity: 0.7;
  }
}
.triger_active {
  background-color: #fff;
  color: #263238;
}
.profile_content {
  display: none;
  flex-wrap: wrap;
}
.profile_content_active {
  display: flex;
}

.empty {
  font-size: 24px;
}
</style>
