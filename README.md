# 🏔️ Altura Andina Hotel & Spa

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![Status](https://img.shields.io/badge/Status-MVP%20Complete-success)

## 📋 Descripción

**Altura Andina** ha evolucionado de una simple landing page a una **Aplicación Web Full Stack** robusta para la gestión y reserva de un hotel de lujo en Mérida, Venezuela.

Este proyecto demuestra la implementación de una arquitectura **MERN (MongoDB, Express, React, Node.js)** completa, integrando servicios de terceros para resolver problemas reales de negocio: pagos en línea, gestión de multimedia, notificaciones transaccionales y datos meteorológicos en tiempo real.

El objetivo fue crear una experiencia de usuario fluida (SPA) que permita desde la exploración visual de las habitaciones hasta la confirmación segura de la reserva.

## ✨ Características Principales

### 🏨 Frontend (Experiencia de Usuario)
* **Diseño Moderno:** Interfaz construida con **Chakra UI** y animaciones fluidas con **Framer Motion**.
* **Reservas Híbridas:** Opción de "Pagar Ahora" (Stripe) o "Pagar en Hotel" (Confirmación por Email).
* **Widget Climático:** Integración con OpenWeatherMap para mostrar el clima real de la Sierra Nevada.
* **Optimización de Medios:** Imágenes de alta resolución servidas dinámicamente desde **Cloudinary**.
* **Feedback Visual:** Sistema de notificaciones (Toasts) y validaciones de formularios en tiempo real.

### ⚙️ Backend (Lógica y Seguridad)
* **API RESTful:** Desarrollada con Node.js y Express.
* **Base de Datos NoSQL:** Modelado de datos con **Mongoose** (Habitaciones, Usuarios, Reservas).
* **Seguridad Bancaria:** Integración de **Stripe Payment Intents** para procesar pagos sin almacenar datos sensibles.
* **Sistema de Correos:** Envío automático de confirmaciones y recibos usando **Nodemailer** (Gmail SMTP).
* **Script de Semilla:** Base de datos poblada automáticamente con datos de prueba y URLs optimizadas.

## 🛠️ Tecnologías Utilizadas

**Frontend:**
* [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* [Chakra UI](https://chakra-ui.com/) (Componentes)
* [Framer Motion](https://www.framer.com/motion/) (Animaciones)
* [React Router DOM](https://reactrouter.com/)
* [Stripe.js](https://stripe.com/docs/js)

**Backend:**
* [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
* [Nodemailer](https://nodemailer.com/)
* [Cloudinary SDK](https://cloudinary.com/)

## 🚀 Guía de Instalación Local

Sigue estos pasos para desplegar el proyecto en tu máquina:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/JoshuaFreelancer/ALTURA-ANDINA.git](https://github.com/JoshuaFreelancer/ALTURA-ANDINA.git)
    ```

2.  **Instala las dependencias:**
    
    *Backend:*
    ```bash
    cd backend
    npm install
    ```
    
    *Frontend:*
    ```bash
    cd frontend
    npm install
    ```

3.  **Configura las Variables de Entorno (.env):**
    Debes crear un archivo `.env` en la carpeta `backend` con las siguientes claves:

    ```env
    PORT=5000
    MONGODB_URI=tu_string_de_conexion_mongo
    
    # Configuración de Correo (Nodemailer)
    EMAIL_USER=tu_correo@gmail.com
    EMAIL_PASS=tu_contraseña_de_aplicacion
    
    # Pagos (Stripe)
    STRIPE_SECRET_KEY=sk_test_...
    
    # Clima
    WEATHER_API_KEY=tu_api_key_openweather
    ```
    
    Y en la carpeta `frontend` crea otro `.env`:
    
    ```env
    VITE_API_URL=http://localhost:5000/api
    VITE_STRIPE_PUBLIC_KEY=pk_test_...
    ```

4.  **Poblar la Base de Datos (Opcional):**
    Si quieres cargar las habitaciones con imágenes de Cloudinary:
    ```bash
    cd backend
    node seed.js
    ```

5.  **Ejecutar el Proyecto:**
    Abre dos terminales:

    ```bash
    # Terminal 1 (Backend)
    npm run dev
    
    # Terminal 2 (Frontend)
    npm run dev
    ```

## 👤 Autor

**Joshua Freelancer**
* GitHub: [@JoshuaFreelancer](https://github.com/JoshuaFreelancer)
* Portafolio: [https://joshuafreelancer.github.io/](https://joshuafreelancer.github.io/)

## 🎨 Recursos de Diseño

* [Figma del Proyecto](https://www.figma.com/file/mwhpOqIa9AIdlYwH5FiJM0/Altura-Andina-Hotel-%26-Spa?type=design&node-id=3%3A2&mode=design&t=iJAVacy3r5DrDAaW-1) *(Nota: Este es el diseño conceptual inicial. La implementación final incluye mejoras significativas de UX/UI).*

## 🔮 Futuras Mejoras

* **Dashboard Administrativo:** Panel privado para gestionar disponibilidad y precios.
* **Autenticación de Usuarios:** Login persistente para guardar historial de reservas.
* **Multi-idioma:** Soporte i18n para inglés y español.

---
*Desarrollado con ❤️ y mucho código desde Venezuela.*
