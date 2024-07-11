import { SECRET_STRIPE_KEY } from "$env/static/private";
import Stripe from "stripe";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const stripe = new Stripe(SECRET_STRIPE_KEY, { apiVersion: "2024-06-20" });

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { priceId } = await request.json();
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get("origin")}/thankyou`,
      cancel_url: `${request.headers.get("origin")}/canceled`,
    });

    return json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    throw error(500, "Error creating payment session");
  }
};
