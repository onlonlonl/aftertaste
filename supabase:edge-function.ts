import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
};

Deno.serve(async (req) => {
  // OPTIONS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const url = new URL(req.url);
    const pathParts = url.pathname.split("/").filter(Boolean);
    // Last segment could be an ID: /aftertaste/<id>
    const id = pathParts.length > 1 ? pathParts[pathParts.length - 1] : null;

    // GET — list all drinks (sorted by date desc)
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("drinks")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST — add new drink
    if (req.method === "POST") {
      const body = await req.json();
      const { name, type, note, rating, date } = body;

      const { data, error } = await supabase
        .from("drinks")
        .insert({ name, type: type || "other", note: note || "", rating: rating || 0, date: date || new Date().toISOString().split("T")[0] })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // PATCH — update drink (e.g. Lux writes lux_reply)
    if (req.method === "PATCH" && id) {
      const body = await req.json();
      const { data, error } = await supabase
        .from("drinks")
        .update(body)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
