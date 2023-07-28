import { ref } from "vue";
import { useStore } from "vuex";
import type { Ref } from "vue";
import { ICity } from "../../../app/store";

interface HandleNameChangeInterface {
    target: HTMLDivElement;
}

export default function draggble() {
    function dragLeave(e: HandleNameChangeInterface) {
        e.target.style.background = "rgb(212, 212, 212)";
    }

    function dragOver(e: HandleNameChangeInterface, city: ICity) {
        e.target.style.background = "darkgray";
        currentCard.value = city;
    }

    const card: Ref<ICity | undefined> = ref();
    const store = useStore();
    const currentCard: Ref<ICity | undefined> = ref();

    function drop(e: HandleNameChangeInterface) {
        e.target.style.background = "rgb(212, 212, 212)";
        let listt = store?.state?.city?.map((list: ICity) => {
            if (list.id === currentCard?.value?.id) {
                return {
                    ...list,
                    order: card?.value?.order,
                };
            }
            if (list.id === card.value?.id) {
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

    function dragStart(city: ICity) {
        card.value = city;
    }

    return {
        dragStart,
        drop,
        dragLeave,
        dragOver,
    };
}
