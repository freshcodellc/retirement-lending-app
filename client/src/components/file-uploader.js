/** @jsxImportSource @emotion/react */
import 'styles/react-dropzone-uploader.css'
import {Fragment, useRef} from 'react'
import {Button} from '@solera/ui'
import Dropzone from 'react-dropzone-uploader'
import {getDroppedOrSelectedFiles} from 'html5-file-selector'
import {getToken} from 'services/auth-service'
import {apiBaseUrl} from 'utils/api-client'

function FileUploader({appUuid, multiple, maxFiles, canCancel, accept = '*'}) {
  // specify upload params and url for your files
  const getUploadParams = ({file, meta}) => {
    const body = new FormData()
    body.append('file', file)
    body.append('type', meta.type)
    const token = getToken()
    return {
      url: `${apiBaseUrl}/${appUuid}/document-upload`,
      body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({meta, file}, status) => {
    // console.log(status, meta, file)
  }

  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
        resolve(chosenFiles.map(f => f.fileObject))
      })
    })
  }

  return (
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
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />
      </label>
    </Fragment>
  )
}

export {FileUploader}
