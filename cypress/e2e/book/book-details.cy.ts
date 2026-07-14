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

    it('book details layout should be available', () => {
        cy.getByTestId('BookDetailsToolbar').should('exist');
        cy.getByTestId('BookDetailsHero').should('exist');
        cy.getByTestId('BookDetailsContentRow').should('exist');
        cy.getByTestId('BookDetailsDetailsCard').should('exist');
        cy.getByTestId('BookDetailsReviews').should('exist');
    });

    it('the user should be able to rate the book', () => {
        cy.get('#book-details-rating').scrollIntoView();
        cy.get('#book-details-rating').within(() => {
            cy.getByTestId('StarRating.4').click();
        });
    });

    it('the user should be able to rate the book (example with fixtures)', () => {
        cy.intercept('GET', '**/books/*', {
            fixture: 'book-details.json',
        });
        cy.intercept('GET', '**/books/*/review-stats', {
            body: {
                average: 4.6,
                ratingsCount: 10,
                reviewsCount: 3,
                distribution: { 5: 62, 4: 20, 3: 10, 2: 5, 1: 3 },
            },
        });
        cy.get('#book-details-rating').scrollIntoView();
        cy.get('#book-details-rating').within(() => {
            cy.getByTestId('StarRating.4').click();
        });
    });

    it('the user can reply to an existing review', () => {
        cy.visit('books/1');
        cy.getByTestId('BookDetailsReviews').should('exist');

        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="CommentCard.Content"]').length === 0) {
                return;
            }

            cy.getByTestId('CommentCard.Content')
                .first()
                .within(() => {
                    cy.contains(/reply|ответ/i).click();
                });

            cy.getByTestId('BookReviewReplyForm.Input').type('Nice review');
            cy.getByTestId('BookReviewReplyForm.Send').click();
        });
    });
});
