import { createWhistleHandler } from "@kansato/whistle-react/server";

export const { POST } = createWhistleHandler({
  getReporter: () => ({
    type: "user",
    externalId: "user-001",
    display: {
      name: "Fluffy McWhiskers",
      username: "fluffy_mcwhiskers",
      avatarUrl:
        "https://cdn.discordapp.com/avatars/191559866416889856/3d19cacebc1aa316a4b276b6751d7df2.png?size=4096",
    },
  }),
});
