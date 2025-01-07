import Home from "./Home";
import Test from "./Test";
import Camera from "./Camera";
import Picture from "./Picture";

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
  {
    path: "/picture",
    element: <Picture />,
  },
];

export default routes;
