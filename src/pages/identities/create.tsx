import type { NextPage } from "next";
import { useRouter } from "next/router";
import Create from "~/components/identities/identity/create/index";

const IdentityPage: NextPage = () => {
  const router = useRouter();
  return <Create id={router.query.id} />;
};

export default IdentityPage;
