import DefaultLayout from "./layouts/DefaultLayout";
import asyncComponent from "./components/AsyncComponent";

const AsyncHome = asyncComponent(() => import("./containers/home"));
const AsyncGame = asyncComponent(() => import("./containers/game"));

export default [
  {
    layout: DefaultLayout,
    routes: [
      {
        path: "/",
        component: AsyncHome,
        exact: true
      },
      {
        path: "/game",
        component: AsyncGame,
        exact: true
      }
    ]
  }
];
