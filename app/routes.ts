import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("layout/layout-auth.tsx", [
    index("routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),
  route("logout", "routes/logout.tsx"),
  route("auth/refresh", "routes/auth-refresh.tsx"),
  route("resources/image-proxy", "routes/image-proxy.tsx"),
  layout("layout/layout-admin.tsx", [
    route("dashboard", "routes/dashboard.tsx"),

    ...prefix("books", [
      route("id", "routes/book-id.tsx"),
      route("id/show/:id", "routes/book-id-detail.tsx"),
      route("en", "routes/book-en.tsx"),
      route("en/show/:id", "routes/book-en-detail.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
