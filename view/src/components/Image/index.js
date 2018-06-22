import React from 'react'
import { connect } from 'react-redux'

import Nav from '../Nav'
import Flex from '../Flex'
import Page from '../Page'
import Thumbnail from '../Thumbnail'

import './image.css'

const Image = ({ url, name, output, }) =>
  <Flex>
    <div className="image__nav">
      <Nav/>
    </div>
    <div className="image__black">
      <Thumbnail size="100%" src={url} alt={name}/>
    </div>
    <Page direction="row" justify="space-between">
      <h1>{ name }</h1>
      { output &&
        <div className="image__output"> { output.toFixed(2) }</div>
      }
    </Page>
  </Flex>

const mapStateToProps = (state, props) => ({
  ...state.files.images[props.match.params.id],
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)
