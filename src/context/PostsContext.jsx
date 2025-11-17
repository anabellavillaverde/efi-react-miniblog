import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");

    const fetchPosts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/posts");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Error cargando posts:", err);
            toast.error("Error al cargar posts");
        }
    };

    const createPost = async (post) => {
        try {
            const res = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    titulo: post.titulo,
                    contenido: post.contenido,
                    categoria_id: post.categoria_id,
                    is_published: post.is_published,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "No se pudo crear el post");
                return;
            }

            setPosts([data, ...posts]);

            toast.success("Post creado correctamente");
        } catch (err) {
            console.error("Error creando post:", err);
            toast.error("Error al crear el post");
        }
    };

    const updatePost = async (postId, updatedPost) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPost),
            });

            if (res.ok) {
                const newPost = await res.json();
                setPosts(posts.map((p) => (p.id === postId ? newPost : p)));
                toast.success("Post actualizado correctamente");
            } else {
                toast.error("No se pudo actualizar el post");
            }
        } catch (err) {
            console.error("Error actualizando post:", err);
            toast.error("Error al actualizar el post");
        }
    };

    const deletePost = async (postId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setPosts(posts.filter((p) => p.id !== postId));
                toast.warn("Post eliminado");
            } else {
                toast.error("No se pudo eliminar el post");
            }
        } catch (err) {
            console.error("Error eliminando post:", err);
            toast.error("Error al eliminar el post");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostsContext.Provider
            value={{ posts, fetchPosts, createPost, updatePost, deletePost }}
        >
            {children}
        </PostsContext.Provider>
    );
};
