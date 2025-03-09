describe('feed test', function () {

    it('feedtest', function () {
        cy.visit('http://localhost:5173/');

        cy.get('#Лента_заказов_headerlink')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Лента заказов')
            .click();

        cy.contains('Лента заказов');
        //check feed
        cy.get('#feed_list')
            .should('exist')
            .find('li')
            .first()
            .should('be.visible')
            .click();
        //check feed modal
        cy.get('#order-details-modal')
            .should('exist')
        cy.get('#modal_close_buttin')
            .should('exist')
            .click();
    });
});