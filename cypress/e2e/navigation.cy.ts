describe('app works correctly with routes', function () {
    //личный кабинет
    it('login test', function () {
        cy.visit('/');

        //клик Личный кабинетs
        cy.get('#Личный_кабинет_headerlink').should('exist').and('be.visible').and('have.text', 'Личный кабинет').click();

        cy.get('#register').should('exist')

        //клик Регистрация
        cy.get('#register').should('exist').click()
        cy.contains('Регистрация');
        cy.get('#login').should('exist').click();

        //кликаем Восстановить пароль
        cy.get('#forgot-password').should('exist').click()

        cy.contains('Востановление пароля');
        cy.get('#login').should('exist').click();

        //вход с не верным логином паролем
        const invalidEmail = 'invalid@example.com';
        const invalidPassword = 'wrongpassword';
        cy.intercept('POST', '/api/auth/login').as('loginRequest');
        cy.get('input#email').type(invalidEmail).should('have.value', invalidEmail);
        cy.get('input#password').type(invalidPassword).should('have.value', invalidPassword);
        cy.contains('button', 'Войти').click();
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
        cy.contains('p', 'Не верный логин или параоль').should('exist');
    });
});