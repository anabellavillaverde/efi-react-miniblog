import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import PostsList from "./components/posts/PostsList";
import PostsForm from "./components/posts/PostsForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registrarse" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/posts" element={<PostsList />} />
      <Route path="/posts/crear" element={<PostsForm />} />
    </Routes>
  );
}
