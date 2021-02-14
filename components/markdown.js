import ReactMarkdown from 'react-markdown';

export default function Markdown({ content }) {
  return (
    /* eslint-disable-next-line react/no-children-prop */
    <ReactMarkdown children={content} className="prose sm:prose-sm xl:prose-lg mx-auto" />
  );
}
