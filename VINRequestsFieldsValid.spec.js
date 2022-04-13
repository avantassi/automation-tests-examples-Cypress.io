describe("Запросы по VIN – перечень элементов (валидация) С219", () => {
	beforeEach(() => {
        Cypress.Cookies.preserveOnce('PHPSESSID3', 'USER_SALE_ID3', 'location_data');
    });

	it("Очистка кук", () => {
		cy.clearCookie('PHPSESSID3');
		cy.clearCookie('USER_SALE_ID3');
		cy.clearCookie('location_data');
    });

	it("Валидация Имя", () => {
		cy.visit("/vin-requests/");
		cy.get('.user-name').should('have.attr', 'maxlength', 50).type('a');
		cy.get('.request-user-title').click();
		cy.get('#name-error').contains('Длина имени от 2 до 50 символов');
		cy.get('.user-name').clear();
		cy.get('#name-error').contains('Введите имя и фамилию');
		cy.get('.user-name').type('QWEqweЙЦУйцу123$%^');
		cy.get('#name-error').should('not.be.visible');
    });

	it("Валидация Телефон", () => {
		cy.get('.user-phone').type('text');
		cy.get('.user-phone').type('0000000000');
		cy.get('.confirm-error').contains('Некорректный формат телефона');
		cy.get('.user-phone').clear();
		cy.get('.user-phone').type('9117352522');
		cy.get('.phone-valid').should('be.visible');
		cy.get('.phone-valid-close').click();
    });

	it("Валидация VIN", () => {
		cy.get('.select-byVin__input input').type('AAAAAAAAAAAAAAAAA');
		cy.get('.error').contains('Введите валидный госномер или VIN');
		cy.get('.select-byVin__input input').clear();
		cy.get('.select-byVin__input input').type('WAUZZZ4G9BN005306');
    });

	it("Добавление запчасти", () => {
		cy.get('.select-parts-add__button button').should('have.attr', 'disabled', 'disabled');
		cy.get('.select-parts-add__input input').type('QWEqweЙЦУйцу123$%^');
		cy.get('.select-parts-add__button button').should('not.have.attr', 'disabled', 'disabled');
    });
});