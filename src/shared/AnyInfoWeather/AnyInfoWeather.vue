<template>
    <div>
        <img src="../../assets/cursor.svg" />
        <p>{{ weather?.wind.speed || callone?.current?.wind_speed }}m/s</p>
    </div>
    <div></div>
    <div>
        <p>
            Humidity:
            {{ weather?.main.humidity || callone?.current?.humidity }}%
        </p>
    </div>
    <div>
        <p>
            Dew point:
            {{ Math.round(Number(callone?.current.dew_point)) }} °C
        </p>
    </div>
    <div>
        <p>
            Visibility:
            {{
                visibility(weather?.visibility || callone?.current.visibility)
            }}km
        </p>
    </div>
</template>

<script lang="ts" setup>
import { visibility } from "../../app/utils/visiblity";

defineProps({
    weather: Object,
    callone: Object,
});
</script>
