<template>
    <div class="blogcard">
        <a :href="post.link" target="_blank" class="blogcard-title">{{ post.title }}</a>
        <p class="blogcard-body">{{ post.body }}</p>
    </div>
</template>

<script>
export default {
    name: 'BlogCard',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.blogcard {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 1em;
}

.blogcard-title {
  font-size: 18px;
  color: #333;
  text-decoration: none;
}

.blogcard-body {
  margin-top: 8px;
  color: #666;
}
</style>