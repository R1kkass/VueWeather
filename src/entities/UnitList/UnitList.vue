<template>
    <div class="UnitList">
        <Unit
            :key="city.id"
            @dragstart="(e) => dragStart(e, city)"
            @dragover.prevent="(e) => dragOver(e, city)"
            @dragleave="(e) => dragLeave(e)"
            @drop.prevent="(e) => drop(e, store.state.city)"
            :draggable="true"
            :id="city.id"
            v-for="city in $store.state.city"
            ><p>{{ city.name }}</p></Unit
        >
    </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import Unit from "../../shared/Unit/Unit.vue";
import { useStore } from "vuex";
import { ICity } from "../../app/store/index";

interface HandleNameChangeInterface {
    target: HTMLDivElement;
}

function dragLeave(e: HandleNameChangeInterface) {
    e.target.style.background = "rgb(212, 212, 212)";
}

function dragOver(e: HandleNameChangeInterface, city: ICity) {
    e.target.style.background = "darkgray";
    currentCard.value=city
}

const card:Ref<ICity> = ref({})
const store = useStore();
const currentCard: Ref<ICity> = ref({});

function drop(e) {
    e.target.style.background = "rgb(212, 212, 212)";
    let listt = store?.state?.city?.map((list: ICity) => {
        if (list.id === currentCard.value.id) {
            return {
                ...list,
                order: card.value.order,
            };
        }
        if (list.id === card.value.id) {
            return {
                ...list,
                order: currentCard?.value?.order || 0,
            };
        }
        return list;
    });
    console.log(listt);
    
    store.commit("resetCity", listt);
}

function dragStart(e: HandleNameChangeInterface, city: ICity) {
    console.log(city);
    card.value=city
}
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
