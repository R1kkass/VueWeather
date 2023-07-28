<template>
    <div class="Input">
        <p>Add Location:</p>
        <div class="Input__button">
            <form @submit.prevent="setCity">
                <input v-model="city" />
                <button @submit="setCity">
                    <img src="../../assets/enter.svg" alt="" />
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";

const city = ref();
const store = useStore();

function setCity() {
    store.commit("setCity", {
        name: city.value,
        id: Date.now(),
        order: store.state.city.length,
    });
    city.value = "";
}
</script>

<style lang="scss">
.Input {
    position: sticky;
    bottom: -20px;
    background-color: white;
    width: 100%;
    height: 100px;
    input {
        height: 40px;
        width: 100%;
        padding: 5px;
        border: rgb(0, 113, 206) 1px solid;
        border-radius: 5px;
    }
    button {
        border: none;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__button {
        form{
            display: flex;
            gap: 10px;
        }
    }
}
</style>
