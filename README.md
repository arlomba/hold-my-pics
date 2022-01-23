# Hold My Pics

App para subir imágenes a tu servidor.

# Instalación y uso

Instalar las dependencias:

```bash
npm install
```

Copiar el archivo `.env.example` y renombrarlo a `.env`.

Iniciar el servidor:

```bash
npm start
```

La aplicación debería estar ejecutándose en: http://localhost:3000

## Estructura del proyecto

Debido a que Express es unopinionated, no te obliga a estructurar tu app de forma alguna, utilizo un patrón de diseño conocido como Model-View-Controller (MVC), ya que es intuitivo y muy común en las aplicaciones web.

- `controllers`: Los controladores se encargan de definir la funcionalidad que debe tener cada endpoint.
- `lib`: Donde defino las funciones reutilizables y el middleware.
- `models`: Almacena los modelos que definen la estructura de la base de datos.
- `routes`: Donde defino las rutas de la app, cada ruta tiene asignado un controlador.
- `ui`: Donde se encuentra el código CSS y JavaScript del lado cliente.
- `views`: Donde almaceno las plantillas HTML subdivididas en carpetas para su reutilización (utilizo Pug en lugar de EJS).

Otros directorios y archivos comunes:

- `config`: Directorio donde se almacenan las configuraciones.
- `tests`: Contiene scripts para testear funcionalidades.
- `.env`: Fichero que contiene variables de entorno con información sensible; API Tokens, usuarios, y contraseñas entre otros.
