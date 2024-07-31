import { createBrowserRouter } from "react-router-dom";
import { LayoutX } from "src/components/Layout/LayoutX/LayoutX";
import { PublicLayout } from "src/components/Layout/PublicLayout/PublicLayout";
import { Financial } from "src/pages/Auth/Financial/Financial.views";
import { Home } from "src/pages/Auth/Home/Home.views";
import { Management } from "src/pages/Auth/Management/Management.views";
import { UserCreate } from "src/pages/Auth/Management/TabAcessos/create/UserCreate";
import { UserUpdate } from "src/pages/Auth/Management/TabAcessos/updates/UserUpdate";
import { Projects } from "src/pages/Auth/Projects/Projects.views";
import { Schedule } from "src/pages/Auth/Schedule/Schedule.views";
import { ForgotPassword } from "src/pages/public/ForgotPassword/forgotPassword.views";
import { Login } from "src/pages/public/Login/login.views";
import { Membership } from "src/pages/public/Membership/membership.views";
import { RecoverPassword } from "src/pages/public/RecoverPassword/recoverPassword.views";
import { Register } from "src/pages/public/Register/register.views";
import { app } from "./app";
import { AuthenticatedRoute } from "./context/AuthenticatedRoute";
import { PublicRoute } from "./context/PublicRoute";

export const browserRouter = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: app.login, element: <Login /> },
          { path: app.register, element: <Register /> },
          { path: app.forgotPassword, element: <ForgotPassword /> },
          { path: app.recoverPassword(":token"), element: <RecoverPassword /> },
          { path: app.membership(":token"), element: <Membership /> },
          { path: "*", element: <Login /> },
        ],
      },
    ],
  },
  {
    element: <AuthenticatedRoute />,
    children: [
      {
        element: <LayoutX />,
        children: [
          { path: app.home, element: <Home /> },
          { path: app.schedule, element: <Schedule /> },
          { path: app.projects, element: <Projects /> },
          { path: app.financial, element: <Financial /> },
          { path: app.management, element: <Management /> },
          { path: app.user, element: <UserCreate /> },
          { path: app.userUpdate(":id"), element: <UserUpdate /> },
        ],
      },
    ],
  },
]);
