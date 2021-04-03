import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './bookList.css'
import loadLogo from '../../assets/img/loader.gif'


export function BookList(props) {
    const { books, setBooks } = props
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        axios.get('http://localhost:4000/books')
            .then(res => setBooks(res.data))
            .finally(() => setLoading(false))
    }, [])

    function remove(id) {
      setLoading(true)

      axios.delete(`http://localhost:4000/books/${id}`)
        .then(() => axios.get('http://localhost:4000/books'))
        .then(res => setBooks(res.data))
        .finally(() => setLoading(false))
    }

    if (loading) return <div className = "main-gif-wrapper"><img src = {loadLogo} alg = "loading" className = "main-load-gif"/></div>

    return (
      <div className = "main-div__books-wrapper">
        
          {books.map((book, index) =>
            <div className = "main-div__book-wrapper" key={book.id}>
              <div className="main-div__book-image"/>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <div className="main-div__book-buttons-wrapper">
              <Link to={`/books/${book.id}`} className = "main-div__book-edit-btn">edit</Link>
              <button onClick={() => remove(book.id)} className = "main-div__book-del-btn">delete</button>
            </div>
          </div>
        )}
      </div>
    )
}
