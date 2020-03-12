import DefaultLayout from "./layouts/DefaultLayout";
import asyncComponent from "./components/AsyncComponent";

const AsyncHome = asyncComponent(() => import("./containers/home"));

export default [
  {
    layout: DefaultLayout,
    routes: [
      {
        path: "/",
        component: AsyncHome,
        exact: true
      }
    ]
  }
];
