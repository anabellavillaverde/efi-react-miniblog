import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ReviewForm from "./ReviewForm";
import { fetchReviews, deleteReview as deleteReviewService } from "../../services/reviewsService";
import { toast } from "react-toastify";
import "./ReviewsList.css";

export default function ReviewsList({ postId }) {
    const { user, token } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [displayEditDialog, setDisplayEditDialog] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [displayCreateDialog, setDisplayCreateDialog] = useState(false);

    const loadReviews = async () => {
        try {
            const data = await fetchReviews(postId);
            setReviews(data);
        } catch {
            toast.error("Error al cargar reviews");
        }
    };

    useEffect(() => {
        loadReviews();
    }, [postId]);

    const handleEdit = (review) => {
        setEditingReview(review);
        setDisplayEditDialog(true);
    };

    const handleCreate = () => setDisplayCreateDialog(true);

    const confirmDelete = (reviewId) => {
        confirmDialog({
            message: "¿Está seguro de eliminar este comentario?",
            header: "Confirmar Eliminación",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sí",
            rejectLabel: "Cancelar",
            acceptClassName: "p-button-danger",
            accept: async () => {
                try {
                    await deleteReviewService(reviewId, token);
                    setReviews(reviews.filter((r) => r.id !== reviewId));
                    toast.warn("Comentario eliminado");
                } catch (err) {
                    toast.error("No se pudo eliminar el comentario");
                }
            },
        });
    };

    return (
        <div className="reviews-list-container">
            <ConfirmDialog />

            {reviews.map((review) => (
                <div key={review.id} className="review-item">
                    <p className="review-text">{review.texto}</p>
                    <p className="review-meta">
                        <strong>Autor:</strong> {review.autor_nombre} | <strong>Fecha:</strong> {review.fecha_creacion}
                    </p>

                    {(user?.role === "admin" || user?.id === review.autor_id) && (
                        <div className="action-buttons">
                            <Button
                                label="Editar"
                                icon="pi pi-pencil"
                                onClick={() => handleEdit(review)}
                                className="p-button-secondary"
                            />
                            <Button
                                label="Eliminar"
                                icon="pi pi-trash"
                                onClick={() => confirmDelete(review.id)}
                                className="p-button-danger"
                            />
                        </div>
                    )}
                </div>
            ))}

            {editingReview && (
                <Dialog
                    header="Editar comentario"
                    visible={displayEditDialog}
                    style={{ width: "50vw" }}
                    onHide={() => setDisplayEditDialog(false)}
                    modal
                    closable
                >
                    <ReviewForm
                        initialValues={editingReview}
                        postId={postId}
                        onClose={() => {
                            setDisplayEditDialog(false);
                            setEditingReview(null);
                            loadReviews();
                        }}
                    />
                </Dialog>
            )}

            {displayCreateDialog && (
                <Dialog
                    header="Nuevo comentario"
                    visible={displayCreateDialog}
                    style={{ width: "50vw" }}
                    onHide={() => setDisplayCreateDialog(false)}
                    modal
                    closable
                >
                    <ReviewForm
                        postId={postId}
                        onClose={() => {
                            setDisplayCreateDialog(false);
                            loadReviews();
                        }}
                    />
                </Dialog>
            )}

            <Button
                label="Agregar comentario"
                icon="pi pi-plus"
                className="create-review-btn"
                onClick={handleCreate}
            />
        </div>
    );
}