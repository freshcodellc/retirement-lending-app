import * as loanApplicationService from "../services/loan-application-service";
import { useMutation } from "react-query";
import { queryClient } from "../context/index";

function useUpdateLoanApplication() {
  return useMutation((values, uuid) => loanApplicationService.update({data: { loan_application: { ...values } }, uuid: values.uuid}), {
    onMutate: (values) => {
      const previousData = queryClient.getQueryData("loan-application");

      queryClient.setQueryData("loan-application", (old) => ({...old, ...values}));

      return () => queryClient.setQueryData("loan-application", previousData);
    },
    onError: (error, values, rollback) => rollback(),
    onSuccess: () => queryClient.invalidateQueries("loan-applications"),
  });
}

export { useUpdateLoanApplication };
