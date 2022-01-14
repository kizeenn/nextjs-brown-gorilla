import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "~/types/supabase";
import Link from "next/link";

export default function List() {
  const [identities, setIdentities] = useState<definitions["identities"][]>([]);

  async function fetchIdentities() {
    const { data } = await supabase.from("identities").select();
    if (data) setIdentities(data);
  }

  async function deleteIdentity(id: string) {
    await supabase.from("identities").delete().match({ id });
    fetchIdentities();
  }

  useEffect(() => {
    fetchIdentities();
  }, []);

  return (
    <div className="identities">
      {identities.map((identity) => (
        <div className="identity" key={identity.id}>
          <Link
            href={{
              pathname: "/identities/[id]",
              query: { id: identity.id },
            }}
          >
            {identity.full_name}
          </Link>
          <button onClick={() => deleteIdentity(identity.id)}>
            delete identity
          </button>
        </div>
      ))}
    </div>
  );
}
