import { supabase } from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "~/types/supabase";
import Item from "~/components/list/item/index";
import Link from "next/link";

export default function List() {
  const [identities, setIdentities] = useState<definitions["identities"][]>([]);

  async function fetchIdentities() {
    const { data } = await supabase.from("identities").select();
    if (data) setIdentities(data);
  }

  async function deleteIdentity(identity: definitions["identities"]) {
    await supabase.from("identities").delete().match({ id: identity.id });
    const index = identities.indexOf(identity);
    if (index > -1) identities.splice(index, 1);
    setIdentities([...identities]);
  }

  useEffect(() => {
    fetchIdentities();
  }, []);

  return (
    <>
      <ul>
        {identities.map((identity) => (
          <Item
            key={identity.id}
            onDelete={deleteIdentity}
            identity={identity}
          />
        ))}
      </ul>

      <Link
        href={{
          pathname: "/identities/create",
        }}
      >
        create
      </Link>
    </>
  );
}
