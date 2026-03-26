import "server-only";

import { createClient } from "@supabase/supabase-js";

import { MESSAGES_TABLE } from "@/lib/constants";
import type { Message } from "@/types/message";

function getSupabaseCredentials() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return { supabaseUrl, serviceRoleKey };
}

export function createSupabaseServerClient() {
  const { supabaseUrl, serviceRoleKey } = getSupabaseCredentials();

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function getMessages(): Promise<Message[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select("id, content, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createMessageRecord(content: string): Promise<Message> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .insert({ content })
    .select("id, content, created_at, updated_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteMessageRecord(id: string): Promise<boolean> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}
