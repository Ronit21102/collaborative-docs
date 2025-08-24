import { Link } from 'lucide-react'
import React from 'react'

type Props = {}

const DocumentPage = (props: Props) => {
  return (
    <div>
        Click <Link href="/documents/123">here</Link> to create a new document.
    </div>
  )
}

export default DocumentPage