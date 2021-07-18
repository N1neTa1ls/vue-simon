<template>
  <div>
    <h3 class="title" v-bind:class="board.class">{{ board.title }} ({{ board.cards.length }})</h3>
    <div class="items-container">
      <div class="cards">
        <draggable v-on:change="change" :list="board.cards" group="cards">
          <div class="card" v-for="card in board.cards" :key="card.id">
            <div class="delete" title="Удалить карточку" v-on:click="handleDelete(card.id)"><span class="icon close">+</span></div>
            <p class="card-id"><b>id:</b> {{ card.id }}</p>
            <p>{{ card.text }}</p>
          </div>
        </draggable>
      </div>
      <p v-show="!formVisible" class="add-new" v-on:click="showForm"><span class="icon">+</span> Добавить карточку</p>
      <form  v-show="formVisible" class="form" @submit.prevent="handleSubmit">
        <textarea class="input textarea" name="description" v-model="description" placeholder="Ввести заголовок для этой карточки" required></textarea>
        <div class="button-container">
          <button type="submit" class="button small">Добавить карточку</button>
          <div class="icon-container"><span title="Закрыть форму" v-on:click="hideForm" class="icon close">+</span></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import draggable from 'vuedraggable';

  export default {
    name: 'Board',
    props: ['board'],
    components: {
      draggable,
    },
    data() {
      return {
        formVisible: false,
        description: ''
      }
    },
    methods: {
      change(e) {
        if (e.removed) {
          return;
        }
        const newCard = e.added ? e.added : e.moved;

        const data = {
          seq_num: newCard.newIndex,
          row: this.board.id,
          text: newCard.element.text
        };
        const cardId = newCard.element.id;

        this.updateCard(data, cardId);
      },
      showForm() {
        this.formVisible = true;
      },
      hideForm() {
        this.description = '';
        this.formVisible = false;
      },
      async updateCard(data, cardId) {
        await axios.patch(`cards/${cardId}`, data);
      },
      async handleSubmit() {
        const response = await axios.post('cards/', {
          row: this.board.id,
          text: this.description
        });

        if (response) {
          this.hideForm();
          this.updateCards(response.data);
        }
      },
      async handleDelete(id) {
        const response = await axios.delete(`cards/${id}`);

        if (response) {
          this.deleteCard(id);
        }
      },
      updateCards(card) {
        const boards = [...this.boards];
        boards.forEach(board => {
          if (board.id === card.row) {
            board.cards.push(card);
          }
        });

        this.$store.dispatch('boards', boards);
      },
      deleteCard(id) {
        const boards = [...this.boards];
        boards.forEach(board => {
          if (board.id === this.board.id) {
            board.cards = board.cards.filter(el => el.id !== id);
          }
        });

        this.$store.dispatch('boards', boards);
      }
    },
    computed: {
      ...mapGetters(['boards'])
    }
  }
</script>

<style>
  .boards-container {
    display: flex;
    justify-content: center;
  }
  .board {
    min-width: 170px;
    width: 20%;
    flex-shrink: 0;
    margin: 10px;
  }
  .on-hold {
    background: #e47f49;
  } 
  .in-progress {
    background: #408ab2;
  }
  .needs-review {
    background: #e9c654;
  }
  .add-new {
    font-size: 14px;
    color: #949494;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .add-new:hover {
    color: #eee;
  }
  .icon-container {
    padding: 0 10px;
  }
  .icon {
    font-size: 22px;
    font-weight: 100;
    margin-right: 5px;
  }
  .icon.close {
    transform: rotate(45deg);
    cursor: pointer;
    color: #5f6163;
    margin: 0;
    display: flex;
  }
  .textarea {
    height: 70px;
    resize: none;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .button-container {
    display: flex;
  }
  .card {
    background: #1f1f21;
    padding: 20px 5px;
    font-size: 14px;
    color: #c3c5c7;
    position: relative;
    margin-bottom: 7px;
  }
  .card b {
    color: #ccc;
  }
  .card-id {
    margin-bottom: 10px;
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .delete .icon {
    transform: rotate(45deg);
    font-weight: 300;
  }
</style>