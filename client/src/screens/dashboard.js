import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateLoanApplication } from "../hooks/useCreateLoanApplication";
import { useLoanApplications } from "../hooks/useLoanApplications";
import { Button } from '@solera/ui';

function DashboardScreen() {
  const navigate = useNavigate();
  const { data } = useLoanApplications();
  const create = useCreateLoanApplication();

  const handleCreateClick = async () => {
    // TODO: Fill with user data for first_name, last_name, etc.
    create.mutateAsync({ first_name: 'Stephen'}).then(data => navigate(`/pre-application/${data.uuid}`))
  }
  console.log('CD', create.data)
  return (
    <div>
      <h1>Dashboard</h1>
      {data.map((app) => (
        <div key={app.uuid}><Link to={`/pre-application/${app.uuid}`}>{app.inserted_at}</Link></div>
      ))}
      <Button onClick={handleCreateClick}>Start New Application</Button>
    </div>
  );
}

export { DashboardScreen };
