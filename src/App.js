import './App.css';
import { useState } from 'react'
import { BookList } from './components/BookList/BookList'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { BookAdd }   from './components/BookAdd/BookAdd'
import { BookEdit } from './components/BookEdit/BookEdit'
import { Link } from 'react-router-dom'


function App() {

  const [books, setBooks] = useState([]);
  

  return (
    <Router>
      <div className="main-app">
        <div className="top-bar">
          <div className = "top-bar__empty-div"/>
          <Link className="top-bar__title" to = "/">Books</Link>
          <BookAdd setBooks = {setBooks}/>
        </div>
        <Switch>
          <Route path="/" exact>
            <BookList books={books} setBooks={setBooks} />
          </Route>
          <Route path="/books/:id" component={BookEdit} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
