import React from "react";
import { useLoanApplications } from "../hooks/useLoanApplications";


function DashboardScreen() {
  const { data } = useLoanApplications();
  return (
    <div>
      <div>Dashboard</div>
      {data.map(app => <div key={app.uuid}>{app.uuid}</div>)}
    </div>
  )
}

export { DashboardScreen }
