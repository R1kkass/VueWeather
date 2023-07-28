<template>
    <div v-if="weather && callone" class="Weather">
        <div class="Weather__name">
            <p>
                {{ name }},
                {{ weather?.sys.country }}
            </p>
        </div>
        <div class="Weather__mainInfo">
            <img
                :src="`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`"
            />
            <p>{{ Math.round(Number(weather?.main.temp) - 273.15) }} °C</p>
        </div>
        <div class="Weather__secondaryInfo">
            <p>
                Feels like
                {{ weather && Math.round(weather?.main.feels_like - 273.15) }}
                °C.
                {{ weather?.weather[0].main }}
                {{ toUpper(String(weather?.weather[0].main)) }}.
                {{ toUpper(String(weather?.weather[0].description)) }}
            </p>
        </div>
        <div class="Weather__grid">
            <div>
                <img src="../../assets/cursor.svg" />
                <p>{{ weather?.wind.speed }}m/s</p>
            </div>
            <div></div>
            <div>
                <p>Humidity: {{ weather?.main.humidity }}%</p>
            </div>
            <div>
                <p>
                    Dew point:
                    {{ Math.floor(Number(callone?.current.dew_point)) }} °C
                </p>
            </div>
            <div>
                <p>
                    Visibility:
                    {{ (Number(weather?.visibility) / 1000).toFixed(1) }}km
                </p>
            </div>
        </div>
    </div>
    <div v-else class="WeatherLoading Weather"></div>
</template>

<script setup lang="ts">
import {
    IWeatherApi,
    WeaterApi,
    IWeatherOneCallApi,
    WeaterApiCallOne,
} from "../../app/api/WeatherApi";
import { ref, Ref, onMounted } from "vue";
import { toUpper } from "../../app/utils/toUpper";

const weather: Ref<IWeatherApi | undefined> = ref();
const callone: Ref<IWeatherOneCallApi | undefined> = ref();

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    weather.value = await WeaterApi(props.name);
    callone.value = await WeaterApiCallOne(
        weather.value?.coord.lon,
        weather.value?.coord.lat
    );
});
</script>

<style lang="scss">
@keyframes loading {
    0% {
        background-position: 0px 0px;
    }
    100% {
        background-position: -500px 00px;
        transition: 0.3s;
    }
}

.WeatherLoading {
    min-height: 300px;
    background: linear-gradient(
            120deg,
            rgba(2, 0, 36, 0) 0%,
            rgba(0, 0, 0, 1) 30%,
            rgba(0, 212, 255, 0) 100%
        );
    transition: 0.3s;
    background-size: 1000px 1000px;
    animation: loading 2s alternate infinite;
}

.Weather {
    display: flex;
    width: 500px;
    height: fit-content;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 0 2px 3px rgba(128, 128, 128, 0.3);
    &__mainInfo {
        display: flex;
        align-items: center;
        img {
            width: 100px;
            height: 100px;
        }
        p {
            font-size: 35px;
        }
    }
    &__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-size: 14px;
        img {
            width: 20px;
            height: 20px;
        }
        div {
            display: flex;
            gap: 10px;
        }
    }
    @media screen and (max-width: 600px) {
        width: 90%;
    }
}
</style>
