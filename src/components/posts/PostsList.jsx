import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import PostsForm from "./PostsForm";
import {
    fetchPosts,
    deletePost as deletePostService,
} from "../../services/postsService";
import "./PostsList.css";
import { toast } from "react-toastify";

export default function PostsList() {
    const { user, token } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [displayEditDialog, setDisplayEditDialog] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [displayCreateDialog, setDisplayCreateDialog] = useState(false);

    useEffect(() => {
        fetchPosts()
            .then(setPosts)
            .catch(() => toast.error("Error al cargar posts"));
    }, []);

    const handleEdit = (post) => {
        setEditingPost(post);
        setDisplayEditDialog(true);
    };

    const handleCreate = () => setDisplayCreateDialog(true);

    const confirmDelete = (postId) => {
        confirmDialog({
            message: '¿Está seguro de eliminar este post?',
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    await deletePostService(postId, token);
                    setPosts(posts.filter((p) => p.id !== postId));
                    toast.warn("Post eliminado");
                } catch (err) {
                    toast.error("No se pudo eliminar el post");
                }
            },
        });
    };

    const refreshPosts = async () => {
        const updated = await fetchPosts();
        setPosts(updated);
    };

    return (
        <div className="posts-list-container">
            <div className="mini-blog-header">
                <h1>MiniBlog</h1>
            </div>

            <div className="posts-list-controls">
                <h2>Posts</h2>
                <Button
                    label="Crear Post"
                    icon="pi pi-plus"
                    className="create-post-btn"
                    onClick={handleCreate}
                />
            </div>

            <ConfirmDialog />

            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <h3>{post.titulo}</h3>
                        <p className="post-content">{post.contenido}</p>
                        <p className="post-meta">
                            <strong>Autor ID:</strong> {post.autor_id}
                        </p>

                        {(user?.role === "admin" || user?.id === post.autor_id) && (
                            <div className="action-buttons">
                                <Button
                                    label="Editar"
                                    icon="pi pi-pencil"
                                    onClick={() => handleEdit(post)}
                                    className="p-button-secondary"
                                />
                                <Button
                                    label="Eliminar"
                                    icon="pi pi-trash"
                                    onClick={() => confirmDelete(post.id)}
                                    className="p-button-danger"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {editingPost && (
                <Dialog
                    header={`Editar Post: ${editingPost.titulo}`}
                    visible={displayEditDialog}
                    style={{ width: "50vw" }}
                    onHide={() => setDisplayEditDialog(false)}
                    modal
                    closable
                >
                    <PostsForm
                        initialValues={editingPost}
                        onClose={() => {
                            setDisplayEditDialog(false);
                            refreshPosts();
                        }}
                    />
                </Dialog>
            )}

            {displayCreateDialog && (
                <Dialog
                    header="Crear Nuevo Post"
                    visible={displayCreateDialog}
                    style={{ width: "50vw" }}
                    onHide={() => setDisplayCreateDialog(false)}
                    modal
                    closable
                >
                    <PostsForm
                        onClose={() => {
                            setDisplayCreateDialog(false);
                            refreshPosts();
                        }}
                    />
                </Dialog>
            )}
        </div>
    );
}