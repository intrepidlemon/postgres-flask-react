import React from 'react'

import Nav from '../Nav'
import Page from '../Page'
import Upload from '../Upload'
import ImageList from '../ImageList'

import './home.css'

const Home = () =>
  <Page>
    <Nav/>
    <Upload/>
    <ImageList/>
  </Page>

export default Home
