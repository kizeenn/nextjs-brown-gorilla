import { supabase } from "~/utils/supabaseClient";
import { useEffect, useState } from "react";
import { definitions } from "~/types/supabase";

export type Identity = definitions["identities"];

export interface IdentityProps {
  id: string;
}

export default function Edit(props: IdentityProps) {
  const [identity, setIdentity] = useState<Identity>();

  async function fetchIdentity(id: string) {
    const { data } = await supabase
      .from<Identity>("identities")
      .select()
      .eq("id", id)
      .single();

    if (data) setIdentity(data);
  }

  async function saveIdentity(
    id: definitions["identities"]["id"],
    data: definitions["identities"]
  ) {
    await supabase.from<Identity>("identities").update(data).match({ id: id });
  }

  function save(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (identity) saveIdentity(identity.id, data);
  }

  useEffect(() => {
    fetchIdentity(props.id);
  }, []);

  return (
    <form onSubmit={save}>
      <label>change your name</label>
      <input type="text" name="full_name" />
      <button type="submit">Save</button>
    </form>
  );
}
