import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import RegisterForm from "./pages/Register/Register";
import LoginForm from "./pages/Login/Login";
import PostsList from "./components/posts/PostsList";
import PostsForm from "./components/posts/PostsForm";
import PostDetail from "./components/posts/PostDetail";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registrarse" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/posts" element={<><Header /><PostsList /></>} />
      <Route path="/posts/crear" element={<><Header /><PostsForm /></>} />
      <Route path="/posts/:id" element={<><Header /><PostDetail /></>} />
    </Routes>
  );
}