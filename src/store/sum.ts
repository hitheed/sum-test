import { LocalStorageService } from "@/api/localStorage.service";
import IForm from "@/types/IForm";

export default {
  namespaced: true,
  namespace: 'sum',

  state: {
    localForm: {
      price: 0,
      qty: 0,
      amount: 0,
      nonce: 0,
    },
  },
  getters: {
  },
  mutations: {
    setNewValue(state: IState, payload: IForm) {
      state.localForm = payload;
    },
  },
  actions: {
    async saveForm({ commit }: any, payload: IForm): Promise<void> {
      try {
        const result: any = await new LocalStorageService().setData('form', payload);

        commit('setNewValue', result.data);

        return result;
      } catch (error: any) {
        console.error('Error saveForm(): ', new Error(error));
      }
    },
    async getForm({ commit }: any): Promise<void> {
      try {
        const result = await new LocalStorageService().getData('form');
        commit('setNewValue', result);
      } catch (error: any) {
        console.error('Error getForm(): ', new Error(error));
      }
    },
  },
};


interface IState {
  localForm: IForm;
}
