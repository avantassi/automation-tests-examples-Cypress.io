describe("Подбор по марке - общий каталог. Добавление в корзину С163", () => {
	it("Загрузка страницы", () => {
        cy.visit("/");
        cy.get('title').contains('Страна запчастей и аксессуаров. Товары для дома и отдыха - AvtoALL.ru');
    });

	it("Выбор ТС", () => {
        cy.get('.search .tabs li').contains('Подбор по марке').click();
		cy.get('.search-marks.active li a').contains('HYUNDAI').click();
		cy.get('.model-one').contains('SOLARIS').click();
		cy.get('.block-model .modification-one__title').contains('SOLARIS седан').click({force: true});
		cy.get('.modifications').find('td').contains('HYUNDAI SOLARIS седан 1.6').click();
		cy.url().should('include', '/catalog_TO/');
    });

	it("Добавление в корзину первого товара", () =>{
		cy.get('#side-menu .side-menu-item').first().find('a').first().click();
		cy.get('#side-menu .side-menu-item ul').first().find('a').first().click();
		cy.wait(1000);
		cy.get('.list-one.item-elem.available').find('.cart-button.cart-add').first().click();
		cy.get('.cart-modal').contains('Добавление в корзину');
		cy.get('.cart-modal').should('be.visible').find('.cart-modal__add').contains('Добавить').click();
		cy.get('.cart-after').should('be.visible').contains('Товар успешно добавлен в корзину');
		cy.get('.modal-close').click();
		cy.get('.list-one.item-elem.available').find('.cart-button.cart-add').should('have.class', 'cart-open');
		cy.get('.list-one.item-elem.available').find('.cart-button.cart-add').first().click();
		cy.url().should('include', '/cart/');
		cy.go('back');
	});

	it("Добавление в корзину второго товара + рекомендации", () =>{
		cy.get('#side-menu .side-menu-item').eq(1).find('a').first().click();
		cy.wait(1000);
		cy.get('.list-one.item-elem.available').find('.cart-button.cart-add').first().click();
		cy.get('.cart-modal').should('be.visible').find('.cart-modal__add').contains('Добавить').click();
		cy.get('.cart-after').should('be.visible').contains('Товар успешно добавлен в корзину');
		cy.get('.related-one-more__bottom').first().click();
		cy.get('.related-category-one').first().should('have.class', 'active');
		cy.get('.category-menu-next').click();
		cy.get('.category-menu-prev').click();
		cy.get('.related-category-one').eq(1).click().should('have.class', 'active');
		cy.get('.related-scroll').find('.cart-add').first().click();
		cy.get('.related-category-one').eq(1).click().should('have.class', 'active');
		cy.get('.related-category-one').contains('Тормозные колодки').click({force: true});
		cy.get('.related-scroll').contains('передние').parentsUntil('.related-list').find('.cart-add').click();
		cy.get('.related-category-one').contains('Тормозные колодки').click({force: true});
		cy.get('.related-scroll').should('not.contain', 'передние');
		cy.get('.modal-close').click();
		cy.get('.list-one.item-elem.available').find('.cart-button.cart-add').should('have.class', 'cart-open');
	});
});