import * as React from "react";
import * as loanApplicationService from "../services/loan-application-service";
import { useQuery, queryCache } from "react-query";

const getLoanApplications = async () => {
  const { loan_applications } = await loanApplicationService.list();
  return loan_applications;
};

function useLoanApplications() {
  useQuery("loan-applications", getLoanApplications);
}

export { useLoanApplications };
