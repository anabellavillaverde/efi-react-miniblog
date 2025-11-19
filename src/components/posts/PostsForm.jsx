import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    createPost as createPostService,
    updatePost as updatePostService,
} from "../../services/postsService";
import { toast } from "react-toastify";
import "./PostsForm.css";

const validationSchema = Yup.object({
    titulo: Yup.string().required("El título es obligatorio"),
    contenido: Yup.string().required("El contenido es obligatorio"),
    categoria_id: Yup.number().required("La categoría es obligatoria"),
});

export default function PostsForm({
    initialValues = { titulo: "", contenido: "", categoria_id: 1, is_published: true },
    onClose,
}) {
    const { token } = useContext(AuthContext);

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            if (initialValues.id) {
                await updatePostService(initialValues.id, values, token);
                toast.success("Post actualizado");
            } else {
                await createPostService(values, token);
                toast.success("Post creado");
            }

            resetForm();
            if (onClose) onClose();

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
                <Form className="post-form">
                    <div className="form-field">
                        <label>Título</label>
                        <Field name="titulo" />
                        <ErrorMessage name="titulo" component="small" className="error" />
                    </div>

                    <div className="form-field">
                        <label>Contenido</label>
                        <Field name="contenido" as="textarea" />
                        <ErrorMessage name="contenido" component="small" className="error" />
                    </div>

                    <div className="form-field">
                        <label>Categoría</label>
                        <Field as="select" name="categoria_id">
                            <option value={1}>General</option>
                            <option value={2}>Noticias</option>
                            <option value={3}>Tutoriales</option>
                        </Field>
                        <ErrorMessage name="categoria_id" component="small" className="error" />
                    </div>

                    <div className="form-field checkbox-field">
                        <label>
                            <Field type="checkbox" name="is_published" />
                            Publicado
                        </label>
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