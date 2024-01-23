import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Home } from "./pages/home";
import { Quote } from "./pages/quote";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:symbol",
      element: <Quote />,
    }
  ]);
  return <RouterProvider router={router} />
}

export default App
