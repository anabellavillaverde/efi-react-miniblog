import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ReviewsList from "../reviews/ReviewsList";
import { Button } from "primereact/button";
import "./PostDetail.css";
import { fetchPostById } from "../../services/postsService";

export default function PostDetail() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openComments, setOpenComments] = useState(false);

    const toggleComments = () => {
        setOpenComments(!openComments);
    };

    const loadPost = async () => {
        try {
            const data = await fetchPostById(id);
            setPost(data);
        } catch (err) {
            console.error("Error cargando post:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPost();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!post) return <p>No se encontró el post</p>;

    return (
        <div className="post-detail-container">
            <div className="post-detail-card">
                <h1>{post.titulo}</h1>

                <p className="post-detail-content">{post.contenido}</p>

                <p className="post-detail-meta">
                    <strong>Autor:</strong> {post.autor_nombre} |{" "}
                    <strong>Fecha:</strong> {post.fecha_creacion}
                </p>

                <Button
                    label={openComments ? "Ocultar comentarios" : "Ver comentarios"}
                    icon={openComments ? "pi pi-chevron-up" : "pi pi-chevron-down"}
                    className="p-button-text comments-toggle-btn"
                    onClick={toggleComments}
                />

                {openComments && (
                    <div className="reviews-dropdown">
                        <ReviewsList postId={post.id} />
                    </div>
                )}
            </div>
        </div>
    );
}
