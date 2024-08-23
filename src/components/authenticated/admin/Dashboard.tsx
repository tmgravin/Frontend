import React from "react";
import ProjectsTableComponent from "./Projects";
import InfoCards from "./InfoCards";
import AssignmentChart from "./Charts/AssignmentChart";

function Dashboard() {
  return (
    <div>
      <div>
        <InfoCards />
      </div>

      <div>
        <AssignmentChart />
      </div>

      {/* <div>

        <ProjectsTableComponent/>
        </div> */}
    </div>
  );
}

export default Dashboard;
