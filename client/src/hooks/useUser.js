import { useQuery } from "react-query";
import * as userService from "../services/user-service";

const getActiveUser = async () => {
  const user = await userService.getUser();
  return user;
};

function useUser() {
  return useQuery(["user"], () => getActiveUser());
}

export { useUser };
