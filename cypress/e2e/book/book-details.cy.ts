let currentBookId = '';
describe('The user visits the book`s page', () => {
    beforeEach(() => {
        cy.viewport(1280, 800);
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
        cy.get('#book-details-rating', { timeout: 15000 }).scrollIntoView();
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
        cy.get('#book-details-rating', { timeout: 15000 }).scrollIntoView();
        cy.get('#book-details-rating').within(() => {
            cy.getByTestId('StarRating.4').click();
        });
    });

    it('the user can reply to an existing review', () => {
        cy.get('[data-testid="BookDetailsReviews"]', { timeout: 15000 })
            .should('exist');

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

    it('mobile navigation drawer opens and links to catalog', () => {
        cy.viewport('iphone-x');
        cy.getByTestId('MobileBookHeader.Menu').should('be.visible').click();
        cy.getByTestId('MobileNavigationDrawer').should('be.visible');
        cy.getByTestId('MobileNavigationDrawer')
            .contains(/books|книги/i)
            .click();
        cy.location('pathname').should('include', 'books');
    });

    it('mobile action bar updates reading status and rating', () => {
        cy.viewport('iphone-x');
        cy.get('[data-testid="MobileBookActionBar"]', { timeout: 15000 })
            .should('be.visible');
        cy.intercept('POST', '**/user-books').as('setReadingStatus');

        cy.getByTestId('MobileBookActionBar.Status').click();
        cy.getByTestId('ReadingStatusSheet').should('be.visible');
        cy.getByTestId('ReadingStatusSheet')
            .contains(/currently reading|читаю сейчас/i)
            .click();
        cy.wait('@setReadingStatus', { timeout: 15000 });
        cy.getByTestId('MobileBookActionBar.Status')
            .contains(/currently reading|читаю сейчас/i);

        cy.getByTestId('MobileBookActionBar.Rating').click();
        cy.getByTestId('BookRatingSheet').should('be.visible');
        cy.get('[aria-label="Rate 4 out of 5"]').click();
        cy.getByTestId('MobileBookActionBar.Rating').contains('4/5');
    });

    it('mobile more actions sheet contains contextual book actions', () => {
        cy.viewport('iphone-x');
        cy.getByTestId('MobileBookActionBar.More').click();
        cy.getByTestId('BookMoreActionsSheet').should('be.visible');
        cy.contains(/add to list|добавить в список/i).should('exist');
        cy.contains(/write a review|написать отзыв/i).should('exist');
        cy.contains(/recommend|рекомендовать/i).should('exist');
    });

    it('desktop keeps existing sidebars and hides mobile controls', () => {
        cy.viewport(1280, 800);
        cy.getByTestId('sidebar').should('be.visible');
        cy.get('#book-details-rating').should('be.visible');
        cy.getByTestId('MobileBookActionBar').should('not.be.visible');
        cy.getByTestId('MobileBookHeader.Menu').should('not.be.visible');
    });
});
