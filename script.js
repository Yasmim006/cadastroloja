let products = [
    { id: 1, name: "Rosas Vermelhas", price: 250.00, image: "https://www.donaflorindafloricultura.com.br/wp-content/uploads/2019/05/buque-flores-vermelhas-2.jpeg", description: "Um buquê clássico e apaixonante de rosas vermelhas, perfeito para expressar amor e admiração.", category: "buques" },
    { id: 2, name: "Buquê Misto Campo", price: 280.00, image: "https://cactusfloricultura.com.br/wp-content/uploads/2020/01/20200316_185845-scaled.jpg", description: "Uma alegre combinação de flores variadas, trazendo a beleza natural de um campo florido para sua casa.", category: "buques" },
    { id: 3, name: "Rosas e Gipsofilas", price: 300.00, image: "https://floriculturaflorianopolis.com.br/wp-content/uploads/2022/05/Buque-de-Flores-Florianopolis-Rosas-Importadas-977x1024.jpeg", description: "A delicadeza das gipsofilas complementa a beleza das rosas, criando um arranjo romântico e sofisticado.", category: "arranjos" },
    { id: 4, name: "Flores Tropicais Vibrantes", price: 290.00, image: "https://www.cestaeflor.com.br/wp-content/uploads/2018/01/Buque-flores-nobres-color.jpg", description: "Um explosão de cores e formas exóticas, ideal para quem ama a vivacidade e energia da flora tropical.", category: "arranjos" },
    { id: 5, name: "Suspiro do Amor", price: 280.00, image: "https://floriculturasp.com.br/florimagens/produtos/0369b73b76b40cb95ff9168746896768.jpg.webp", description: "Um arranjo suave e gracioso que transmite carinho e afeto, com tons pastéis e flores delicadas.", category: "presentes" },
    { id: 6, name: "Buquê Elegância Branca", price: 230.00, image: "https://taquariflores.com.br/wp-content/uploads/2022/09/buque-de-flores-com-12-lirios-brancos2.jpg", description: "Lírios brancos puros e elegantes, um símbolo de paz e pureza, perfeito para ocasiões especiais.", category: "buques" },
    { id: 7, name: "Rosas do Encanto", price: 300.00, image:"ht", description: "Rosas em tons diversos, cada uma com seu encanto particular, formando um presente inesquecível.", category: "buques" },
    { id: 8, name: "Buquê Rosas Mista", price: 300.00, image: "https://floriculturabellavita.com.br/634-thickbox_default/buque-de-flores-mistas-com-rosas.jpg", description: "Uma mistura vibrante de rosas coloridas, trazendo alegria e diversidade em um único buquê.", category: "buques" },
    { id: 9, name: "Buquê Noite Romântica", price: 350.00, image: "https://images.app.goo.gl/DWYwW1m4ubTinCWv7", description: "Flores em tons profundos e envolventes, criadas para uma noite especial e memória.", category: "arranjos" },
    { id: 10, name: "Buquê Amor Clássico", price: 450.00, image: "https://patriciaflores.com.br/wp-content/uploads/2023/03/buque_de_flores_rosas_classic_linha_premium_franca_sp.webp", description: "Rosas vermelhas de alta qualidade, um buquê luxuoso que representa o amor eterno e incondicional.", category: "presentes" },
];

let clients = [
    { id: 1, name: "Carlos Cardoso", email: "carlos@gmail.com", address: "Rua das Flores, 123" },
    { id: 2, name: "Yasmim dos Santos", email: "yas@gmail.com", address: "Avenida Principal, 456" }
];

let cart = [];
let appliedCoupon = null;

const coupons = {
    "FLORA10": { type: "percentage", value: 10, minPurchase: 100 },
    "DESCONTO50": { type: "fixed", value: 50, minPurchase: 200 }
};


let nextProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
let nextClientId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
let currentEditingProductId = null;
let currentEditingClientId = null;


const productList = document.getElementById("product-list");
const messageDiv = document.getElementById("message");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-btn");
const loginModal = document.getElementById("login-modal");
const loginButton = document.getElementById("login-button-icon");
const welcomeMessage = document.getElementById("welcome-message");
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");

const cadastroTab = document.getElementById("cadastro-tab");
const cadastroSection = document.getElementById("cadastro-section");
const cadastroProdutosBtn = document.getElementById("cadastro-produtos-btn");
const cadastroClientesBtn = document.getElementById("cadastro-clientes-btn");
const cadastroProdutosForm = document.getElementById("cadastro-produtos-form");
const cadastroClientesForm = document.getElementById("cadastro-clientes-form");
const formProduto = document.getElementById("form-produto");
const formCliente = document.getElementById("form-cliente");
const listaProdutosTableBody = document.querySelector("#lista-produtos tbody");
const listaClientesTableBody = document.querySelector("#lista-clientes tbody");
const listaProdutosDiv = document.getElementById("lista-produtos");
const listaClientesDiv = document.getElementById("lista-clientes");

const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartSection = document.getElementById("cart-section");
const cartItemsContainer = document.getElementById("cart-items-container");
const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

const checkoutSection = document.getElementById("checkout-section");
const checkoutItemsTableBody = document.getElementById("checkout-items-table-body");
const checkoutSubtotalSpan = document.getElementById("checkout-subtotal");
const checkoutDiscountSpan = document.getElementById("checkout-discount");
const checkoutFinalTotalSpan = document.getElementById("checkout-final-total");
const couponInput = document.getElementById("coupon-input");
const applyCouponBtn = document.getElementById("apply-coupon-btn");
const couponMessage = document.getElementById("coupon-message");
const confirmPurchaseBtn = document.querySelector(".confirm-purchase-btn");
const backToCartBtn = document.querySelector(".back-to-cart-btn");


function formatPrice(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    messageDiv.textContent = "";

    if (filteredProducts.length === 0) {
        messageDiv.textContent = "Nenhum produto encontrado!";
        return;
    }

    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            addProductToCart(productId);
        });
    });
}

function searchProduct() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === "") {
        messageDiv.textContent = "Por favor, digite um termo de pesquisa!";
        displayProducts(products);
        return;
    }
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function showSection(sectionId) {
    document.querySelectorAll('.main-section').forEach(section => {
        section.classList.add('hidden');
    });

    categoryButtons.forEach(btn => btn.classList.remove("active"));
    messageDiv.textContent = "";

    if (sectionId === 'product-list') {
        productList.classList.remove('hidden');
        document.querySelector('.category-btn[data-category="todos"]').classList.add('active');
        displayProducts(products);
    } else if (sectionId === 'cadastro-section') {
        cadastroSection.classList.remove('hidden');
        cadastroTab.classList.add('active');
        showCadastroSubForm('produtos');
    } else if (sectionId === 'cart-section') {
        cartSection.classList.remove('hidden');
        renderCart();
    } else if (sectionId === 'checkout-section') {
        checkoutSection.classList.remove('hidden');
        renderCheckoutSummary();
    }
}

categoryButtons.forEach(button => {
    button.addEventListener("click", function() {
        const category = this.dataset.category;
        if (category === "cadastro") {
            showSection('cadastro-section');
        } else {
            showSection('product-list');
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            if (category === "todos") {
                displayProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                displayProducts(filtered);
            }
        }
    });
});

document.querySelector(".search-box button").addEventListener("click", () => {
    showSection('product-list');
    searchProduct();
});

cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    showSection('cart-section');
});


let currentUser = null;

function openLoginModal() {
    loginModal.style.display = "flex";
    loginMessage.textContent = "";
    emailInput.value = "";
    passwordInput.value = "";
}

function closeLoginModal() {
    loginModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        closeLoginModal();
    }
}

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email === "test@gmail.com" && password === "123456") {
        currentUser = { email: email, name: "Usuário Teste" };
        loginMessage.textContent = "";
        closeLoginModal();
        updateUIForLoggedInUser();
        messageDiv.textContent = `Bem-vindo de volta, ${currentUser.name}!`;
    } else {
        loginMessage.textContent = "E-mail ou senha incorretos. Tente novamente.";
    }
});

function updateUIForLoggedInUser() {
    if (currentUser) {
        loginButton.style.display = "none";
        welcomeMessage.textContent = `Olá, ${currentUser.name}!`;
        welcomeMessage.style.display = "inline";
        let logoutButton = document.getElementById("logout-button");
        if (!logoutButton) {
            logoutButton = document.createElement("button");
            logoutButton.id = "logout-button";
            logoutButton.textContent = "Sair";
            logoutButton.onclick = logoutUser;
            welcomeMessage.parentNode.appendChild(logoutButton);
        }
    } else {
        loginButton.style.display = "flex";
        welcomeMessage.style.display = "none";
        welcomeMessage.textContent = "";
        const logoutButton = document.getElementById("logout-button");
        if (logoutButton) {
            logoutButton.remove();
        }
    }
}

function logoutUser() {
    currentUser = null;
    updateUIForLoggedInUser();
    messageDiv.textContent = "Você foi desconectado.";
}


function showCadastroSubForm(formType) {
    cadastroProdutosForm.classList.add('hidden');
    cadastroClientesForm.classList.add('hidden');
    listaProdutosDiv.classList.add('hidden');
    listaClientesDiv.classList.add('hidden');

    cadastroProdutosBtn.classList.remove('active');
    cadastroClientesBtn.classList.remove('active');

    if (formType === 'produtos') {
        cadastroProdutosForm.classList.remove('hidden');
        listaProdutosDiv.classList.remove('hidden');
        cadastroProdutosBtn.classList.add('active');
        renderProductList();
    } else if (formType === 'clientes') {
        cadastroClientesForm.classList.remove('hidden');
        listaClientesDiv.classList.remove('hidden');
        cadastroClientesBtn.classList.add('active');
        renderClientList();
    }
}

cadastroProdutosBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showCadastroSubForm('produtos');
    currentEditingProductId = null;
    formProduto.reset();
});

cadastroClientesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showCadastroSubForm('clientes');
    currentEditingClientId = null;
    formCliente.reset();
});

formProduto.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = parseFloat(document.getElementById('product-price-input').value);
    const image = document.getElementById('product-image-url').value || 'https://via.placeholder.com/250x200?text=Produto';
    const category = document.getElementById('product-category-input').value;

    if (currentEditingProductId) {
        const productIndex = products.findIndex(p => p.id === currentEditingProductId);
        if (productIndex !== -1) {
            products[productIndex] = {
                id: currentEditingProductId,
                name,
                description,
                price,
                image,
                category
            };
            alert('Produto atualizado com sucesso!');
        }
        currentEditingProductId = null;
        formProduto.querySelector('button[type="submit"]').textContent = 'Salvar Produto';
    } else {
        const newProduct = {
            id: nextProductId++,
            name,
            description,
            price,
            image,
            category
        };
        products.push(newProduct);
        alert('Produto cadastrado com sucesso!');
    }

    formProduto.reset();
    renderProductList();
    if (productList.classList.contains('hidden')) {
    } else {
        displayProducts(products);
    }
});

function renderProductList() {
    listaProdutosTableBody.innerHTML = '';
    if (products.length === 0) {
        listaProdutosTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = listaProdutosTableBody.insertRow();
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${formatPrice(product.price)}</td>
            <td class="action-buttons">
                <button class="edit-btn" data-id="${product.id}" data-type="product">Editar</button>
                <button class="delete-btn" data-id="${product.id}" data-type="product">Excluir</button>
            </td>
        `;
    });

    document.querySelectorAll('.edit-btn[data-type="product"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const productToEdit = products.find(p => p.id === productId);
            if (productToEdit) {
                document.getElementById('product-name').value = productToEdit.name;
                document.getElementById('product-description').value = productToEdit.description;
                document.getElementById('product-price-input').value = productToEdit.price;
                document.getElementById('product-image-url').value = productToEdit.image;
                document.getElementById('product-category-input').value = productToEdit.category;
                currentEditingProductId = productId;
                formProduto.querySelector('button[type="submit"]').textContent = 'Atualizar Produto';
            }
        });
    });

    document.querySelectorAll('.delete-btn[data-type="product"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                products = products.filter(p => p.id !== productId);
                renderProductList();
                displayProducts(products);
                messageDiv.textContent = "Produto excluído com sucesso!";
            }
        });
    });
}

formCliente.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const address = document.getElementById('client-address').value;

    if (currentEditingClientId) {
        const clientIndex = clients.findIndex(c => c.id === currentEditingClientId);
        if (clientIndex !== -1) {
            clients[clientIndex] = {
                id: currentEditingClientId,
                name,
                email,
                address
            };
            alert('Cliente atualizado com sucesso!');
        }
        currentEditingClientId = null;
        formCliente.querySelector('button[type="submit"]').textContent = 'Salvar Cliente';
    } else {
        const newClient = {
            id: nextClientId++,
            name,
            email,
            address
        };
        clients.push(newClient);
        alert('Cliente cadastrado com sucesso!');
    }

    formCliente.reset();
    renderClientList();
});

function renderClientList() {
    listaClientesTableBody.innerHTML = '';
    if (clients.length === 0) {
        listaClientesTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum cliente cadastrado.</td></tr>';
        return;
    }

    clients.forEach(client => {
        const row = listaClientesTableBody.insertRow();
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td class="action-buttons">
                <button class="edit-btn" data-id="${client.id}" data-type="client">Editar</button>
                <button class="delete-btn" data-id="${client.id}" data-type="client">Excluir</button>
            </td>
        `;
    });

    document.querySelectorAll('.edit-btn[data-type="client"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const clientId = parseInt(e.target.dataset.id);
            const clientToEdit = clients.find(c => c.id === clientId);
            if (clientToEdit) {
                document.getElementById('client-name').value = clientToEdit.name;
                document.getElementById('client-email').value = clientToEdit.email;
                document.getElementById('client-address').value = clientToEdit.address;
                currentEditingClientId = clientId;
                formCliente.querySelector('button[type="submit"]').textContent = 'Atualizar Cliente';
            }
        });
    });

    document.querySelectorAll('.delete-btn[data-type="client"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const clientId = parseInt(e.target.dataset.id);
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                clients = clients.filter(c => c.id !== clientId);
                renderClientList();
                messageDiv.textContent = "Cliente excluído com sucesso!";
            }
        });
    });
}


function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function addProductToCart(productId) {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    updateCartCount();
    messageDiv.textContent = "Produto adicionado ao carrinho!";
    setTimeout(() => messageDiv.textContent = "", 2000);
    renderCart();
}

function removeProductFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCartCount();
    renderCart();
    messageDiv.textContent = "Produto removido do carrinho!";
    setTimeout(() => messageDiv.textContent = "", 2000);
}

function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(0, newQuantity);
        if (item.quantity === 0) {
            removeProductFromCart(productId);
        }
        updateCartCount();
        renderCart();
    }
}

function clearCart() {
    if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
        cart = [];
        appliedCoupon = null;
        updateCartCount();
        renderCart();
        messageDiv.textContent = "Carrinho esvaziado!";
        setTimeout(() => messageDiv.textContent = "", 2000);
    }
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
        checkoutBtn.disabled = true;
        return;
    }
    checkoutBtn.disabled = false;

    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        if (product) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <p>Preço: ${formatPrice(product.price)}</p>
                    <div class="cart-item-quantity-control">
                        <button class="quantity-btn" data-id="${product.id}" data-action="decrease">-</button>
                        <span>${cartItem.quantity}</span>
                        <button class="quantity-btn" data-id="${product.id}" data-action="increase">+</button>
                    </div>
                    <p class="cart-item-total">Total: ${formatPrice(product.price * cartItem.quantity)}</p>
                </div>
                <button class="remove-from-cart-btn" data-id="${product.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        }
    });

    document.querySelectorAll(".quantity-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            const item = cart.find(item => item.productId === productId);
            if (item) {
                if (action === "increase") {
                    updateCartItemQuantity(productId, item.quantity + 1);
                } else if (action === "decrease") {
                    updateCartItemQuantity(productId, item.quantity - 1);
                }
            }
        });
    });

    document.querySelectorAll(".remove-from-cart-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeProductFromCart(productId);
        });
    });
}

clearCartBtn.addEventListener("click", clearCart);
checkoutBtn.addEventListener("click", () => showSection('checkout-section'));


function calculateOrderTotals() {
    let subtotal = 0;
    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        if (product) {
            subtotal += product.price * cartItem.quantity;
        }
    });

    let discount = 0;
    if (appliedCoupon) {
        const couponData = coupons[appliedCoupon];
        if (couponData) {
            if (subtotal >= couponData.minPurchase) {
                if (couponData.type === "percentage") {
                    discount = subtotal * (couponData.value / 100);
                } else if (couponData.type === "fixed") {
                    discount = couponData.value;
                }
            }
        }
    }

    const finalTotal = subtotal - discount;
    return { subtotal, discount, finalTotal };
}

function renderCheckoutSummary() {
    checkoutItemsTableBody.innerHTML = '';
    const { subtotal, discount, finalTotal } = calculateOrderTotals();

    if (cart.length === 0) {
        checkoutItemsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Seu carrinho está vazio.</td></tr>';
    } else {
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            if (product) {
                const row = checkoutItemsTableBody.insertRow();
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${cartItem.quantity}</td>
                    <td>${formatPrice(product.price)}</td>
                    <td>${formatPrice(product.price * cartItem.quantity)}</td>
                `;
            }
        });
    }

    checkoutSubtotalSpan.textContent = formatPrice(subtotal);
    checkoutDiscountSpan.textContent = formatPrice(discount);
    checkoutFinalTotalSpan.textContent = formatPrice(finalTotal);

    couponMessage.textContent = "";
    if (appliedCoupon) {
        couponInput.value = appliedCoupon;
        couponMessage.textContent = `Cupom "${appliedCoupon}" aplicado!`;
        couponMessage.style.color = "#28a745";
    } else {
        couponInput.value = "";
    }
}

applyCouponBtn.addEventListener("click", () => {
    const code = couponInput.value.toUpperCase().trim();
    if (code === "") {
        couponMessage.textContent = "Por favor, digite um cupom.";
        couponMessage.style.color = "#d64d4d";
        appliedCoupon = null;
        renderCheckoutSummary();
        return;
    }

    const couponData = coupons[code];
    const { subtotal } = calculateOrderTotals();

    if (couponData) {
        if (subtotal >= couponData.minPurchase) {
            appliedCoupon = code;
            couponMessage.textContent = `Cupom "${code}" aplicado com sucesso!`;
            couponMessage.style.color = "#28a745";
        } else {
            couponMessage.textContent = `Cupom "${code}" requer uma compra mínima de ${formatPrice(couponData.minPurchase)}.`;
            couponMessage.style.color = "#d64d4d";
            appliedCoupon = null;
        }
    } else {
        couponMessage.textContent = `Cupom "${code}" inválido.`;
        couponMessage.style.color = "#d64d4d";
        appliedCoupon = null;
    }
    renderCheckoutSummary();
});

confirmPurchaseBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.");
        showSection('product-list');
        return;
    }
    const { finalTotal } = calculateOrderTotals();
    alert(`Compra finalizada com sucesso! Valor total: ${formatPrice(finalTotal)}`);
    cart = [];
    appliedCoupon = null;
    updateCartCount();
    showSection('product-list');
    messageDiv.textContent = "Sua compra foi concluída! Obrigado!";
    setTimeout(() => messageDiv.textContent = "", 3000);
});

backToCartBtn.addEventListener("click", () => showSection('cart-section'));


window.onload = () => {
    showSection('product-list');
    updateUIForLoggedInUser();
    updateCartCount();
};
