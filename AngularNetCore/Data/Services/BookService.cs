namespace AngularNetCore.Data.Services
{
    public class BookService : IBookService
    {
        public void AddBook(Book book)
        {
            Data.Books.Add(book);
        }

        public void DeleteBook(int id)
        {
            var book = Data.Books.FirstOrDefault(x => x.Id == id);
            if (book != null)
            {
                Data.Books.Remove(book);
            }
            else
            {
                throw new InvalidOperationException("Book not found");
            }
        }

        public Book GetBook(int id)
        {
            var book = Data.Books.FirstOrDefault(x => x.Id == id);
            if (book != null)
            {
                return book;
            }

            throw new InvalidOperationException("Book not found");
        }

        public IEnumerable<Book> GetBooks()
        {
            return Data.Books.ToList();
        }

        public void UpdateBook(int id, Book book)
        {
            var oldBook = Data.Books.FirstOrDefault(x => x.Id == id);
            if (oldBook != null)
            {
                oldBook.Author = book.Author;
                oldBook.Title = book.Title;
                oldBook.Description = book.Description;
                oldBook.DateStart = book.DateStart;
                oldBook.DateRead = book.DateRead;
                oldBook.Rate = book.Rate;
            }
        }
    }
}
