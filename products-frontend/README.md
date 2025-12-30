Frontend - Gestión de Productos (Angular)

Este proyecto corresponde al frontend del sistema de gestión de productos, desarrollado con Angular Standalone Components. Permite crear, listar, editar y eliminar productos sin recargar la página, con validaciones en el formulario y formato de valores.

Tecnologías utilizadas:

* Angular 17 (Standalone Components)
* Reactive Forms
* TypeScript
* CSS
* HttpClient para consumir el backend


Instalación:

1. Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO_FRONTEND>

2. Entrar a la carpeta del proyecto:

cd frontend

3. Instalar dependencias:

npm install


4. Iniciar la aplicación:

npm start


El frontend estará disponible en http://localhost:4200.
Asegúrate de que el backend esté corriendo en http://localhost:3000.



Características:

1. Formulario de productos:

* Nombre del producto: obligatorio, máximo 100 caracteres.

* Valor: solo números, permite decimales, validación completa.

2. Botones:

* Guardar: crea o actualiza producto sin recargar la página.

* Nuevo: limpia el formulario sin recargar.

3. Tabla de productos:

* Lista todos los productos cargados desde el backend.

* Botón Editar: permite actualizar directamente los datos.

* Botón Eliminar: elimina productos sin recargar la página.

* Formato de valor: separador de miles con punto y decimales con coma (Ej: 150.000,01).

