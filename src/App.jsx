import { Error, Landing, Register, ProtectedRoute } from "./pages";
import {
  AllJobs,
  AddJob,
  SharedLayout,
  Stats,
  Profile,
} from "./pages/Dashboard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
