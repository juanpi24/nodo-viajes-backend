# 🛫 ViajesAR - Backend API REST

Backend de la plataforma de venta de paquetes turísticos "ViajesAR". Desarrollado con **Node.js (ES Modules)**, **Express**, **MongoDB (Mongoose)** y autenticación basada en **JWT**.

## 🛠️ Tecnologías y Arquitectura

El proyecto sigue una **arquitectura en capas** para garantizar la escalabilidad y el mantenimiento:

* **Rutas:** Definición de endpoints.
* **Controladores:** Manejo del request/response HTTP.
* **Servicios:** Lógica de negocio.
* **Repositorios:** Acceso a datos (Mongoose).
* **Modelos:** Esquemas de la base de datos.
* **Validaciones:** Uso de **Zod** para validar el body de las peticiones.
* **Middlewares:** Protección de rutas, roles y manejo global de errores.

**Dependencias principales:**
`express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `zod`, `mercadopago`.

---

## 🚀 Instalación y Ejecución Local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/juanpi24/nodo-viajes-backend.git
   cd nodo-viajes-backend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar las variables de entorno (copiar `.env.example` a `.env`):

   ```env
   PORT=3000
   MONGO_URI=tu_url_de_mongodb_atlas
   JWT_SECRET=tu_palabra_secreta
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   MP_ACCESS_TOKEN=tu_access_token_de_mercadopago
   MP_PUBLIC_KEY=tu_public_key_de_mercadopago
   EXTERNAL_API_URL=https://6ae348d9933120ae20f898f8.mockapi.io/destinos
   ```

4. Ejecutar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

5. (Opcional) Crear el usuario administrador inicial:

   ```bash
   npm run seed:admin
   ```

---

## 🌐 Documentación Detallada de Endpoints

**Prefijo base:** `/api`

> Las rutas protegidas requieren el Header: `Authorization: Bearer <token>`

### 🔐 Autenticación (`/auth`)

#### `POST /auth/register` — Registro de cliente (Público)

Body (JSON):

```json
{ "nombre": "Juan", "email": "juan@test.com", "password": "123456" }
```

Respuesta (201):

```json
{ "user": { "...": "..." }, "token": "eyJhbG..." }
```

#### `POST /auth/login` — Login

Body (JSON):

```json
{ "email": "juan@test.com", "password": "123456" }
```

Respuesta (200):

```json
{ "user": { "...": "..." }, "token": "eyJhbG..." }
```

#### `GET /auth/me` — Perfil del usuario (Autenticado)

Respuesta (200):

```json
{ "user": { "nombre": "...", "rol": "cliente" } }
```

---

### 👥 Usuarios (`/users`) — Solo Admin

#### `POST /users` — Crear usuario

Body (JSON):

```json
{ "nombre": "Admin2", "email": "admin2@test.com", "password": "123456", "rol": "admin" }
```

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/users` | Listar usuarios |
| `PUT` | `/users/:id` | Editar usuario (permite cambiar rol) |
| `DELETE` | `/users/:id` | Eliminar usuario |

---

### 📦 Paquetes (`/packages`)

#### `GET /packages` — Listar paquetes (Público)

Query Params (opcionales): `?page=1&limit=8&search=bariloche&categoria=Naturaleza`

Respuesta (200):

```json
{ "data": [], "meta": { "total": 20, "page": 1, "totalPages": 3 } }
```

#### `GET /packages/:id` — Detalle de un paquete (Público)

#### `GET /packages/:id/weather` — Clima del destino (Público)

Respuesta (200):

```json
{ "temperatura": 15, "viento": 10, "condicion": "Despejado" }
```

#### `POST /packages` — Crear paquete (Admin)

Body (JSON):

```json
{
  "titulo": "Bariloche",
  "destino": "Río Negro",
  "descripcion": "Viaje inolvidable",
  "precio": 150000,
  "stock": 10,
  "imagen": "https://url-de-imagen.jpg",
  "categoria": "Lagos y Glaciares",
  "destacado": true,
  "coordenadas": { "lat": -41.1335, "lng": -71.3103 }
}
```

#### `POST /packages/import` — Importar desde MockAPI (Admin)

Respuesta (200):

```json
{ "message": "Importación completada", "nuevos": 20, "actualizados": 0 }
```

---

### ❤️ Favoritos (`/favorites`) — Solo Clientes

#### `GET /favorites` — Listar favoritos del usuario

Respuesta (200):

```json
{ "data": [ { "_id": "...", "titulo": "Bariloche", "precio": 150000 } ] }
```

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/favorites/:packageId` | Agregar a favoritos |
| `DELETE` | `/favorites/:packageId` | Quitar de favoritos |

---

### 🛒 Órdenes y Pagos (`/orders`)

#### `POST /orders` — Crear orden e iniciar pago (Cliente)

Body (JSON):

```json
{
  "items": [ { "package": "ID_DEL_PAQUETE", "cantidad": 2 } ]
}
```

Respuesta (201):

```json
{
  "orderId": "65f...",
  "init_point": "https://www.mercadopago.com.ar/checkout/v1/redirect?..."
}
```

#### `GET /orders/:id/verify` — Verificar pago con Mercado Pago (Cliente)

Query Params: `?payment_id=123456789`

Respuesta (200): devuelve la orden actualizada con `"estado": "approved"`.

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/orders/mis-ordenes` | Historial de compras (Cliente) |
| `GET` | `/orders` | Listar todas las órdenes (Admin - Paginado) |

---

## ☁️ Deploy en Render

El proyecto está preparado para ser desplegado en [Render](https://render.com).

1. Crear un **Web Service** conectado al repositorio de GitHub.
2. Configurar el entorno:
   * **Environment:** Node
   * **Build Command:** `npm install`
   * **Start Command:** `node app.js` (o `npm start`)
3. Agregar las **Environment Variables** en el panel de Render (las mismas que en el `.env` local).

> **Importante:** una vez deployado, actualizar la variable `FRONTEND_URL` en Render con la URL real del frontend en Netlify (ej: `https://tu-app.netlify.app`).

---

## 🤖 Uso de Inteligencia Artificial

Durante el desarrollo de este backend se utilizó IA (Claude y deepseek) como apoyo para:

* Estructuración inicial de la arquitectura en capas.
* Configuración del SDK de Mercado Pago y la lógica de verificación de pagos.
* Implementación del middleware de validación de Zod.
* Creación del script de seed para el administrador.

Todo el código fue revisado, adaptado y probado localmente y en Postman antes de su integración.
