const data = {
    authors : [
        { id: "1", name: "J.K. Rowling", booksId: ["1", "2"] },
        { id: "2", name: "George R.R. Martin", booksId: ["3", "4"] },
        { id: "3", name: "Agatha Christie", booksId: ["5"] },
        { id: "4", name: "J.R.R. Tolkien", booksId: ["6"] },
        { id: "5", name: "Stephen King", booksId: ["7"] }
    ],
    books : [
        { id: "1", title: "Harry Potter and the Philosopher's Stone", publishedYear: 1997, authorId: "1" },
        { id: "2", title: "Harry Potter and the Chamber of Secrets", publishedYear: 1998, authorId: "1" },
        { id: "3", title: "A Game of Thrones", publishedYear: 1996, authorId: "2" },
        { id: "4", title: "A Clash of Kings", publishedYear: 1998, authorId: "2" },
        { id: "5", title: "Murder on the Orient Express", publishedYear: 1934, authorId: "3" },
        { id: "6", title: "The Hobbit", publishedYear: 1937, authorId: "4" },
        { id: "7", title: "The Shining", publishedYear: 1977, authorId: "5" }
    ]
}
  

export const resolvers = {
    Book: {
        author: (parent, args, context, info) => {
            return data.authors.find((authorDetails) => authorDetails.id === parent.authorId);
        }
    },
    Author: {
        books: (parent, args, context, info) => {
            return data.books.filter((bookDetails) => parent.booksId.includes(bookDetails.authorId));
        }
    },
    Query: {
        authors: (parent, args, context, info) => {
            return data.authors;
        },
        books: (parent, args, context, info) => {
            return data.books;
        }
    },
    Mutation: {
        addBook: (parent, args, context, info) => {
            const newBook = {...args, id: data.books.length + 1};
            data.books.push(newBook);
            return newBook;
        },
        addAuthor: (parent, args, context, info) => {
            const newAuthor = {...args, id: data.authors.length + 1};
            data.authors.push(newAuthor);
            return newAuthor;
        }
    }
};