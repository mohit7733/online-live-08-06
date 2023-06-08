import React, { useState } from 'react'
import Supplierconfirmmeeting from '../meetings/Supplierconfirmmeeting'
import Supplierpandingmeeting from '../meetings/Supplierpandingmeeting'
import Left_menu2 from './Left_menu2'

function Supplier_confirmed_me() {
  const [sidebar ,setsidebar] = useState(true)

  return (
    <div className="product_showcase  supplier_pending_wrap Meeting_wrap"
    >
      <div className="main">
      <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} />
        <Supplierconfirmmeeting sidebar={sidebar} />
      </div>
    </div>
  )
}

export default Supplier_confirmed_me