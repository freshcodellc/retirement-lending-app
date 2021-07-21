/** @jsxImportSource @emotion/react */
import 'styles/react-dropzone-uploader.css'
import {Fragment, useRef, useState} from 'react'
import {Button, Spinner, TextLink} from '@solera/ui'
import Dropzone from 'react-dropzone-uploader'
import {getDroppedOrSelectedFiles} from 'html5-file-selector'
import {getToken} from 'services/auth-service'
import {apiBaseUrl} from 'utils/api-client'
import {queryClient} from 'context/index'

const cleanFileName = fileName => {
  const fileNameParts = fileName.split('.')
  const ext = fileNameParts.pop()
  const name = fileNameParts.join('_').replace(/\s+/gi, '_')
  return `${name}.${ext}`
}

function FileUploader({
  appUuid,
  type,
  multiple,
  maxFiles,
  canCancel,
  accept = '*',
}) {
  const [error, setError] = useState()

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

  const handleChangeStatus = async ({xhr, remove}, status) => {
    switch (status) {
      case 'error_upload':
        return setError(xhr.statusText)
      case 'aborted':
        return setError('Uploading aborted!')
      case 'done':
        await queryClient.fetchQuery(['loan-application', appUuid])
        return remove()
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
        accept={accept}
        multiple={multiple}
        maxFiles={maxFiles}
        canCancel={canCancel}
        InputComponent={Input}
        LayoutComponent={Layout}
        PreviewComponent={UploadPreview}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        getFilesFromEvent={getFilesFromEvent}
      />
      {error && <span css={{color: 'red'}}>Error: {error}</span>}
    </Fragment>
  )
}

const Layout = ({
  files,
  input,
  previews,
  submitButton,
  dropzoneProps,
  extra: {maxFiles},
}) => {
  return (
    <div>
      {previews}
      <div {...dropzoneProps}>{input}</div>
    </div>
  )
}

const UploadPreview = ({meta, fileWithMeta}) => {
  const {name, status} = meta
  const isDone = status === 'done'
  return <FilePreview name={name} isDone={isDone} />
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
        <Button variant="secondary" type="button" onClick={onUpload}>
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

function FilePreview({isDone, blob, name}) {
  const uploadStatus = isDone ? null : <Spinner />

  const downloadFile = () => {
    const downloadAnchor = document.getElementById('download-anchor')
    downloadAnchor.download = name
    downloadAnchor.href = blob
    downloadAnchor.click()
  }

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '2rem',
        justifyContent: 'flex-start',
      }}
    >
      <TextLink onClick={downloadFile} disabled={!isDone}>
        {name}
      </TextLink>
      <div css={{position: 'absolute', right: 0}}>{uploadStatus}</div>
    </div>
  )
}

export {FileUploader, FilePreview}
