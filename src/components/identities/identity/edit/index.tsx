import { supabase } from "~/utils/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "~/types/supabase";
import { useRouter } from "next/router";

export interface IdentityProps {
  id: string;
}

export default function Edit(props: IdentityProps) {
  const router = useRouter();
  const [identity, setIdentity] = useState<definitions["identities"]>();

  async function save(identity: definitions["identities"], event: any) {
    event.preventDefault();

    if (!event.target) return;

    const formData = Object.fromEntries(new FormData(event.target).entries());

    const { data } = await supabase
      .from<definitions["identities"]>("identities")
      .update(formData)
      .match({ id: identity.id });

    if (!data) return;

    if (identity.id) router.push(`/identities/${identity.id}`);
  }

  async function fetchIdentity(id: string) {
    const { data } = await supabase
      .from<definitions["identities"]>("identities")
      .select()
      .eq("id", id)
      .single();

    if (data) setIdentity(data);
  }

  useEffect(() => {
    fetchIdentity(props.id);
  }, []);

  return (
    <form
      onSubmit={(event) => {
        if (identity) save(identity, event);
      }}
    >
      <label>change your name</label>
      <input type="text" name="full_name" />
      <button type="submit">Save</button>
    </form>
  );
}
