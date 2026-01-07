import type { WeatherResponse, TimeLineParams } from './WeatherInterfaces';

/**
 * URL base de la API de Visual Crossing Weather
 * Todos los endpoints se construyen a partir de esta URL
 * Formato: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}
 */
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

/**
 * Función para obtener datos de clima de Visual Crossing Weather API
 * 
 * @param params - Objeto con los parámetros necesarios (TimeLineParams)
 *   - location (requerido): Ubicación para la que se desea obtener el clima
 *     Ejemplo: "Mexico City, MX" o "New York, NY"
 *   - key (requerido): API Key para autenticarse en Visual Crossing
 *   - unitGroup (opcional): 'us' | 'metric' | 'base' - Sistema de unidades a usar
 *   - include (opcional): Tipo de datos a incluir (current, fcst, obs, hours, etc)
 *   - startDate (opcional): Fecha inicial en formato YYYY-MM-DD
 *   - endDate (opcional): Fecha final en formato YYYY-MM-DD
 *   - contentType (opcional): 'json' | 'csv' - Formato de respuesta
 *   - elements (opcional): Array de elementos específicos a obtener
 * 
 * @returns {Promise<WeatherResponse>} - Promise que resuelve con los datos del clima
 *   Incluye información sobre:
 *   - Clima actual (currentConditions)
 *   - Pronóstico por días (days)
 *   - Pronóstico por horas (hours)
 *   - Alertas de clima severo (alerts)
 *   - Información de estaciones (stations)
 * 
 * @throws {Error} - Si hay algún problema con la petición o en la API
 * 
 * Ejemplo de uso:
 * const weather = await getWeather({
 *   location: 'Mexico City, MX',
 *   key: 'TU_API_KEY',
 *   unitGroup: 'metric'
 * });
 */
export default async function getWeather(params: TimeLineParams): Promise<WeatherResponse> {
  try {
    // PASO 1: Crear objeto URLSearchParams para construir los query parameters
    // URLSearchParams se encarga de encodificar los parámetros correctamente
    const searchParams = new URLSearchParams();
    
    // PASO 2: Agregar parámetros requeridos
    // La API Key es obligatoria para autenticar la petición
    searchParams.append('key', params.key);
    
    // PASO 3: Agregar parámetros opcionales si están definidos
    // Solo se agregan si existen en los parámetros enviados
    if (params.unitGroup) searchParams.append('unitGroup', params.unitGroup);
    if (params.include) searchParams.append('include', params.include);
    if (params.startDate) searchParams.append('startDate', params.startDate);
    if (params.endDate) searchParams.append('endDate', params.endDate);
    if (params.contentType) searchParams.append('contentType', params.contentType);
    
    // Para elementos, si existen, se unen con comas en un solo parámetro
    if (params.elements && params.elements.length > 0) {
      searchParams.append('elements', params.elements.join(','));
    }

    // PASO 4: Construir URL completa
    // Ejemplo resultado: https://weather.visualcrossing.com/...timeline/Mexico City, MX?key=XXX&unitGroup=metric
    const url = `${BASE_URL}${params.location}?${searchParams.toString()}`;

    // PASO 5: Hacer la petición HTTP GET a la API
    // fetch es nativo del navegador y retorna una Promise
    const response = await fetch(url);
    
    // PASO 6: Validar que la respuesta sea exitosa
    // response.ok es true si el status es 200-299
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // PASO 7: Parsear la respuesta JSON
    // await espera a que se lea el body y se parsee el JSON
    const data: WeatherResponse = await response.json();
    
    // PASO 8: Retornar los datos tipados
    return data;
  } catch (error) {
    // Si hay algún error en cualquier punto, se captura y se loguea
    console.error('Error fetching weather data:', error);
    // Se lanza el error de nuevo para que el componente que usa esta función pueda manejarlo
    throw error;
  }
}