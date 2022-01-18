import { supabase } from "~/utils/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "~/types/supabase";
import Link from "next/link";

export type Identity = definitions["identities"];

export interface IdentityProps {
  id: string;
}

export default function Identity(props: IdentityProps) {
  const [identity, setIdentity] = useState<Identity>();

  useEffect(() => {
    fetchIdentity(props.id);
  }, [props.id]);

  async function fetchIdentity(id: string) {
    const { data } = await supabase
      .from<Identity>("identities")
      .select()
      .eq("id", id)
      .single();

    if (data) setIdentity(data);
  }

  return (
    <>
      <h1>{identity?.full_name}</h1>
      <Link
        href={{
          pathname: "/identities/[id]/edit",
          query: { id: identity?.id },
        }}
      >
        edit
      </Link>
    </>
  );
}
