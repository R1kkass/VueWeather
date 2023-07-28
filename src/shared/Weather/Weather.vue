<template>
    <div v-if="callone" class="Weather">
        <div class="Weather__name">
            <p>
                {{ name || "Not found" }},
                {{ weather?.sys.country || callone?.timezone }}
            </p>
        </div>
        <div class="Weather__mainInfo">
            <img
                :src="`https://openweathermap.org/img/wn/${
                    weather?.weather[0].icon || callone?.current.weather[0].icon
                }.png`"
            />
            <p>{{ temp(weather?.main.temp || callone?.current.temp) }} °C</p>
        </div>
        <div class="Weather__secondaryInfo">
            <FeelsLike :weather="weather" :callone="callone"/>
        </div>
        <div class="Weather__grid">
            <AnyInfoWeather :weather="weather" :callone="callone"/>
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
import FeelsLike from "../FeelsLike/FeelsLike.vue";
import { temp } from "../../app/utils/temp";
import AnyInfoWeather from "../AnyInfoWeather/AnyInfoWeather.vue"

const weather: Ref<IWeatherApi | undefined> = ref();
const callone: Ref<IWeatherOneCallApi | undefined> = ref();

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    lon: {
        type: Number,
    },
    lat: {
        type: Number,
    },
});

onMounted(async () => {
    WeaterApi(props.name)
        .then(async (e) => {
            weather.value = e;
            callone.value = await WeaterApiCallOne(
                weather.value?.coord.lon,
                weather.value?.coord.lat
            );
        })
        .catch(async () => {
            callone.value = await WeaterApiCallOne(
                props.lon?.toFixed(1),
                props.lat?.toFixed(1)
            );
        });

    console.log(callone.value);
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
