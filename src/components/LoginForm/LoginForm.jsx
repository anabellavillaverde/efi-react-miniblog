import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./LoginForm.css";

const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (values, { resetForm }) => {
        const success = await login(values.email, values.password);
        if (success) {
            toast.success("¡Inicio de sesión exitoso!");
            resetForm();
            navigate("/posts");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <div className="form-field">
                            <label>Email</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="small" className="error" />
                        </div>
                        <div className="form-field">
                            <label>Contraseña</label>
                            <Field name="password" type="password" />
                            <ErrorMessage name="password" component="small" className="error" />
                        </div>
                        <Button type="submit" label={isSubmitting ? "Iniciando..." : "Iniciar Sesión"} />
                    </Form>
                )}
            </Formik>
        </div>
    );
}