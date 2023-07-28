import axios from "axios"


export interface IWeatherApi {
    main: {
        temp: number
        feels_like: number
        humidity: number
    }
    sys: {
        country: string
    }
    weather: [{
        main: string
        description: string
        icon: string
    }]
    wind: {
        speed: number
        deg: number
        gust: number
    }
    coord: {
        lon: number
        lat: number
    }
    visibility: number
}

export interface IWeatherOneCallApi {
    lat: number
    lon: number
    current: {
        dt: number
        dew_point: number
    }
}

export const WeaterApi = async (name: string) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=70e1ed322b02acbc57d443dd91065f3e`)
    return response.data
}

export const WeaterApiCallOne = async (ion: number | undefined, lat: number | undefined) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${ion}&exclude&appid=70e1ed322b02acbc57d443dd91065f3e`)
    return response.data
}