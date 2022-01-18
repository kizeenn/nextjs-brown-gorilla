import type { NextPage } from "next";
import { useRouter } from "next/router";
import Show from "~/components/identities/identity";

const IdentityPage: NextPage = () => {
  const router = useRouter();
  return router.query.id ? <Show id={router.query.id} /> : null;
};

export default IdentityPage;
