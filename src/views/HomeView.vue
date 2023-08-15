<template>
  <div class="home">
    <form @submit="submit">
      <div
        v-for="field in fields"
        class="field"
        :key="field.id"
      >
        <label :for="field.name">{{ field.label }}</label>
        <input
          :id="field.name"
          type="number"
          @change="setFirstField(field.name)"
          v-model.number="form[field.name]"
        />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Загрузка...' : 'Отправить' }}
      </button>
    </form>

    <div class="labels">
      <label>{{ form.price }}</label>
      <label>{{ form.qty }}</label>
      <label>{{ form.amount }}</label>
      <pre>{{ localForm }}</pre>
    </div>

    <div class="actions">
      <ul>
        <li v-for="(item, i) in updatedLog" :key="i">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';

import IForm from '@/types/IForm';
import debounce from '@/utils/debounce';

@Component({
  computed: {
    ...mapState('sum', [
      'localForm'
    ]),
  },
  methods: {
    ...mapActions('sum', [
      'getForm',
      'saveForm',
    ])
  }
})
export default class HomeView extends Vue {
  public localForm: any;
  getForm!: () => any;
  saveForm!: (form: IForm) => any;

  private fields = [
    { id: 0, name: 'price', label: 'Цена' },
    { id: 1, name: 'qty', label: 'Количество' },
    { id: 2, name: 'amount', label: 'Сумма' },
  ];
  private form: IForm = {
    price: 0,
    qty: 0,
    amount: 0,
    nonce: 0,
  };
  private nonce = 0;
  private firstField = '';
  private updatedLog: any = [];
  private loading = false;

  @Watch('form', { deep: true })
  updateFirstField() {
    debounce(function () {
      if (!this.form.price || !this.form.qty || !this.form.amount)
        return;

      if (this.firstField === 'price')
        this.form[this.firstField] = this.form.amount / this.form.qty;
      if (this.firstField === 'qty')
        this.form[this.firstField] = this.form.amount / this.form.price;
      if (this.firstField === 'amount')
        this.form[this.firstField] = this.form.price * this.form.qty;
    }.bind(this), 300)();
  }

  @Watch('form.price')
  priceUpdated() {
    this.addNewAction('Поле "Цена" изменено');
  }

  @Watch('form.qty')
  qtyUpdated() {
    this.addNewAction('Поле "Количество" изменено');
  }

  @Watch('form.amount')
  amountUpdated() {
    this.addNewAction('Поле "Сумма" изменено');
  }

  addNewAction(text: string) {
    this.updatedLog.unshift(
      { id: uuidv4(), text: text }
    );
    this.updatedLog = this.updatedLog.splice(0, 100)
  }

  async submit(e: Event) {
    e.preventDefault();
    this.loading = true;

    try {
      if ((this.form.amount % 2) !== 0) {
        alert('Поле "Сумма" должно быть четным');
        this.addNewAction('Возникла ошибка');
        return;
      }

      this.addNewAction(`
        В localStorage было: ${JSON.stringify(this.localForm)}
      `);
      this.addNewAction(`
        Отправленные данные: ${JSON.stringify({
          ...this.form,
          nonce: this.nonce,
        })}
      `);

      const result = await this.saveForm({
        ...this.form,
        nonce: this.nonce,
      });

      this.addNewAction('Данные успешно сохранены');

      this.addNewAction(`
        Теперь localStorage: ${JSON.stringify(this.localForm)}
      `);
      this.addNewAction(`
        Полученные данные: ${JSON.stringify(result)}
      `);
    } catch (error: any) {
      console.error('Error submit(): ', new Error(error));
    } finally {
      this.loading = false;
    }
  }

  setFirstField(fieldName: string) {
    if (this.firstField.length) return;

    this.firstField = fieldName;
  }

  async mounted() {
    await this.getForm();

    setInterval(() => {
      this.nonce++;
    }, 1000);
  }
}
</script>

<style lang="scss">
.home {
  max-width: 810px;
  margin: 0 auto;
}
form {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: sans-serif;
  flex-grow: 1;
  line-height: 180%;
}
.field label {
  font-size: 14px;
}
.field input {
  width: 100%;
  height: 35px;
}
button {
  height: 35px;
}
.labels {
  display: flex;
  margin-top: 20px;
}
.labels label {
  margin-right: 20px;
  min-width: 222.63px;
  text-align: left;
}
ul {
  text-align: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
