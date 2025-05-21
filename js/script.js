// Navigation and interactivity script for ArtesaMex single-page application
document.addEventListener('DOMContentLoaded', () => {
    // Product data for modal
    const products = [
        { id: 1, title: 'Alebrije Multicolor', category: 'Madera', description: 'Figura tallada y pintada a mano con diseños únicos y colores vibrantes.', price: '$850', image: 'assets/images/alebrije.jpg' },
        { id: 2, title: 'Rebozo Tradicional', category: 'Textiles', description: 'Tejido a mano en telar con técnicas ancestrales y tintes naturales.', price: '$1,200', image: 'assets/images/rebozo.jpg' },
        { id: 3, title: 'Talavera Decorativa', category: 'Cerámica', description: 'Pieza de cerámica pintada a mano con diseños tradicionales de Puebla.', price: '$650', image: 'assets/images/talavera.jpg' },
        { id: 4, title: 'Collar de Plata', category: 'Joyería', description: 'Joyería fina de plata trabajada a mano por artesanos de Taxco.', price: '$1,500', image: 'assets/images/collar.jpg' },
        { id: 5, title: 'Máscara Ceremonial', category: 'Madera', description: 'Máscara tallada en madera inspirada en tradiciones prehispánicas.', price: '$950', image: 'assets/images/mascara.jpg' },
        { id: 6, title: 'Huipil Bordado', category: 'Textiles', description: 'Prenda tradicional con bordados a mano de Chiapas.', price: '$1,800', image: 'assets/images/huipil.jpg' },
        { id: 7, title: 'Árbol de la Vida', category: 'Cerámica', description: 'Pieza decorativa elaborada y pintada a mano en Metepec.', price: '$1,100', image: 'assets/images/arbol.jpg' },
        { id: 8, title: 'Aretes de Ámbar', category: 'Joyería', description: 'Aretes de plata con ámbar natural de Chiapas montado a mano.', price: '$780', image: 'assets/images/aretes.jpg' }
    ];

    // Navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1); // Remove #
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
    const productItems = document.querySelectorAll('.product-item');

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
                document.getElementById('modalProductPrice').textContent = product.price;
                document.getElementById('modalProductImage').src = product.image;
                document.getElementById('modalProductImage').alt = product.title;
            }
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
});
//tema de la pagina
document.addEventListener('DOMContentLoaded', () => {
  // Navegación de páginas
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
            const targetId = this.getAttribute('href');
            document.querySelectorAll('#home-page, #about-page, #products-page').forEach(page => {
                page.style.display = 'none';
            });
        document.querySelector(targetId).style.display = 'block';
        window.scrollTo(0, 0);
        });
    });
document.querySelector('#home-page').style.display = 'block';
document.querySelector('#about-page').style.display = 'none';
document.querySelector('#products-page').style.display = 'none';

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
});
//formulario de la pagina
document.getElementById('footerContactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('footerName').value.trim();
    const email = document.getElementById('footerEmail').value.trim();
    const message = document.getElementById('footerMessage').value.trim();
    if (name && email && message) {
        alert('Gracias por tu mensaje. Te responderemos pronto.');
        this.reset();
    } else {
        alert('Por favor completa todos los campos.');
    }
document.addEventListener('DOMContentLoaded', function () {
    const formSection = document.getElementById('footer-contact');
    const toggleIcon = document.getElementById('toggle-icon');
    const contactLink = document.getElementById('contactToggleLink');

    if (formSection) {
      // Cambia flecha cuando se despliega o se oculta
      formSection.addEventListener('show.bs.collapse', () => {
        toggleIcon.textContent = '▲';
      });

      formSection.addEventListener('hide.bs.collapse', () => {
        toggleIcon.textContent = '▼';
      });

      // Botón del ícono de teléfono del nav
      if (contactLink) {
        contactLink.addEventListener('click', function (e) {
          e.preventDefault(); // evita scroll
            const collapseInstance = bootstrap.Collapse.getOrCreateInstance(formSection);
            if (formSection.classList.contains('show')) {
            collapseInstance.hide();
            } else {
            collapseInstance.show();
            // scroll suave hasta el footer
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }
  });

});