<template>
  <main>
    <div class="container">
      <div class="row">
        <h1 class>Персональная фильмотека</h1>
        <div class="input-field col">
          <input
            @change="search"
            id="search_movie"
            type="text"
            class="validate"
          />
          <label for="search_movie">Ввидите фильм</label>
        </div>
        <Loader v-if="loading" />
        <div v-else class="cards_wrap">
          <div
            v-for="item in searchAnswer"
            :key="item.imdbID"
            class="card_movie"
          >
            <a @click.prevent="$router.push(`/movie/${item.imdbID}`)" href="#">
              <h3 class="card_movie_title">
                {{ item.Title }}
                <span class="year">{{ item.Year }}</span>
              </h3>
              <img
                :src="
                  item.Poster === 'N/A'
                    ? 'https://lh3.googleusercontent.com/proxy/ugCAXbStHhcLWGcOTd66dc5oY2vCwK7vvrnBVw2Iz01obryYt7PkSZlGXVK-waUraUA4kZPaGzjImYfPpDzTBRIO8umk6fjXu83hD_7mLY60RFqPH30mTA'
                    : item.Poster
                "
                :alt="item.Title"
              />
            </a>
          </div>
        </div>
        <Paginate
          :page-count="total"
          :click-handler="changePage"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
        />
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      searchValue: "",
      searchAnswer: [],
      total: 1,
      pageNumb: 1,
    };
  },
  methods: {
    search(e) {
      this.searchValue = e.target.value;
      this.loading = true;
    },
    changePage: function(pageNum) {
      this.pageNumb = pageNum;
      this.loading = true;
      console.log(this.searchValue);
    },
  },
  watch: {
    searchValue: async function() {
      const res = await this.$store.dispatch("serchFetch", [
        this.searchValue,
        this.pageNumb,
      ]);
      this.total = Math.floor(res.totalResults / 10);
      this.searchAnswer = res.Search;
      this.loading = false;
    },
    pageNumb: async function() {
      const res = await this.$store.dispatch("serchFetch", [
        this.searchValue,
        this.pageNumb,
      ]);
      console.log(this.searchValue);
      this.searchAnswer = res.Search;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
}

.col {
  width: 50%;
}

.cards_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card_movie {
  margin-right: 15px;
  max-width: 240px;

  &_title {
    margin-bottom: 10px;
    color: #263238;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    min-height: 60px;
  }
  & img {
    width: 100%;
    height: auto;
  }
}
.year {
  font-size: 12px;
}
</style>
