import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('The user is not authorised', () => {
        it('should relocate to the main page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('should open profile page', () => {
            cy.visit('/profiles/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('should manage non-existent route', () => {
            cy.visit('/fasfasfasf');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });

        it('Should open books page', () => {
            cy.visit('/books');
            cy.get(selectByTestId('BooksPage')).should('exist');
        });
    });
    describe('The user is authorised', () => {
        beforeEach(() => {
            cy.login();
        });
        it('Should open profile page', () => {
            cy.visit('/profiles/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Should open books page', () => {
            cy.visit('/books');
            cy.get(selectByTestId('BooksPage')).should('exist');
        });
    });
});
