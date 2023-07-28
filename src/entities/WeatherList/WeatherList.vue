<template>
    <div class="WeatherList">
        <Weather
            :key="city.id"
            :name="city.name"
            :lon="city.lon"
            :lat="city.lat"
            v-for="city in $store.state.city"
        />
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Weather from "../../shared/Weather/Weather.vue";
import { useStore } from "vuex";

onMounted(() => {
    if (!localStorage.getItem("first")) {
        localStorage.setItem("first", "1");
        navigator.geolocation.getCurrentPosition(success);
    }
});

const commit = useStore()

async function success(pos: any) {
    var crd = pos.coords;
    console.log("Ваше текущее местоположение:");
    console.log(`Широта: ${crd.latitude}`);
    console.log(`Долгота: ${crd.longitude}`);
    console.log(`Плюс-минус ${crd.accuracy} метров.`);
    commit.commit('setCity', {name: 'Not found', lat: crd.latitude, lon: crd.longitude, id: Date.now()})
}
</script>

<style lang="scss">
.WeatherList {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>
