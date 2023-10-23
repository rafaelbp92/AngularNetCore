using AngularNetCore.Data;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook(Book book)
        {
            try 
            {
                if (book.Title != null && book.Description != null && book.Author != null) 
                {
                    _bookService.AddBook(book);
                    return Ok();
                } else {
                    return BadRequest("Invalid book");
                }
                
            }
            catch (Exception exception) 
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _bookService.GetBooks();
            return Ok(books);
        }

        [HttpPut("UpdateBook/{id}")]
        public IActionResult UpdateBook(int id, [FromBody]Book book)
        {
            _bookService.UpdateBook(id, book);
            return Ok(book);
        }

        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            _bookService.DeleteBook(id);
            return Ok();
        }

        [HttpGet("GetBookById/{id}")]
        public IActionResult GetBook(int id)
        {
            var book = _bookService.GetBook(id);
            return Ok(book);
        }
    }
}
