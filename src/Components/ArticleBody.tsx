interface ArticleBodyProps {
    content: string;
  }
  
  const ArticleBody: React.FC<ArticleBodyProps> = ({ content }) => (
    <div className="w-3/4 p-4">
      <h2 className="text-xl font-bold mb-4">Article Content</h2>
      <div>{content}</div>
    </div>
  );
  
  export default ArticleBody;
  