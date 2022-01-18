import Link from "next/link";
import { definitions } from "~/types/supabase";

export interface ItemProps {
  identity: definitions["identities"];
  onDelete: (identity: definitions["identities"]) => void;
}

export default function Item(props: ItemProps) {
  return (
    <>
      <Link
        href={{
          pathname: "/identities/[id]",
          query: { id: props.identity.id },
        }}
      >
        {props.identity.full_name}
      </Link>

      <button onClick={() => props.onDelete(props.identity)}>delete</button>
    </>
  );
}
