<template>
  <div class="home">
    <NavBar />
    <HeroImage />
    <AboutSection />
    <BlogSection />
  </div>
</template>

<script>
import NavBar from './navbar.vue';
import HeroImage from './hero.vue';
import AboutSection from './about.vue';
import BlogSection from './blog.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    HeroImage,
    AboutSection,
    BlogSection
  }
};
</script>

<style scoped>

</style>