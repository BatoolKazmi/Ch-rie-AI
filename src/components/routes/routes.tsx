import Home from "./Home";
import Test from "./Test";
import Camera from "./Camera";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
];

export default routes;
