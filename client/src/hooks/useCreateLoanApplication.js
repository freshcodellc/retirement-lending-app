import * as loanApplicationService from "../services/loan-application-service";
import { useMutation } from "react-query";
import { queryClient } from "../context/index";

function useCreateLoanApplication() {
  return useMutation(
    (values) => loanApplicationService.create({ loan_application: { ...values } }),
    {
      onMutate: (values) => {
        const previousData = queryClient.getQueryData("loan-applications");

        queryClient.setQueryData("loan-applications", (old) => [
          ...old,
          {
            uuid: 'temp',
            ...values,
          },
        ])

        return () => queryClient.setQueryData("loan-applications", previousData)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => queryClient.invalidateQueries("loan-applications"),
    }
  )
}

export { useCreateLoanApplication }
