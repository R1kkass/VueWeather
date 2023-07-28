<template>
    <div class="Unit">
        <div class="Unit__more">
            <slot/>
        </div>
        <div class="Unit__name">
            <slot name="name"/>
        </div>
        <div @click="deleteCity()" class="Unit__delete">
            <img src="../../assets/delete.svg" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";

const store = useStore();
function deleteCity() {
    store.commit('deleteCity', props.id)
}

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})
</script>

<style lang="scss">
.Unit {
    width: 100%;
    display: flex;
    align-items: center;
    background: rgb(212, 212, 212);
    height: 60px;
    padding-inline: 10px;
    border-radius: 5px;
    &__delete {
        margin-left: auto;
        img {
            width: 30px;
            height: 30px;
        }
    }
}
</style>
