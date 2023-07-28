<template>
    <div class="WeatherList">
        <Weather :key="city.id" :name="city.name" v-for="city in $store.state.city" />
    </div>
</template>

<script lang="ts" setup>
import Weather from "../../shared/Weather/Weather.vue";
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
