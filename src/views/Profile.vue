<template>
  <div>
    <Header />
    <ProfileMain />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import ProfileMain from "@/components/Profile.main";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    ProfileMain,
    Footer,
  },
};
</script>
