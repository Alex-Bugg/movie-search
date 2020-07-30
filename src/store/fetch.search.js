export default {
  actions: {
    async serchFetch(ctx, search) {
      const key = process.env.VUE_APP_SEARCH;
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&s=${search[0]}&plot=full&page=${search[1]}`
      );
      return await res.json();
    },
  },
};
