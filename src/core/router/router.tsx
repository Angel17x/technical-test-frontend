import {
  createBrowserRouter,
} from "react-router-dom";
import { LoginView } from "../../features/auth/login/views";
import { RegisterView } from "@app/features/auth/register/views";
import { InitView } from "@app/features/init/views/init";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitView />,
    children: [
      {
        path: "auth/login",
        element: <LoginView />,
      },
      {
        path: "auth/register",
        element: <RegisterView />,
      },
    ],
  },
]);