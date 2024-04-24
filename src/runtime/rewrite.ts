import type { NuxtPage } from "@nuxt/schema";

interface RewriteOptions {
    pages: NuxtPage[];
    suffix: string;
}

interface RewriteInfo {
    originPath?: string;
    parent?: NuxtPage;
    extra?: boolean;
}

interface RewriteContext {
    suffix: string;
    pages: NuxtPage[];
    info: WeakMap<NuxtPage, RewriteInfo>;
}

export function rewrite(options: RewriteOptions) {
    const ctx: RewriteContext = {
        suffix: options.suffix,
        pages: options.pages,
        info: new WeakMap()
    };

    for (const page of ctx.pages) {
        transforPage(ctx, page);
    }
}

function transforPage(ctx: RewriteContext, page: NuxtPage) {
    const info = mergeInfo(ctx, page, {
        originPath: page.path
    });

    if (info?.extra) return;

    if (!page.redirect) {
        const aliases = typeof page.alias === "string" ? [page.alias] : page.alias;

        if (aliases) {
            page.alias = aliases.map((alias) => {
                return appendRedirect(page, alias, true);
            });
        }

        page.path = appendRedirect(page, page.path, false);
    }

    const { children = [] } = page;
    for (const child of children) {
        mergeInfo(ctx, child, {
            parent: page
        });
        transforPage(ctx, child);
    }

    function appendRedirect(page: NuxtPage, path: string, isAlias: boolean) {
        const rootedPath = fromRoot(ctx, page, path);
        const suffixedPath = appendSuffix(rootedPath, ctx.suffix);

        const redirectPage: NuxtPage = {
            path: rootedPath,
            redirect: !isAlias && page.name ? {
                name: page.name
            } : {
                path: suffixedPath
            }
        };

        mergeInfo(ctx, redirectPage, {
            extra: true
        });

        if (info.parent) {
            info.parent.children?.push(redirectPage);
        }
        else {
            ctx.pages.push(redirectPage);
        }

        return suffixedPath;
    }
}

function mergeInfo(ctx: RewriteContext, page: NuxtPage, data: any) {
    const info = {
        ...(ctx.info.get(page) ?? {}),
        ...data
    };
    ctx.info.set(page, info);
    return info;
}

function fromRoot(ctx: RewriteContext, page: NuxtPage, path: string) {
    const info = ctx.info.get(page) as RewriteInfo;
    return _fromRoot(ctx, info, path);
}

function _fromRoot(ctx: RewriteContext, info: RewriteInfo, path: string) {
    if (path.startsWith("/") || !info.parent) {
        return path;
    }

    const parentInfo = ctx.info.get(info.parent) as RewriteInfo;
    return _fromRoot(ctx, parentInfo, parentInfo?.originPath + "/" + path);
}

function appendSuffix(path: string, suffix: string) {
    if (!path || path === "/") {
        return path;
    }

    if (path.endsWith("/")) {
        return path.slice(0, -1) + `.${suffix}/`;
    }

    return path + `.${suffix}`;
}