<template>
<div class="relative">
  <div class="settings">
    <p>SIMON</p>
    <div class="radio-group">
      <input type="radio" name="level" id="ease" v-on:change="changePause(1500)">
      <label for="ease">ease</label>
      <input type="radio" name="level" id="medium" checked  v-on:change="changePause(1000)">
      <label for="medium">medium</label>
      <input type="radio" name="level" id="high" v-on:change="changePause(500)">
      <label for="high">high</label>
    </div>
    <p v-if="starting" id="current-level" class="current-level">current level: {{level}}</p>
    <h2 v-if="isGameOver" id="game-over" class="game-over">GAME OVER</h2>
    <div class="btns">
      <button id="start-game" class="button" v-on:click="startGame()">start</button>
      <button id="reset-game" class="button" v-on:click="resetGame()">reset</button>
    </div>
  </div>
  <div class="field">
    <div
      class="section red"
      :class="activeHover === 1 ? 'hover' : activeSection === 1 ? 'active' : ''"
      v-on:click="checkClicks(1)"
    ></div>
    <div
      class="section blue"
      :class="activeHover === 2 ? 'hover' : activeSection === 2 ? 'active' : ''"
      v-on:click="checkClicks(2)"
    ></div>
    <div
      class="section green"
      :class="activeHover === 3 ? 'hover' : activeSection === 3 ? 'active' : ''"
      v-on:click="checkClicks(3)"
    ></div>
    <div
      class="section yellow"
      :class="activeHover === 4 ? 'hover' : activeSection === 4 ? 'active' : ''"
      v-on:click="checkClicks(4)"
    ></div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
    starting: false,
    level: 1,
    pause: 1000,
    sections: [],
    clickedSections: [],
    activeHover: null,
    activeSection: null,
    isGameOver: false
    }
  },
  methods: {
    startGame(nextLevel = false) {
      this.isGameOver = false;
      if (this.starting && !nextLevel) {
        return;
      } else if (!nextLevel) {
        this.sections.length = 0;
        this.clickedSections.length = 0;
        this.level = 1;
      }

      this.starting = true;
      const random = Math.floor(Math.random() * 4 + 1);
      this.sections.push(random);
      
      this.sections.forEach((el, ind) => {
        setTimeout(() => {
          const audio = new Audio(require(`../assets/sound/${el}.mp3`));
          audio.play();

          this.activeHover = el;
          setTimeout(() => {
            this.activeHover = null;
            this.activeSection = el;
          }, 100);
          setTimeout(() => {
            this.activeSection = null;
          }, 300);
        }, this.pause * ind);
      });
    },
    checkClicks(el) {
      const audio = new Audio(require(`../assets/sound/${el}.mp3`));
      audio.play();
      if (!this.starting) {
        return;
      }
      let correctly = true;
      this.clickedSections.push(el);

      this.sections.forEach((el, ind) => {
        if (this.clickedSections[ind] && el !== this.clickedSections[ind]) {
          correctly = false;
        }
      });

      if (!correctly) {
        this.gameOver();
      }

      if (this.sections.length !== this.clickedSections.length) {
        return;
      }

      if (correctly) {
        this.level++;
        this.clickedSections.length = 0;
        setTimeout(() => {
          this.startGame(true);
        }, this.pause);
      }
    },
    gameOver() {
      this.sections.length = 0;
      this.clickedSections.length = 0;
      this.starting = false;
      this.isGameOver = true;
    },
    resetGame() {
      this.sections.length = 0;
      this.clickedSections.length = 0;
      this.level = 1;
      this.starting = false;
      this.isGameOver = false;
    },
    changePause(ms) {
      this.pause = ms;
    }
  }
}
</script>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .relative {
      position: relative;
    }
    .field {
      width: 600px;
      height: 590px;
      border: 3px solid #999;
      border-radius: 50%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
    }
    .section {
      width: 50%;
      height: 300px;
      border-bottom: 5px solid #999;
      cursor: pointer;
    }
    .section:hover,
    .hover {
      opacity: 0.8;
    }
    .red {
      background: rgb(233, 105, 105);
      border-right: 5px solid #999;
    }
    .red.active,
    .red:active {
      background: red;
    }
    .blue {
      background: rgb(97, 97, 194);
    }
    .blue.active,
    .blue:active {
      background: blue;
    }
    .green {
      background: rgb(64, 145, 64);
      border-right: 5px solid #999;
    }
    .green.active,
    .green:active {
      background: green;
    }
    .yellow {
      background: rgb(243, 209, 60);
    }
    .yellow.active,
    .yellow:active {
      background: yellow;
    }
    .settings {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      border: 5px solid #999;
      z-index: 9;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .settings > * {
      margin: 15px 0;
    }
    .button {
      padding: 5px;
      width: 100px;
      cursor: pointer;
    }
  </style>