import { useState } from 'react';

interface TOCItem {
  id: number;
  title: string;
  content: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  onItemClick: (content: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, onItemClick }) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  const handleClick = (item: TOCItem) => {
    setSelectedItemId(item.id);
    onItemClick(item.content);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-1/4">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <ul className="space-y-2">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item)}
            className={`cursor-pointer hover:bg-blue-100 p-2 rounded-md ${
              item.id === selectedItemId ? 'bg-blue-100' : ''
            }`}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
