import ReactMarkdown from 'react-markdown';

export default function Markdown({ content, className }) {
  return (
    <div>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={content} className={`${className} font-huninn prose prose-sm  md:prose lg:prose-lg mx-auto`} />
    </div>
  );
}
