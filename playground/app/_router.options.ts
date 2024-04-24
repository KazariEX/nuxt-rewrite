export default defineRewriteRouter({
    suffix: "php",
    routes: [
        {
            name: "index",
            path: "/",
            alias: "/index",
            component: () => import("~/pages/index.vue")
        },
        {
            name: "about",
            path: "/about",
            component: () => import("~/pages/about.vue")
        },
        {
            name: "foo",
            path: "/foo",
            component: () => import("~/pages/foo/index.vue"),
            children: [
                {
                    name: "bar",
                    path: "bar",
                    component: () => import("~/pages/foo/bar/index.vue"),
                    children: [
                        {
                            name: "baz",
                            path: "baz",
                            component: () => import("~/pages/foo/bar/baz.vue")
                        }
                    ]
                }
            ]
        },
        {
            name: "post",
            path: "/post",
            redirect: {
                name: "index"
            },
            children: [
                {
                    name: "slug",
                    path: ":slug()",
                    component: () => import("~/pages/post/[slug].vue")
                }
            ]
        }
    ]
});