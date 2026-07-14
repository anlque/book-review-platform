const defaultBook = {
    title: 'Dune',
    authorId: '1',
    label: 'Classic',
    pages: 688,
    language: 'English',
    publisher: 'Chilton Books',
    country: 'United States',
    isbn: '978-0441172719',
    format: 'Print (Hardcover)',
    subtitle: 'A desert planet, political intrigue, and a destiny that reshapes an empire.',
    img:
        'https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd' +
        '7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
    publishedYear: 1965,
    userId: '1',
    genres: ['SCIENCE_FICTION'],
    blocks: [],
};

type CreatedBook = typeof defaultBook & { id: string };

export const createBook = (book?: Partial<typeof defaultBook>) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/books',
            headers: { Authorization: 'asasf' },
            body: { ...defaultBook, ...book },
        })
        .then((resp) => resp.body);
};

export const removeBook = (bookId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/books/${bookId}`,
        headers: { Authorization: 'asasf' },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createBook(
                book?: Partial<typeof defaultBook>,
            ): Chainable<CreatedBook>;
            removeBook(bookId: string): Chainable<void>;
        }
    }
}
