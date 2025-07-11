// File: frontend/RijayaAdv.js (LENGKAP)

let cart = JSON.parse(localStorage.getItem("rijayaCart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({ duration: 800, once: true, offset: 100 });
  loadProducts();
  updateCartUI();

  const productListElement = document.getElementById("product-list");
  if (productListElement) {
    productListElement.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      if (button.classList.contains("view-details")) {
        showProductDetails(button.dataset.id);
      }
      if (button.classList.contains("add-to-cart")) {
        const { id, name, price } = button.dataset;
        addToCart(id, name, parseFloat(price));
      }
    });
  }

  const detailModal = document.getElementById("productDetailModal");
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      const button = e.target.closest("button.add-to-cart");
      if (button) {
        const { id, name, price } = button.dataset;
        addToCart(id, name, parseFloat(price));
        const modalInstance = bootstrap.Modal.getInstance(detailModal);
        if (modalInstance) modalInstance.hide();
      }
    });
  }
});

async function showProductDetails(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
    if (!response.ok) throw new Error("Gagal mengambil detail produk.");
    const product = await response.json();
    document.getElementById("product-detail-image").src = product.image;
    document.getElementById("product-detail-name").textContent = product.name;
    document.getElementById("product-detail-description").textContent = product.description;
    document.getElementById("product-detail-price").textContent = `Rp ${product.price.toLocaleString("id-ID")}${product.priceUnit || ""}`;
    const addToCartWrapper = document.getElementById("product-detail-add-to-cart-wrapper");
    addToCartWrapper.innerHTML = `<button class="btn btn-danger btn-lg add-to-cart" data-id="${product._id}" data-name="${product.name.replace(/'/g, "\\'")}" data-price="${product.price}"><i class="bi bi-cart-plus-fill"></i> Add to Cart</button>`;
    new bootstrap.Modal(document.getElementById("productDetailModal")).show();
  } catch (error) {
    showToast("Gagal menampilkan detail produk.", "danger");
  }
}

async function loadProducts() {
  const productListContainer = document.getElementById("product-list");
  if (!productListContainer) return;
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) throw new Error("Gagal memuat data produk.");
    const products = await response.json();
    productListContainer.innerHTML = "";
    products.forEach((product) => {
      productListContainer.innerHTML += `
        <div class="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
          <div class="card product-card w-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text text-danger fw-bold mt-auto">Rp ${product.price.toLocaleString("id-ID")}${product.priceUnit || ""}</p>
              <div class="d-grid gap-2 mt-3">
                  <button class="btn btn-outline-light btn-sm view-details" data-id="${product._id}">Lihat Detail</button>
                  <button class="btn btn-danger add-to-cart" data-id="${product._id}" data-name="${product.name.replace(/'/g, "\\'")}" data-price="${product.price}"><i class="bi bi-cart-plus-fill"></i> Add to Cart</button>
              </div>
            </div>
          </div>
        </div>`;
    });
    if (window.AOS) AOS.refresh();
  } catch (error) {
    productListContainer.innerHTML = `<p class="text-center text-danger col-12">${error.message}</p>`;
  }
}

async function registerUser() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  if (!name || !email || !password) return showToast("Mohon isi semua kolom.", "danger");
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registrasi Gagal");
    localStorage.setItem("userInfo", JSON.stringify(data));
    showToast("Registrasi berhasil!", "success");
    setTimeout(() => window.location.reload(), 1500);
  } catch (error) {
    showToast(`Registrasi Gagal: ${error.message}`, "danger");
  }
}

async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  if (!email || !password) return showToast("Mohon isi email dan password.", "danger");
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login Gagal");
    localStorage.setItem("userInfo", JSON.stringify(data));
    showToast("Login berhasil!", "success");
    setTimeout(() => window.location.reload(), 1500);
  } catch (error) {
    showToast(`Login Gagal: ${error.message}`, "danger");
  }
}

async function placeOrder() {
  const shippingInfo = { fullName: document.getElementById("checkoutName").value, email: document.getElementById("checkoutEmail").value, phone: document.getElementById("checkoutPhone").value, address: document.getElementById("checkoutAddress").value };
  const paymentMethod = document.getElementById("checkoutPayment").value;
  if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !paymentMethod) return showToast("Mohon lengkapi semua informasi checkout.", "danger");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo || !userInfo.token) return showToast("Autentikasi gagal. Silakan login kembali.", "danger");
  const orderData = { orderItems: cart, shippingInfo, paymentMethod, totalPrice: cart.reduce((acc, item) => acc + item.price * item.qty, 0) };
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${userInfo.token}` }, body: JSON.stringify(orderData) });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal membuat pesanan.");
    }
    localStorage.setItem("lastShippingInfo", JSON.stringify(shippingInfo));
    showToast("Terima kasih! Pesanan Anda telah berhasil dibuat.", "success");
    cart = [];
    localStorage.removeItem("rijayaCart");
    updateCartUI();
    const checkoutModalInstance = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
    if (checkoutModalInstance) checkoutModalInstance.hide();
  } catch (error) {
    showToast(`Error: ${error.message}`, "danger");
  }
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountBadges = document.querySelectorAll(".cart-count");
  if (!cartItemsContainer || !cartTotalEl || cartCountBadges.length === 0) return;
  cartItemsContainer.innerHTML = "";
  let grandTotal = 0;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center">Keranjang Anda kosong.</p>';
  } else {
    cart.forEach((item, index) => {
      const subTotal = item.price * item.qty;
      grandTotal += subTotal;
      cartItemsContainer.innerHTML += `<div class="cart-item"><div class="row align-items-center"><div class="col-md-7"><h6>${item.name}</h6><small>Rp ${item.price.toLocaleString("id-ID")} x ${item.qty}</small></div><div class="col-md-5 d-flex justify-content-end align-items-center"><span class="fw-bold me-3">Rp ${subTotal.toLocaleString("id-ID")}</span><button class="btn btn-sm btn-outline-danger" onclick="removeItemFromCart(${index})">&times;</button></div></div></div>`;
    });
  }
  cartTotalEl.textContent = grandTotal.toLocaleString("id-ID");
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  cartCountBadges.forEach((badge) => (badge.textContent = totalItems));
}

function addToCart(productId, productName, productPrice) {
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, qty: 1 });
  }
  localStorage.setItem("rijayaCart", JSON.stringify(cart));
  showToast(`'${productName}' ditambahkan ke keranjang!`);
  updateCartUI();
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("rijayaCart", JSON.stringify(cart));
  updateCartUI();
}

function switchToRegister() {
  const loginModalInstance = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  if (loginModalInstance) loginModalInstance.hide();
  new bootstrap.Modal(document.getElementById("registerModal")).show();
}

function switchToLogin() {
  const registerModalInstance = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
  if (registerModalInstance) registerModalInstance.hide();
  new bootstrap.Modal(document.getElementById("loginModal")).show();
}

// ===== FUNGSI DIUBAH MENJADI LEBIH BAIK =====
async function proceedToCheckout() {
  if (cart.length === 0) return showToast('Keranjang Anda kosong!', 'danger');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // Jika tidak login, biarkan form kosong
  if (userInfo && userInfo.token) {
    try {
      // Ambil data profil terbaru langsung dari server
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if (!res.ok) throw new Error('Gagal mengambil data profil.');
      
      const profile = await res.json();
      
      // Isi form checkout dengan data dari profil
      document.getElementById('checkoutName').value = profile.name || '';
      document.getElementById('checkoutEmail').value = profile.email || '';
      document.getElementById('checkoutPhone').value = profile.phone || '';
      document.getElementById('checkoutAddress').value = profile.address || '';

    } catch (error) {
      showToast(error.message, 'danger');
      // Jika gagal, setidaknya isi nama dan email dari localStorage sebagai fallback
      document.getElementById('checkoutName').value = userInfo.name || '';
      document.getElementById('checkoutEmail').value = userInfo.email || '';
    }
  }

  // Selalu kosongkan metode pembayaran agar dipilih manual
  document.getElementById('checkoutPayment').value = '';

  const cartModalInstance = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  if (cartModalInstance) cartModalInstance.hide();
  new bootstrap.Modal(document.getElementById('checkoutModal')).show();
}