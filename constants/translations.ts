export type Language = "en" | "pt";

export const translations = {
  en: {
    nav: {
      stores: "Stores",
      categories: "Categories",
      deals: "Deals",
    },
    language: "Language",
    theme: "Theme",
  },

  pt: {
    nav: {
      stores: "Lojas",
      categories: "Categorias",
      deals: "Ofertas",
    },
    language: "Idioma",
    theme: "Tema",
  },
} as const;