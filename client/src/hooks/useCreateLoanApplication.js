import * as loanApplicationService from "../services/loan-application-service";
import { useMutation, queryCache } from "react-query";

function useCreateLoanApplication() {
  return useMutation(
    (values) => loanApplicationService.create(values),
    {
      onMutate: (values) => {
        const previousData = queryCache.getQueryData("loan-applications");

        queryCache.setQueryData("loan-applications", (old) => [
          ...old,
          {
            uuid: 'temp',
            ...values,
          },
        ])

        return () => queryCache.setQueryData("loan-applications", previousData)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => queryCache.refreshQueries("loan-applications"),
    }
  )
}

export { useCreateLoanApplication }
