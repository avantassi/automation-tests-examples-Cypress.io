describe("Поиск по номеру - найденные оригинальные товары. Перечень разделов и элементов C148", () => {
	beforeEach(() => {
        Cypress.Cookies.preserveOnce('PHPSESSID3', 'USER_SALE_ID3', 'location_data');
    });

	it("Очистка кук", () => {
		cy.clearCookie('PHPSESSID3');
		cy.clearCookie('USER_SALE_ID3');
		cy.clearCookie('location_data');
    });

	it("Поиск по номеру", () => {
		cy.visit('/');
		cy.get('#tab_main').click({force: true}).type('OC90');
		cy.get('#tab_main .button.global-search-button').click();
		cy.get('.searchQuery-result').contains('Найдено 1 товар');

		cy.get('.list-compact .item.item-elem').within(() => {
			cy.get('.image a img');

			cy.get('.image').then(($body) => {
				if ($body[0].querySelector('.super-price')) {
					cy.get('.super-price');
				} 
			});

			cy.get('.decr .item-name a');

			cy.get('.decr .info').within(() => {
				cy.get('b').contains('Артикул:');
				cy.get('small').contains('Код для заказа:');
				cy.get('.text').contains('Производитель:');
			});

			cy.get('.info').then(($body) => {
				if ($body[0].querySelector('.reviews')) {
					cy.get('.reviews');
				} 
			});

			cy.get('.decr').then(($body) => {
				if ($body[0].querySelector('.rating')) {
					cy.get('.rating');
				} 
			});

			cy.get('.price-internet').contains('₽');
			cy.get('.price .cart-add').contains('В корзину');
			cy.get('.bookmark span').first().should('have.attr', 'text-add-bookmark', 'В избранное');
		});
		
		cy.get('.filter-brands-table').within(() =>{
			cy.get('.table-head td').contains('Производитель');
			cy.get('.table-head td').contains('Артикул');
			cy.get('.table-head td').contains('Описание');
			cy.get('.table-head td').contains('Искомый');
			cy.get('.table-head td').contains('Аналог');
			cy.get('.obutton');
		});

		cy.get('.filter-brands-table .obutton').contains('Показать аналоги');
		cy.get('.filter-brands-table .obutton').contains('Нет в наличии');
    });

	it("Наличие блоков", () => {
        cy.get('#page-header'); 
		cy.get('.header');
		cy.get('#mmenu .main');
		cy.get('.search');
		cy.get('.search li.active').contains('Поиск детали');
		cy.get('.header-car');
		cy.get('#footer');
		cy.get('#page-scroll');
    });

	it("Переход к аналогам", () => {
		cy.get('.filter-brands-table .obutton').contains('Показать аналоги').first().click();
		cy.get('#tecdoc-list h1').contains('По запросу «OC90» найдено');
		cy.get('.list-group__title').contains('Оригинальные запчасти');
		cy.get('.list-one__title').first().contains('Фильтр масляный DAEWOO Nexia CHEVROLET Lanos MAHLE');
		cy.get('.list-group__title').contains('Заменители');
		cy.get('.list-sort').contains('Сортировать по: ');
		cy.get('.list-sort select option').first().contains('Сроку поставки');
		cy.get('.list-one__title').eq(1).contains('Фильтр масляный');
    });
});