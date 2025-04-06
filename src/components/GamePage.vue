<template>
    <div class="game-page">
        <p class="creator">A game by Sarthak Rai</p>
        <h1 class="title">{{ game_data.title }}</h1>
        <p class="description">{{ game_data.description }}</p>
        <div class="actions">
            <a class="trailer">Trailer</a>
            <a class="status">{{ game_data.status }}</a>
        </div>
        <div class="awards">
        </div>
        <p id="copyright">&copy; 2025 BouncyJelly. All rights reserved.</p>
  </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps(['game_data']);
watch(
    () => props.game_data,
    (newGameData) => {
        if (newGameData && newGameData.background_image) {
            document.body.style.backgroundImage = `url(${newGameData.background_image})`;
        }
    },
    { immediate: true }
);
</script>

<style scoped>
.game-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 50vw;
    overflow-y: scrolls;
    color: white;
    font-family: 'Arial', sans-serif;
    padding: 20px;
}

.creator {
    margin-top: 10px;
    font-style: italic;
    font-family: 'Times New Roman', serif;
}

.title {
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Georgia', serif;
}

.description {
    margin-top: 10px;
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    white-space: normal;
    word-wrap: break-word;
}

.actions {
    display: flex;
    gap: 20px;
    margin-top: 20px;
}

.trailer {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
}

.trailer::before {
    content: '▶';
    font-size: 1rem;
}

.status {
    padding: 10px 20px;
    border-radius: 20px;
    background-color: white;
    color: black;
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
}

.status:hover {
    background-color: transparent;
    border: 2px solid white;
    color: white;
}

.awards {
    position: absolute;
    top: calc(50% - 100px);
    right: 20px;
}

.awards p {
    margin-bottom: 20px;
}

#copyright {
    position: absolute;
    bottom: 20px;
}
</style>