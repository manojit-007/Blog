// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import {
  SignUp,
  Login,
  Home,
  Logout,
  UserProfile,
  Authors,
  AuthorPost,
  Category,
  CreatePost,
  Dashboard,
  EditPost,
  ErrorPage,
  PostDetail,
  DeletePost,
} from "./page/index.js";
import UserContextApiProvider from "../context/UserContextProvider.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextApiProvider>
        <Layout />
      </UserContextApiProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/profile/:id", element: <UserProfile /> },
      { path: "/authors", element: <Authors /> },
      { path: "/create", element: <CreatePost /> },
      { path: "/posts/categories/:category", element: <Category /> },
      { path: "/posts/user/:id", element: <AuthorPost /> },
      { path: "/myPosts/:id", element: <Dashboard /> },
      { path: "/posts/:id/edit", element: <EditPost /> },
      { path: "/posts/:id/delete", element: <DeletePost /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
