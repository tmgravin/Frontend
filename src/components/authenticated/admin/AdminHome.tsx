import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { TableDemo } from './contents/Dashboard';

const AdminHome: React.FC = () => {
  return (
  
    <div style={{ display: 'flex' }}>
      <Tabs.Root defaultValue="dashboard" orientation="vertical" style={{ display: 'flex', width: '100%' }}>
        <Tabs.List style={tabsListStyle}>
          <Tabs.Trigger value="dashboard" style={tabStyle}>Dashboard</Tabs.Trigger>
          <Tabs.Trigger value="students" style={tabStyle}>Students</Tabs.Trigger>
          <Tabs.Trigger value="teachers" style={tabStyle}>Teachers</Tabs.Trigger>
        </Tabs.List>

        <div style={contentContainerStyle}>
          <Tabs.Content value="dashboard">
            <h2>Dashboard</h2>
            <p>Dashboard content goes here.
              <TableDemo/>
            </p>
          </Tabs.Content>
          <Tabs.Content value="students">
            <h2>Students</h2>
            <p>Students content goes here.</p>
          </Tabs.Content>
          <Tabs.Content value="teachers">
            <h2>Teachers</h2>
            <p>Teachers content goes here.</p>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};

// Add some basic styling for the tabs
const tabsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '200px',
  borderRight: '1px solid #ddd',
  paddingRight: '10px'
};

const contentContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px'
};

const tabStyle: React.CSSProperties = {
  padding: '10px',
  cursor: 'pointer',
  backgroundColor: '#f1f1f1',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '4px',
  textAlign: 'center',
  width: '100%',
  transition: 'background-color 0.3s ease'
};

export default AdminHome;
