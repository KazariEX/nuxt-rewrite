import type { NuxtPage, RouterConfig } from "@nuxt/schema";
import type { RouterOptions } from "vue-router";
import { rewrite } from "./rewrite";

type RewriteRouterOptions = Omit<RouterConfig, "routes"> & {
    routes?: RouterOptions["routes"];
    suffix?: string;
};

export function defineRewriteRouter(options: RewriteRouterOptions): RouterConfig {
    const { suffix, routes } = options;
    if (suffix) {
        rewrite({
            suffix,
            pages: routes as NuxtPage[]
        });
    }

    return {
        ...options,
        routes: () => options.routes ?? []
    };
}