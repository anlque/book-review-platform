let currentBookId = '';
describe('The user visits the book`s page', () => {
    beforeEach(() => {
        cy.login();
        cy.createBook().then((book) => {
            currentBookId = book.id;
            cy.visit(`books/${book.id}`);
        });
    });
    afterEach(() => {
        cy.removeBook(currentBookId);
    });
    it('book content should be available', () => {
        cy.getByTestId('BookDetails.Info').should('exist');
    });
    it('book recommendations lost should be available', () => {
        cy.getByTestId('BookRecommendationsList').should('exist');
    });
    it('the user should be able to leave a feedback', () => {
        cy.getByTestId('BookDetails.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('the user should be able to rate the book', () => {
        cy.getByTestId('BookDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
    it('the user should be able to rate the book (example with fixtures)', () => {
        cy.intercept('GET', '**/books/*', {
            fixture: 'book-details.json',
        });
        cy.getByTestId('BookDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
});
