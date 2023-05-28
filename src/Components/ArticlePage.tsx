import { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import TableOfContents from '../Components/TableOfContents';
import ArticleBody from '../Components/ArticleBody';

const tocItems = [
  { id: 1, title: 'Section 1', content: 'Section 1 content...' },
  { id: 2, title: 'Section 2', content: 'Section 2 content...' },
  { id: 3, title: 'Section 3', content: 'Section 3 content...' },
];

const ArticlePage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>('');

  const handleTOCItemClick = (content: string ) => {
    setSelectedContent(content);
  };
 
  return (
    <div className="relative">
      <Navbar />
      <div className="flex mt-8">
        <TableOfContents items={tocItems} onItemClick={handleTOCItemClick} />
        <ArticleBody content={selectedContent} />
      </div>
    </div>
  );
};

export default ArticlePage;


