describe('app works correctly with routes', function () {
    before(function () {
        cy.visit('http://localhost:5173/');
    });

    it('should open конструктор', function () {
        cy.contains('Собери бургер');
    });

    it('route test', function () {
        cy.visit('http://localhost:5173/');

        cy.get('#Лента_заказов_headerlink')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Лента заказов')
            .click();

        cy.contains('Лента заказов');

        cy.get('#feed_list')
            .should('exist')
            .find('li')
            .first()
            .should('be.visible')
            .click();

        cy.get('#modal_feed_order_info')
            .should('exist')


    });


});