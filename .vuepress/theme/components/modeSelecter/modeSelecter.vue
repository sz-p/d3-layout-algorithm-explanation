<template>
  <div class="modeSelecter">
    <div @click="changeMode" :class="['light',{hidden:mode!=='light'}]"></div>
    <div @click="changeMode" :class="['dark',{hidden:mode!=='dark'}]"></div>
  </div>
</template>
<script>
import modeOptions from "./modeOptions";

export default {
  name: "ModeSelecter",
  data() {
    return {
      mode: "auto"
    };
  },
  methods: {
    changeMode() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else if (this.mode === "light") {
        this.mode = "dark";
      }
      localStorage.setItem("mode", this.mode);
      this.useMode(this.mode);
    },
    useMode(modeName) {
      const rootElement = document.querySelector(":root");
      const options = modeOptions[modeName];

      for (const k in options) {
        rootElement.style.setProperty(k, options[k]);
      }
    }
  },
  mounted() {
    // if (
    //   window.matchMedia &&
    //   window.matchMedia("(prefers-color-scheme: dark)").matches
    // ) {
    //   this.mode = "dark";
    // } else {
    //   this.mode = "light";
    // }
    this.mode = "light";
    const mode = localStorage.getItem("mode");
    if (mode) this.mode = mode;
    this.useMode(this.mode);
  }
};
</script>
<style lang="stylus">
.modeSelecter {
  margin-left: 1rem;
  width: 25px;
  height: 25px;
  margin-top: auto;
  margin-bottom: auto;
  cursor: pointer;

  .hidden {
    display: none;
  }

  .light {
    width: 100%;
    height: 100%;
    background: url('./sun.svg') 0% 0% / 100% 100% no-repeat;
  }

  .dark {
    width: 100%;
    height: 100%;
    background: url('./moon.svg') 0% 0% / 100% 100% no-repeat;
  }
}</style>
