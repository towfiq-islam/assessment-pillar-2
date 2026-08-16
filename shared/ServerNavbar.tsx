import { auth } from "@/auth";
import Navbar from "@/shared/Navbar";

export default async function ServerNavbar() {
  const session = await auth();
  return <Navbar user={session?.user} />;
}
