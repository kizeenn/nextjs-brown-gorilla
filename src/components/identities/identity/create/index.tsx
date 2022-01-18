import { supabase } from "~/utils/supabaseClient";
import { definitions } from "~/types/supabase";
import { useRouter } from "next/router";

export default function Create() {
  const router = useRouter();

  async function create(event: any) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());
    const { data } = await supabase
      .from<definitions["identities"]>("identities")
      .insert(formData);

    if (!data) return;

    const [identity] = data;

    if (identity.id) router.push(`/identities/${identity.id}`);
  }

  return (
    <form onSubmit={create}>
      <label>name</label>
      <input type="text" name="full_name" />
      <button type="submit">Create</button>
    </form>
  );
}
