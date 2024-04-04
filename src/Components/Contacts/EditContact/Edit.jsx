import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../../../Services/ContactService';
import Spinner from '../../Spinner/Spinner';

const Edit = () => {

  let { ContactId } = useParams();
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      group: ''
    },
    errorMessage: '',
    groups: []
  });

  useEffect(() => {
    getData();
  }, [ContactId])
  const getData = async () => {
    try {
      setState({ ...state, loading: true });
      let response = await ContactService.getContact(ContactId);
      let groupResponse = await ContactService.getGroups();
      setState({
        ...state,
        loading: false,
        contact: response.data,
        groups: groupResponse.data

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

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, ContactId);
      if (response) {
        navigate('/contact/list', { replace: true })
      }
    }
    catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contact/edit${ContactId}`, { replace: true })
    }
  };
  let { loading, contact, errorMessage, groups } = state;

  return (
    <React.Fragment>
      {
        loading ? <Spinner/> : <React.Fragment>
          <section className='add-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h4 text-primary fw-bold'> Edit Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, ut officia ratione in molestias culpa, nulla numquam molestiae neque eveniet cum deserunt eius itaque minima perferendis dolore dignissimos eum sint illo, maxime voluptatibus obcaecati a! Porro officia beatae vel exercitationem!</p>
            </div>
          </div>
          <div className="row d-flex align-items-center " >
            <div className="col-md-3 my-1 d-flex align-items-center" id='edit-profile'>
              <img src={contact.photo} alt=" will load image" className='contact-img' />
            </div>
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className='mb-2'>
                  <input
                    required
                    name='name'
                    value={contact.name}
                    type="text" className='form-control' placeholder='Name' readOnly />
                </div>
                <div className='mb-2'>
                  <input
                    required
                    name='photo'
                    onChange={updateInput}
                    value={contact.photo}
                    type="text" className='form-control' placeholder='Photo URL' />
                </div>
                <div className='mb-2'>
                  <input
                    required
                    name='mobile'
                    onChange={updateInput}
                    value={contact.mobile}
                    type="number" className='form-control' placeholder='Number' inputMode='numeric' />
                </div>
                <div className='mb-2'>
                  <input
                    required
                    name='email'
                    onChange={updateInput}
                    value={contact.email}
                    type="email" className='form-control' placeholder='Email' inputMode='email' />
                </div>
                <div className='mb-2'>
                  <input
                    required
                    name='title'
                    onChange={updateInput}
                    value={contact.title}
                    type="text" className='form-control' placeholder='Title' />
                </div>
                <div className='mb-2'>
                  <select required
                    name='group'
                    onChange={updateInput}
                    value={contact.group} className='form-control'>
                    <option value="">Select a Group</option>
                    {
                      groups.length > 0 &&
                      groups.map(group => {
                        return (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                      })
                    }

                  </select>
                </div>
                <div className='mb-2'>
                  <input type="submit" className='btn btn-primary' value={"Update"} />
                  <Link to={'/contact/list'} className='btn btn-dark mx-3'>Cancel</Link>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
        </React.Fragment>
      }
    </React.Fragment>
  )
}
export default Edit
