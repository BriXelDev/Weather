# 🌤️ Weather App

Una aplicación web moderna para consultar el clima en cualquier ciudad del mundo. Construida con React, TypeScript y Vite.

## 🌐 Demo en Vivo

Accede a la aplicación aquí: https://mellifluous-figolla-5d5016.netlify.app/

## ✨ Características

- 🔍 **Búsqueda de clima** - Ingresa cualquier ciudad y país para obtener datos del clima
- 🌡️ **Temperatura actual** - Muestra la temperatura más cercana a la hora actual
- 📈 📉 **Máximas y mínimas** - Obtén las temperaturas máximas y mínimas del día
- ☁️ **Condiciones climáticas** - Visualiza el estado del clima (nublado, soleado, lluvia, etc.)
- 💨 **Velocidad del viento** - Consulta la velocidad del viento en km/h
- 🌧️ **Probabilidad de lluvia** - Porcentaje de lluvia esperada
- ⏱️ **Hora precisa** - Muestra la hora exacta a la que corresponde la temperatura
- 📱 **Responsive** - Funciona perfectamente en dispositivos móviles y de escritorio

## 🛠️ Tecnologías Utilizadas

- **React** - Librería para construir la interfaz de usuario
- **TypeScript** - Lenguaje tipado para JavaScript
- **Vite** - Herramienta de construcción rápida para aplicaciones web
- **CSS3** - Estilos personalizados para una interfaz atractiva
- **API Visual Crossing** - Servicio para obtener datos del clima

## 📦 Requisitos

- Node.js 16+ 
- npm o yarn

## 🚀 Instalación y Uso Local

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd Weather
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### 4. Construir para producción
```bash
npm run build
```

### 5. Vista previa del build
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
Weather/
├── public/                    # Archivos estáticos
├── src/
│   ├── assets/               # Imágenes y recursos
│   ├── components/
│   │   └── Hero.tsx          # Componente principal de la app
│   ├── services/
│   │   ├── WeatherService.ts # Lógica para obtener datos del clima
│   │   ├── WeatherInterfaces.ts # Tipos e interfaces
│   │   └── WeatherTypes.ts   # Tipos adicionales
│   ├── styles/
│   │   └── Hero.css          # Estilos del componente Hero
│   ├── App.tsx               # Componente raíz
│   ├── App.css               # Estilos globales
│   ├── index.css             # Estilos base
│   └── main.tsx              # Punto de entrada
├── index.html                # Archivo HTML principal
├── vite.config.ts            # Configuración de Vite
├── tsconfig.json             # Configuración de TypeScript
├── package.json              # Dependencias del proyecto
└── README.md                 # Este archivo
```

## 🔑 Variables de Ambiente

La aplicación utiliza una API Key de Visual Crossing para acceder a los datos del clima. 

**Nota:** La API Key está incluida en el código (no es una práctica recomendada para producción). Para un proyecto real, deberías:

1. Crear un archivo `.env.local` con:
```
VITE_WEATHER_API_KEY=tu_api_key_aqui
```

2. Actualizar el componente `Hero.tsx` para usar:
```typescript
key: import.meta.env.VITE_WEATHER_API_KEY,
```

## 🎯 Cómo Usar la Aplicación

1. **Ingresa una ubicación** - Escribe la ciudad y país (ej: "Mexico City, MX")
2. **Presiona Buscar** - Haz clic en el botón "Buscar"
3. **Visualiza los datos** - Los datos del clima aparecerán automáticamente
4. **Consulta la información** - Revisa temperatura, viento, lluvia y más

### Ejemplos de Búsqueda

- `Madrid, ES`
- `Tokyo, JP`
- `New York, US`
- `Sydney, AU`
- `Buenos Aires, AR`

## 🐛 Manejo de Errores

La aplicación maneja automáticamente:
- Ubicaciones no encontradas
- Errores de conexión a la API
- Datos incompletos o inválidos

Los errores se muestran con un mensaje claro en la interfaz.

## 🎨 Personalización

### Cambiar Unidades de Temperatura

En el archivo `src/components/Hero.tsx`, modifica la línea:

```typescript
unitGroup: 'metric', // 'metric' para Celsius, 'us' para Fahrenheit
```

### Personalizar Estilos

Los estilos se encuentran en:
- `src/styles/Hero.css` - Estilos del componente principal
- `src/App.css` - Estilos globales
- `src/index.css` - Estilos base

## 📚 Documentación del Código

El código incluye comentarios detallados explicando:

- **Estados de React** - Qué almacena cada `useState`
- **Funciones principales** - Lógica de cada función
- **Flujo de datos** - Cómo fluyen los datos en la aplicación
- **Lógica de la API** - Cómo se obtienen y procesan los datos del clima

Cada parte del código está bien documentada para facilitar el aprendizaje y el mantenimiento.

## 🚢 Deploy

La aplicación está desplegada en **Netlify** y se actualiza automáticamente con cada push a la rama principal.

**URL en vivo:** https://mellifluous-figolla-5d5016.netlify.app/

### Deploy Manual en Netlify

1. Ejecuta `npm run build`
2. Ve a [Netlify](https://netlify.com)
3. Crea una nueva cuenta o inicia sesión
4. Arrastra la carpeta `dist/` generada, o conecta tu repositorio de GitHub
5. ¡Listo! Tu app estará en línea

## 🔗 Enlaces Útiles

- [Documentación de React](https://react.dev)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Vite](https://vitejs.dev)
- [API Visual Crossing](https://www.visualcrossing.com/weather-api)
- [Documentación de Netlify](https://docs.netlify.com)

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**BriXelDev** © 2026

---

**¿Preguntas o sugerencias?** Abre un issue o contacta al autor.
