<template>
  <div class="index">
    <!-- Dynamically load the current game -->
    <GamePage v-if="current_game_data" :game_data="current_game_data" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import GamePage from '@/components/GamePage.vue';

//  Will be updated with the actual JSON
const games = {
  starmans_odyssey: {
    title: "Starman's Odyssey",
    description: "Stranded on Europa’s frozen wasteland, Orion Voss and his crew search for a way out, but the ice whispers secrets best left buried, and something waits in the cold dark.",
    status: "In Development",
    background_image: "/images/starmansodyssey.png",
  },
};

export default {
  components: {
    GamePage,
  },
  setup() {
    const current_game_data = ref(null);

    const load_current_game = async () => {
      const response = await fetch('/featured.json');
      const data = await response.json();
      const current_game = data.featured;
      current_game_data.value = games[current_game] || null;
    };

    onMounted(load_current_game);

    return { current_game_data };
  }
};
</script>