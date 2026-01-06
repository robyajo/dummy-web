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
  layout("layout/layout-admin.tsx", [
    route("dashboard", "routes/dashboard.tsx"),

    //   ...prefix("projects", [
    //     index("./projects/home.tsx"),
    //     layout("./projects/project-layout.tsx", [
    //       route(":pid", "./projects/project.tsx"),
    //       route(":pid/edit", "./projects/edit-project.tsx"),
    //     ]),
    //   ]),
  ]),
] satisfies RouteConfig;
