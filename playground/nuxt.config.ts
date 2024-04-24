export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    modules: ["../src/module"],
    rewrite: {
        suffix: "php"
    }
});