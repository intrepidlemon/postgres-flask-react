import React from 'react'
import { connect } from 'react-redux'

import Nav from '../Nav'
import Page from '../Page'
import Thumbnail from '../Thumbnail'

import './image.css'

const Image = ({ url, name, output, }) =>
  <Page className="image">
    <Nav/>
    <h1>{ name }</h1>
    <Thumbnail size="30rem" src={url} alt={name}/>
    <div> output: { output }</div>
  </Page>

const mapStateToProps = (state, props) => ({
  ...state.files.images[props.match.params.id],
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)
