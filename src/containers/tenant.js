import React from 'react'
import Header from '../components/Header'
import Tenant from '../components/Tenant'
import Footer from '../components/Footer'

const tenant = () => {
  return (
    <div>
      <Header/>
        <Tenant/>
        <Footer/>
    </div>
  )
}

export default tenant
