import { client } from "../utils/api-client";
import * as auth from "./auth-service";

async function create(applicationData) {
  const token = await auth.getToken();
  return await client("loan-applications", { data: { ...applicationData }, token }).then((res) => res);
}

async function list() {
  const token = await auth.getToken();
  return await client("loan-applications", { token }).then((res) => res);
}

async function get({ uuid }) {
  const token = await auth.getToken();
  return await client(`loan-applications/${uuid}`, { token }).then((res) => res);
}

async function update({ uuid }) {
  const token = await auth.getToken();
  return await client(`loan-applications/${uuid}`, { token, method: "PUT" }).then((res) => res);
}

export { create, get, list, update };
