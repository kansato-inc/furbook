import { createWhistleHandler } from "@kansato/whistle-react";

export const { POST } = createWhistleHandler({
  apiKey: process.env.WHISTLE_API_KEY!,
  projectId: process.env.WHISTLE_PROJECT_ID!,
  apiUrl: process.env.WHISTLE_API_URL,
  getReporter: () => ({
    type: "user",
    externalId: "user-001",
    display: {
      name: "Fluffy McWhiskers",
      username: "fluffy_mcwhiskers",
    },
  }),
});
