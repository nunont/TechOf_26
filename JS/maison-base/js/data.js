// data.js (sem módulos) — expõe globals
// Produtos (12) com dados suficientes para filtros/ordenar/detalhe

window.PRODUCTS = [
  {
    id: "collar-001",
    name: "Coleira Classic — Castanho",
    price: 39.90,
    category: "coleira",
    color: "castanho",
    sizes: ["XS","S","M","L"],
    inStock: true,
    rating: 4.7,
    materials: ["pele bovina", "fivela latão"],
    tags: ["minimalista", "premium", "daily"],
    createdAt: "2025-12-08",
    description: "Coleira em pele premium com fivela em latão. Ajuste confortável para uso diário."
  },
  {
    id: "collar-002",
    name: "Coleira Classic — Preto",
    price: 39.90,
    category: "coleira",
    color: "preto",
    sizes: ["XS","S","M","L"],
    inStock: true,
    rating: 4.6,
    materials: ["pele bovina", "fivela latão"],
    tags: ["minimalista", "daily"],
    createdAt: "2025-11-20",
    description: "Linha Classic em preto mate. Durável, discreta e confortável."
  },
  {
    id: "collar-003",
    name: "Coleira Soft Edge — Camel",
    price: 44.50,
    category: "coleira",
    color: "camel",
    sizes: ["S","M","L"],
    inStock: true,
    rating: 4.8,
    materials: ["pele", "rebites", "fivela aço escovado"],
    tags: ["premium", "conforto"],
    createdAt: "2026-01-05",
    description: "Acabamento de bordas suaves para maior conforto. Visual minimalista."
  },
  {
    id: "collar-004",
    name: "Coleira Urban — Cinzento",
    price: 42.00,
    category: "coleira",
    color: "cinzento",
    sizes: ["S","M"],
    inStock: false,
    rating: 4.4,
    materials: ["pele", "fivela níquel"],
    tags: ["urbano", "minimalista"],
    createdAt: "2025-10-02",
    description: "Coleira moderna em cinzento. Edição limitada (pode estar sem stock)."
  },
  {
    id: "collar-005",
    name: "Coleira Stitch — Chocolate",
    price: 49.90,
    category: "coleira",
    color: "chocolate",
    sizes: ["M","L"],
    inStock: true,
    rating: 4.9,
    materials: ["pele", "costura reforçada", "fivela latão"],
    tags: ["premium", "resistente"],
    createdAt: "2025-12-22",
    description: "Costura reforçada e pele espessa para maior durabilidade."
  },
  {
    id: "collar-006",
    name: "Coleira Mini — Creme",
    price: 34.90,
    category: "coleira",
    color: "creme",
    sizes: ["XXS","XS","S"],
    inStock: true,
    rating: 4.5,
    materials: ["pele", "fivela latão"],
    tags: ["leve", "minimalista"],
    createdAt: "2025-09-18",
    description: "Pensada para cães pequenos. Leve e confortável."
  },

  {
    id: "leash-001",
    name: "Trela City — Castanho (1.6m)",
    price: 55.00,
    category: "trela",
    color: "castanho",
    sizes: ["1.2m","1.6m"],
    inStock: true,
    rating: 4.7,
    materials: ["pele", "mosquetão latão"],
    tags: ["daily", "premium"],
    createdAt: "2025-12-12",
    description: "Trela em pele com mosquetão de latão. Ideal para cidade."
  },
  {
    id: "leash-002",
    name: "Trela City — Preto (1.6m)",
    price: 55.00,
    category: "trela",
    color: "preto",
    sizes: ["1.2m","1.6m"],
    inStock: true,
    rating: 4.6,
    materials: ["pele", "mosquetão aço"],
    tags: ["minimalista", "daily"],
    createdAt: "2025-11-28",
    description: "Trela em preto mate com hardware em aço. Visual clean."
  },
  {
    id: "leash-003",
    name: "Trela Adjustable — Camel (3 níveis)",
    price: 64.90,
    category: "trela",
    color: "camel",
    sizes: ["ajustável"],
    inStock: true,
    rating: 4.8,
    materials: ["pele", "argolas", "mosquetão"],
    tags: ["ajustável", "premium"],
    createdAt: "2026-01-09",
    description: "Trela ajustável para 3 comprimentos. Versátil para treinos e passeios."
  },
  {
    id: "leash-004",
    name: "Trela Weekend — Chocolate (2m)",
    price: 59.90,
    category: "trela",
    color: "chocolate",
    sizes: ["2m"],
    inStock: false,
    rating: 4.3,
    materials: ["pele", "mosquetão"],
    tags: ["outdoor", "resistente"],
    createdAt: "2025-08-30",
    description: "Trela mais longa para passeios. Pode estar sem stock."
  },
  {
    id: "leash-005",
    name: "Trela Slim — Creme (1.2m)",
    price: 49.90,
    category: "trela",
    color: "creme",
    sizes: ["1.2m"],
    inStock: true,
    rating: 4.4,
    materials: ["pele", "mosquetão latão"],
    tags: ["leve", "minimalista"],
    createdAt: "2025-10-22",
    description: "Perfil mais fino e leve. Ideal para cães pequenos/médios."
  },
  {
    id: "leash-006",
    name: "Trela Urban — Cinzento (1.2m)",
    price: 52.00,
    category: "trela",
    color: "cinzento",
    sizes: ["1.2m"],
    inStock: true,
    rating: 4.5,
    materials: ["pele", "mosquetão níquel"],
    tags: ["urbano", "minimalista"],
    createdAt: "2025-12-02",
    description: "Edição urbana em cinzento. Combina com coleiras neutras."
  }
];

// Carrinho demo (sem interações)
window.CART = [
  { productId: "collar-003", qty: 1, size: "M" },
  { productId: "leash-003", qty: 1, size: "ajustável" },
  { productId: "collar-006", qty: 2, size: "XS" }
];
