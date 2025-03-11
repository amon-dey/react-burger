describe('app works correctly with routes', function () {
    //личный кабинет
    it('login test', function () {
        cy.visit('/');

        //Переход в личный кабинет
        cy.get('[data-test="Личный_кабинет_headerlink"').should('exist').and('be.visible').and('have.text', 'Личный кабинет').click();

        //переход на страницу регистрации
        cy.get('[data-test="register"').should('exist')
        cy.get('[data-test="register"').should('exist').click()
        cy.contains('Регистрация');

        //Переход в личный кабинет со страницы регистрации
        cy.get('[data-test="login"').should('exist').click();

        //Переход на страницу востановление пароля
        cy.get('[data-test="forgot-password"').should('exist').click()
        cy.contains('Востановление пароля');

        //Переход в личный кабинет со страницы регистрации
        cy.get('[data-test="login"').should('exist').click();

        //Вход с не верным логином паролем
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