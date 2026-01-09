import '../styles/Hero.css';
import { useState } from 'react';
import getWeather from '../services/WeatherService';
import type { WeatherResponse } from '../services/WeatherInterfaces';

/**
 * Componente Hero - Obtiene y muestra datos del clima
 * 
 * Este componente:
 * 1. Se monta en el DOM
 * 2. Hace una petición a la API de Visual Crossing para obtener datos del clima
 * 3. Maneja tres estados: cargando, error, o éxito
 * 4. Muestra los datos en formato JSON
 */
function Hero() {
    /**
     * ESTADO: weather
     * - Almacena los datos del clima obtenidos de la API
     * - Inicia como null porque no tenemos datos aún
     * - Cuando la petición termina, se llena con WeatherResponse
     */
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    
    /**
     * ESTADO: location
     * - Almacena el texto que el usuario ingresa en el campo de búsqueda
     * - Inicia como un string vacío
     * - Se actualiza cada vez que el usuario escribe en el input
     * - Se usa para hacer la petición a la API cuando se presiona el botón
     */
    const [location, setLocation] = useState('');
    
    /**
     * ESTADO: error
     * - Almacena el mensaje de error si la petición falla
     * - Inicia como null porque no hay error aún
     * - Se llena si hay un catch() en el try/catch
     */
    const [error, setError] = useState<string | null>(null);

    /**
     * FUNCIÓN: fetchWeather
     * - Es asíncrona porque va a esperar la respuesta de fetch
     * - Definida fuera de useEffect para poder usarla en múltiples lugares
     */
    const fetchWeather = async () => {
            try {
                /**
                 * PASO 1: Hacer la petición a la API
                 * Los parámetros son:
                 * - location: Ciudad y país para obtener el clima
                 * - key: API Key para autenticar (necesaria para la API)
                 * - unitGroup: 'metric' usa Celsius, 'us' usa Fahrenheit
                 */
                const data = await getWeather({
                    location: location,
                    key: 'WBSD3AJHFK6PB3WQS2AW29VBF',
                    unitGroup: 'metric',
                });
                
                /**
                 * PASO 2: Si la petición es exitosa, guardar los datos en el estado
                 * Esto dispara un re-render del componente con los nuevos datos
                 */
                setWeather(data);
            } catch (err) {
                /**
                 * PASO 3: Si hay un error, capturarlo y guardarlo en el estado
                 * Verificamos si es una instancia de Error para obtener el mensaje
                 * Si no es, ponemos un mensaje genérico
                 */
                setError(err instanceof Error ? err.message : 'Error desconocido');
            }
    };

    /**
     * FUNCIÓN: getCurrentHourInfo
     * - Obtiene la temperatura actual (o la más cercana a "ahora")
     * - Busca en tres fuentes en este orden:
     *   1. La hora más cercana a la actual en el array de horas
     *   2. Las condiciones actuales (currentConditions)
     *   3. La temperatura del primer día
     * - Devuelve un objeto con:
     *   - temp: la temperatura encontrada o null
     *   - epoch: el timestamp unix de cuándo es esa temperatura
     *   - source: de dónde se obtuvo ('hour', 'currentConditions', 'day', o 'none')
     */
    const getCurrentHourInfo = (w: WeatherResponse | null) => {
  /**
   * VALIDACIÓN INICIAL
   * Si el parámetro 'w' (weather) es null o undefined, devolvemos un objeto vacío
   * 'as const' hace que los strings literales sean tipos exactos ('none', no string)
   * Esto permite al TypeScript diferenciar entre diferentes fuentes de datos
   */
  if (!w) return { temp: null as number | null, epoch: null as number | null, source: 'none' as const };

  /**
   * OBTENER HORA ACTUAL EN FORMATO UNIX (EPOCH)
   * Date.now() devuelve milisegundos desde 1970
   * Al dividir entre 1000, convertimos a segundos (formato que usa la API)
   * Math.floor() redondea hacia abajo para obtener un número entero
   * Ejemplo: 1704825600 segundos = 9 enero 2026
   */
  const nowEpoch = Math.floor(Date.now() / 1000);

  /**
   * VARIABLE PARA RASTREAR LA HORA MÁS CERCANA
   * Almacena el objeto con la hora cuya diferencia con "ahora" es menor
   * Inicia como null porque aún no hemos encontrado nada
   * Estructura:
   * - temp: temperatura de esa hora
   * - diff: diferencia en segundos con la hora actual
   * - epoch: el timestamp de esa hora
   */
  let closest: { temp: number; diff: number; epoch: number } | null = null;

  /**
   * BUCLE EXTERNO: RECORRER TODOS LOS DÍAS
   * w.days ?? [] significa: si w.days existe, úsalo; si no, usa un array vacío []
   * Esto evita errores si days es null o undefined
   */
  for (const day of w.days ?? []) {
    /**
     * BUCLE INTERNO: RECORRER TODAS LAS HORAS DE CADA DÍA
     * (day as any).hours
     * - '(day as any)' ignora el tipo TypeScript (casting forzado)
     * - Esto se hace porque 'day' podría no tener la propiedad 'hours' en el tipo
     * - hours ?? [] = si hours existe, úsalo; si no, array vacío
     */
    for (const h of (day as any).hours ?? []) {
      /**
       * OBTENER EL EPOCH DE ESTA HORA
       * typeof h?.datetimeEpoch === 'number' ? h.datetimeEpoch : null
       * - h?.datetimeEpoch = optional chaining: accede solo si h existe
       * - typeof === 'number' verifica que sea un número válido
       * - Si es número, úsalo; si no, devuelve null
       * - Esto protege contra datos inválidos o undefined
       */
      const hEpoch = typeof h?.datetimeEpoch === 'number' ? h.datetimeEpoch : null;
      
      /**
       * VALIDACIÓN: SALTAR ESTA HORA SI NO TIENE EPOCH VÁLIDO
       * continue = salta al siguiente item del bucle (ignora el resto del código)
       */
      if (hEpoch === null) continue;
      
      /**
       * CALCULAR DIFERENCIA CON LA HORA ACTUAL
       * Math.abs() convierte el número a su valor absoluto (siempre positivo)
       * Ejemplo:
       * - Si nowEpoch = 1704825600 y hEpoch = 1704825300
       * - diff = Math.abs(1704825300 - 1704825600) = 300 segundos (5 minutos)
       */
      const diff = Math.abs(hEpoch - nowEpoch);
      
      /**
       * ACTUALIZAR LA HORA MÁS CERCANA SI ESTA ES MEJOR
       * !closest || diff < closest.diff significa:
       * - Si 'closest' aún es null (primera hora), guardar esta
       * - O si esta hora está más cerca (diff es menor), reemplazar
       * 
       * Ejemplo: Si closest.diff = 300 y diff = 100, actualizar
       * porque 100 segundos de diferencia es mejor que 300
       */
      if (!closest || diff < closest.diff) closest = { temp: h.temp, diff, epoch: hEpoch };
    }
  }

  /**
   * INTENTO 1: USAR LA HORA MÁS CERCANA
   * Si encontramos una hora en el bucle anterior, usarla
   * Devolvemos source: 'hour' para indicar que la temperatura es de una hora específica
   */
  if (closest) return { temp: closest.temp, epoch: closest.epoch, source: 'hour' as const };

  /**
   * INTENTO 2: USAR LAS CONDICIONES ACTUALES
   * Si no hay horas disponibles, intentamos con currentConditions (datos en vivo)
   * typeof ... === 'number' verifica que temp sea un número válido
   * ?? null = si datetimeEpoch no existe, devolver null
   * source: 'currentConditions' indica que es un dato actual
   */
  if (typeof w.currentConditions?.temp === 'number') {
    return { temp: w.currentConditions.temp, epoch: w.currentConditions.datetimeEpoch ?? null, source: 'currentConditions' as const };
  }

  /**
   * INTENTO 3: USAR LA TEMPERATURA DEL PRIMER DÍA
   * Opción más genérica: la temperatura promedio del primer día
   * typeof ... === 'number' verifica validez
   * epoch: null porque no tenemos una hora específica
   * source: 'day' indica que es una temperatura de todo el día
   */
  if (typeof w.days?.[0]?.temp === 'number') {
    return { temp: w.days[0].temp, epoch: null, source: 'day' as const };
  }

  /**
   * FALLBACK FINAL: NO HAY DATOS
   * Si llegamos aquí, no pudimos obtener temperatura de ninguna fuente
   * Devolvemos null para todo
   * source: 'none' indica que no hay datos disponibles
   */
  return { temp: null, epoch: null, source: 'none' as const };
};

    /**
     * RENDERIZADO
     * La interfaz muestra:
     * 1. Encabezado con el nombre de la ciudad resuelta (resolvedAddress)
     * 2. Barra de búsqueda: input para ingresar ubicación y botón para buscar
     * 3. Mensaje de error (si hay alguno)
     * 4. Datos del clima (si la búsqueda fue exitosa):
     *    - Temperatura actual (de la hora más cercana a "ahora")
     *    - Hora a la que corresponde esa temperatura
     *    - Temperatura máxima del día
     *    - Temperatura mínima del día
     *    - Condiciones climáticas (nublado, soleado, etc.)
     *    - Velocidad del viento
     *    - Porcentaje de lluvia
     */
    return (
    <div className="weather-container">
        <h1 className="weather-header">🌤️ Clima en {weather?.resolvedAddress}</h1>
        <div className="weather-search">
            <h4>&copy; BriXelDev 2026</h4>
            <input 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder= 'Ingresa Ciudad, Pais. Ej: Mexico City, MX'
            />
            <button onClick={() => fetchWeather()}>Buscar</button>
        </div>

        {error && <p className="weather-error">❌ Error: {error}</p>}

{weather && (() => {
  const info = getCurrentHourInfo(weather);
  const tempDisplay = info.temp !== null ? `${info.temp}°C` : '—';
  const timeDisplay = info.epoch ? new Date(info.epoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—';
  const sourceLabel = info.source === 'hour' ? 'hora' : info.source === 'currentConditions' ? 'currentConditions' : info.source === 'day' ? 'día' : '—';

  return (
    <div className="weather-data-container">
      <div className="weather-data-item">
        <span className="weather-data-label">🌡️ Temperatura</span>
        <span className="weather-data-value">{tempDisplay}</span>
      </div>

      <div className="weather-data-item">
        <span className="weather-data-label">⏱️ Hora</span>
        <span className="weather-data-value">{timeDisplay} ({sourceLabel})</span>
      </div>

      <div className="weather-data-item">
        <span className="weather-data-label">📈 Máxima</span>
        <span className="weather-data-value">{weather.days[0]?.tempmax}°C</span>
      </div>

      <div className="weather-data-item">
        <span className="weather-data-label">📉 Mínima</span>
        <span className="weather-data-value">{weather.days[0]?.tempmin}°C</span>
      </div>

      <div className="weather-data-item">
        <span className="weather-data-label">☁️ Condiciones</span>
        <span className="weather-data-value">{weather.days[0]?.conditions}</span>
      </div>

      <div className="weather-data-item">
        <span className="weather-data-label">💨 Viento</span>
        <span className="weather-data-value">{weather.currentConditions?.windspeed} km/h</span>
      </div>

      <div className="weather-data-item">
        <span className="weather-data-label">🌧️ Lluvia</span>
        <span className="weather-data-value">{weather.days[0]?.precip} %</span>
      </div>
    </div>
  );
})()}
    </div>
  );
}

export default Hero;