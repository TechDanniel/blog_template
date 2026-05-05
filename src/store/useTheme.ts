import { defineStore } from "pinia";

const STORAGE_KEY = "theme:isDark"

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false
  }),
  actions: {
    applyTheme() {
      document.documentElement.classList.toggle('dark', this.isDark)
    },
    initTheme() {
      const storedTheme = localStorage.getItem(STORAGE_KEY)
      if (storedTheme !== null) {
        this.isDark = storedTheme === 'true'
        this.applyTheme()
      }
    },
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem(STORAGE_KEY, this.isDark.toString())
    }
  }
});