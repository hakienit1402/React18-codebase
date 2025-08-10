/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
      mq1920: "1920px",
      // 1440x1080
      mq1440: "1440px",
      // 1280x720
      mq1280: "1280px",
      // 1024x768
      mq1024: "1024px",
      // 768x1024
      mq768: "768px",
      // 640x480
      mq640: "640px",
      // 480x640
      mq480: "480px",
    },
    extend: {
      fontFamily: {
        inter: ["Inter"],
      },
      fontSize: {
        xs: ["0.75rem", "0.9375rem"], // 12px with 15px line-height (125%)
        sm: ["0.875rem", "1.09375rem"], // 14px with 17.5px line-height (125%)
        base: ["1rem", "1.25rem"], // 16px with 20px line-height (125%)
        lg: ["1.125rem", "1.40625rem"], // 18px with 22.5px line-height (125%)
        xl: ["1.25rem", "1.5625rem"], // 20px with 25px line-height (125%)
        "2xl": ["1.5rem", "1.875rem"], // 24px with 30px line-height (125%)
        "3xl": ["1.875rem", "2.34375rem"], // 30px with 37.5px line-height (125%)
        "4xl": ["2.25rem", "2.8125rem"], // 36px with 45px line-height (125%)
        "5xl": ["3rem", "3.75rem"], // 48px with 60px line-height (125%)
        "6xl": ["3.75rem", "4.6875rem"], // 60px with 75px line-height (125%)
        "7xl": ["4.5rem", "5.625rem"], // 72px with 90px line-height (125%)
        "8xl": ["6rem", "7.5rem"], // 96px with 120px line-height (125%)
        "9xl": ["8rem", "10rem"], // 128px with 160px line-height (125%)
      },
      backgroundImage: {
        l1: "linear-gradient(180deg, #221A3C 50%, #4E4469 100%)",
        l2: "linear-gradient(180deg, rgba(37, 32, 49, 0.8) 0%, rgba(37, 32, 49, 0.5) 100%)",
        l3: "linear-gradient(180deg, #333333 50%, #666666 100%)",
      },
      colors: {
        neutral: {
          dark: {
            0: "#000000",
            100: "#1C1A20",
            200: "#221F28",
            300: "#2F2C3A",
            400: "#49425C",
            500: "#5E5676",
            600: "#7B7198",
            700: "#8C82AB",
            800: "#A59DBE",
            900: "#BBB4D1",
            1000: "#CBC4DE",
          },
          light: {
            0: "#FFFFFF",
            100: "#F7F7F9",
            200: "#F2F1F4",
            300: "#DEDCE4",
            400: "#B7B3C4",
            500: "#8C85A2",
            600: "#7F7892",
            700: "#706A82",
            800: "#625D71",
            900: "#535061",
            1000: "#464153",
          },
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          100: "#F0EBFF",
          200: "#E1D6FF",
          300: "#D1C2FF",
          400: "#C2ADFF",
          500: "#B399FF",
          600: "#775BC8",
          700: "#5C3DB8",
          800: "#3E297A",
          900: "#1F143E",
        },
        semantics: {
          blue: "#5498D3",
          red: {
            500: "#D16161",
            700: "#C84141",
          },
          green: {
            500: "#5BB46C",
            900: "#303A32",
          },
          yellow: {
            500: "#E39A19",
            900: "#423630",
          },
        },
        dim: {
          60: "rgba(17, 14, 27, 0.6)",
          20: "rgba(17, 14, 27, 0.2)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        common: {
          background: "#110E1B",
          highlight: "#191622",
          surface: "#1B1825",
          surfaceOverlay: "#242032",
          outline: "#453C5D",
        },
        mainnet: {
          primary: "hsl(var(--mainnet-primary))",
          secondary: "hsl(var(--mainnet-secondary))",
          accent: "hsl(var(--mainnet-accent))",
          surface: "hsl(var(--mainnet-surface))",
          background: "hsl(var(--mainnet-background))",
          border: "hsl(var(--mainnet-border))",
        },
        testnet: {
          primary: "hsl(var(--testnet-primary))",
          secondary: "hsl(var(--testnet-secondary))",
          accent: "hsl(var(--testnet-accent))",
          warning: "hsl(var(--testnet-warning))",
          surface: "hsl(var(--testnet-surface))",
          background: "hsl(var(--testnet-background))",
          border: "hsl(var(--testnet-border))",
        },
      },
      maxWidth: {
        screen: "100vw",
        input: "380px",
        form: "1236px",
        1192: "1192px",
        1360: "1360px",
        1328: "1328px",
        1440: "1440px",
        1172: "1172px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        rippling: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        rippling: "rippling 0.8s ease-out",
      },
      shadow: {
        "2xl": "0px 4px 22px 0px rgba(0, 0, 0, 0.1)",
        "3xl": "0px 2px 3px 0px #0000004D;",
        input: "0px 6px 10px 4px #0000001A",
      },
      boxShadow: {
        form: "0px 0px 0px 3px rgba(0, 51, 153, 0.15) ",
        "form-error": "0px 0px 0px 3px rgba(153 ,26 ,61, 0.15) ",
        sidebar: "0px 2px 4px 0px rgba(23, 39, 51, 0.11)",
        dropdown: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
        "header-table-row": "0px -1px 0px 0px #211f29 inset",
        "right-table-row": "-1px 0px 0px 0px #211f29 inset",
        "right-bottom-table-row": "-1px 0px 0px 0px #211f29 inset, 0px -1px 0px 0px #211f29 inset;",
        "left-bottom-table-row": "-1px 0px 0px 0px #211f29 inset, 0px -1px 0px 0px #211f29 inset;",
        "bottom-table-row": "0px -1px 0px 0px #211f29 inset;",
        "top-table-row": "0px 1px 0px 0px #211f29 inset;",
        content: "0px 2px 4px 0px rgba(23, 39, 51, 0.11);",
        select: "0px 2px 4px 0px rgba(23, 39, 51, 0.12)",
        "reject-approve": "0px 2px 6px 0px rgba(0, 0, 0, 0.16);",
        "sticky-cell-right": "inset -8px 0 8px -8px rgba(23, 39, 51, 0.12)",
        header: "0 1px 2px rgba(0, 0, 0, 0.06)",
        "sidebar-fund-form": "0px 0px 4px 0px rgba(23, 39, 51, 0.12)",
        "content-bottom": "0px 2px 4px 0px rgba(23, 39, 51, 0.12)",
        "sticky-table-body-view": "0px 2px 4px 0px #1727331F",
        "sticky-table-header-view": "0px 0px 4px 0px #1727331F",
        calendar: "0px 5px 8px 0px #17273329",
        // common shadow from design
        "0dp": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "1dp":
          "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "2dp":
          "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "3dp":
          "0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "4dp":
          "0px 2px 4px 0px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "6dp":
          "0px 3px 5px 0px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "8dp":
          "0px 5px 5px 0px rgba(0, 0, 0, 0.2), 0px 8px 10px 0px rgba(0, 0, 0, 0.14), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "12dp":
          "0px 7px 8px 0px rgba(0, 0, 0, 0.2), 0px 12px 17px 0px rgba(0, 0, 0, 0.14), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "16dp":
          "0px 8px 10px 0px rgba(0, 0, 0, 0.2), 0px 6px 30px 0px rgba(0, 0, 0, 0.12), 0px 16px 24px 0px rgba(0, 0, 0, 0.14)",
        "24dp":
          "0px 11px 15px 0px rgba(0, 0, 0, 0.2), 0px 9px 46px 0px rgba(0, 0, 0, 0.12), 0px 24px 38px 0px rgba(0, 0, 0, 0.14)",
        lightBG:
          "0px 11px 15px 0px rgba(0, 0, 0, 0.05), 0px 9px 46px 0px rgba(0, 0, 0, 0.05), 0px 24px 38px 0px rgba(0, 0, 0, 0.1)",
      },
      borderColor: {
        light: "#FFFFFF0F",
        outline: "#453C5D",
      },
      lineHeight: {
        DEFAULT: "1.25", // This sets 125% as default line-height
      },
    },
  },
  plugins: [animate],
};
