// ============================================================
// AirCrew Jobs — Stripe webhook → grants 60-day Training Centre pass
// Supabase Edge Function. Deploy with JWT verification OFF (Stripe
// calls it unauthenticated). Listens for checkout.session.completed,
// reads client_reference_id (the user's id, passed by the site), and
// upserts public.prep_access with expires_at = now + 60 days.
//
// Function secrets to set (Supabase → Edge Functions → stripe-webhook → Secrets):
//   STRIPE_SECRET_KEY      = sk_live_...        (Stripe → Developers → API keys)
//   STRIPE_WEBHOOK_SECRET  = whsec_...          (from the webhook endpoint you create)
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.
// ============================================================
import Stripe from "https://esm.sh/stripe@16.12.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const PASS_DAYS = 60;

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret, undefined, cryptoProvider);
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    if (userId) {
      const expiresAt = new Date(Date.now() + PASS_DAYS * 86400000).toISOString();
      const { error } = await supabase
        .from("prep_access")
        .upsert({ user_id: userId, expires_at: expiresAt, updated_at: new Date().toISOString() });
      if (error) return new Response(`DB error: ${error.message}`, { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
