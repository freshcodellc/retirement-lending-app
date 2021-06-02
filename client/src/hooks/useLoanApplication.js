import { useQuery } from "react-query";
import * as loanApplicationService from "../services/loan-application-service";

const getLoanApplicationById = async (appId) => {
  const loan_application = await loanApplicationService.get(appId);
  return loan_application;
};

function useLoanApplication(appId) {
  return useQuery(["loan-application", appId], () => getLoanApplicationById(appId));
}

export { useLoanApplication }
