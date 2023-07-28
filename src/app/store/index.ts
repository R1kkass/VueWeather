import { createStore } from "vuex";

export interface IState {
    city: ICity[];
}

export interface ICity {
    name: string;
    id: number;
    order: number;
}

export default createStore({
    state: {
        city: JSON.parse(localStorage.getItem("city") || "[]"),
    },
    mutations: {
        setCity(state: IState, city: ICity) {
            state.city.push(city);
            localStorage.setItem("city", JSON.stringify(state.city));
        },
        deleteCity(state: IState, id: number) {
            state.city = state.city.filter((cit) => {
                return cit.id != id;
            });
        },
        resetCity(state: IState, city: ICity[]) {
            state.city = city.sort((a, b) => a.order - b.order);
            localStorage.setItem("city", JSON.stringify(state.city));
        },
    },
});
