import { testEmail, testPassword } from '../test_data'

describe('constuctor test', function () {

    it('modal ingredient test', function () {
        cy.visit('http://localhost:5173/');

        cy.clearLocalStorage();

        cy.get('#group_bun')
            .should('exist')
            .find('li')
            .first()
            .as('testIngredient');

        cy.get('@testIngredient')
            .find('li')
            .eq(2)
            .should('exist')
            .invoke('text')
            .then((text) => {
                Cypress.env('savedText', text);
                cy.log(`Текст третьего li: ${text}`);

                const savedText = Cypress.env('savedText');
                cy.log(`Используем ранее сохраненный текст: ${savedText}`);

                cy.get('@testIngredient').click();

                cy.get('#modal_ingredient_details')
                    .should('exist')
                    .contains(savedText);

                cy.get('#modal_close_buttin')
                    .should('exist')
                    .click();
            });
    });

    it('constuctor create order', function () {
        cy.visit('http://localhost:5173/');

        cy.clearLocalStorage();

        // создаём заказ
        cy.get('#constructor_create_order')
            .should('exist')
            .should('be.disabled')

        const dataTransfer = new DataTransfer();

        //drag bun
        cy.get('#group_bun')
            .should('exist')
            .find('li')
            .first()
            .trigger("dragstart", { dataTransfer });

        cy.get('#drop_input_top')
            .should('exist')
            .trigger("drop", { dataTransfer });

        //drag main
        cy.get('#group_main')
            .should('exist')
            .find('li')
            .first()
            .trigger("dragstart", { dataTransfer });

        cy.get('#drop_input_not_bun')
            .should('exist')
            .trigger("drop", { dataTransfer });

        //drag sauce
        cy.get('#group_sauce')
            .should('exist')
            .find('li')
            .first()
            .trigger("dragstart", { dataTransfer });

        cy.get('#drop_input_not_bun')
            .should('exist')
            .trigger("drop", { dataTransfer });

        //клик создать заказ
        cy.get('#constructor_create_order')
            .should('exist')
            .should('not.be.disabled')
            .click()

        //должно перекинуть на логин
        //логинемся
        cy.contains('Вход');

        cy.intercept('POST', '/api/auth/login').as('loginRequest');

        cy.get('input#email')
            .type(testEmail)
            .should('have.value', testEmail);

        cy.get('input#password')
            .type(testPassword)
            .should('have.value', testPassword);

        cy.contains('button', 'Войти').click();

        cy.wait('@loginRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('accessToken');
        });

        //клик создать заказ
        cy.contains('Собери бургер');
        cy.intercept('POST', '/api/orders').as('makeOrderRequest');

        cy.get('#constructor_create_order')
            .should('exist')
            .should('not.be.disabled')
            .click()

        //должен появиться спинер
        cy.get('#modal_create_order_spinner')
            .should('exist')

        cy.wait('@makeOrderRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.have.property('success');
        });

        //модалка с информацией о заказе
        cy.get('#modal_constructor_create_order')
            .should('exist')

        cy.get('#modal_close_buttin')
            .should('exist')
            .click();

    });
});