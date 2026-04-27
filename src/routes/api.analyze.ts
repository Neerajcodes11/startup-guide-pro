import { createFileRoute } from "@tanstack/react-router";
import { analyze, type Answers } from "@/lib/analyze";

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { answers?: Answers };
          if (!body?.answers) {
            return Response.json({ error: "Missing answers" }, { status: 400 });
          }
          return Response.json(analyze(body.answers));
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
      },
    },
  },
});
