import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
    const { user, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) return null;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">
            <h2 className="logo" onClick={() => navigate("/")}>
                Mi Blog
            </h2>

            <div className="header-buttons">
                {!user ? (
                    <>
                        <Button label="Login" onClick={() => navigate("/login")} />
                        <Button 
                            label="Registrarse"
                            className="p-button-secondary"
                            onClick={() => navigate("/registrarse")}
                        />
                    </>
                ) : (
                    <>
                        <span className="header-user">Hola, {user.email}</span>
                        <Button 
                            label="Cerrar sesión"
                            className="p-button-danger"
                            onClick={handleLogout}
                        />
                    </>
                )}
            </div>
        </header>
    );
}