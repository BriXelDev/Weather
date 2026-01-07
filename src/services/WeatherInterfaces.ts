export interface WeatherResponse{
    queryCost: number;
    latitude: number;
    longitude: number;
    resolvedAddress: string;
    address: string;
    timezone: string;
    tzoffset: number;
    description: string;
    days: Day[];
    alerts: Alert[];
    stations: Record<string, Station>;
    currentConditions: CurrentConditions;
}

export interface Day{
    datetime: string;
    datetimeEpoch: number;
    tempmax: number;
    tempmin: number;
    temp: number;
    feelslikemax: number;
    feelslikemin: number;
    feelslike: number;
    dew: number;
    humidity: number;
    precip: number;
    precipprob: number;
    precipcover: number;
    snow: number;
    snowdepth: number;
    windgust: number;
    windspeed: number;
    winddir: number;
    pressure: number;
    cloudcover: number;
    visibility: number;
    solarradiation: number;
    solarenergy: number;
    uvindex: number;
    severerisk: number;
    sunrise: string;
    sunriseEpoch: number;
    sunset: string;
    sunsetEpoch: number;
    moonphase: number;
    conditions: string;
    description: string;
    icon: string;
    stations: string[];
    source: string;
    hours: Hour[];
}

export interface Hour {
    datetime: string;
    datetimeEpoch: number;
    temp: number;
    feelslike: number;
    dew: number;
    humidity: number;
    precip: number;
    precipprob: number;
    snow: number;
    snowdepth: number;
    windgust: number;
    windspeed: number;
    winddir: number;
    pressure: number;
    visibility: number;
    cloudcover: number;
    solarradiation: number;
    solarenergy: number;
    uvindex: number;
    severerisk: number;
    conditions: string;
    icon: string;
    stations: string[] | null;
    source: string;
}

export interface CurrentConditions {
    datetime: string;
    datetimeEpoch: number;
    temp: number;
    feelslike: number;
    humidity: number;
    dew: number;
    precip: number;
    precipprob: number;
    snow: number;
    snowdepth: number;
    preciptype: null | string[];
    windgust: null | number;
    windspeed: number;
    winddir: number;
    pressure: number;
    visibility: number;
    cloudcover: number;
    solarradiation: number;
    uvindex: number;
    conditions: string;
    icon: string;
    stations: string[] | null;
    source: string;
    sunrise: string;
    sunriseEpoch: number;
    sunset: string;
    sunsetEpoch: number;
    moonphase: number;
}

export interface Alert {
    [key: string]: any;
}

export interface Station {
    distance: number;
    latitude: number;
    longitude: number;
    useCount: number;
    id: string;
    name: string;
    quality: number;
    contribution: number;
}

export interface TimeLineParams {
    location: string;
    startDate?: string;
    endDate?: string;
    unitGroup?: 'us' | 'metric' | 'base';
    include?: 'current' | 'events' | 'fcst' | 'obs' | 'hours' | 'days' | 'alerts' | 'remote';
    elements?: string[];
    contentType?: 'json' | 'csv';
    key: string;
}

export interface TemperatureData {
  max: number;
  min: number;
  current: number;
  feelsLike: number;
}

export interface PrecipitationData {
  amount: number;
  probability: number;
  type: string[] | null;
  coverage: number;
}

export interface WindData {
  speed: number;
  gust: number;
  direction: number;
}