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

    const handleEdit = (post) => {
        setEditingPost(post);
        setDisplayEditDialog(true);
    };

    const onEditDialogHide = () => {
        setDisplayEditDialog(false);
        setEditingPost(null);
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
            <h2>Posts</h2>

            <ConfirmDialog /> 

            {posts.map(post => (
                <div key={post.id} className="post-item">
                    <h3>{post.titulo}</h3>
                    <p>{post.contenido}</p>
                    <p><strong>Autor ID:</strong> {post.autor_id}</p> 
                    
                    {(user?.role === "admin" || user?.id === post.autor_id) && (
                        <div className="action-buttons">
                            <Button 
                                label="Editar" 
                                icon="pi pi-pencil"
                                onClick={() => handleEdit(post)}
                                className="p-button-secondary p-mr-2"
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

            {editingPost && (
                <Dialog 
                    header={`Editar Post: ${editingPost.titulo}`} 
                    visible={displayEditDialog} 
                    style={{ width: '50vw' }} 
                    onHide={onEditDialogHide} 
                    modal
                >
                    <PostsForm 
                        initialValues={editingPost} 
                        onClose={onEditDialogHide}
                    />
                </Dialog>
            )}
        </div>
    );
}