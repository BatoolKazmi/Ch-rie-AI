import Home from "./Home";
import Camera from "./Camera";
import Picture from "./Picture";
import Products from "./Products";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import Test from "./Test";

const routes = [
  {
    path: "/camera",
    element: <Camera />,
    errorElement: <ErrorPage />,
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/test",
        element: <Test />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products",
        element: <Products />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/picture",
        element: <Picture />,
      },
      {
        path: "/error",
        element: <ErrorPage />
      }
    ],
  },
];

export default routes;
