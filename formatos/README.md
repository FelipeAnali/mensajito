# Formatos digitales Cañaveral (prueba con QR)

App de una sola página para registrar temperaturas de neveras y cuartos fríos escaneando un QR.

- Publicada en: https://felipeanali.github.io/mensajito/formatos/
- Ejemplo de QR de un equipo: https://felipeanali.github.io/mensajito/formatos/?equipo=SC14-CBP-NEV-CON-01

## Dónde se guardan los datos

Para la prueba real, **el repositorio hace de base de datos**: todo queda en
`formatos/db.json` dentro de la rama `datos-formatos` (la app la crea sola la primera vez).
Así lo que se registra en un celular aparece en los demás celulares y en el computador.
Fotos y firmas quedan en `formatos/archivos/` de esa misma rama.

Si un equipo no está conectado, la app sigue funcionando en modo local (datos solo en ese navegador).

## Cómo conectar

1. Crear un token en GitHub: foto → **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**. Repository access: **solo `mensajito`**.
   Permissions → Repository → **Contents: Read and write**. Ponerle vencimiento corto (ej. 30 días).
2. En el computador abrir la app → entrar como **Felipe** → **Sistema** → **Base de datos en GitHub**
   → pegar el token → **Probar conexión** → **Conectar**. Si el repositorio no tiene datos, se suben
   los de demostración.
3. En **Sistema → Conectar otro celular** aparece un QR: cada celular lo escanea **una sola vez**.
4. Imprimir los QR de los equipos (**Equipos y QR → Hoja de QR**) y escanearlos con la cámara normal.

## Cuidado

- El QR de "Conectar otro celular" lleva el token: mostrarlo solo en pantalla, nunca imprimirlo.
  Si se pierde un celular, borrar el token en GitHub y crear uno nuevo.
- El repositorio es público: el archivo de datos se puede leer. Usar solo datos de prueba.
- Las reglas de permisos corren en el celular, no en GitHub. Para producción hace falta el servidor
  (la app ya tiene el espacio para conectarlo en Sistema → Conexión a servidor).
