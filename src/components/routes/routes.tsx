import Home from "./Home";
import Camera from "./Camera";
<<<<<<< HEAD
import Picture from "./Picture";
=======
import Products from "./Products";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import Test from "./Test";
>>>>>>> f594de2b4bb398bdd6686098676f9c7688b3c2ab

const routes = [
  {
    path: "/",
<<<<<<< HEAD
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
=======
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />
      },
      {
        path: "/test",
        element: <Test />,
        errorElement: <ErrorPage />
      },
      {
        path: "/camera",
        element: <Camera />,
        errorElement: <ErrorPage />
      },
      {
        path: "/products",
        element: <Products />,
        errorElement: <ErrorPage />
      }
    ]
  }
>>>>>>> f594de2b4bb398bdd6686098676f9c7688b3c2ab
];

export default routes;
