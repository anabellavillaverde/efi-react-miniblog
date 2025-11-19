import { useContext, useState } from "react";
import { PostsContext } from "../../context/PostsContext";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import PostsForm from "./PostsForm";
import "./PostsList.css";

export default function PostsList() {
    const { posts, deletePost } = useContext(PostsContext);
    const { user } = useContext(AuthContext);

    const [displayEditDialog, setDisplayEditDialog] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [displayCreateDialog, setDisplayCreateDialog] = useState(false);

    const handleEdit = (post) => {
        setEditingPost(post);
        setDisplayEditDialog(true);
    };

    const handleCreate = () => {
        setDisplayCreateDialog(true);
    };

    const onEditDialogHide = () => {
        setDisplayEditDialog(false);
        setEditingPost(null);
    };

    const onCreateDialogHide = () => {
        setDisplayCreateDialog(false);
    };

    const confirmDelete = (postId) => {
        confirmDialog({
            message: '¿Está seguro de que desea eliminar este post? Esta acción no se puede deshacer.',
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, Eliminar',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger',
            accept: () => deletePost(postId)
        });
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
                {posts.map(post => (
                    <div key={post.id} className="post-item">
                        <h3>{post.titulo}</h3>
                        <p className="post-content">{post.contenido}</p>
                        <p className="post-meta"><strong>Autor ID:</strong> {post.autor_id}</p> 
                        
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
                    style={{ width: '50vw' }} 
                    onHide={onEditDialogHide} 
                    modal
                    closable={true}
                >
                    <PostsForm 
                        initialValues={editingPost} 
                        onClose={onEditDialogHide}
                    />
                </Dialog>
            )}

            {displayCreateDialog && (
                <Dialog 
                    header="Crear Nuevo Post" 
                    visible={displayCreateDialog} 
                    style={{ width: '50vw' }} 
                    onHide={onCreateDialogHide} 
                    modal
                    closable={true}
                >
                    <PostsForm 
                        onClose={onCreateDialogHide}
                    />
                </Dialog>
            )}
        </div>
    );
}