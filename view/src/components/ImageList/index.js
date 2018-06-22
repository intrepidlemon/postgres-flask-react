import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Thumbnail from '../Thumbnail'

import './image-list.css'

const ImageList = ({ images }) =>
  <div className="image-list">
    { images.map(i => <Image key={i.id} {...i} />) }
  </div>

const Image = ({ id, url, name, digest }) => <Link
  to={`/image/${id}`}
  className="image-list__image"
>
  <div className="image-list__name">{ name }</div>
  <div className="image-list__image__inner">
    <Thumbnail size="30rem" src={url} alt={name}/>
  </div>
</Link>


const mapStateToProps = (state, props) => ({
  images: Object.values(state.files.images).reverse(),
})

export default connect(mapStateToProps)(ImageList)
