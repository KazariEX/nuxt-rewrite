export default defineNuxtConfig({
    devtools: {
        enabled: true
    },
    experimental: {
        scanPageMeta: true
    },
    modules: ["../src/module"],
    rewrite: {
        suffix: "php"
    }
});