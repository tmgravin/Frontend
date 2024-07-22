import React from 'react';
import Teachers from './contents/Teachers';
import Students from './contents/Students';
import Dashboard from './contents/Dashboard';

interface ContentProps {
  currentContent: string;
}

const Page1Content: React.FC = () => <div>Content for Page 1</div>;
const Page2Content: React.FC = () => <div>Content for Page 2</div>;
const Page3Content: React.FC = () => <div>Content for Page 3</div>;

const Content: React.FC<ContentProps> = ({ currentContent }) => {
  switch (currentContent) {
    case 'Page1':
      return <Teachers/>;
    case 'Page2':
      return <Students />;
    case 'Page3':
      return <Dashboard />;
    default:
      return <div>Welcome! Please select an option.</div>;
  }
};

export default Content;
