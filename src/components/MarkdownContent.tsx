import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // ✅ Import GFM support

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground prose-ol:text-foreground prose-blockquote:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-table:text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // ✅ Add GFM support
        components={{
          p: ({ children }) => (
            <p className="text-sm leading-relaxed mb-2 last:mb-0 text-foreground">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="text-sm space-y-1 ml-4 mb-2 last:mb-0 list-disc">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="text-sm space-y-1 ml-4 mb-2 last:mb-0 list-decimal">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground leading-relaxed">{children}</li>
          ),
          h1: ({ children }) => (
            <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0 text-foreground border-b border-border pb-1">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0 text-foreground">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-medium mb-2 mt-2 first:mt-0 text-foreground">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-medium mb-1 mt-2 first:mt-0 text-foreground">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-medium mb-1 mt-1 first:mt-0 text-foreground">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs font-medium mb-1 mt-1 first:mt-0 text-foreground">{children}</h6>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-border pl-4 my-2 italic text-muted-foreground bg-muted/30 py-1">{children}</blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground">{children}</code>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-muted p-3 rounded-md overflow-x-auto text-xs font-mono mb-2 text-foreground border">{children}</pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-2">
              <table className="min-w-full border-collapse border border-border text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody>{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-border">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2 text-foreground">{children}</td>
          ),
          hr: () => <hr className="border-border my-4" />,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="max-w-full h-auto rounded-md my-2" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownContent;
