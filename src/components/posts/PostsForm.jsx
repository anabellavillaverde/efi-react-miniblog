import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useContext } from "react";
import { PostsContext } from "../../context/PostsContext";
import "./PostsForm.css";

const validationSchema = Yup.object({
    titulo: Yup.string().required("El título es obligatorio"),
    contenido: Yup.string().required("El contenido es obligatorio"),
    categoria_id: Yup.number().required("La categoría es obligatoria"),
});

export default function PostsForm({ 
    initialValues = { titulo: "", contenido: "", categoria_id: 1, is_published: true },
    onClose 
}) {
    const { createPost, updatePost } = useContext(PostsContext);

    const handleSubmit = async (values, { resetForm }) => {
        if (initialValues.id) {
            await updatePost(initialValues.id, values);
        } else {
            await createPost(values);
        }

        resetForm();
        if (onClose) onClose();
    };

    return (
        <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} onSubmit={handleSubmit} >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label>Título</label>
                        <Field name="titulo" />
                        <ErrorMessage name="titulo" component="small" className="error"/>
                    </div>

                    <div>
                        <label>Contenido</label>
                        <Field name="contenido" as="textarea"/>
                        <ErrorMessage name="contenido" component="small" className="error"/>
                    </div>

                    <div>
                        <label>Categoría</label>
                        <Field as="select" name="categoria_id">
                            <option value={1}>General</option>
                            <option value={2}>Noticias</option>
                            <option value={3}>Tutoriales</option>
                        </Field>
                        <ErrorMessage name="categoria_id" component="small" className="error"/>
                    </div>

                    <div>
                        <label>
                            <Field type="checkbox" name="is_published" />
                            Publicado
                        </label>
                    </div>

                    <Button type="submit" label={isSubmitting ? "Guardando..." : "Guardar"} />
                </Form>
            )}
        </Formik>
    );
}
