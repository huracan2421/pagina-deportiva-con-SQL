# pagina-deportiva-con-SQL
esta es una pagina en donde se puede entra como usuario y comprara productos quedando un regusto en SQL
# 🛍️ SportyStyle - Tienda de Ropa Deportiva

**Proyecto final - Taller de Plataformas Web (CIB302)**  
**Unidad 3 • Semana 7**

Tienda online completa de ropa deportiva con carrito de compras, login de usuarios, checkout seguro y **transacciones ACID** en MySQL.

---

## ✨ Características Principales

- ✅ **Catálogo de productos** con imágenes y precios
- ✅ **Carrito de compras** dinámico (agregar, quitar, modificar cantidad)
- ✅ **Sistema de login** con registro de actividad (`login_logs`)
- ✅ **Proceso de checkout** completo
- ✅ **Transacción ACID** (la más importante del proyecto):
  - Crea el pedido
  - Guarda los items
  - Descuenta stock en tiempo real
  - Todo o nada (rollback si hay error)
- ✅ Diseño moderno y responsive
- ✅ Persistencia de carrito y sesión con `sessionStorage`
- ✅ Consultas parametrizadas (protección contra SQL Injection)

---

## 🛠️ Tecnologías Utilizadas

| Capa       | Tecnología                  |
|------------|-----------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript |
| Backend    | Node.js + Express           |
| Base de Datos | **MySQL 8** (XAMPP)      |
| Otros      | dotenv, mysql2, cors        |

---

## 📁 Estructura del Proyecto

SportyStyle/
├── index.html
├── login.html
├── checkout.html
├── script.js
├── server.js
├── style.css
├── .env
├── digrama.html
├── images/               ← (logo.png + productos)
├── package.json          ← (opcional)
└── README.md


---

## 🚀 Instalación y Ejecución

### 1. Clonar o descargar el proyecto
```bash
git clone https://github.com/huracan2421/pagina-de-tienda-de-ropa-deportiva-de-lalo.git
cd pagina-de-tienda-de-ropa-deportiva-de-lalo
npm install express mysql2 cors dotenv

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=sportstyle

node server.js

Tienda → http://localhost:3000
Login → https://localhost:3000/login.html

Usuario: admin
Contraseña: AdminSport2026!

Base de Datos (Tablas principales)

users → usuarios
products → productos con stock
orders → pedidos
order_items → detalle de cada pedido
login_logs → auditoría de inicios de sesión

Transacción ACID en el endpoint /api/checkout (ver server.js).

🏗️ Arquitectura del Proyecto

3 capas: Frontend → Backend (API) → MySQL
Transacciones ACID completas en el checkout
Consultas parametrizadas
Control de stock atómico
Registro de actividad automático

(Ver archivo digrama.html para el diagrama completo de arquitectura)

📊 MySQL vs MongoDB (Decisión técnica)
Elegimos MySQL porque:

Necesitamos transacciones ACID garantizadas durante el checkout
Datos altamente estructurados y con relaciones fuertes
Integridad referencial (foreign keys)
Control preciso del stock (evitar sobreventa)

MongoDB sería mejor para catálogos masivos sin transacciones críticas, pero no para este caso.

📸 Capturas de Pantalla
(Agrega aquí tus capturas: login, productos, carrito, checkout, pantalla de éxito)

📌 Requisitos Cumplidos (para la profe)

 Frontend completo con HTML + CSS + JS
 Backend con Node.js + Express
 Base de datos relacional (MySQL)
 Transacción ACID en checkout
 Consultas parametrizadas
 Actualización de stock en tiempo real
 Registro de logs de login
 Carrito persistente
 Diagrama de arquitectura (digrama.html)


👤 Autor
Eduardo, camila y betsabe 
Estudiante de Ingeniería en Informática
CIB302 - Taller de Plataformas Web
Universidad de Atacama
Mayo 2026

