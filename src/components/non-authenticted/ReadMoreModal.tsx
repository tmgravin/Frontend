// src/ReadMoreModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DataItem } from './LatestProjects';
import { AiOutlineFileText } from 'react-icons/ai'; // Ensure this import is correct

interface ReadMoreModalProps {
  project: DataItem | null;
  onClose: () => void;
 
}

const ReadMoreModal: React.FC<ReadMoreModalProps> = ({ project, onClose, }) => {
  if (!project) return null;

  return (
    <Dialog open={!!project} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className='font-bold underline'>{project.title}</DialogTitle>
      <DialogContent>
        Optional: Display posted date if available
        <p className="text-gray-500 mb-4">Posted: {new Date(project.postedAt).toLocaleString()}</p>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Requirements</h2>
          <ul className="list-disc list-inside">
            Uncomment and ensure the data exists
            <li>Required Experience Year: {project.experienceYear}</li>
            <li>Required Skills: {project.skills.join(', ')}</li>
            <li>Required Tools/Software: {project.tools.join(', ')}</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Scope of the Project</h2>
          <ul className="list-disc list-inside">
            <li>Large <span className="text-gray-500">({project.scope})</span></li>
            <li>How long will your work take? <span className="text-gray-500">{project.duration}</span></li>
            <li>What level of experience will it need <span className="text-gray-500">{project.experienceLevel}</span></li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Description of the Project</h2>
          <p className="bg-gray-100 p-4 rounded-lg mb-2">{project.description}</p>
          <button onClick={() => { /* Handle file download */ }} className="text-blue-600 flex items-center">
            <AiOutlineFileText className="mr-2" />
            Attached file
          </button>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-2">Budget of the project</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <input type="radio" id="hourly" name="budgetType" className="mr-2" checked readOnly />
              <label htmlFor="hourly">Hourly rate</label>
            </div>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="from" className="block text-gray-700">From</label>
                <input type="text" id="from" className="border border-gray-300 rounded-lg p-2 w-full" value={`$${project.budgetFrom} /hr`} readOnly />
              </div>
              <div>
                <label htmlFor="to" className="block text-gray-700">To</label>
                <input type="text" id="to" className="border border-gray-300 rounded-lg p-2 w-full" value={`$${project.budgetTo} /hr`} readOnly />
              </div>
            </div>
          </div>
        </section>
      </DialogContent>
      <DialogActions>
      
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReadMoreModal;
