<template>
    <div class="blog-section">
        <h1>Blog</h1>
        <div class="blogcard-holder">
            <div v-for="post in blogPosts" :key="post.id" class="card-container">
                <BlogCard :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import BlogCard from './blogcard.vue';

export default {
    name: 'BlogSection',
    components: {
        BlogCard
    },
    data() {
        return {
            blogPosts: [],
        }
    },
    created() {
        window.blgCallback = (data) => {
            this.blogPosts = data.feed.entry.map(entry => ({
                id: entry.id.$t.split('/')[4],
                title: entry.title.$t,
                link: entry.link[0].href,
                body: entry.content.$t,
            }))
        }

        const script = document.createElement('script');
        script.src = 'https://bouncyjellynews.blogspot.com/feeds/posts/default?alt=json-in-script&callback=blgCallback';
        script.async = true;
        document.head.appendChild(script);
    }
};
</script>

<style scoped>
.blog-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2em;
    border-radius: 15px;
    margin: 1em 0;
}

* {
    color: #FF204E;
    max-width: 80%;
}

h1 {
    font-size: 2.5em;
}

h2 {
    font-size: 1.5em;
    color: #FF204E;
    margin-bottom: 1em;
}

p {
    font-size: 1em;
    line-height: 1.5;
    color: #FF204E;
    margin-bottom: 1em;
}

.card-container {
  margin: 1em;
}
</style>