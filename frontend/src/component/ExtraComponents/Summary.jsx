import React from 'react'
import ReactMarkdown from 'react-markdown';

function Summary({summary}) {
  return (
    <div className='summary-container bg-white rounded-2xl m-4'>
      <ReactMarkdown>{summary}</ReactMarkdown>
    </div>
  )
}

export default Summary