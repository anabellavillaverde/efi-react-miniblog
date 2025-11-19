import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    createReview as createReviewService,
    updateReview as updateReviewService,
} from "../../services/reviewsService";
import { toast } from "react-toastify";
import "./ReviewForm.css";

const validationSchema = Yup.object({
    texto: Yup.string().required("El comentario es obligatorio"),
});

export default function ReviewForm({ initialValues = { texto: "" }, postId, onClose }) {
    const { token } = useContext(AuthContext);

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            if (initialValues.id) {
                await updateReviewService(initialValues.id, values, token);
                toast.success("Review actualizada");
            } else {
                await createReviewService(postId, values, token);
                toast.success("Review creada");
            }
            resetForm();
            onClose?.();
        } catch (err) {
            console.error(err);
            toast.error("Error al procesar la solicitud");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="review-form">
                    <div className="form-field">
                        <label>Comentario</label>
                        <Field name="texto" as="textarea" />
                        <ErrorMessage name="texto" component="small" className="error" />
                    </div>

                    <Button
                        type="submit"
                        label={isSubmitting ? "Guardando..." : "Guardar"}
                        disabled={isSubmitting}
                        className="p-button"
                    />
                </Form>
            )}
        </Formik>
    );
}