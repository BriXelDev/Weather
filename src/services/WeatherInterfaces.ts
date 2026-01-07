/**
 * WeatherResponse - Interfaz principal que contiene toda la respuesta de la API
 * Esta es la estructura que retorna Visual Crossing cuando pides datos del clima
 */
export interface WeatherResponse{
    /**
     * queryCost: Cantidad de puntos API gastados en esta petición
     * Cada petición tiene un costo en puntos
     */
    queryCost: number;
    
    /**
     * latitude: Latitud de la ubicación
     * Rango: -90 a 90
     */
    latitude: number;
    
    /**
     * longitude: Longitud de la ubicación
     * Rango: -180 a 180
     */
    longitude: number;
    
    /**
     * resolvedAddress: Dirección resuelta (formateada por la API)
     * Ejemplo: "Mexico City, Mexico"
     */
    resolvedAddress: string;
    
    /**
     * address: Dirección tal como la escribiste
     * Ejemplo: "Mexico City, MX"
     */
    address: string;
    
    /**
     * timezone: Zona horaria de la ubicación
     * Ejemplo: "America/Mexico_City"
     */
    timezone: string;
    
    /**
     * tzoffset: Desviación horaria en horas respecto a UTC
     * Ejemplo: -6 para Mexico City en invierno
     */
    tzoffset: number;
    
    /**
     * description: Descripción general de las condiciones climáticas
     */
    description: string;
    
    /**
     * days: Array con datos diarios del pronóstico
     * Cada elemento es un día con información detallada
     */
    days: Day[];
    
    /**
     * alerts: Array de alertas de clima severo
     * Vacío si no hay alertas
     */
    alerts: Alert[];
    
    /**
     * stations: Objeto con información de estaciones meteorológicas usadas
     * Key: ID de la estación, Value: datos de la estación
     */
    stations: Record<string, Station>;
    
    /**
     * currentConditions: Condiciones climáticas actuales
     * Incluye temperatura, viento, humedad, etc. del momento
     */
    currentConditions: CurrentConditions;
}

/**
 * Day - Interfaz que representa datos climáticos de un día
 * Incluye información resumida del día y pronóstico por horas
 */
export interface Day{
    /**
     * datetime: Fecha del pronóstico en formato YYYY-MM-DD
     * Ejemplo: "2026-01-07"
     */
    datetime: string;
    
    /**
     * datetimeEpoch: Fecha en formato Unix timestamp (segundos desde 1970-01-01)
     */
    datetimeEpoch: number;
    
    /**
     * tempmax: Temperatura máxima del día en grados
     * Unidad depende del unitGroup usado (Celsius o Fahrenheit)
     */
    tempmax: number;
    
    /**
     * tempmin: Temperatura mínima del día
     */
    tempmin: number;
    
    /**
     * temp: Temperatura promedio del día
     */
    temp: number;
    
    /**
     * feelslikemax: Sensación térmica máxima (temperatura con efecto viento)
     */
    feelslikemax: number;
    
    /**
     * feelslikemin: Sensación térmica mínima
     */
    feelslikemin: number;
    
    /**
     * feelslike: Sensación térmica promedio
     */
    feelslike: number;
    
    /**
     * dew: Punto de rocío (temperatura a la que se forma rocío)
     */
    dew: number;
    
    /**
     * humidity: Humedad relativa en porcentaje (0-100)
     */
    humidity: number;
    
    /**
     * precip: Precipitación total en milímetros
     */
    precip: number;
    
    /**
     * precipprob: Probabilidad de precipitación en porcentaje (0-100)
     */
    precipprob: number;
    
    /**
     * precipcover: Porcentaje de cobertura de precipitación
     */
    precipcover: number;
    
    /**
     * snow: Acumulación de nieve en milímetros
     */
    snow: number;
    
    /**
     * snowdepth: Profundidad de nieve acumulada
     */
    snowdepth: number;
    
    /**
     * windgust: Velocidad máxima del viento en ráfagas
     */
    windgust: number;
    
    /**
     * windspeed: Velocidad promedio del viento
     */
    windspeed: number;
    
    /**
     * winddir: Dirección del viento en grados (0-360)
     * 0° = Norte, 90° = Este, 180° = Sur, 270° = Oeste
     */
    winddir: number;
    
    /**
     * pressure: Presión atmosférica en mbar
     */
    pressure: number;
    
    /**
     * cloudcover: Cobertura de nubes en porcentaje (0-100)
     */
    cloudcover: number;
    
    /**
     * visibility: Visibilidad en kilómetros
     */
    visibility: number;
    
    /**
     * solarradiation: Radiación solar en W/m²
     */
    solarradiation: number;
    
    /**
     * solarenergy: Energía solar total en MJ/m²
     */
    solarenergy: number;
    
    /**
     * uvindex: Índice UV (0-16+)
     * 0-2 = Bajo, 3-5 = Moderado, 6-7 = Alto, 8-10 = Muy Alto, 11+ = Extremo
     */
    uvindex: number;
    
    /**
     * severerisk: Riesgo de clima severo (0-1)
     */
    severerisk: number;
    
    /**
     * sunrise: Hora de salida del sol en formato HH:MM:SS
     */
    sunrise: string;
    
    /**
     * sunriseEpoch: Hora de salida del sol en Unix timestamp
     */
    sunriseEpoch: number;
    
    /**
     * sunset: Hora de puesta del sol en formato HH:MM:SS
     */
    sunset: string;
    
    /**
     * sunsetEpoch: Hora de puesta del sol en Unix timestamp
     */
    sunsetEpoch: number;
    
    /**
     * moonphase: Fase lunar (0-1)
     * 0 = Luna nueva, 0.25 = Cuarto creciente, 0.5 = Luna llena, 0.75 = Cuarto menguante
     */
    moonphase: number;
    
    /**
     * conditions: Resumen de condiciones (clear, cloudy, rain, snow, etc)
     */
    conditions: string;
    
    /**
     * description: Descripción detallada de las condiciones del día
     */
    description: string;
    
    /**
     * icon: Icono a usar para representar el clima
     * Ejemplo: "rain", "clear-day", "cloud", etc
     */
    icon: string;
    
    /**
     * stations: Array con IDs de estaciones meteorológicas usadas
     */
    stations: string[];
    
    /**
     * source: Fuente de los datos (forecast, observations, etc)
     */
    source: string;
    
    /**
     * hours: Array con datos por hora del día
     * Cada hora tiene temperatura, viento, humedad, etc
     */
    hours: Hour[];
}

/**
 * Hour - Interfaz que representa datos climáticos de una hora específica
 * Datos más detallados a nivel horario
 */
export interface Hour {
    /**
     * datetime: Fecha y hora en formato YYYY-MM-DDTHH:MM:SS
     * Ejemplo: "2026-01-07T14:00:00"
     */
    datetime: string;
    
    /**
     * datetimeEpoch: Fecha y hora en Unix timestamp
     */
    datetimeEpoch: number;
    
    /**
     * temp: Temperatura en la hora especificada
     */
    temp: number;
    
    /**
     * feelslike: Sensación térmica (con efecto del viento)
     */
    feelslike: number;
    
    /**
     * dew: Punto de rocío
     */
    dew: number;
    
    /**
     * humidity: Humedad relativa en porcentaje
     */
    humidity: number;
    
    /**
     * precip: Precipitación en milímetros durante esta hora
     */
    precip: number;
    
    /**
     * precipprob: Probabilidad de precipitación en esta hora
     */
    precipprob: number;
    
    /**
     * snow: Nieve acumulada en esta hora
     */
    snow: number;
    
    /**
     * snowdepth: Profundidad de nieve
     */
    snowdepth: number;
    
    /**
     * windgust: Velocidad máxima de viento en ráfagas
     */
    windgust: number;
    
    /**
     * windspeed: Velocidad del viento
     */
    windspeed: number;
    
    /**
     * winddir: Dirección del viento en grados
     */
    winddir: number;
    
    /**
     * pressure: Presión atmosférica
     */
    pressure: number;
    
    /**
     * visibility: Visibilidad en kilómetros
     */
    visibility: number;
    
    /**
     * cloudcover: Cobertura de nubes en porcentaje
     */
    cloudcover: number;
    
    /**
     * solarradiation: Radiación solar
     */
    solarradiation: number;
    
    /**
     * solarenergy: Energía solar
     */
    solarenergy: number;
    
    /**
     * uvindex: Índice UV
     */
    uvindex: number;
    
    /**
     * severerisk: Riesgo de clima severo
     */
    severerisk: number;
    
    /**
     * conditions: Resumen de condiciones (clear, cloudy, rain, snow, etc)
     */
    conditions: string;
    
    /**
     * icon: Icono a usar para representar el clima
     */
    icon: string;
    
    /**
     * stations: Array con IDs de estaciones (null si no hay datos)
     */
    stations: string[] | null;
    
    /**
     * source: Fuente de los datos
     */
    source: string;
}

/**
 * CurrentConditions - Interfaz que representa las condiciones climáticas ACTUALES
 * Datos en tiempo real del clima en este momento
 */
export interface CurrentConditions {
    /**
     * datetime: Fecha y hora actual en formato YYYY-MM-DDTHH:MM:SS
     */
    datetime: string;
    
    /**
     * datetimeEpoch: Fecha y hora actual en Unix timestamp
     */
    datetimeEpoch: number;
    
    /**
     * temp: Temperatura actual
     */
    temp: number;
    
    /**
     * feelslike: Sensación térmica actual
     */
    feelslike: number;
    
    /**
     * humidity: Humedad actual en porcentaje
     */
    humidity: number;
    
    /**
     * dew: Punto de rocío
     */
    dew: number;
    
    /**
     * precip: Precipitación (si la hay)
     */
    precip: number;
    
    /**
     * precipprob: Probabilidad de precipitación
     */
    precipprob: number;
    
    /**
     * snow: Nieve (si la hay)
     */
    snow: number;
    
    /**
     * snowdepth: Profundidad de nieve
     */
    snowdepth: number;
    
    /**
     * preciptype: Tipo de precipitación (rain, snow, sleet, etc) o null si no hay
     */
    preciptype: null | string[];
    
    /**
     * windgust: Velocidad máxima de viento en ráfagas (null si no hay datos)
     */
    windgust: null | number;
    
    /**
     * windspeed: Velocidad actual del viento
     */
    windspeed: number;
    
    /**
     * winddir: Dirección del viento en grados
     */
    winddir: number;
    
    /**
     * pressure: Presión atmosférica
     */
    pressure: number;
    
    /**
     * visibility: Visibilidad actual
     */
    visibility: number;
    
    /**
     * cloudcover: Cobertura de nubes
     */
    cloudcover: number;
    
    /**
     * solarradiation: Radiación solar actual
     */
    solarradiation: number;
    
    /**
     * uvindex: Índice UV actual
     */
    uvindex: number;
    
    /**
     * conditions: Resumen de condiciones actuales
     */
    conditions: string;
    
    /**
     * icon: Icono a usar para representar el clima actual
     */
    icon: string;
    
    /**
     * stations: Array con IDs de estaciones (null si no hay datos)
     */
    stations: string[] | null;
    
    /**
     * source: Fuente de los datos
     */
    source: string;
    
    /**
     * sunrise: Hora de salida del sol
     */
    sunrise: string;
    
    /**
     * sunriseEpoch: Hora de salida del sol en Unix timestamp
     */
    sunriseEpoch: number;
    
    /**
     * sunset: Hora de puesta del sol
     */
    sunset: string;
    
    /**
     * sunsetEpoch: Hora de puesta del sol en Unix timestamp
     */
    sunsetEpoch: number;
    
    /**
     * moonphase: Fase lunar
     */
    moonphase: number;
}

/**
 * Alert - Interfaz para alertas de clima severo
 * Puede contener cualquier información según el tipo de alerta
 */
export interface Alert {
    [key: string]: any;
}

/**
 * Station - Interfaz que representa una estación meteorológica
 * Contiene información sobre ubicación y calidad de datos
 */
export interface Station {
    /**
     * distance: Distancia a la estación en kilómetros
     */
    distance: number;
    
    /**
     * latitude: Latitud de la estación
     */
    latitude: number;
    
    /**
     * longitude: Longitud de la estación
     */
    longitude: number;
    
    /**
     * useCount: Cantidad de veces que se usaron datos de esta estación
     */
    useCount: number;
    
    /**
     * id: ID único de la estación
     */
    id: string;
    
    /**
     * name: Nombre de la estación meteorológica
     */
    name: string;
    
    /**
     * quality: Calidad de los datos en escala 0-1
     */
    quality: number;
    
    /**
     * contribution: Contribución de esta estación al pronóstico en porcentaje
     */
    contribution: number;
}

/**
 * TimeLineParams - Interfaz con los parámetros para hacer una petición a la API
 * Define qué datos queremos obtener y de qué ubicación
 */
export interface TimeLineParams {
    /**
     * location (REQUERIDO): Ubicación para obtener el clima
     * Ejemplos: "Mexico City, MX", "New York, NY", "London"
     * La API es flexible con el formato
     */
    location: string;
    
    /**
     * startDate (OPCIONAL): Fecha inicial del rango en formato YYYY-MM-DD
     * Si no se proporciona, obtiene el pronóstico actual
     * Ejemplo: "2026-01-07"
     */
    startDate?: string;
    
    /**
     * endDate (OPCIONAL): Fecha final del rango en formato YYYY-MM-DD
     * Si no se proporciona, obtiene datos para hoy y mañana
     * Ejemplo: "2026-01-14"
     */
    endDate?: string;
    
    /**
     * unitGroup (OPCIONAL): Sistema de unidades
     * 'us': Fahrenheit, millas, mph (por defecto)
     * 'metric': Celsius, kilómetros, km/h
     * 'base': Kelvin, metros, m/s
     */
    unitGroup?: 'us' | 'metric' | 'base';
    
    /**
     * include (OPCIONAL): Qué tipo de datos incluir en la respuesta
     * Ejemplos:
     * 'current': Solo condiciones actuales
     * 'fcst': Pronóstico
     * 'obs': Observaciones históricas
     * 'hours': Datos por hora
     * 'days': Datos por día
     * 'alerts': Alertas de clima severo
     */
    include?: 'current' | 'events' | 'fcst' | 'obs' | 'hours' | 'days' | 'alerts' | 'remote';
    
    /**
     * elements (OPCIONAL): Elementos específicos a obtener
     * Si se omite, se obtienen todos
     * Ejemplos: ['temp', 'humidity', 'windspeed']
     */
    elements?: string[];
    
    /**
     * contentType (OPCIONAL): Formato de la respuesta
     * 'json': Respuesta en JSON (por defecto)
     * 'csv': Respuesta en formato CSV
     */
    contentType?: 'json' | 'csv';
    
    /**
     * key (REQUERIDO): API Key para autenticarse
     * Obtén la tuya en https://www.visualcrossing.com/
     * Cada petición gasta puntos según el plan
     */
    key: string;
}

/**
 * TemperatureData - Interfaz auxiliar para datos de temperatura
 * Útil para mostrar temperatura de forma simple en la UI
 */
export interface TemperatureData {
  /**
   * max: Temperatura máxima
   */
  max: number;
  
  /**
   * min: Temperatura mínima
   */
  min: number;
  
  /**
   * current: Temperatura actual
   */
  current: number;
  
  /**
   * feelsLike: Sensación térmica
   */
  feelsLike: number;
}

/**
 * PrecipitationData - Interfaz auxiliar para datos de precipitación
 * Útil para mostrar lluvia/nieve de forma simple
 */
export interface PrecipitationData {
  /**
   * amount: Cantidad de precipitación en milímetros
   */
  amount: number;
  
  /**
   * probability: Probabilidad de precipitación en porcentaje
   */
  probability: number;
  
  /**
   * type: Tipo de precipitación (rain, snow, sleet, etc) o null
   */
  type: string[] | null;
  
  /**
   * coverage: Cobertura de precipitación en porcentaje
   */
  coverage: number;
}

/**
 * WindData - Interfaz auxiliar para datos de viento
 * Útil para mostrar viento de forma simple
 */
export interface WindData {
  /**
   * speed: Velocidad del viento
   */
  speed: number;
  
  /**
   * gust: Velocidad máxima en ráfagas
   */
  gust: number;
  
  /**
   * direction: Dirección en grados (0-360)
   */
  direction: number;
}