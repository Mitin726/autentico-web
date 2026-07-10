let todosLosProductos = [];

document.addEventListener('DOMContentLoaded', () => {
	// Referencias al botón hamburguesa y al nav principal.
	const menuButton = document.querySelector('.header__toggle[aria-label="Abrir menú"]');
	const navigation = document.querySelector('.header nav');

	if (menuButton && navigation) {
		// Estado inicial de accesibilidad: el menú arranca cerrado en mobile.
		menuButton.setAttribute('aria-expanded', 'false');

		// Alterna la visibilidad del menú y sincroniza aria-expanded.
		const toggleMenu = () => {
			const isOpen = navigation.parentElement.classList.toggle('menu-open');
			menuButton.setAttribute('aria-expanded', String(isOpen));
		};

		// Cierra el menú después de elegir un enlace, útil en pantallas pequeñas.
		const closeMenu = () => {
			navigation.parentElement.classList.remove('menu-open');
			menuButton.setAttribute('aria-expanded', 'false');
		};

		menuButton.addEventListener('click', toggleMenu);

		navigation.addEventListener('click', (event) => {
			if (event.target.closest('a')) {
				closeMenu();
			}
		});
	}

	const catalogoGrid = document.getElementById('catalogo-grid');
	const buscadorProductos = document.getElementById('buscador-productos');

	if (!catalogoGrid) {
		return;
	}

	// Limpia el grid y pinta las tarjetas recibidas.
	function renderProductos(lista) {
		catalogoGrid.innerHTML = '';

		if (!lista.length) {
			catalogoGrid.textContent = 'No se encontraron productos con ese nombre';
			return;
		}

		lista.forEach((producto) => {
			const card = document.createElement('article');
			card.className = `producto-card ${producto.linea}`;

			const imagen = document.createElement('img');
			imagen.src = producto.imagen;
			imagen.alt = producto.nombre;
			imagen.loading = 'lazy';
			imagen.style.borderRadius = '50%';
			imagen.style.objectFit = 'cover';
			imagen.style.aspectRatio = '1 / 1';

			const nombre = document.createElement('h3');
			nombre.textContent = producto.nombre;

			const precio = document.createElement('p');
			precio.textContent = producto.precio.toLocaleString('es-CO', {
				style: 'currency',
				currency: 'COP',
				maximumFractionDigits: 0,
			});

			const tamano = document.createElement('p');
			tamano.className = 'producto-card__tamano';
			tamano.textContent = `Precio para tamaño: ${producto.tamano}`;

			const notaTamano = document.createElement('p');
			notaTamano.className = 'producto-card__nota';
			notaTamano.textContent = '¿Necesitas otro tamaño? Cotiza por WhatsApp';

			const descripcion = document.createElement('p');
			descripcion.textContent = producto.descripcion;

			const whatsapp = document.createElement('a');
			whatsapp.href = `https://wa.me/3122495288?text=${encodeURIComponent(`Hola, quiero pedir: ${producto.nombre}`)}`;
			whatsapp.target = '_blank';
			whatsapp.rel = 'noopener noreferrer';
			whatsapp.textContent = 'Pedir por WhatsApp';

			card.append(imagen, nombre, precio, tamano, notaTamano, descripcion, whatsapp);
			catalogoGrid.appendChild(card);
		});
	}

	// Carga el catálogo y guarda la lista completa para poder filtrarla.
	async function cargarProductos() {
		try {
			const respuesta = await fetch('content/productos.json');

			if (!respuesta.ok) {
				throw new Error('Respuesta no válida al cargar el catálogo');
			}

			const productos = await respuesta.json();

			if (!Array.isArray(productos)) {
				throw new Error('El catálogo no tiene el formato esperado');
			}

			todosLosProductos = productos;
			renderProductos(todosLosProductos);
		} catch (error) {
			catalogoGrid.textContent = 'No se pudo cargar el catálogo';
		}
	}

	if (buscadorProductos) {
		buscadorProductos.addEventListener('input', () => {
			const termino = buscadorProductos.value.trim().toLowerCase();
			const filtrados = termino
				? todosLosProductos.filter((producto) => producto.nombre.toLowerCase().includes(termino))
				: todosLosProductos;

			renderProductos(filtrados);
		});
	}

	cargarProductos();
});
