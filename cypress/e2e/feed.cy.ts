describe('feed test', function () {

    it('feedtest modal', function () {
        cy.visit('/');
        cy.get('[data-test="Лента_заказов_headerlink"')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Лента заказов')
            .click();
        cy.contains('Лента заказов');
        //check feed
        cy.get('[data-test="feed_list"').should('exist').find('li').first().should('be.visible').click();
        //check feed modal
        cy.get('[data-test="order-details-modal"').should('exist')
        cy.get('[data-test="modal_close_buttin"').should('exist').click();
    });

});