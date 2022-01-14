import type { NextPage } from "next";
import { useRouter } from "next/router";
import Edit from "~/components/identities/edit";

const EditPage: NextPage = () => {
  const router = useRouter();
  return router.query.id ? <Edit id={router.query.id} /> : null;
};

export default EditPage;
