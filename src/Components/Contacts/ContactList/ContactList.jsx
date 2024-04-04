import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'
import { ContactService } from '../../../Services/ContactService';
import Spinner from '../../Spinner/Spinner';

let ContactList = () => {

    let [query, setQuery] = useState({
        text: ''
    })

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        fillterdContacts: [],
        errorMessage: ''
    });

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            setState({ ...state, loading: true });
            let response = await ContactService.getAllContacts();
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                fillterdContacts: response.data
            });
        }
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
        }
    }
    let clickDelete = async (ContactId) => {
        try {
            let response = await ContactService.deleteContact(ContactId)
            if (response) {
                setState({ ...state, loading: true });
                let response = await ContactService.getAllContacts();
                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    fillterdContacts: response.data
                });
            }
        }
        catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message
            });
        }
    };

    //searc contact
    let searchContact = (event) => {
        setQuery({ ...query, text: event.target.value });
        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setState({
            ...state,
            fillterdContacts: theContacts
        })

    }
    let { loading, contacts, errorMessage, fillterdContacts } = state;
    return (
        <React.Fragment>
            <section className='contact-search p-3'>
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className='h3 fw-bold'>Conatct Manager
                                    <Link to={'/contact/add'} className=" btn btn-primary ms-2"><i className='fa fa-plus-circle me-2' />Add</Link>
                                </p>
                                <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum quis delectus officia ab velit qui consectetur magni, cumque eos temporibus!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className='row'>
                                    <div className="col">
                                        <div className='mb-2'>
                                            <input
                                                name='text'
                                                value={query.text}
                                                onChange={searchContact}
                                                type="text" className='form-control' placeholder='Search Names' />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='mb-2'>
                                            <input type="submit" className='btn btn-outline-dark' view="Search" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> : <React.Fragment>
                    {/* contact card section  */}
                    <section className='contact-list'>
                        <div className="container">
                            <div className="row">
                                {
                                    fillterdContacts.length > 0 &&
                                    fillterdContacts.map(contact => {
                                        return (
                                            <div className="col-md-6" key={contact.id}>
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div className="row d-flex align-items-center justify-content-around">
                                                            <div className="col-md-4 d-flex justify-content-center">
                                                                <img src={contact.photo} alt="" className='contact-img my-2' />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <ul className='list-group'>
                                                                    <li className='list-group-item list-group-item-action '>
                                                                        Name : <span className='fw-bold'>{contact.name}</span>
                                                                    </li>
                                                                    <li className='list-group-item list-group-item-action '>
                                                                        Email : <span className='fw-bold'>{contact.email}</span>
                                                                    </li>
                                                                    <li className='list-group-item list-group-item-action '>
                                                                        Contact : <span className='fw-bold'>{contact.mobile}</span>
                                                                    </li>
                                                                </ul>

                                                            </div>
                                                            <div className="col-md-2 d-flex justify-content-around align-conte
                                        nt-center flex-sm-column flex-row">
                                                                <Link to={`/contact/view/${contact.id}`} className='btn btn-warning my-1' id='links'>
                                                                    <i className='fa fa-eye'></i>
                                                                </Link>
                                                                <Link to={`/contact/edit/${contact.id}`} className='btn btn-primary my-1' id='links'>
                                                                    <i className='fa fa-pen'></i>
                                                                </Link>
                                                                <button className='btn btn-danger my-1' id='links'><i className='fa fa-trash' onClick={() => clickDelete(contact.id)}></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }

        </React.Fragment>
    )
}

export default ContactList
