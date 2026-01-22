// app.js (VERSAO EXERCICIO) — preencher TODOs
// Regras: SEM event handlers (sem onclick/addEventListener)
// Renderiza no load, baseado em body[data-page] e query params.

(function () {
  const page = document.body.dataset.page;

  // ---------- Config (podes ajustar, mas não é obrigatório) ----------
  const SHIPPING_THRESHOLD = 60;     // acima disto, envio grátis
  const SHIPPING_COST = 4.90;        // custo base do envio
  const DISCOUNT_MIN_SUBTOTAL = 60;  // subtotal mínimo para WELCOME10

  // ---------- Helpers ----------
  function $(selector) {
    return document.querySelector(selector);
  }

  function parseQuery() {
    // TODO: ler window.location.search e devolver objeto { key: value }
    // Dica: new URLSearchParams(...)
    return {};
  }

  function formatPrice(value) {
    // TODO: devolver string em EUR (pt-PT) usando Intl.NumberFormat
    // Ex: "39,90 €" ou "€ 39,90" (conforme o locale)
    return "";
  }

  function getProductById(id) {
    // TODO: usar find no window.PRODUCTS e devolver produto ou null
    return null;
  }

  function isValidSize(product, size) {
    // TODO: validar se size existe em product.sizes (includes)
    return false;
  }

  function ratingStars(rating) {
    // (já feito) — podes manter
    const rounded = Math.round(rating);
    const full = "★".repeat(rounded);
    const empty = "☆".repeat(5 - rounded);
    return `${full}${empty}`;
  }

  function safeText(text) {
    // (já feito) — evita undefined/null no DOM
    return String(text ?? "");
  }

  // ---------- Catalog logic ----------
  function applyFilters(products, filters) {
    // TODO: filtrar com base em:
    // filters = { category, color, inStock, minPrice, maxPrice, tag }
    // - category/color: match exato
    // - inStock: "true" => apenas em stock; "false" => apenas sem stock; "" => ignorar
    // - minPrice/maxPrice: comparar com product.price
    // - tag: product.tags inclui a tag
    // Usar: filter + condições
    return products;
  }

  function sortProducts(products, sortKey) {
    // TODO: ordenar (sem mutar array original):
    // sortKey:
    // - "priceAsc"   => preço asc
    // - "priceDesc"  => preço desc
    // - "ratingDesc" => rating desc
    // - "newest"     => createdAt mais recente primeiro
    // Dica: slice() + sort()
    return products;
  }

  function getFeaturedProducts(products) {
    // TODO: devolver 4 produtos em destaque
    // sugestão: apenas inStock, ordenar por rating desc, slice(0,4)
    return [];
  }

  function getNewArrivals(products) {
    // TODO: devolver 8 produtos mais recentes
    // sugestão: ordenar por createdAt desc, slice(0,8)
    return [];
  }

  function getRelatedProducts(products, currentProduct) {
    // TODO: devolver 4 relacionados:
    // - mesma categoria OU mesma cor
    // - sem incluir o próprio (id diferente)
    // sugestão: filter + slice(0,4)
    return [];
  }

  // ---------- Cart logic ----------
  function getCartDetailed(cart, products) {
    // TODO: transformar cart items em objetos completos:
    // cart item: { productId, qty, size }
    // resultado: { productId, qty, size, product }
    // usar: map + find
    // remover items inválidos (sem product) com filter
    return [];
  }

  function calcSubtotal(items) {
    // TODO: reduce para somar (item.product.price * item.qty)
    return 0;
  }

  function calcShipping(subtotal) {
    // TODO: se subtotal >= SHIPPING_THRESHOLD => 0 senão SHIPPING_COST
    return 0;
  }

  function calcDiscount(subtotal, code) {
    // TODO: implementar regras:
    // - se não houver code => 0
    // - code "WELCOME10": 10% se subtotal >= DISCOUNT_MIN_SUBTOTAL, senão 0
    // usar: switch ou if/else
    return 0;
  }

  function calcTotal(subtotal, shipping, discount) {
    // TODO: subtotal + shipping - discount
    // garantir que nunca fica negativo (Math.max(0, ...))
    return 0;
  }

  // ---------- DOM render ----------
  function productCardHTML(p) {
    // (já feito) — mantém para focar exercício na lógica
    const stockPill = p.inStock
      ? `<span class="pill ok">Em stock</span>`
      : `<span class="pill danger">Sem stock</span>`;

    const tags = p.tags.slice(0, 2).map(t => `<span class="pill">${safeText(t)}</span>`).join("");

    return `
      <article class="card product-card">
        <div class="thumb" aria-hidden="true"></div>

        <div class="card-row">
          <div>
            <div style="font-weight:700">${safeText(p.name)}</div>
            <p class="tagline">${safeText(p.category)} • ${safeText(p.color)} • ${ratingStars(p.rating)}</p>
          </div>
          <div class="price">${formatPrice(p.price)}</div>
        </div>

        <div class="pills">
          ${stockPill}
          ${tags}
        </div>

        <div style="margin-top:6px">
          <a class="btn" href="product.html?id=${encodeURIComponent(p.id)}">Ver detalhe</a>
        </div>
      </article>
    `;
  }

  function renderProductGrid(products, containerSelector) {
    // TODO: selecionar container e injetar HTML dos cards
    // Dica: products.map(productCardHTML).join("")
  }

  function renderProductDetails(product, containerSelector) {
    // TODO:
    // - se não houver produto => mostrar "Produto não encontrado"
    // - senão renderizar:
    //   nome, descrição, pills (stock/categoria/cor), preço, rating, specs (sizes/materials/createdAt/tags)
  }

  function renderCart(items, containerSelector) {
    // TODO:
    // - se vazio => "Carrinho vazio."
    // - senão renderizar lista com nome, categoria/cor, qty, tamanho, total por item
    // - validar tamanho com isValidSize() e mostrar pill de aviso se inválido
  }

  function renderSummary(summary, containerSelector) {
    // TODO: renderizar subtotal, envio, desconto, total e código aplicado
  }

  function renderFiltersSummary(filters) {
    // TODO: mostrar filtros aplicados num texto (ex: "category: coleira • color: camel • sort: priceAsc")
    // se nenhum filtro => "Nenhum (catálogo completo)"
  }

  function renderResultsCount(filteredCount, totalCount) {
    // TODO: "A mostrar X de Y produtos"
  }

  // ---------- Page controllers ----------
  function initHome() {
    // TODO:
    // - obter featured (getFeaturedProducts)
    // - render em #featuredGrid
    // - obter novidades (getNewArrivals)
    // - render em #newArrivalsGrid
  }

  function initCatalog() {
    // TODO:
    // - ler query params (parseQuery)
    // - construir filters { category,color,inStock,minPrice,maxPrice,tag }
    // - aplicar filtros e ordenar
    // - renderFiltersSummary + renderResultsCount
    // - renderProductGrid em #catalogGrid
  }

  function initProduct() {
    // TODO:
    // - ler id da query
    // - obter produto por id
    // - renderProductDetails em #productDetails
    // - se existir, obter relacionados e render em #relatedGrid
  }

  function initCart() {
    // TODO:
    // - ler code da query (opcional)
    // - obter items detalhados
    // - calcular subtotal, shipping, discount, total
    // - regra extra opcional:
    //   se code == "FREESHIP" => desconto extra igual ao envio (shipping)
    // - renderCart (#cartList) + renderSummary (#cartSummary)
  }

  // ---------- Bootstrap ----------
  // Não usar event handlers: corre ao carregar
  if (page === "home") initHome();
  if (page === "catalog") initCatalog();
  if (page === "product") initProduct();
  if (page === "cart") initCart();
})();
