// app.js — renderiza com base em body[data-page]
// Sem addEventListener / onclick / etc.
// Cada página é carregada e renderizada no momento em que abre.

(function () {
  const page = document.body.dataset.page;

  // ---------- TODO: Ajusta estes valores (regras do negócio) ----------
  const SHIPPING_THRESHOLD = 60;     // acima disto, envio grátis
  const SHIPPING_COST = 4.90;        // custo base do envio
  const DISCOUNT_MIN_SUBTOTAL = 60;  // subtotal mínimo para desconto WELCOME10

  // ---------- Helpers ----------
  function $(selector) {
    return document.querySelector(selector);
  }

  function parseQuery() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [k, v] of params.entries()) obj[k] = v;
    return obj;
  }

  function formatPrice(value) {
    // TODO: adaptar se quiseres outro formato
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR"
    }).format(value);
  }

  function getProductById(id) {
    // TODO: usar find (já está) e devolver null se não existir
    return window.PRODUCTS.find(p => p.id === id) || null;
  }

  function isValidSize(product, size) {
    // TODO: validar size com includes
    return product.sizes.includes(size);
  }

  function ratingStars(rating) {
    const rounded = Math.round(rating);
    const full = "★".repeat(rounded);
    const empty = "☆".repeat(5 - rounded);
    return `${full}${empty}`;
  }

  function safeText(text) {
    return String(text ?? "");
  }

  // ---------- Catalog logic ----------
  function applyFilters(products, filters) {
    // filters: { category, color, inStock, minPrice, maxPrice, tag }
    // TODO: implementar com filter + condições
    return products.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.color && p.color !== filters.color) return false;

      if (filters.inStock === "true" && p.inStock !== true) return false;
      if (filters.inStock === "false" && p.inStock !== false) return false;

      if (filters.tag && !p.tags.includes(filters.tag)) return false;

      const minP = filters.minPrice ? Number(filters.minPrice) : null;
      const maxP = filters.maxPrice ? Number(filters.maxPrice) : null;

      if (minP !== null && p.price < minP) return false;
      if (maxP !== null && p.price > maxP) return false;

      return true;
    });
  }

  function sortProducts(products, sortKey) {
    // sortKey: priceAsc, priceDesc, ratingDesc, newest
    // TODO: implementar com sort (cópia do array)
    const copy = products.slice();

    switch (sortKey) {
      case "priceAsc":
        return copy.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return copy.sort((a, b) => b.price - a.price);
      case "ratingDesc":
        return copy.sort((a, b) => b.rating - a.rating);
      case "newest":
        return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return copy;
    }
  }

  function getFeaturedProducts(products) {
    // TODO: ex: top 4 por rating, apenas inStock
    return products
      .filter(p => p.inStock)
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }

  function getNewArrivals(products) {
    // TODO: ordenar por createdAt desc e pegar 8
    return products
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);
  }

  function getRelatedProducts(products, currentProduct) {
    // TODO: relacionados por mesma categoria OU mesma cor, sem incluir o próprio
    return products
      .filter(p => p.id !== currentProduct.id)
      .filter(p => p.category === currentProduct.category || p.color === currentProduct.color)
      .slice(0, 4);
  }

  // ---------- Cart logic ----------
  function getCartDetailed(cart, products) {
    // TODO: transformar cart items em objetos completos (map + find)
    return cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        product
      };
    }).filter(x => x.product); // remove items inválidos
  }

  function calcSubtotal(items) {
    // TODO: reduce para somar price * qty
    return items.reduce((acc, it) => acc + (it.product.price * it.qty), 0);
  }

  function calcShipping(subtotal) {
    // TODO: condições (envio grátis acima do threshold)
    return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }

  function calcDiscount(subtotal, code) {
    // TODO: usar switch/if e validar regras
    // WELCOME10 => 10% se subtotal >= DISCOUNT_MIN_SUBTOTAL
    // FREESHIP  => desconto igual ao custo do envio (aplicado depois via regra simples)
    if (!code) return 0;

    switch (code.toUpperCase()) {
      case "WELCOME10":
        return subtotal >= DISCOUNT_MIN_SUBTOTAL ? subtotal * 0.10 : 0;
      default:
        return 0;
    }
  }

  function calcTotal(subtotal, shipping, discount) {
    // TODO: garantir que total nunca é negativo
    return Math.max(0, subtotal + shipping - discount);
  }

  // ---------- DOM render ----------
  function productCardHTML(p) {
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
    const el = $(containerSelector);
    if (!el) return;
    el.innerHTML = products.map(productCardHTML).join("");
  }

  function renderProductDetails(product, containerSelector) {
    const el = $(containerSelector);
    if (!el) return;

    if (!product) {
      el.innerHTML = `<div class="card"><p class="muted">Produto não encontrado.</p></div>`;
      return;
    }

    const stock = product.inStock ? "Em stock" : "Sem stock";
    const stockClass = product.inStock ? "ok" : "danger";

    el.innerHTML = `
      <div class="media" aria-hidden="true"></div>

      <div class="card">
        <div class="pills">
          <span class="pill ${stockClass}">${stock}</span>
          <span class="pill">${safeText(product.category)}</span>
          <span class="pill">${safeText(product.color)}</span>
        </div>

        <h2 class="h2" style="margin-top:10px">${safeText(product.name)}</h2>
        <p class="muted">${safeText(product.description)}</p>

        <div class="card-row" style="margin-top:10px">
          <div class="muted">Rating</div>
          <div style="font-weight:700">${ratingStars(product.rating)} (${product.rating.toFixed(1)})</div>
        </div>

        <div class="card-row" style="margin-top:10px">
          <div class="muted">Preço</div>
          <div class="price">${formatPrice(product.price)}</div>
        </div>

        <div class="divider"></div>

        <h3 class="h3">Especificações</h3>
        <div class="kv">
          <div class="item"><div class="k">Tamanhos</div><div class="v">${product.sizes.join(", ")}</div></div>
          <div class="item"><div class="k">Materiais</div><div class="v">${product.materials.join(", ")}</div></div>
          <div class="item"><div class="k">Criado em</div><div class="v">${safeText(product.createdAt)}</div></div>
          <div class="item"><div class="k">Tags</div><div class="v">${product.tags.join(", ")}</div></div>
        </div>

        <div class="divider"></div>
        <p class="muted">
          (Modo demo) Para “adicionar ao carrinho”, edita o array <code>CART</code> em <code>data.js</code>.
        </p>
      </div>
    `;
  }

  function renderCart(items, containerSelector) {
    const el = $(containerSelector);
    if (!el) return;

    if (!items.length) {
      el.innerHTML = `<p class="muted">Carrinho vazio.</p>`;
      return;
    }

    el.innerHTML = items.map(it => {
      const p = it.product;

      const sizeOk = isValidSize(p, it.size);
      const sizePill = sizeOk
        ? `<span class="pill">Tamanho: ${safeText(it.size)}</span>`
        : `<span class="pill danger">Tamanho inválido</span>`;

      return `
        <div class="cart-item">
          <div class="mini" aria-hidden="true"></div>
          <div class="meta">
            <p class="title">${safeText(p.name)}</p>
            <p class="sub">${safeText(p.category)} • ${safeText(p.color)} • Qty: ${it.qty}</p>
            <div class="pills" style="margin-top:6px">
              ${sizePill}
              <span class="pill">${p.inStock ? "Em stock" : "Sem stock"}</span>
            </div>
          </div>
          <div style="font-weight:800">${formatPrice(p.price * it.qty)}</div>
        </div>
      `;
    }).join("");
  }

  function renderSummary(summary, containerSelector) {
    const el = $(containerSelector);
    if (!el) return;

    el.innerHTML = `
      <div class="row"><span class="muted">Subtotal</span><span>${formatPrice(summary.subtotal)}</span></div>
      <div class="row"><span class="muted">Envio</span><span>${formatPrice(summary.shipping)}</span></div>
      <div class="row"><span class="muted">Desconto</span><span>- ${formatPrice(summary.discount)}</span></div>
      <div class="divider"></div>
      <div class="row total"><span>Total</span><span>${formatPrice(summary.total)}</span></div>
      ${summary.code
        ? `<p class="muted" style="margin-top:10px">Código aplicado: <code>${safeText(summary.code)}</code></p>`
        : `<p class="muted" style="margin-top:10px">Sem código aplicado.</p>`
      }
    `;
  }

  function renderFiltersSummary(filters) {
    const el = $("#filtersSummary");
    if (!el) return;

    const parts = Object.entries(filters)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${k}: ${v}`);

    el.textContent = parts.length ? parts.join(" • ") : "Nenhum (catálogo completo)";
  }

  function renderResultsCount(filteredCount, totalCount) {
    const el = $("#resultsCount");
    if (!el) return;
    el.textContent = `A mostrar ${filteredCount} de ${totalCount} produtos`;
  }

  // ---------- Page controllers ----------
  function initHome() {
    const featured = getFeaturedProducts(window.PRODUCTS);
    renderProductGrid(featured, "#featuredGrid");

    const arrivals = getNewArrivals(window.PRODUCTS);
    renderProductGrid(arrivals, "#newArrivalsGrid");
  }

  function initCatalog() {
    const q = parseQuery();
    const filters = {
      category: q.category || "",
      color: q.color || "",
      inStock: q.inStock || "",
      minPrice: q.minPrice || "",
      maxPrice: q.maxPrice || "",
      tag: q.tag || ""
    };

    const sortKey = q.sort || "";

    const filtered = applyFilters(window.PRODUCTS, filters);
    const sorted = sortProducts(filtered, sortKey);

    renderFiltersSummary({ ...filters, sort: sortKey });
    renderResultsCount(sorted.length, window.PRODUCTS.length);
    renderProductGrid(sorted, "#catalogGrid");
  }

  function initProduct() {
    const q = parseQuery();
    const id = q.id || "";
    const product = getProductById(id);

    renderProductDetails(product, "#productDetails");

    if (product) {
      const related = getRelatedProducts(window.PRODUCTS, product);
      renderProductGrid(related, "#relatedGrid");
    } else {
      renderProductGrid([], "#relatedGrid");
    }
  }

  function initCart() {
    const q = parseQuery();
    const code = q.code || "";

    const detailed = getCartDetailed(window.CART, window.PRODUCTS);

    const subtotal = calcSubtotal(detailed);
    const shipping = calcShipping(subtotal);

    // FREESHIP: desconto igual ao envio (feito aqui para não complicar calcDiscount)
    const baseDiscount = calcDiscount(subtotal, code);
    const extraDiscount = (code && code.toUpperCase() === "FREESHIP") ? shipping : 0;

    const discount = baseDiscount + extraDiscount;
    const total = calcTotal(subtotal, shipping, discount);

    renderCart(detailed, "#cartList");
    renderSummary({ subtotal, shipping, discount, total, code }, "#cartSummary");
  }

  // ---------- Bootstrap ----------
  // TODO: podes adicionar uma validação/console logs se quiseres
  if (page === "home") initHome();
  if (page === "catalog") initCatalog();
  if (page === "product") initProduct();
  if (page === "cart") initCart();
})();
