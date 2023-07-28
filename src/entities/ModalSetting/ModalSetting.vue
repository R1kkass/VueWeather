<template>
    <Modal>
        <div class="ModalSetting">
            <div class="ModalSetting__name">
                <p>Settings</p>
            </div>
            <div @click="emit('close')" class="Close">
                <img src="../../assets/close.svg" />
            </div>
            <UnitList />
            <Input />
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import Input from "../../shared/Input/Input.vue";
import Modal from "../../shared/ModalAdd/ModalAdd.vue";
import UnitList from "../UnitList/UnitList.vue";

const emit = defineEmits();
</script>

<style lang="scss">
.ModalSetting {
    width: 100%;
    position: relative;
    &__name {
        p {
            font-size: 20px;
        }
    }
    .Close {
        position: absolute;
        right: 0px;
        top: -10px;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
            transform: rotate(180deg);
        }
        img {
            width: 30px;
            height: 30px;
        }
    }
}
</style>
