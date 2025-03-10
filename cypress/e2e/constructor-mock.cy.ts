import { mockCreateOrderPayload, mockPayloadIngedients } from './../../src/utils/__mocks__/mockData'

describe('constuctor test', function () {

    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('accessToken', 'asfdffsafas');
            win.localStorage.setItem('refreshToken', 'safsafsafsdf');
        });
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
    });

     //модальное окно игредиента, закрытие - оверлей
    it('modal ingredient close overlay test', function () {
        cy.intercept('GET', '/api/ingredients', mockPayloadIngedients).as('mockIngredients');
        cy.visit('/');

        cy.get('ul[data-test="group_bun"]').should('exist').find('li').first().as('testIngredient');
        cy.get('@testIngredient').find('li').eq(2).should('exist').invoke('text')
            .then((text) => {
                Cypress.env('savedText', text);
                const savedText = Cypress.env('savedText');
                cy.get('@testIngredient').click();
                cy.get('div[data-test="modal_ingredient_details"').should('exist').contains(savedText);
                cy.get('div[data-test="modal_overlay"]').click({ force: true });
            });
    });

    //модальное окно игредиента, закрытие - кнопка
    it('modal ingredient test', function () {
        cy.intercept('GET', '/api/ingredients', mockPayloadIngedients).as('mockIngredients');
        cy.visit('/');

        cy.get('ul[data-test="group_bun"]').should('exist').find('li').first().as('testIngredient');
        cy.get('@testIngredient').find('li').eq(2).should('exist').invoke('text')
            .then((text) => {
                Cypress.env('savedText', text);
                const savedText = Cypress.env('savedText');
                cy.get('@testIngredient').click();
                cy.get('[data-test="modal_ingredient_details"').should('exist').contains(savedText);
                cy.get('div[data-test="modal_close_buttin"').should('exist').click();
            });
    });

    //переход по прямой ссылке
    it('not modal ingredient test', function () {
        cy.intercept('GET', '/api/ingredients', mockPayloadIngedients).as('mockIngredients');
        cy.visit('/#/ingredients/60666c42cc7b410027a1a9b1');
        cy.get('div[data-test=modal_ingredient_details').should('not.exist');
        cy.contains('Краторная булка N-200i')

    });

    //создание заказа
    it('constuctor create order', function () {
        const mockAuth = { "success": true, "user": { "email": "test@test.me", "name": "testname" } }
        cy.intercept('GET', '/api/auth/user', mockAuth).as('mockAuth');
        cy.intercept('GET', '/api/ingredients', mockPayloadIngedients).as('mockIngredients');
        cy.visit('/');

        cy.get('[data-test="constructor_create_order"').should('exist').and('be.disabled');

        // Drag-and-drop для булки
        cy.get('ul[data-test="group_bun"]').should('exist').find('li').first().as('bun');
        cy.get('@bun').trigger('dragstart', { dataTransfer: new DataTransfer() });
        cy.get('#drop_input_top').should('exist').trigger('drop', { dataTransfer: new DataTransfer() });
        cy.get('#drop_input_top').should('exist').contains('верх');
        cy.get('#drop_input_bottom').should('exist').contains('низ');

        // Drag-and-drop для основного ингредиента
        cy.get('ul[data-test="group_main"]').should('exist').find('li').first().as('main');
        cy.get('@main').trigger('dragstart', { dataTransfer: new DataTransfer() });
        cy.get('#drop_input_not_bun').should('exist').trigger('drop', { dataTransfer: new DataTransfer() });

        // Drag-and-drop для соуса
        cy.get('ul[data-test="group_sauce"]').should('exist').find('li').first().as('sauce');
        cy.get('@sauce').trigger('dragstart', { dataTransfer: new DataTransfer() });
        cy.get('#drop_input_not_bun').should('exist').trigger('drop', { dataTransfer: new DataTransfer() });

        // Клик на кнопку создания заказа
        cy.intercept('POST', '/api/orders', mockCreateOrderPayload).as('mockOrder');
        cy.get('[data-test="constructor_create_order"').should('not.be.disabled').click();

        // Закрытие модалки
        cy.get('[data-test="modal_close_buttin"').should('exist').click();

        cy.visit('/');
    });
});