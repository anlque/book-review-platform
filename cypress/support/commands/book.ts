import { Book } from '../../../src/entities/Book';

const defaultBook = {
    id: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    subtitle: 'A desert planet, political intrigue, and a destiny that reshapes an empire.',
    img:
        'https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd' +
        '7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
    views: 1022,
    createdAt: '26.02.2022',
    userId: '1',
    type: ['SCIENCE_FICTION'],
    blocks: [],
};

export const createBook = (book?: Book) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/books',
            headers: { Authorization: 'asasf' },
            body: book ?? defaultBook,
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
            createBook(book?: Book): Chainable<Book>;
            removeBook(bookId: string): Chainable<void>;
        }
    }
}
