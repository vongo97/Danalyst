// tailwind.config.ts
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray[700]"),
            "--tw-prose-headings": theme("colors.indigo[800]"),
            "--tw-prose-lead": theme("colors.gray[600]"),
            "--tw-prose-links": theme("colors.purple[700]"),
            "--tw-prose-bold": theme("colors.gray[900]"),
            "--tw-prose-counters": theme("colors.gray[500]"),
            "--tw-prose-bullets": theme("colors.gray[500]"),
            "--tw-prose-hr": theme("colors.gray[300]"),
            "--tw-prose-quotes": theme("colors.gray[900]"),
            "--tw-prose-quote-borders": theme("colors.indigo[300]"),
            "--tw-prose-captions": theme("colors.gray[500]"),
            "--tw-prose-code": theme("colors.purple[800]"),
            "--tw-prose-pre-code": theme("colors.white"),
            "--tw-prose-pre-bg": theme("colors.gray[800]"),
            h1: {
              fontSize: theme("fontSize.3xl"),
              fontWeight: theme("fontWeight.bold"),
              marginTop: theme("spacing.16"),
              marginBottom: theme("spacing.8"),
              color: theme("colors.indigo[800]"),
            },
            h2: {
              marginTop: theme("spacing.12"),
              marginBottom: theme("spacing.4"),
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.bold"),
              color: theme("colors.indigo[700]"),
            },
            h3: {
              marginTop: theme("spacing.10"),
              marginBottom: theme("spacing.3"),
              fontSize: theme("fontSize.xl"),
              fontWeight: theme("fontWeight.semibold"),
              color: theme("colors.purple[700]"),
            },
            p: {
              marginBottom: theme("spacing.6"),
              lineHeight: theme("lineHeight.relaxed"),
            },
            ul: {
              marginBottom: theme("spacing.6"),
              paddingLeft: theme("spacing.6"),
            },
            ol: {
              marginBottom: theme("spacing.6"),
              paddingLeft: theme("spacing.6"),
            },
            li: {
              marginBottom: theme("spacing.2"),
            },
            a: {
              fontWeight: theme("fontWeight.medium"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: theme("colors.purple[800]"),
              },
            },
            pre: {
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.md"),
              overflowX: "auto",
            },
            code: {
              fontWeight: theme("fontWeight.semibold"),
            },
            blockquote: {
              fontStyle: "italic",
              borderLeftWidth: theme("borderWidth.4"),
              paddingLeft: theme("spacing.4"),
              borderColor: theme("colors.indigo[300]"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;