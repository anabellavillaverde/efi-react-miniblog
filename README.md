# MiniBlog React + Flask

**Materia:** Práctica Profesionalizante I – JavaScript  
**Proyecto:** E.F.I – MiniBlog  

## Integrantes

- [Anabella Villaverde](https://github.com/anabellavillaverde)  
 
## Enlace al Backend

[Repositorio Backend Flask](https://github.com/RoyScc/efi-miniblog/tree/fix)

---

## Funcionalidades

### 1. Autenticación y Usuarios
- Registro con campos `name`, `email`, `password` y `rol`.  
- Inicio de sesión que obtiene un JWT desde la API y lo almacena en `localStorage`.  
- Decodificación del token para obtener datos del usuario (nombre, email, rol, expiración).  
- Gestión de sesión mediante `AuthContext`.  
- Logout que limpia el estado del usuario y el token.  

### 2. CRUDs Principales
- **Posts:** crear, listar, editar y eliminar publicaciones con título, contenido, autor y fecha.  
- **Reviews:** crear, listar, editar y eliminar comentarios asociados a un post.  
- Validaciones básicas en formularios y mensajes de error/éxito mediante Toasts.  

### 3. Seguridad y Roles
- Rutas privadas protegidas mediante JWT.  
- Diferenciación de permisos:  
  - **Admin:** acceso a todas las funcionalidades.  
  - **User:** puede gestionar solo sus propios posts o comentarios.  

---
## Pre-requisitos
- Antes de ejecutar el frontend, asegurate de tener:

1. Backend en funcionamiento

Cloná e iniciá el proyecto Flask (desde el enlace anterior).
La API generalmente corre en:

```bash
http://localhost:5000
```
2. Node.js instalado


## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/anabellavillaverde/efi-react-miniblog
cd efi-react-miniblog
```

### 2. Instalar dependencias
```
npm install
```

### 3. Ejecutar el proyecto
```
npm run dev
```
**Esto levantara la app en Vite, por defecto en**
```
http://localhost:5173
```

**Abrí esa URL en tu navegador para ver la aplicación funcionando**
