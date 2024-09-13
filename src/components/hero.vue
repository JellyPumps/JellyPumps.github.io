<template>
  <div class="hero">
    <!-- Hero Image with Overlay -->
    <div class="hero-image" :style="{ backgroundImage: `url(${featuredData.url})` }">
      <div class="overlay"></div>
      <!-- Heading text and button -->
      <div class="content">
        <h1 id="hero-headline">{{ featuredData.name }}</h1>
        <button>Coming Soon</button>
      </div>
    </div>
  </div>
</template>

<script>
import featuredData from './featured.json'

export default {
  name: 'HeroImage',
  data() {
    return {
      featuredData,
    };
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  border-radius: 15px;
  margin: 1em;
  overflow: hidden;
}

.hero-image {
  position: relative;
  height: 550px;
  background-size: cover;
  background-position: center;
  padding: 10px;
  border-radius: 0 0 15px 15px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

.content h1 {
  font-size: 2em;
}

.content button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #FF204E;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
