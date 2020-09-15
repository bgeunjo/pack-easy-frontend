import React, { useEffect, useState } from 'react'
import { useMarked } from 'use-marked-hook'
import Prism from 'prismjs'
import PreviewPresenter from "./PreviewPresenter"
import MARKDOWN from '../Markdown/[HTB] -  Starting Point.md'

const MarkdownContainer = () => {
  const [content, setContent] = useState('')

  const markedOptions = {
    highlight: code =>
      Prism.highlight(code, Prism.languages.javascript, 'javascript')
  }
  const html = { __html: useMarked(content, { skipSanitize: true, markedOptions }) }

  const getMarkdown = () => {
    // eslint-disable-next-line no-undef
    fetch(MARKDOWN)
      .then(res => res.text())
      .then(setContent)
  }

  useEffect(() => {
    getMarkdown()
  }, [])

  return <PreviewPresenter dangerouslySetInnerHTML={html} />
}
export default MarkdownContainer