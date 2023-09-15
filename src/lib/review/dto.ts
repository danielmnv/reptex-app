export type Review = {
  initials: string;
  name: string;
  content: string;
  rating: number;
};

export const getStaticReviews = (): (Review & {
  type: "neutral" | "primary" | "secondary";
})[] => [
  {
    name: "Javier Perez",
    initials: "JP",
    content:
      "Amplio surtido en máquinas. Excelente calidad. Al comprar te explican sobre las funciones básicas del equipo y su uso. Amplio surtido en refacciones y una excelente atención. Además de precios... Altamente recomendable",
    rating: 5,
    type: "primary",
  },
  {
    name: "Roberto Gruest Elliot",
    initials: "RG",
    content:
      "Excelente servicio y atención! Así como variedad de equipos y suministros",
    rating: 5,
    type: "neutral",
  },
  {
    name: "Arturo Ramirez",
    initials: "AR",
    content:
      "Excelente atención y encuentras todo lo que necesitas para la gente que se dedica a la confección",
    rating: 5,
    type: "secondary",
  },
  {
    name: "Juan Jesús García Peña",
    initials: "JG",
    content:
      "Visité 3 lugares más aparte de este lugar y definitivamente allí  es donde me trataron mejor, me explicaron acerca de la maquina que adquirí, muy buena atención sin duda recomiendo ampliamente visitarla, tienen muy buenos precios, excelente, ojala que sigan así 😊👍!",
    rating: 5,
    type: "neutral",
  },
  {
    name: "Miguel Ramirez Guerrero",
    initials: "MR",
    content:
      "Variedad de maquinaria, venta de agua destilada y accesorios para talleres de costura",
    rating: 4,
    type: "primary",
  },
  {
    name: "Fermin Garcia",
    initials: "FG",
    content: "La mejor empresa de su ramo en Aguascalientes",
    rating: 5,
    type: "neutral",
  },
  {
    name: "Xavier Mendoza",
    initials: "XM",
    content: "Buen inventario de repuestos pero el servicio es mejor",
    rating: 4,
    type: "secondary",
  },
  {
    name: "Janeth Hernandez",
    initials: "JH",
    content:
      "Excelente atención, muy amables y tienen todo lo que necesitas y a muy buenos precios",
    rating: 5,
    type: "primary",
  },
  {
    name: "Mat",
    initials: "M",
    content:
      "Muy completo!! Gran variedad de refacciones y máquinas de costura domésticas e industriales, hilos, cierres y lo relacionado al giro, buenos precios, empleadas amables.",
    rating: 4,
    type: "secondary",
  },
];
