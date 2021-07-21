/** @jsxImportSource @emotion/react */
import 'styles/react-dropzone-uploader.css'
import {Fragment, useRef, useState} from 'react'
import {Button} from '@solera/ui'
import Dropzone from 'react-dropzone-uploader'
import {getDroppedOrSelectedFiles} from 'html5-file-selector'
import {getToken} from 'services/auth-service'
import {apiBaseUrl} from 'utils/api-client'

const cleanFileName = fileName => {
  const fileNameParts = fileName.split('.')
  const ext = fileNameParts.pop()
  const name = fileNameParts.join('_').replace(/\s+/gi, '_')
  return `${name}.${ext}`
}
//TODO: Get document type
function FileUploader({appUuid, type, multiple, maxFiles, canCancel, accept = '*'}) {
  const [error, setError] = useState()

  // specify upload params and url for your files
  const getUploadParams = ({file}) => {

    const fileName = cleanFileName(file.name)
    const modFile = new File([file], fileName, {...file})
    const body = new FormData()
    body.append('file', modFile)
    body.append('type', type)

    return {
      url: `${apiBaseUrl}/loan-applications/${appUuid}/document-upload`,
      body,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({meta, file, xhr}, status) => {
    console.log(status, xhr)
    switch (status) {
      case 'error_upload':
        return setError(xhr.statusText)
      case 'done':
        JSON.parse(xhr.response)
        return
      default:
    }
  }

  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(files => {
        resolve(files.map(f => f.fileObject))
      })
    })
  }

  return (
    <Fragment>
      <Dropzone
        InputComponent={Input}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        getFilesFromEvent={getFilesFromEvent}
        multiple={multiple}
        maxFiles={maxFiles}
        canCancel={canCancel}
        accept={accept}
      />
      {error && <span css={{color: 'red'}}>Error: {error}</span>}
    </Fragment>
  )
}

function Input({accept, onFiles, files, multiple = true, getFilesFromEvent}) {
  const ref = useRef(null)
  const hasFiles = files.length > 0

  const onUpload = () => {
    ref.current.click()
  }

  return (
    <Fragment>
      {multiple && hasFiles ? (
        <Button
          variant="secondary"
          type="button"
          onClick={onUpload}
          css={{marginTop: '2rem'}}
        >
          Upload more
        </Button>
      ) : (
        <div css={{color: '#000', fontWeight: '500', fontSize: '1.6rem'}}>
          <div css={{marginBottom: '1rem'}}>Drag and drop files here</div>
          <div css={{marginBottom: '1rem'}}>or</div>
          <Button type="button" onClick={onUpload}>
            Upload
          </Button>
        </div>
      )}
      <label>
        <input
          ref={ref}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{display: 'none'}}
          onChange={e => {
            getFilesFromEvent(e).then(files => {
              onFiles(files)
            })
          }}
        />
      </label>
    </Fragment>
  )
}

export {FileUploader}
