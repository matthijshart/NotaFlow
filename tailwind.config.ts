import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nota: {
          50: '#f0f4f9',
          100: '#e1e8f0',
          200: '#c3d1e1',
          300: '#94adc8',
          400: '#6889ab',
          500: '#4a6d91',
          600: '#3a5778',
          700: '#1e3a5f',
          800: '#1a2f4d',
          900: '#152540',
          950: '#0e1a2d',
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'header': '0 1px 2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
