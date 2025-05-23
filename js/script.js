document.addEventListener('DOMContentLoaded', () => {
    // Product data for modal
    const products = [
        { id: 1, title: 'Alebrije Multicolor', category: 'Madera', description: 'Figura tallada y pintada a mano con diseños únicos y colores vibrantes.', price: 850, image: 'assets/images/Alebrijes 1.webp' },
        { id: 2, title: 'Rebozo Tradicional', category: 'Textiles', description: 'Tejido a mano en telar con técnicas ancestrales y tintes naturales.', price: 1200, image: 'assets/images/Prendas de rebozo.webp' },
        { id: 3, title: 'Talavera Decorativa', category: 'Cerámica', description: 'Pieza de cerámica pintada a mano con diseños tradicionales de Puebla.', price: 650, image: 'assets/images/Cerámica de Talavera.webp' },
        { id: 4, title: 'Collar de Plata', category: 'Joyería', description: 'Joyería fina de plata trabajada a mano por artesanos de Taxco.', price: 1200, image: 'assets/images/collar.jpg' },
        { id: 5, title: 'Máscara Ceremonial', category: 'Madera', description: 'Máscara tallada en madera inspirada en tradiciones prehispánicas.', price: 950, image: 'assets/images/mascara.jpg' },
        { id: 6, title: 'Huipil Bordado', category: 'Textiles', description: 'Prenda tradicional con bordados a mano de Chiapas.', price: 1800, image: 'assets/images/huipil.jpg' },
        { id: 7, title: 'Árbol de la Vida', category: 'Cerámica', description: 'Pieza decorativa elaborada y pintada a mano en Metepec.', price: 1100, image: 'assets/images/arbol.jpg' },
        { id: 8, title: 'Aretes de Ámbar', category: 'Joyería', description: 'Aretes de plata con ámbar natural de Chiapas montado a mano.', price: 624, image: 'assets/images/aretes.jpg' },
        { id: 9, title: 'Canasto de Palma Tejido a Mano', category: 'Textiles', description: 'Cesta artesanal hecha con palma natural. Ideal para almacenamiento decorativo o picnic.', price: 4900, image: 'assets/images/Canasto.webp' },
        { id: 10, title: 'Florero', category: 'Cerámica', description: 'Florero artesanal decorado con motivos florales, ideal para interiores o como centro de mesa.', price: 7500, image: 'assets/images/Florero.webp' }
    ];

    // Navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Update active class
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Smooth scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Update URL without reloading
                history.pushState(null, null, `#${targetId}`);
            } else {
                console.error(`Section with ID ${targetId} not found`);
            }
        });
    });

    // Product category filtering
    const categoryButtons = document.querySelectorAll('#productCategories .nav-link');
    const productItems = document.querySelectorAll('.producto');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Update active class
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Product modal
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const productId = parseInt(button.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);

            if (product) {
                document.getElementById('modalProductTitle').textContent = product.title;
                document.getElementById('modalProductCategory').textContent = product.category;
                document.getElementById('modalProductDescription').textContent = product.description;
                document.getElementById('modalProductPrice').textContent = `$${product.price.toLocaleString('es-MX')}`;
                document.getElementById('modalProductImage').src = product.image;
                document.getElementById('modalProductImage').alt = product.title;
            }
        });
    }

    // Cart functionality
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${item.name} x ${item.quantity} 
                <div>
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="removeItem(${index})">-</button>
                    <strong>$${item.price * item.quantity}</strong>
                </div>
            `;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = total.toLocaleString('es-MX');
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function removeItem(index) {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCart();
    }

    document.getElementById('clear-cart').addEventListener('click', () => {
        cart.length = 0;
        updateCart();
    });

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Gracias por su compra. Esta es una simulación.');
        cart.length = 0;
        updateCart();
    });

    document.getElementById('toggle-cart').addEventListener('click', () => {
        const container = document.getElementById('cart-container');
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    });

    // Theme switcher
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    toggleBtn.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Contact form validation
    const footerContactForm = document.getElementById('footerContactForm');
    if (footerContactForm) {
        footerContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('footerName').value.trim();
            const email = document.getElementById('footerEmail').value.trim();
            const message = document.getElementById('footerMessage').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name && email && message && emailRegex.test(email)) {
                alert('Gracias por tu mensaje. Te responderemos pronto.');
                this.reset();
            } else {
                alert('Por favor, completa todos los campos correctamente.');
            }
        });
    }

    // Toggle contact form
    const formSection = document.getElementById('footer-contact');
    const toggleIcon = document.getElementById('toggle-icon');
    if (formSection) {
        formSection.addEventListener('show.bs.collapse', () => {
            toggleIcon.textContent = '▲';
        });
        formSection.addEventListener('hide.bs.collapse', () => {
            toggleIcon.textContent = '▼';
        });
    }

    // Handle page load with hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${hash}`);
            });
        }
    }

    // Filter functionality
    function toggleFilter() {
        const filter = document.getElementById('filterDropdown');
        const btn = document.querySelector('.filter-btn');
        filter.classList.toggle('show');
        btn.classList.toggle('active');
    }

    document.addEventListener('click', function(event) {
        const filter = document.getElementById('filterDropdown');
        const btn = document.querySelector('.filter-btn');
        if (!filter.contains(event.target) && !btn.contains(event.target)) {
            filter.classList.remove('show');
            btn.classList.remove('active');
        }
    });

    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    priceRange.addEventListener('input', function() {
        priceValue.textContent = this.value;
    });

    function applyFilters() {
        const maxPrice = parseInt(priceRange.value);
        const selectedCategories = [];
        const showOnlySale = document.querySelector('input[name="sale"]:checked') !== null;

        document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
            selectedCategories.push(checkbox.value);
        });

        const productos = document.querySelectorAll('.producto');
        let visibleCount = 0;

        productos.forEach(producto => {
            const price = parseInt(producto.dataset.price);
            const category = producto.dataset.category;
            const isOnSale = producto.dataset.sale === "true";

            const priceMatch = price <= maxPrice;
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
            const saleMatch = !showOnlySale || isOnSale;

            if (priceMatch && categoryMatch && saleMatch) {
                producto.style.display = 'block';
                visibleCount++;
            } else {
                producto.style.display = 'none';
            }
        });

        toggleFilter();
    }

    function resetFilters() {
        priceRange.value = 5000;
        priceValue.textContent = '5000';
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        document.querySelector('input[name="sale"]').checked = false;
        document.querySelectorAll('.producto').forEach(producto => {
            producto.style.display = 'block';
        });
    }

    // Search functionality
    function buscar() {
        const inputBusqueda = document.getElementById("busqueda").value.trim().toLowerCase();
        const productos = document.querySelectorAll(".producto");
        const mensajeVacio = document.getElementById("mensaje-vacio");

        let productosVisibles = 0;

        productos.forEach(producto => {
            const titulo = producto.querySelector(".card-title");
            if (titulo) {
                const textoTitulo = titulo.textContent.trim().toLowerCase();
                const coincide = textoTitulo.includes(inputBusqueda);
                producto.style.display = coincide ? "" : "none";
                if (coincide) productosVisibles++;
            }
        });

        if (productosVisibles === 0) {
            mensajeVacio.style.display = "flex";
            mensajeVacio.classList.add("mostrar");
        } else {
            mensajeVacio.classList.remove("mostrar");
            setTimeout(() => {
                mensajeVacio.style.display = "none";
            }, 300);
        }
    }

    // Expose functions to global scope for HTML event handlers
    window.toggleFilter = toggleFilter;
    window.applyFilters = applyFilters;
    window.resetFilters = resetFilters;
    window.buscar = buscar;
    window.removeItem = removeItem;
});
