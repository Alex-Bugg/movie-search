<template>
  <div>
    <Header />
    <MovieMain />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import MovieMain from "@/components/Movie.main";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    MovieMain,
    Footer,
  },
};
</script>
