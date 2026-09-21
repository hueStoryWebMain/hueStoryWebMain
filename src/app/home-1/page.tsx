import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

/** Legacy pairing preview URL → site home */
export default function Home1Redirect() {
  redirect(ROUTES.HOME);
}
