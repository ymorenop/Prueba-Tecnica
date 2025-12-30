Backend - Gestión de Productos (Node.js + Express)

Este proyecto corresponde al backend del sistema de gestión de productos. Está desarrollado con Node.js y Express, permitiendo crear, listar, actualizar y eliminar productos. Los datos se guardan en un archivo local products.json para persistencia.

Tecnologías utilizadas:

* Node.js
* Express
* CORS
* JSON para almacenamiento local


Instalación: 

1. Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO_BACKEND>

2. Entrar a la carpeta del proyecto:

cd backend

3. npm install


4. Iniciar el servidor:

npm start

El backend estará corriendo en: http://localhost:3000

| Método | Ruta          | Descripción                      |
| ------ | ------------- | -------------------------------- |
| GET    | /products     | Listar todos los productos       |
| POST   | /products     | Crear un producto                |
| PUT    | /products/:id | Actualizar un producto existente |
| DELETE | /products/:id | Eliminar un producto             |


