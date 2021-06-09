import {format, parseJSON as parseISO} from 'date-fns'

const formatDate = date => format(date, 'MM.dd.yy')

export {formatDate, parseISO}
