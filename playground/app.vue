<script lang="ts" setup>
    const routes = [
        "/",
        "/index",
        "/about",
        "/foo",
        "/foo/bar",
        "/foo/bar/baz"
    ];

    const slug = ref(0);

    function toUser() {
        navigateTo(`/post/${slug.value}`);
    }
</script>

<template>
    <nav class="nav">
        <nuxt-link v-for="to in routes" class="link" :to>{{ to }}</nuxt-link>
        <div class="link">
            /post/
            <input v-model="slug"/>
            <button @click="toUser">Jump</button>
        </div>
    </nav>
    <nuxt-page />
</template>

<style>
    .nav {
        display: grid;
        justify-items: flex-start;
    }

    .link {
        line-height: 2em;
    }
</style>