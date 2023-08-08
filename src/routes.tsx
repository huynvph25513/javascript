import { createBrowserRouter } from "react-router-dom";
// import LayoutWebsite from "./components/Layouts/LayoutWebsite";
import LayoutAdmin from "./components/Layouts/LayoutAdmin";
import { Navigate } from "react-router-dom";
// import Dashboard from "./pages/admin/dashboard";
import Product from "./pages/admin/product";
import ProductAdd from "./pages/admin/product/add";
import ProductEdit from "./pages/admin/product/edit";

export const router = createBrowserRouter([
  // { path: "/", element: <LayoutWebsite /> },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to="product" /> },
      //   {
      //     path: "dashboard",
      //     element: <Dashboard />,
      //   },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/add",
        element: <ProductAdd />,
      },
      {
        path: "product/:idProduct/edit",
        element: <ProductEdit />,
      },
    ],
  },
]);
