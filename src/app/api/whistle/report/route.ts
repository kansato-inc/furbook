import { createWhistleHandler } from "@kansato/whistle-react/server";
import { NextRequest } from "next/server";

const { POST: handlePost } = createWhistleHandler({
  getReporter: () => ({
    type: "user",
    externalId: "user-001",
    display: {
      name: "Fluffy McWhiskers",
      username: "fluffy_mcwhiskers",
    },
  }),
});

export async function POST(
  request: NextRequest,
  _context: { params: Promise<{}> },
): Promise<Response> {
  return handlePost(request as unknown as Parameters<typeof handlePost>[0]);
}
