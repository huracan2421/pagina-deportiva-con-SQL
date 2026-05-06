// ==================== CONFIGURACIÓN GLOBAL ====================
let currentUser = null;
let cart = [];

// ==================== LOGIN ====================
async function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");

    if (!username || !password) {
        errorMsg.textContent = "Ingresa usuario y contraseña";
        return;
    }

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            sessionStorage.setItem("currentUser", JSON.stringify(data.user));
            window.location.href = "index.html";
        } else {
            errorMsg.textContent = data.message || "Usuario o contraseña incorrectos";
        }
    } catch (err) {
        errorMsg.textContent = "Error de conexión con el servidor";
        console.error(err);
    }
}

// ==================== CHECKOUT - GUARDAR COMPRA EN BASE DE DATOS ====================
async function processPayment() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!nombre || !email || !direccion || !telefono) {
        return alert("Todos los campos son obligatorios");
    }

    const savedUser = sessionStorage.getItem("currentUser");
    if (!savedUser) return alert("Debes iniciar sesión para completar la compra");

    const user = JSON.parse(savedUser);
    const total = parseFloat(document.getElementById("total-amount").textContent.replace(/\./g, ''));

    const orderData = {
        user_id: user.id,
        total: total,
        direccion: direccion,
        telefono: telefono,
        items: cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }))
    };

    try {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const data = await res.json();

        if (data.success) {
            document.getElementById("success-details").innerHTML = `
                <p><strong>Pedido #${data.orderId}</strong></p>
                <p><strong>Cliente:</strong> ${nombre}</p>
                <p><strong>Total pagado:</strong> $${total.toLocaleString('es-CL')}</p>
            `;
            document.querySelector('.checkout-page').style.display = 'none';
            document.getElementById("success-screen").style.display = "flex";
            
            sessionStorage.clear();
            cart = [];
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Error al conectar con el servidor");
        console.error(err);
    }
}

// ==================== CARRITO Y PRODUCTOS ====================
const products = [
    { id: 1, name: "Conjunto Deportivo Azul", price: 89990, description: "Buzo y pantalón Adidas", image: "images/1.jpg" },
    { id: 2, name: "Camiseta de Fútbol", price: 45990, description: "Diseño personalizado", image: "images/2.webp" },
    { id: 3, name: "Conjunto Negro Reebok", price: 79990, description: "Jacket impermeable", image: "images/3.webp" },
    { id: 4, name: "Conjunto Azul Adidas", price: 94990, description: "Buzo y pantalón", image: "images/4.webp" },
    { id: 5, name: "Conjunto Negro Adidas", price: 84990, description: "Set deportivo", image: "images/5.webp" },
    { id: 6, name: "Conjunto Under Armour", price: 89990, description: "Set de alto rendimiento", image: "images/6.webp" },
    { id: 7, name: "Conjunto Gris", price: 69990, description: "Set completo gris", image: "images/7.webp" },
    { id: 8, name: "Conjunto Verde Oliva", price: 59990, description: "Top y short", image: "images/8.webp" },
    { id: 9, name: "Conjunto Rojo", price: 74990, description: "Polera y short fitness", image: "images/9.jpeg" },
    { id: 10, name: "Conjunto Beige", price: 89990, description: "Buzo y pantalón urbano", image: "images/10.jpg" }
];

function loadProducts() {
    const container = document.getElementById("products");
    if (!container) return;

    let html = "";
    products.forEach(p => {
        html += `
            <div class="product-card">
                <img src="${p.image}" alt="${p.name}">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <div class="price">$${(p.price).toLocaleString('es-CL')}</div>
                    <button onclick="addToCart(${p.id})" class="add-btn">Agregar al carrito</button>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });

    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// ==================== CARRITO ====================
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
}

function goToCheckout() {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    sessionStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
}

// ==================== CHECKOUT - CARGA DE PÁGINA ====================
function loadCheckout() {
    cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
            <div class="order-item">
                <div><strong>${item.name}</strong><br><small>${item.description}</small></div>
                <div style="text-align:right">
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">–</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <span style="font-weight:700;display:block;margin:8px 0">$${(subtotal).toLocaleString('es-CL')}</span>
                    <button onclick="removeFromCart(${index})" style="color:#ef4444">🗑️</button>
                </div>
            </div>`;
    });

    document.getElementById("order-items").innerHTML = html || "<p style='text-align:center;color:#64748b;padding:40px;'>Tu carrito está vacío</p>";
    document.getElementById("total-amount").textContent = total.toLocaleString('es-CL');
}

function changeQuantity(index, change) {
    if (!cart[index]) return;
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCheckout();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCheckout();
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

function showWelcome() {
    const section = document.getElementById('auth-section');
    if (!section) return;
    section.innerHTML = `
        <span style="color:#22c55e;font-weight:600;">Hola, ${currentUser.name.split(' ')[0]} 👋</span>
        <button onclick="logout()" style="background:#ef4444;color:white;padding:8px 16px;border-radius:6px;">Cerrar Sesión</button>
        <div onclick="goToCheckout()" class="cart-icon">🛒 <span id="cart-count">0</span></div>
    `;
}

// ==================== INICIALIZACIÓN ====================
window.onload = () => {
    cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (document.getElementById("products")) loadProducts();
    if (document.getElementById("order-items")) loadCheckout();

    const savedUser = sessionStorage.getItem("currentUser");
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showWelcome();
    } else if (document.getElementById('auth-section')) {
        document.getElementById('auth-section').innerHTML = `
            <a href="login.html" style="background:#22c55e;color:#111;padding:8px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Iniciar Sesión</a>
            <div onclick="goToCheckout()" class="cart-icon">🛒 <span id="cart-count">0</span></div>
        `;
    }

    updateCartCount();
};