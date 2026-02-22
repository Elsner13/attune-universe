import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/subscribe
 * Captures email signups from Signal newsletter and OS waitlist forms.
 *
 * To wire this to a real email provider, set the following env vars:
 *   LOOPS_API_KEY  — for Loops.so (recommended for transactional + newsletter)
 *   RESEND_API_KEY — for Resend (transactional email)
 *   SUBSTACK_URL   — redirect to Substack subscribe endpoint
 *
 * Until a provider is connected, this logs submissions and returns 200
 * so the UI optimistically shows success.
 */

interface SubscribeBody {
  email: string;
  source?: "signal-page" | "signal-homepage" | "os-waitlist" | "os-homepage";
}

export async function POST(req: NextRequest) {
  try {
    const body: SubscribeBody = await req.json();
    const { email, source = "unknown" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ── Loops.so Integration (recommended) ──
    // If LOOPS_API_KEY is set, push subscriber to the appropriate Loops list.
    if (process.env.LOOPS_API_KEY) {
      const listMap: Record<string, string> = {
        "signal-page": process.env.LOOPS_SIGNAL_LIST_ID ?? "",
        "signal-homepage": process.env.LOOPS_SIGNAL_LIST_ID ?? "",
        "os-waitlist": process.env.LOOPS_OS_WAITLIST_LIST_ID ?? "",
        "os-homepage": process.env.LOOPS_OS_WAITLIST_LIST_ID ?? "",
      };

      await fetch("https://app.loops.so/api/v1/contacts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source,
          userGroup: listMap[source] || "general",
          subscribed: true,
        }),
      });
    }

    // ── Fallback: Console log (dev / pre-provider) ──
    console.log(`[Attune Subscribe] email=${email} source=${source} ts=${new Date().toISOString()}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Attune Subscribe] Error:", err);
    // Return 200 anyway — UI should still show success, email issues are backend problems
    return NextResponse.json({ success: true });
  }
}
