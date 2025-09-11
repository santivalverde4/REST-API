# REST API Learning Project

Este es un proyecto educativo para aprender a cr## 📚 Documentación de la API

La API cuenta con documentación interactiva completa usando Swagger UI:

**Acceso a la documentación:**
- **URL**: `http://localhost:3000/api-docs`
- **Características**:
  - Documentación automática de todos los endpoints
  - Esquemas de datos definidos con OpenAPI 3.0
  - Interfaz interactiva para probar endpoints
  - Ejemplos de request/response
  - Validación de parámetros en tiempo real

**Esquemas documentados:**
- `UserInput` - Datos para crear usuario
- `User` - Usuario completo con timestamps
- `UserUpdate` - Datos para actualizar
- `UpdateResult` - Respuesta de actualización
- `DeleteResult` - Respuesta de eliminación
- `Error` - Formato de erroresREST API usando Node.js, Express y MongoDB.

## 📚 Objetivo del Proyecto

Aprender los conceptos fundamentales de:
- Creación de APIs REST
- Operaciones CRUD (Create, Read, Update, Delete)
- Conexión con bases de datos MongoDB
- Manejo de rutas y middlewares en Express
- Documentación de APIs con Swagger/OpenAPI
- Validación de datos
- Manejo de errores
- Buenas prácticas en desarrollo backend

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Manejo de variables de entorno
- **nodemon** - Herramienta de desarrollo para reinicio automático
- **Swagger UI Express** - Documentación interactiva de la API

## 📁 Estructura del Proyecto

```
REST-API/
│
├── src/
│   ├── models/
│   │   └── user.js          # Modelo de usuario (Mongoose Schema + Swagger Schemas)
│   ├── routes/
│   │   └── users.js         # Rutas para operaciones de usuarios + OpenAPI docs
│   └── index.js             # Archivo principal del servidor
│
├── package.json             # Dependencias y scripts
├── .env                     # Variables de entorno (no incluido en git)
└── README.md               # Este archivo
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd REST-API
```

### 2. Instalar dependencias
```bash
npm install
```

**Dependencias principales instaladas:**
- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `dotenv` - Variables de entorno
- `swagger-ui-express` - Documentación API
- `nodemon` (dev) - Reinicio automático

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rest-api-learning
```

### 4. Ejecutar el servidor
```bash
# Modo desarrollo (con nodemon)
npm run start

# O directamente con node
node src/index.js
```

## � Documentación de la API

La API cuenta con documentación interactiva usando Swagger UI:

**Acceso a la documentación:**
- URL: `http://localhost:3000/api-docs`
- Swagger UI permite probar los endpoints directamente desde el navegador
- Documentación automática de todos los endpoints disponibles

## �📋 Funcionalidades Implementadas

### Modelo de Usuario
El modelo incluye:
- `name` (String, requerido)
- `email` (String, requerido, único)
- `age` (Number, requerido)
- `password` (String, requerido)
- `timestamps` (createdAt, updatedAt - automático)

### Rutas Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/`      | Mensaje de bienvenida |
| GET    | `/api/users` | Obtener todos los usuarios |
| POST   | `/api/users` | Crear un nuevo usuario |
| GET    | `/api/users/:id` | Obtener usuario por ID |
| GET    | `/api/users/filter` | Filtrar usuarios por nombre/edad |
| PUT    | `/api/users/:id` | Actualizar usuario completo |
| PATCH  | `/api/users/:id` | Actualizar usuario parcial |
| DELETE | `/api/users/:id` | Eliminar usuario |
| GET    | `/api-docs` | Documentación Swagger |

## 🧪 Pruebas de la API

### Método 1: Swagger UI (Recomendado)
1. Ejecuta el servidor: `npm run start`
2. Abre en tu navegador: `http://localhost:3000/api-docs`
3. Prueba los endpoints directamente desde la interfaz

### Método 2: cURL

### Obtener todos los usuarios
```bash
curl -X GET http://localhost:3000/api/users
```

### Crear un nuevo usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "age": 25,
    "password": "mipassword123"
  }'
```

### Obtener usuario por ID
```bash
curl -X GET http://localhost:3000/api/users/[ID_DEL_USUARIO]
```

### Filtrar usuarios
```bash
# Por nombre
curl -X GET "http://localhost:3000/api/users/filter?name=Juan"

# Por edad mayor a X
curl -X GET "http://localhost:3000/api/users/filter?age=25"

# Combinado
curl -X GET "http://localhost:3000/api/users/filter?name=Juan&age=25"
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:3000/api/users/[ID_DEL_USUARIO] \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos",
    "email": "juancarlos@email.com",
    "age": 26,
    "password": "nuevapassword123"
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:3000/api/users/[ID_DEL_USUARIO]
```

## 📝 Conceptos Aprendidos

### 1. **REST API**
- Arquitectura RESTful
- Métodos HTTP (GET, POST, PUT, DELETE)
- Códigos de estado HTTP
- Estructura de URLs

### 2. **Express.js**
- Configuración de servidor
- Middlewares
- Enrutamiento
- Manejo de JSON

### 3. **MongoDB & Mongoose**
- Conexión a base de datos
- Esquemas y modelos
- Operaciones CRUD
- Timestamps automáticos

### 4. **Buenas Prácticas**
- Separación de responsabilidades
- Variables de entorno
- Manejo de errores
- Estructura de carpetas
- Documentación con Swagger

### 5. **Documentación API**
- Swagger UI para documentación interactiva
- Definición de esquemas OpenAPI
- Testing directo desde el navegador

## 🔧 Próximos Pasos

- [x] Implementar rutas PUT y DELETE
- [x] Agregar documentación con Swagger
- [x] Configurar esquemas OpenAPI completos
- [x] Documentar todos los endpoints principales
- [ ] Agregar validación de datos con Joi
- [ ] Implementar autenticación con JWT
- [ ] Agregar middleware de logging (Morgan)
- [ ] Implementar paginación en consultas
- [ ] Agregar tests unitarios (Jest)
- [ ] Implementar rate limiting
- [ ] Agregar CORS policy
- [ ] Implementar filtros avanzados

## 📖 Recursos de Aprendizaje

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Swagger/OpenAPI Documentation](https://swagger.io/docs/)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

## 🐛 Problemas Comunes

### Error: "modules is not defined"
- **Causa**: Error de escritura en `module.exports`
- **Solución**: Verificar que sea `module.exports` y no `modules.exports`

### Error: "argument handler must be a function"
- **Causa**: Router no exportado correctamente
- **Solución**: Asegurar que el archivo de rutas termine con `module.exports = router;`

### Error: Swagger no muestra la documentación
- **Causa**: Configuración incorrecta de Swagger UI
- **Solución**: Verificar que el servidor incluya la configuración de Swagger y que las anotaciones estén correctas

### Error: No aparecen los endpoints en Swagger
- **Causa**: Comentarios JSDoc mal formateados
- **Solución**: Verificar que los comentarios `@openapi` estén correctamente estructurados

## 🎯 Estado del Proyecto

✅ **Completado:**
- API REST básica funcionando
- Conexión a MongoDB
- Operaciones CRUD completas
- Documentación Swagger implementada
- Esquemas OpenAPI definidos
- Endpoints documentados

🔄 **En progreso:**
- Mejoras en la documentación
- Validación de datos

📋 **Pendiente:**
- Autenticación y autorización
- Tests automatizados
- Deployment

## 👨‍💻 Autor

Santiago Valverde - Proyecto de aprendizaje para BD2

## 📄 Licencia

Este proyecto es solo para fines educativos.