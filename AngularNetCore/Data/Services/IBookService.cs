namespace AngularNetCore.Data
{
    public interface IBookService
    {
        IEnumerable<Book> GetBooks();

        Book GetBook(int id);

        void AddBook(Book book);

        void UpdateBook(int id, Book book);

        void DeleteBook(int id);
    }
}
