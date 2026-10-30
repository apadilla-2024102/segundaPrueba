# Web inmobiliaria

Web estática (HTML, CSS y JavaScript puros, sin frameworks).

- `index.html`: toda la web, es decir, el catálogo y las fichas. No hace falta tocarlo.
- `propiedades.js`: los datos de la agencia y de las propiedades. **Es el único archivo que se edita.**
- `fotos/<id-propiedad>/`: las fotos de cada casa. Cada carpeta tiene un `LEEME.txt` con los nombres de archivo que espera.

## Añadir una propiedad

1. En `propiedades.js`, copia un bloque completo de `PROPIEDADES` (desde `{` hasta `},`) y cambia sus datos. El `id` va en minúsculas, sin acentos ni espacios (por ejemplo `villa-la-moraleja`). Su ficha estará en `/#villa-la-moraleja`.
2. Crea la carpeta `fotos/villa-la-moraleja/` y sube las fotos con los mismos nombres que pusiste en el bloque (`portada.jpg`, `salon.jpg`…).
3. Si a la casa le falta un apartado (planos, galería…), bórralo del bloque y esa sección no se mostrará. Si falta una foto, se ve un degradado con el nombre de la estancia en su lugar.

## Publicar en Vercel

En Vercel, crea un proyecto desde este repositorio:

- Root Directory: `inmobiliaria`
- Framework: Other
- Build Command: ninguno

Cada vez que subas cambios a GitHub, Vercel publica la nueva versión.
