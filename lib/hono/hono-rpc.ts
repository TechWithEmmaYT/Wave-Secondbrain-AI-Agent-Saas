import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export const client = hc<AppType>(NEXT_PUBLIC_APP_URL);

export const api = client.api;
