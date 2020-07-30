export default {
  actions: {
    async fetchMovie(ctx, movie) {
      const key = process.env.VUE_APP_SEARCH;
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${movie}&plot=full&}`
      );
      return await res.json();
    },
  },
};
