<template>
    <Teleport to="body">
        <div @click="emit('close')" class="ModalAdd">
            <div @click.stop class="ModalAdd__content">
                <slot />
            </div>
        </div>
        <div class="ModalAdd__close"></div>
    </Teleport>
</template>

<script lang="ts" setup>
import { Teleport, onMounted, onUnmounted } from "vue";

const emit = defineEmits();

function success(pos: any) {
  var crd = pos.coords;

  console.log('Ваше текущее местоположение:');
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);
  console.log(crd);
  

};

onMounted(() => {
    document.body.style.overflowY = "hidden";
    console.log(navigator.geolocation.getCurrentPosition(success));
    
});

onUnmounted(() => {
    document.body.style.overflowY = "auto";
});
</script>

<style lang="scss">
.ModalAdd {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &__content {
        width: 500px;
        overflow-y: auto;
        height: 700px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0 0 2px 2px rgba(186, 186, 186, 0.5);
        padding: 20px;
    }
}
</style>
