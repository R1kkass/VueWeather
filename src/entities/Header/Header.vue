<template>
    <div class="Header">
        <div class="Header__container">
            <button @click="visible = !visible">
                <img src="../../assets/setting.svg" />
            </button>
        </div>
    </div>
    <ModalSetting
        @close="visible = !visible"
        :visibility="visble"
        v-if="visible"
    />
</template>

<script setup lang="ts">
import ModalSetting from "../ModalSetting/ModalSetting.vue";
import { ref } from "vue";

const visible = ref(false);
</script>

<style lang="scss">
.Header {
    height: 60px;
    margin-bottom: 20px;

    &__container {
        width: 100%;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(5px);
        position: fixed;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        transition: 0.3s;
        box-shadow: 0 0 2px 3px rgba(128, 128, 128, 0.5);
        margin-bottom: 20px;
        button {
            border: none;
            outline: none;
            background: none;
        }
        img {
            transition: 0.3s;
            cursor: pointer;
            &:hover {
                transform: rotate(0.5turn);
            }
        }
    }
}
</style>
