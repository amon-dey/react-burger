describe('template spec', () => {
  it('should be available on localhost:5173', function() {
    cy.visit('http://localhost:5173/');
  });
})