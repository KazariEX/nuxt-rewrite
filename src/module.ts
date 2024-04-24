import { addImports, createResolver, defineNuxtModule, extendPages } from "@nuxt/kit";
import { name, version } from "../package.json";
import { rewrite } from "./runtime/rewrite";

export interface ModuleOptions {
    suffix?: string;
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name,
        version,
        configKey: "rewrite"
    },
    defaults: {
        suffix: ""
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url);
        const {
            suffix
        } = options;

        if (suffix && suffix.length > 0) {
            extendPages((pages) => {
                rewrite({ pages, suffix });
            });
        }

        addImports({
           name: "defineRewriteRouter",
           from: resolver.resolve("./runtime/utils")
        });
    }
});