import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import { upload } from '../../actions/files'

import './upload.css'

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploading: {},
      index: 0,
    }
  }
  upload = file => {
    let index = null
    this.setState(state => {
      index = state.index
      return {
        ...state,
        uploading: {
          ...state.uploading,
          [state.index]: { name: file.name },
        },
        index: index + 1,
      }
    })
    const { upload } = this.props
    upload({ file }).then(({ status, data, error }) => {
      if (status === 200) {
        this.setState(state => {
          const { uploading } = state
          delete uploading[index]
          return {
             ...state,
            uploading
          }
        })
      } else {
        this.setState(state => {
          let { uploading } = state
          uploading = {
            ...uploading,
            [index]: { ...uploading[index], error }
          }
          return {
             ...state,
            uploading
          }
        })
      }
    })
  }

  render() {
    const { uploading } = this.state
    const files = Object.values(uploading)
    return <div className="upload">
      <Dropzone
        className="upload__dropzone"
        activeClassName="upload__dropzone--active"
        accept="image/png"
        onDrop={files => files.map(this.upload)}
      >
        { files.length === 0 &&
          <div className="upload__dropzone__empty">
            📥
          </div>
        }
        { files.map((f, i) =>
          <Uploading key={`${i}-${f.name}`}
            name={f.name}
            error={f.error}
          />
        )}
      </Dropzone>
    </div>
  }
}

const Uploading = ({ name, error }) => <div
  className={`upload__uploading ${error ? "upload__uploading--error" : ""}`}
  onClick={(e) => e.stopPropagation() }
>
  <div className="upload__uploading__file">
    <div className="upload__name" title={name}>{ name }</div>
  </div>
  { error &&
    <div className="upload__error" title={error}>{ error }</div>
  }
</div>

const mapDispatchToProps = dispatch => ({
  upload: file => dispatch(upload(file)),
})

const mapStateToProps = (state, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
