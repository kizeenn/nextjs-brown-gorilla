import { supabase } from "~/utils/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "~/types/supabase";
import Link from "next/link";

export interface IdentityProps {
  id: string;
}

export default function Identity(props: IdentityProps) {
  const [identity, setIdentity] = useState<definitions["identities"]>();

  useEffect(() => {
    fetchIdentity(props.id);
  }, [props.id]);

  async function fetchIdentity(id: string) {
    const { data } = await supabase
      .from<definitions["identities"]>("identities")
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
