import { theme } from '@cloudinary/url-gen/actions/effect';
import { color } from '@cloudinary/url-gen/qualifiers/background';
import { background } from '@cloudinary/url-gen/qualifiers/focusOn';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkBlue: "#2162a1",
        mutedGray: "#565959",
        darkGray: "#888c8c",
        lightGray: "#d5d9d9",
        normalGray: "#D4D4D4",
        extraDarkGray: '#565959',
        ultraLightGray: "#E3E6E6",
        ultraLightGrayMax: "#F0F2F2",
        brightYellow: "hsl(48, 100%, 54%)",
        darkYellow: "hsl(48, 100%, 48%)",
        disabledYellow: "hsl(48, 50%, 54%)",
        inputBlue: "#E7F0FE",
        darkBlue: "#131A22",
        mediumBlue: "#222F3E",
        lightBlue: "#364759",
        orange: "#FEBD68",
        darkOrange: "#FA8900",
        darkOrangeHover: '#de7920'
      },
      keyframes: (theme) => ({
        loader: {
          '0%': { width: '0%' },
          '100%': { width: '95%' },
        },
      }),
      animation: {
        loader: 'loader 0.3s ease-out forwards',
      },
    },
  },
}
