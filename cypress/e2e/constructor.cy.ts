describe('constuctor test', function () {

    afterEach(() => {
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
    });

    const testEmail = "amondey@mail.ru"
    const testPassword = "amondey@mail.ru1"

    it('modal ingredient test', function () {
        cy.visit('/');
        cy.wait(1000);
        cy.get('#group_bun').should('exist').find('li').first().as('testIngredient');
        cy.get('@testIngredient').find('li').eq(2).should('exist').invoke('text')
            .then((text) => {
                Cypress.env('savedText', text);
                const savedText = Cypress.env('savedText');
                cy.get('@testIngredient').click();
                cy.get('#modal_ingredient_details').should('exist').contains(savedText);
                cy.get('#modal_close_buttin').should('exist').click();
            });
    });

    it('constuctor create order', function () {
        cy.visit('/');
        cy.wait(1000);

        cy.get('#constructor_create_order', { timeout: 10000 })
            .should('exist')
            .and('be.disabled');

        // Drag-and-drop для булки
        cy.get('#group_bun').should('exist').find('li').first().as('bun');
        cy.get('@bun').trigger('dragstart', { dataTransfer: new DataTransfer() });
        cy.get('#drop_input_top').should('exist').trigger('drop', { dataTransfer: new DataTransfer() });

        // Drag-and-drop для основного ингредиента
        cy.get('#group_main').should('exist').find('li').first().as('main');
        cy.get('@main').trigger('dragstart', { dataTransfer: new DataTransfer() });
        cy.get('#drop_input_not_bun').should('exist').trigger('drop', { dataTransfer: new DataTransfer() });

        // Drag-and-drop для соуса
        cy.get('#group_sauce').should('exist').find('li').first().as('sauce');
        cy.get('@sauce').trigger('dragstart', { dataTransfer: new DataTransfer() });
        cy.get('#drop_input_not_bun').should('exist').trigger('drop', { dataTransfer: new DataTransfer() });

        // Клик на кнопку создания заказа
        cy.get('#constructor_create_order').should('not.be.disabled').click();

        // Логин
        cy.contains('Вход').should('exist');
        cy.login(testEmail, testPassword);

        // Создание заказа
        cy.intercept('POST', '/api/orders').as('makeOrder');
        cy.get('#constructor_create_order').click();
        cy.wait('@makeOrder').its('response.statusCode').should('eq', 200);

        // Закрытие модалки
        cy.get('#new_order_number').invoke('text').then((text) => {
            Cypress.env('savedText', text);
            cy.get('#modal_close_buttin').should('exist').click();
            const savedText = Cypress.env('savedText');
            //клик Личный кабинет 
            cy.get('#Личный_кабинет_headerlink').should('exist').and('be.visible').and('have.text', 'Личный кабинет').click();
            //клик на историю заказов
            cy.contains('div', 'История заказов').should('exist').click();
            //ищем наш заказ
            cy.contains('#' + savedText);
        })

        cy.visit('/');
    });
});