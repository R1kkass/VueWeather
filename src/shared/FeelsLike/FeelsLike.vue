<template>
    <p>
        Feels like
        {{ temp(weather?.main.feels_like || callone?.current.feels_like) }}
        °C.
        {{ weather?.weather[0].main }}
        {{
            toUpper(
                String(
                    weather?.weather[0].main ||
                        callone?.current?.weather[0].main
                )
            )
        }}.
        {{
            toUpper(
                String(
                    weather?.weather[0].description ||
                        callone?.current?.weather[0].description
                )
            )
        }}
    </p>
</template>

<script lang="ts" setup>
import {temp} from "../../app/utils/temp"
import {toUpper} from "../../app/utils/toUpper"


defineProps({
    weather: Object,
    callone: Object,
});
</script>
