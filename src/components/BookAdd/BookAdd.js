import { useState} from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import loadLogo from '../../assets/img/loader.gif'
import './bookAdd.css'



export function BookAdd ( props ){
    const [modal, openModal] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '',
        author: ''
    });
    const [loading, setLoading] = useState(false);


    function changeHandler(event) {
        setNewBook({...newBook, [event.target.name]: event.target.value})
    }

    function submitHandler(event){
        event.preventDefault();
        setLoading(true);


        if (newBook.title.trim()) {
            axios
              .post('http://localhost:4000/books', newBook)
              .then(() => axios.get('http://localhost:4000/books'))
              .then(res => props.setBooks(res.data))
              .then(() => setLoading(false))
              .finally(() => openModal(false))
            return
        }
        alert('title should be filled')
        setLoading(false);

    }

    return(
        <div>
            <button onClick = {() => openModal(true)} className = "top-bar__add-btn">Add</button>
            {<Modal isOpen = {modal} ariaHideApp={false} className="main-modal">
                <div className = "main-modal__modal-wrapper">
                    <div className = "modal-header">
                        <h3 className = "modal-header__title">Add book</h3>
                        <button onClick = {() => openModal(false)} className = "modal-header__close">&times;</button>
                    </div>
                    <div className = "modal-body__main-box">
                        {loading ? 
                            <div className = "modal-gif-wrapper">
                                <img src = {loadLogo} alg = "loading" className = "modal-load-gif"/>
                            </div>
                        :
                            <div className = "modal__form-wrapper">
                                <form id = "addModal" onSubmit = {submitHandler} className = "modal__form">
                                    <label className = "modal__form-label">Title</label>
                                    <input name = "title" onChange = {changeHandler} required className = "modal__form-input"/>
                                    <label className = "modal__form-label">Author</label>
                                    <input name = "author" onChange = {changeHandler} className = "modal__form-input"/>
                                </form>
                            </div>
                        }
                    </div>
                    <div className = "modal-footer">
                        <button  onClick = {() => openModal(false)} className = "modal-footer__close-btn">close</button>
                        <button form = "addModal" type="submit" disabled={loading} className = "modal-footer__add-btn">Add</button>
                    </div>
                </div>

            </Modal>}
        </div>
    );
}