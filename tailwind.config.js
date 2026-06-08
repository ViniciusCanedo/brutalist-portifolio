/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue"
  ],
  theme: {
    extend: {
      colors: {
        neoBg: "var(--neo-bg)",
        neoPrimary: "var(--neo-primary)",
        neoAccent: "var(--neo-accent)",
        neoMuted: "var(--neo-muted)",
        neoDark: "var(--neo-dark)",
        white: "var(--white)"
      },
      borderWidth: {
        "DEFAULT": "1px",
        "3": "3px",
        "6": "6px"
      },
      boxShadow: {
        "brutal": "4px 4px 0px 0px var(--neo-primary)",
        "brutal-accent": "4px 4px 0px 0px var(--neo-accent)",
        "brutal-lg": "8px 8px 0px 0px var(--neo-primary)",
        "brutal-lg-accent": "8px 8px 0px 0px var(--neo-accent)"
      },
      fontFamily: {
        display: ["Space Grotesk", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      transitionTimingFunction: {
        "brutal-snappy": "cubic-bezier(0.3, 1.5, 0.4, 1)"
      }
    }
  },
  plugins: []
}
