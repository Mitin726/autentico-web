document.addEventListener('DOMContentLoaded', () => {
	// Referencias al botón hamburguesa y al nav principal.
	const menuButton = document.querySelector('.header__toggle[aria-label="Abrir menú"]');
	const navigation = document.querySelector('.header nav');

	if (!menuButton || !navigation) {
		return;
	}

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
});
