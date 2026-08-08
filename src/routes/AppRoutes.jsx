import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";

import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";

import Profile from "../pages/user/Profile";

import Posts from "../pages/posts/Posts";
import PostDetail from "../pages/posts/PostDetail";
import CreatePost from "../pages/posts/CreatePost";
import EditPost from "../pages/posts/EditPost";
import MyPosts from "../pages/posts/MyPosts";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/my-posts" element={<MyPosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;