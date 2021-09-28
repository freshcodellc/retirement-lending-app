/** @jsxImportSource @emotion/react */
import {Link} from 'react-router-dom'
import {colors, TextLink} from '@solera/ui'
import {useInfoSections} from 'hooks/use-application'
import {snakeCaseToHumanized} from 'utils/format'

export function ApplicationInfo({application}) {
  const sections = useInfoSections(application)

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.2rem',
        '&>div': {
          height: '100%',
        },
      }}
    >
      {sections.map(section => (
        <div key={section.heading} css={{border: `1px solid ${colors.gray}`}}>
          <div
            css={{
              fontWeight: 500,
              fontSize: '20px',
              padding: '1.2rem',
              background: colors.gray,
              textTransform: 'capitalize',
            }}
          >
            {section.heading}
          </div>
          <div
            css={{
              padding: '1.2rem',
              position: 'relative',
              '& > *:not(:last-child)': {marginBottom: '1.2rem'},
            }}
          >
            {section.route ? (
              <Link to={`/applicants/${application.uuid}/${section.route}`}>
                <TextLink
                  variant="secondary"
                  css={{
                    right: '1.2rem',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    position: 'absolute',
                  }}
                >
                  Edit
                </TextLink>
              </Link>
            ) : null}
            {section.fields.map(field => (
              <div key={field.label}>
                <div css={{fontWeight: 600, marginBottom: '0.4rem'}}>
                  {field.label}
                </div>
                <div>{field.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div key="applicant files" css={{border: `1px solid ${colors.gray}`}}>
        <div
          css={{
            fontWeight: 500,
            fontSize: '20px',
            padding: '1.2rem',
            background: colors.gray,
          }}
        >
          Applicant Files
        </div>
        <div
          css={{
            padding: '1.2rem',
            position: 'relative',
            '& > *:not(:last-child)': {marginBottom: '1.2rem'},
          }}
        >
          {application.documents.map(document => {
            return (
              <div key={document.uuid}>
                <div css={{fontWeight: 600, marginBottom: '0.4rem'}}>
                  {snakeCaseToHumanized(document.document_type)}
                </div>
                <a href={document.presigned_url} target="blank">
                  {document.name}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
