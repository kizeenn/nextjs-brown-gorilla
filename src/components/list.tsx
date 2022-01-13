import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";

export type Identity = {
  full_name: string;
  id: string;
};

export default function Dashboard() {
  const [identities, setIdentities] = useState<Identity[] | null>([]);

  useEffect(() => {
    fetchIdentities();
  });

  async function fetchIdentities() {
    const { data } = await supabase.from("identities").select();
    setIdentities(data);
  }

  async function deleteIdentity(id: string) {
    await supabase.from("identities").delete().match({ id });
  }
  return (
    <div className="identities">
      {identities.map((identity) => (
        <div className="identity" key={identity.id}>
          <h1>{identity.full_name}</h1>
          <button onClick={() => deleteIdentity(identity.id)}>
            delete identity
          </button>
        </div>
      ))}
    </div>
  );
}
