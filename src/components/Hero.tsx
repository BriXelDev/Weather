import '../styles/Hero.css';
import { useEffect, useState } from 'react';
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
     * ESTADO: loading
     * - Inicia como true porque estamos esperando los datos
     * - Se pone en false cuando termina la petición (exitosa o con error)
     * - Se usa para mostrar "Cargando..." mientras esperamos
     */
    const [loading, setLoading] = useState(true);
    
    /**
     * ESTADO: error
     * - Almacena el mensaje de error si la petición falla
     * - Inicia como null porque no hay error aún
     * - Se llena si hay un catch() en el try/catch
     */
    const [error, setError] = useState<string | null>(null);

    /**
     * EFECTO: useEffect
     * - Se ejecuta una sola vez cuando el componente se monta ([] significa dependencias vacías)
     * - Aquí es donde hacemos la petición a la API
     * - Sin el array vacío [], se ejecutaría en cada render y tendríamos requests infinitos
     */
    useEffect(() => {
        /**
         * FUNCIÓN: fetchWeather
         * - Es asíncrona porque va a esperar la respuesta de fetch
         * - Está dentro de useEffect porque useEffect no puede ser async directamente
         * - Por eso la definimos adentro y la llamamos inmediatamente
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
                    location: 'Mexico City, MX',
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
            } finally {
                /**
                 * PASO 4: Independientemente del resultado, dejar de cargar
                 * El finally se ejecuta siempre, ya sea que haya error o no
                 * Esto detiene el mensaje de "Cargando..."
                 */
                setLoading(false);
            }
        };

        // Llamar la función asíncrona
        fetchWeather();
    }, []); // Array vacío = ejecutar solo una vez cuando el componente se monta

    /**
     * RENDERIZADO 1: Mientras está cargando
     * Mostramos un mensaje de carga si loading es true
     */
    if (loading) return <div><h1>Clima en CDMX</h1><p>Cargando...</p></div>;
    
    /**
     * RENDERIZADO 2: Si hay error
     * Mostramos el mensaje de error si error no es null
     */
    if (error) return <div><h1>Clima en CDMX</h1><p>Error: {error}</p></div>;

    /**
     * RENDERIZADO 3: Si todo va bien
     * weather no es null aquí, así que mostramos los datos
     * JSON.stringify() convierte el objeto a texto JSON
     * null y 2 son parámetros para hacer el JSON legible (indentado)
     */
    return (
        <div>
            <h1>Clima en CDMX</h1>
            <pre>
                <code>
                    {JSON.stringify(weather, null, 2)}
                </code>
            </pre>
        </div>
    );
}

export default Hero;