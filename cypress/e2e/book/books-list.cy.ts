describe('The user visits books page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('books');
        });
    });
    it('books should be loaded successfully', () => {
        cy.getByTestId('BookList').should('exist');
        cy.getByTestId('BookListItem').should('have.length.greaterThan', 3);
    });

    it('fixtures should work', () => {
        cy.intercept('GET', '**/books?*', { fixture: 'books.json' });
        cy.getByTestId('BookList').should('exist');
        cy.getByTestId('BookListItem').should('have.length.greaterThan', 3);
    });

    it.skip('skip test example', () => {
        cy.getByTestId('BookList').should('exist');
        cy.getByTestId('BookListItem').should('have.length.greaterThan', 3);
        cy.get('asfasf').should('exist');
    });
});
