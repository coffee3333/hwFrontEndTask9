import { useEffect, useState } from 'react'
import axios from 'axios'
import './BookEdit.css'
import loadLogo from '../../assets/img/loader.gif'


export function BookEdit(props) {
    const [book, setBook] = useState({
        title: '',
        author: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        axios.get(`http://localhost:4000/books/${props.match.params.id}`)
            .then(res => setBook(res.data))
            .finally(() => setLoading(false))
    }, [])

    function submit(event) {
        event.preventDefault()
        setLoading(true)
        axios.put(`http://localhost:4000/books/${props.match.params.id}`, book)
            .then(() => {
                setLoading(false)
                props.history.push('/')
            })
    }

    function handleChange(event) {
        setBook({ ...book, [event.target.name]: event.target.value })
    }

    if (loading) return <div className = "main-edit-wrapper"><img src = {loadLogo} alg = "loading" className = "main-load-gif"/></div>

    return (
        <div className = "main-edit-wrapper">
            <form onSubmit={submit} className = "main-edit__form-edit">
                <h3>Edit Form</h3>
                <label className = "main-edit__form-label">Title</label>
                <input value={book.title} onChange={handleChange} name="title" className = "main-edit__form-input" />
                <label className = "main-edit__form-label">Author</label>
                <input value={book.author} onChange={handleChange} name="author" className = "main-edit__form-input"/>
                <button type="submit" disabled={loading} className = "main-edit__form-edit-btn">Save</button>
            </form>
        </div>
    )
}