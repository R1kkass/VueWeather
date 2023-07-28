<template>
    <div class="UnitList">
        <Unit
            @dragover.prevent="(e) => dragOver(e, city)"
            @dragleave="(e) => dragLeave(e)"
            @drop.prevent="(e) => drop(e)"
            :id="city.id"
            v-for="city in $store.state.city"
            ><p
                :key="city.id"
                @dragstart="() => dragStart(city)"
                :draggable="true"
            >
                <img src="../../assets/hamburger-svgrepo-com.svg"/>
            </p>
            <template v-slot:name>{{ city.name }}</template>
            </Unit
        >
    </div>
</template>

<script lang="ts" setup>
import Unit from "../../shared/Unit/Unit.vue";
import draggble from "./utils/drag";

const { dragStart, drop, dragLeave, dragOver } = draggble();
</script>

<style lang="scss">
.UnitList {
    display: flex;
    flex-direction: column;
    gap: 10px;

    overflow: hidden;
    max-height: 100%;
}
</style>
