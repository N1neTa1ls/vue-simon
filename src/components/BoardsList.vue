<template>
  <div class="boards-container">
    <Board
      class="board"
      v-for="board in boards"
      :key="board.id"
      v-bind:board="board"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import Board from './Board.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'BoardList',
    components: {
      Board
    },
    async created() {
      const response = await axios.get('cards/').catch(err => {
        switch (err.response.status) {
          case 401:
            this.$router.push('/login');
          default:
            localStorage.removeItem('token');
            break;
        }
      });

      if (response.data.length) {
        const items = this.formattedData(response.data);

        this.$store.dispatch('boards', items);
      }
    },
    methods: {
      formattedData(data) {
        const items = [];

        this.boards.forEach(board => {
          const cards = data.filter(el => el.row === board.id);
          items.push({
            ...board,
            cards
          });
        });

        return items;
      },
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
</style>