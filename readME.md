# REST API Learning Project

Este es un proyecto educativo para aprender a crear una REST API usando Node.js, Express y MongoDB.

## 📚 Objetivo del Proyecto

Aprender los conceptos fundamentales de:
- Creación de APIs REST
- Operaciones CRUD (Create, Read, Update, Delete)
- Conexión con bases de datos MongoDB
- Manejo de rutas y middlewares en Express
- Validación de datos
- Manejo de errores

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Manejo de variables de entorno
- **nodemon** - Herramienta de desarrollo para reinicio automático

## 📁 Estructura del Proyecto

```
REST-API/
│
├── src/
│   ├── models/
│   │   └── user.js          # Modelo de usuario (Mongoose Schema)
│   ├── routes/
│   │   └── users.js         # Rutas para operaciones de usuarios
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

## 📋 Funcionalidades Implementadas

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

## 🧪 Pruebas de la API

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

## 🔧 Próximos Pasos

- [ ] Implementar rutas PUT y DELETE
- [ ] Agregar validación de datos
- [ ] Implementar autenticación con JWT
- [ ] Agregar middleware de logging
- [ ] Implementar paginación
- [ ] Agregar tests unitarios
- [ ] Documentación con Swagger

## 📖 Recursos de Aprendizaje

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

## 🐛 Problemas Comunes

### Error: "modules is not defined"
- **Causa**: Error de escritura en `module.exports`
- **Solución**: Verificar que sea `module.exports` y no `modules.exports`

### Error: "argument handler must be a function"
- **Causa**: Router no exportado correctamente
- **Solución**: Asegurar que el archivo de rutas termine con `module.exports = router;`

## 👨‍💻 Autor

Santiago Valverde - Proyecto de aprendizaje para BD2

## 📄 Licencia

Este proyecto es solo para fines educativos.