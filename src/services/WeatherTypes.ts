/**
 * WeatherIcon - Tipo que define los iconos disponibles para representar el clima
 * 
 * Cada valor corresponde a un ícono que puedes usar en tu UI
 * para mostrar visualmente qué tipo de clima hace
 * 
 * Ejemplos:
 * - 'clear-day': Soleado durante el día
 * - 'clear-night': Despejado durante la noche
 * - 'rain': Lluvia
 * - 'thunderstorm': Tormenta eléctrica
 */
export type WeatherIcon =
    | 'clear-day'        // Cielo despejado durante el día
    | 'clear-night'      // Cielo despejado durante la noche
    | 'partly-cloudy-day'     // Parcialmente nublado durante el día
    | 'partly-cloudy-night'   // Parcialmente nublado durante la noche
    | 'cloudy'           // Nublado
    | 'rain'             // Lluvia
    | 'sleet'            // Aguanieve (mezcla de lluvia y nieve)
    | 'snow'             // Nieve
    | 'wind'             // Viento fuerte
    | 'fog'              // Niebla
    | 'hail'             // Granizo
    | 'thunderstorm';    // Tormenta eléctrica

/**
 * UnitGroup - Tipo que define los sistemas de unidades disponibles en la API
 * 
 * Determina en qué unidades se retornarán los datos:
 * - 'us': Sistema imperial (Fahrenheit, millas, mph)
 * - 'metric': Sistema métrico (Celsius, kilómetros, km/h)
 * - 'base': Sistema SI (Kelvin, metros, m/s)
 * 
 * Ejemplo:
 * Si usas 'metric', la temperatura estará en Celsius
 * Si usas 'us', la temperatura estará en Fahrenheit
 */
export type UnitGroup = 'us' | 'metric' | 'base';

