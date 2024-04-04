import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ContactList from './Components/Contacts/ContactList/ContactList'
import Navbar from './Components/Navbar/Navbar'
import Add from './Components/Contacts/AddContact/Add'
import View from './Components/Contacts/ViewContact/View'
import Edit from './Components/Contacts/EditContact/Edit'

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path={'/'} element={<Navigate to={"/contact/list"}/>}/>
        <Route path={'/contact/list'} element={<ContactList/>}/>
        <Route path={'/contact/add'} element={<Add/>}/>
        <Route path={'/contact/view/:ContactId'} element={<View/>}/>
        <Route path={'/contact/edit/:ContactId'} element={<Edit/>}/>
      </Routes>
    </>
  )
}

export default App
