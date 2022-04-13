describe("Гараж - перечень элементов, валидация и подтверждение С69", () => {
	beforeEach(() => {
        Cypress.Cookies.preserveOnce('PHPSESSID3', 'USER_SALE_ID3', 'location_data');
    });

	it("Очистка кук", () => {
		cy.clearCookie('PHPSESSID3');
		cy.clearCookie('USER_SALE_ID3');
		cy.clearCookie('location_data');
    });

	it("Проверка наличия элементов", () => {
		cy.visit('/garage/#/carAdd/');
		cy.get('title').contains('Гараж');
		cy.get('.bc a');
		cy.wait(1000);
		cy.get('h1').contains('Добавление машины');
		cy.get('.add-car-elem--vin input').should('have.attr', 'placeholder').and('equal', 'Введите госномер или VIN');
		cy.get('.add-car__notification').contains('VIN - уникальный код транспортного средства, состоящий из 17 символов. В коде представлена информация о производителе и характеристиках транспортного средства, и его годе выпуска.');
		cy.get('.add-car__example').contains('Например, WAUZZZ4G9BN005306');
		cy.get('.add-car-select').contains('Выберите модель вручную');
		cy.get('.add-car__notification').contains('Воспользуйтесь ручным выбором для отечественных автомобилей.');
    });

	it("Наличие блоков", () => {
        cy.get('#page-header'); 
		cy.get('.header');
		cy.get('#catalog-app');
		cy.get('.search');
		cy.get('.search li.active').contains('Поиск детали');
		cy.get('.header-car');
		cy.get('#footer');
		cy.get('#page-scroll');
    });

	it("Валидация VIN", () => {
		cy.get('.add-car-elem--vin input').type('  KМHbt31GP3U013758  ');
    });

	it("Проверка наличия элементов внутри Гаража", () => {
		cy.get('.car-one__image');
		cy.get('.car-one_name');
		cy.get('.car-one-info');

		cy.get('body').then(($body) => {
			if ($body[0].querySelector('.car-param__show')) {
				cy.get('.car-param__show').click();
				cy.get('.param-modal').should('be.visible');
				cy.get('.param-modal__close').click();
			} 
		});

		cy.get('.car-one__catalog').contains('Перейти в общий каталог');
		cy.get('.car-one__catalog').contains('Перейти в оригинальный каталог');
		cy.get('.car-one__catalog').contains('Перейти в запросы по VIN');
		cy.get('.car-one__edit').contains('Редактировать');
		cy.get('.car-one__delete').contains('Удалить');

		cy.get('.header-car').contains('KMHBT31GP3U013758').click();
		cy.get('.garage-modal').should('be.visible');
		cy.get('.header-car').contains('KMHBT31GP3U013758').click();
		cy.get('.garage-modal').should('not.be.visible');
    });

	it("Добавление еще одного ТС", () => {
		cy.get('.car-add-button').click();
		cy.get('#garage h2').contains('Чтобы добавить больше машин');
		cy.get('#garage h2 a').contains('авторизуйтесь');
		cy.get('.garage-back.add-new').click();
    });

	it("Удаление ТС", () => {
		cy.visit('/garage/#/carAdd/');
		cy.get('.car-one__delete').eq(0).contains('Удалить').click();
		cy.get('.delete').contains('Подтвердить').click();
		cy.wait(1000);
    });
});