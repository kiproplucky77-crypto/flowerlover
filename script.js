
// FLOWER PRODUCTS

const products = [
  {
    id: 1,
    name: "Classic Red Roses",
    category: "Roses",
    price: 39.99,
    old: 49.99,
    tag: "Best seller",
    desc: "A timeless bunch of velvety red roses, beautifully wrapped and ready to make someone feel loved.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 2,
    name: "Pink Rose Bouquet",
    category: "Roses",
    price: 34.99,
    old: 42.99,
    tag: "Popular",
    desc: "Soft pink roses arranged with fresh greenery for birthdays and thoughtful surprises.",
    image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 3,
    name: "Sunny Daisy Mix",
    category: "Mixed",
    price: 29.99,
    old: 35.99,
    tag: "Fresh pick",
    desc: "A cheerful mix of bright seasonal blooms that brings sunshine and colour into any room.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 4,
    name: "Elegant White Lilies",
    category: "Lilies",
    price: 44.99,
    old: 52.99,
    tag: "Elegant",
    desc: "Graceful white lilies with a lovely natural fragrance, perfect for celebrations and home décor.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 5,
    name: "Pastel Dream Bouquet",
    category: "Bouquets",
    price: 49.99,
    old: 59.99,
    tag: "Gift favourite",
    desc: "A hand-tied arrangement of gentle pastel shades, selected to create a soft and romantic gift.",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 6,
    name: "Pink & White Tulips",
    category: "Mixed",
    price: 32.99,
    old: 39.99,
    tag: "New",
    desc: "Fresh tulips in a pretty pink-and-white combination, ideal for brightening someone's day.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 7,
    name: "Romantic Rose Box",
    category: "Roses",
    price: 59.99,
    old: 69.99,
    tag: "Luxury",
    desc: "A luxurious rose arrangement presented in a keepsake gift box for an unforgettable surprise.",
    image: "https://images.unsplash.com/photo-1518882605630-8eb7b5e1b1c3?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 8,
    name: "Garden Flower Basket",
    category: "Bouquets",
    price: 54.99,
    old: 64.99,
    tag: "Handmade",
    desc: "A full garden-inspired basket with a colourful selection of seasonal flowers and foliage.",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 9,
    name: "Sunflower Happiness",
    category: "Mixed",
    price: 27.99,
    old: 33.99,
    tag: "Cheerful",
    desc: "Golden sunflowers arranged to share warmth, optimism and happiness.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=85"
  }
];


// SELECT ELEMENTS

const $ = selector => document.querySelector(selector);

const readStore = key => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

let cart = readStore("flowerlover-cart");
let favorites = readStore("flowerlover-favorites");
let toastTimer;


// SAVE DATA

function saveStore() {
  localStorage.setItem("flowerlover-cart", JSON.stringify(cart));
  localStorage.setItem("flowerlover-favorites", JSON.stringify(favorites));
}


// FORMAT MONEY

function money(value) {
  return "$" + value.toFixed(2);
}


// NOTIFICATION

function notify(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}


// DISPLAY PRODUCTS

function renderProducts() {

  const term = $("#searchInput").value.toLowerCase().trim();
  const category = $("#categoryFilter").value;

  const filtered = products.filter(product => {

    const matchesCategory =
      category === "all" || product.category === category;

    const matchesSearch =
      `${product.name} ${product.desc}`
      .toLowerCase()
      .includes(term);

    return matchesCategory && matchesSearch;
  });

  $("#productGrid").innerHTML = filtered.length
    ? filtered.map(product => `

      <article class="product-card">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80'"
          >

          <span class="sale-tag">${product.tag}</span>

          <button
            class="favorite-btn ${favorites.includes(product.id) ? "active" : ""}"
            data-favorite="${product.id}"
            aria-label="Add to favourites"
          >
            <i class="fas fa-heart"></i>
          </button>

        </div>

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.desc}</p>

          <div class="product-bottom">

            <div>
              <span class="price">${money(product.price)}</span>
              <span class="old-price">${money(product.old)}</span>
            </div>

            <button class="add-btn" data-add="${product.id}">
              <i class="fas fa-cart-plus"></i> Add
            </button>

          </div>

        </div>

      </article>

    `).join("")
    : `<p class="empty-message">No flowers found. Try another search.</p>`;
}


// UPDATE COUNTS

function updateCounts() {

  $("#cartCount").textContent =
    cart.reduce((sum, item) => sum + item.qty, 0);

  $("#favCount").textContent = favorites.length;
}


// DISPLAY CART

function renderCart() {

  const container = $("#cartItems");

  if (!cart.length) {

    container.innerHTML =
      '<p class="empty-message">Your cart is empty. Add a bouquet to get started.</p>';

  } else {

    container.innerHTML = cart.map(item => {

      const product = products.find(p => p.id === item.id);

      return `

        <div class="cart-row">

          <img src="${product.image}" alt="${product.name}">

          <div>

            <h4>${product.name}</h4>

            <small>${money(product.price)} each</small>

            <div class="quantity">

              <button data-qty="${product.id}" data-change="-1">−</button>

              <span>${item.qty}</span>

              <button data-qty="${product.id}" data-change="1">+</button>

            </div>

          </div>

          <button class="remove-item" data-remove="${product.id}">
            <i class="fas fa-trash"></i>
          </button>

        </div>

      `;

    }).join("");

  }

  const total = cart.reduce((sum, item) => {

    const product = products.find(p => p.id === item.id);

    return sum + product.price * item.qty;

  }, 0);

  $("#cartTotal").textContent = money(total);

  updateCounts();
}


// DISPLAY FAVOURITES

function renderFavorites() {

  const container = $("#favoriteItems");

  if (!favorites.length) {

    container.innerHTML =
      '<p class="empty-message">No favourites yet. Tap a heart on a flower you love.</p>';

    return;
  }

  container.innerHTML = favorites.map(id => {

    const product = products.find(p => p.id === id);

    return `

      <div class="cart-row">

        <img src="${product.image}" alt="${product.name}">

        <div>

          <h4>${product.name}</h4>

          <small>${money(product.price)}</small>

          <div class="quantity">
            <button data-fav-add="${product.id}">Add to cart</button>
          </div>

        </div>

        <button class="remove-item" data-fav-remove="${product.id}">
          <i class="fas fa-trash"></i>
        </button>

      </div>

    `;

  }).join("");
}


// ADD TO CART

function addToCart(id) {

  const found = cart.find(item => item.id === id);

  if (found) {
    found.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveStore();
  renderCart();

  notify("Flower added to your cart!");
}


// OPEN AND CLOSE PANELS

function openPanel(id) {

  $("#overlay").classList.add("show");
  $(id).classList.add("open");

}

function closePanels() {

  $("#overlay").classList.remove("show");

  document.querySelectorAll(".side-panel").forEach(panel => {
    panel.classList.remove("open");
  });

}


// DELIVERY DATE

function setMinDate() {

  const today = new Date();

  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  $("#deliveryDate").min = localDate;
  $("#deliveryDate").value = localDate;

}


// PRODUCT BUTTONS

$("#productGrid").addEventListener("click", event => {

  const add = event.target.closest("[data-add]");
  const fav = event.target.closest("[data-favorite]");

  if (add) {
    addToCart(Number(add.dataset.add));
  }

  if (fav) {

    const id = Number(fav.dataset.favorite);

    favorites = favorites.includes(id)
      ? favorites.filter(x => x !== id)
      : [...favorites, id];

    saveStore();

    renderProducts();
    renderFavorites();
    updateCounts();

    notify(
      favorites.includes(id)
        ? "Added to favourites"
        : "Removed from favourites"
    );

  }

});


// CART BUTTONS

$("#cartItems").addEventListener("click", event => {

  const qty = event.target.closest("[data-qty]");
  const remove = event.target.closest("[data-remove]");

  if (qty) {

    const id = Number(qty.dataset.qty);

    const item = cart.find(x => x.id === id);

    item.qty += Number(qty.dataset.change);

    if (item.qty <= 0) {
      cart = cart.filter(x => x.id !== id);
    }

    saveStore();
    renderCart();

  }

  if (remove) {

    cart = cart.filter(
      x => x.id !== Number(remove.dataset.remove)
    );

    saveStore();
    renderCart();

  }

});


// FAVOURITE BUTTONS

$("#favoriteItems").addEventListener("click", event => {

  const add = event.target.closest("[data-fav-add]");
  const remove = event.target.closest("[data-fav-remove]");

  if (add) {
    addToCart(Number(add.dataset.favAdd));
  }

  if (remove) {

    favorites = favorites.filter(
      id => id !== Number(remove.dataset.favRemove)
    );

    saveStore();

    renderFavorites();
    renderProducts();
    updateCounts();

  }

});


// SEARCH AND FILTER

$("#searchInput").addEventListener("input", renderProducts);

$("#categoryFilter").addEventListener("change", renderProducts);


// HEADER BUTTONS

$("#showCart").addEventListener("click", () => {

  renderCart();
  openPanel("#cartPanel");

});

$("#showFavorites").addEventListener("click", () => {

  renderFavorites();
  openPanel("#favoritesPanel");

});

$("#overlay").addEventListener("click", closePanels);

document.querySelectorAll("[data-close]").forEach(button => {

  button.addEventListener("click", closePanels);

});


// MOBILE MENU

$("#menuToggle").addEventListener("click", () => {

  $("#navbar").classList.toggle("show");

});

$("#navbar").querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {
    $("#navbar").classList.remove("show");
  });

});


// ACCOUNT

$("#accountBtn").addEventListener("click", () => {

  notify("Customer accounts will be available soon.");

});


// CHECKOUT

$("#checkoutBtn").addEventListener("click", () => {

  if (!cart.length) {

    notify("Your cart is empty.");

    return;
  }

  closePanels();

  setMinDate();

  $("#checkoutDialog").showModal();

});

$("#closeCheckout").addEventListener("click", () => {

  $("#checkoutDialog").close();

});


// PLACE ORDER

$("#checkoutForm").addEventListener("submit", event => {

  event.preventDefault();

  const orderNumber =
    "FL" + Math.floor(100000 + Math.random() * 900000);

  const order = {

    orderNumber,

    name: $("#customerName").value,

    phone: $("#customerPhone").value,

    email: $("#customerEmail").value,

    address: $("#deliveryAddress").value,

    date: $("#deliveryDate").value,

    giftMessage: $("#giftMessage").value,

    items: cart,

    total: cart.reduce((sum, item) => {

      const product = products.find(p => p.id === item.id);

      return sum + product.price * item.qty;

    }, 0)

  };

  const previous = readStore("flowerlover-orders");

  previous.push(order);

  localStorage.setItem(
    "flowerlover-orders",
    JSON.stringify(previous)
  );

  cart = [];

  saveStore();
  renderCart();

  $("#checkoutDialog").close();

  $("#checkoutForm").reset();

  notify(`Demo order ${orderNumber} saved on this device. No payment was taken.`);

});


// CUSTOMER FEEDBACK

$("#reviewForm").addEventListener("submit", event => {

  event.preventDefault();

  const name = $("#reviewName").value.trim();

  const rating = Number($("#reviewRating").value);

  const message = $("#reviewMessage").value.trim();

  const card = document.createElement("article");

  card.className = "review-card";

  const stars = document.createElement("div");

  stars.className = "stars";

  stars.textContent =
    "★".repeat(rating) + "☆".repeat(5 - rating);

  const quote = document.createElement("p");

  quote.textContent = `"${message}"`;

  const person = document.createElement("div");

  person.className = "review-person";

  const avatar = document.createElement("div");

  avatar.className = "avatar";

  avatar.textContent = name
    .split(/\s+/)
    .map(x => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const details = document.createElement("div");

  const strong = document.createElement("strong");

  strong.textContent = name;

  const small = document.createElement("small");

  small.textContent = "Customer feedback";

  details.append(strong, small);

  person.append(avatar, details);

  card.append(stars, quote, person);

  $("#reviewGrid").prepend(card);

  event.target.reset();

  notify("Thank you for sharing your feedback!");

});


// CONTACT FORM

$("#contactForm").addEventListener("submit", event => {

  event.preventDefault();

  event.target.reset();

  notify("Thanks! Your message has been recorded in this demo.");

});


// START WEBSITE

renderProducts();

renderCart();

renderFavorites();

updateCounts();
