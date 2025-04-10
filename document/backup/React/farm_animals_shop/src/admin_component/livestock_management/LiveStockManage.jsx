import React from 'react'
import { Tab,Tabs } from 'react-bootstrap'

const LiveStockManage = () => {
  return (
    <Tabs
    defaultActiveKey="admin"
    id="stock-main"
    className="mb-3"
    justify
  >
    <Tab eventKey="admin" title="stock-admin">

    </Tab>
    <Tab eventKey="profile" title="Profile">
      Tab content for Profile
    </Tab>
    <Tab eventKey="longer-tab" title="Loooonger Tab">
      Tab content for Loooonger Tab
    </Tab>
    <Tab eventKey="contact" title="Contact" disabled>
      Tab content for Contact
    </Tab>
  </Tabs>
  )
}

export default LiveStockManage