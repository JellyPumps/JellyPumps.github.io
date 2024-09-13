<template>
    <div class="about-section">
        <div class="text-content">
            <h1>About</h1>
            <h2>I'm Sarthak Rai</h2>
            <p>
                I'm on the cusp of starting my journey as a university student in Computer Science.
                My fascination with video games has been a driving force in my life, they've had me in chokehold from a young age.
                This passion led me to explore game development through various platforms and tools, from Blender and GameMaker to several other engines.
            </p>
            <p>
                It wasn't until I dived into learning C that I truly grasped the fundamentals of game creation. It's what started honing my skills
                and also solidified my decision to pursure Computer Science.
            </p>
        </div>
        <div class="image-container">
            <img src="../assets/about-image.jpeg" alt="About Image" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutSection'
};
</script>

<style scoped>
.about-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2em;
    border-radius: 15px;
    margin: 1em 0;
}

.text-content {
    color: #FF204E;
    max-width: 60%;
}

.text-content h1 {
    font-size: 2.5em;
}

.text-content h2 {
    font-size: 1.5em;
    color: #FF204E;
    margin-bottom: 1em;
}

.text-content p {
    font-size: 1em;
    line-height: 1.5;
    color: #FF204E;
    margin-bottom: 1em;
}

.image-container {
    max-width: 35%;
}

.image-container img {
    width: 100%;
    height: auto;
    border-radius: 15px;
}
</style>
  