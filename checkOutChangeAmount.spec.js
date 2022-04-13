describe("Чекаут - изменение количества товаров, удаление С195", () => {
	beforeEach(() => {
        Cypress.Cookies.preserveOnce('PHPSESSID3', 'USER_SALE_ID3', 'location_data');
    });

	it("Очистка кук", () => {
		cy.clearCookie('PHPSESSID3');
		cy.clearCookie('USER_SALE_ID3');
		cy.clearCookie('location_data');
    });

	it("Добавление товара", () => {
		cy.visit("/login/");
		cy.request('POST', '/cart/order/hotkeys/?setZip=620146&addCart=582499:1&');
		cy.request('POST', '/cart/order/hotkeys/?setZip=620146&addCart=970179:1&');
		cy.wait(300);
    });

	it("Изменение количества", () => {
		cy.visit("/cart/");
		cy.get('title').contains('Ваша корзина');
		cy.get('.good-quantity').first().click();
		cy.get('.quantity-edit').first().should('be.visible').find('.quantity-plus').click();
		cy.get('.quantity-confirm').click();
		cy.get('.cart-one__one-price').should('be.visible');
		cy.get('.good-quantity').first().click();
		cy.get('.quantity-edit').first().should('be.visible').find('.quantity-minus').click();
		cy.get('.quantity-confirm').click();
		cy.get('.cart-one__one-price').should('not.be.visible');
		cy.get('.good-quantity').first().click();
		cy.get('.quantity-edit').first().should('be.visible').find('.quantity-input').clear().type('abc');
		cy.get('.good-quantity').first().should('have.attr', 'value', '1');
		cy.get('.quantity-abort').click();
		cy.get('.good-quantity').first().should('have.attr', 'value', '1');
    });

	it("Удаление товара", () => {
		cy.get('.check-all').click();
		cy.get('.delete-all').click();
    });

	it("Добавление товара, который доступен в большом количестве", () => {
		cy.request('POST', '/cart/order/hotkeys/?setZip=620146&addCart=009686:1&');
		cy.visit("/cart/");
		cy.get('title').contains('Ваша корзина');
    });

	it("Изменение количества", () => {
		cy.get('.delivery-one').first().click();
		cy.get('.good-quantity').first().click();
		cy.get('.quantity-edit').first().should('be.visible').find('.quantity-input').clear().type('800');
		cy.get('.quantity-confirm').click();
		cy.wait(3000);
		cy.get('.cart-one__one-price').should('be.visible');
    });
});