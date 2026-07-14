/** Result of a public form submission (contact + quote). Kept in a plain
    module so it can be shared between the "use server" action file and the
    client form components — "use server" files may only export async functions. */
export type SubmitState = { ok: boolean; error?: string };
