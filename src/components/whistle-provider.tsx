"use client";

import { WhistleProvider } from "@kansato/whistle-react";
import { useTheme } from "next-themes";

const PUBLISHABLE_KEY_PREFIX = "whpk_" as const;

function isPublishableWhistleKey(key: string): boolean {
  return key.startsWith(PUBLISHABLE_KEY_PREFIX);
}

/**
 * Wraps the demo app with Whistle. The React SDK is browser-only — use a **publishable** key (`whpk_…`),
 * never a secret (`wh_…`) key.
 *
 * Env:
 * - NEXT_PUBLIC_WHISTLE_PUBLISHABLE_KEY — `whpk_…` from Project → API keys
 * - NEXT_PUBLIC_WHISTLE_PROJECT_ID — project UUID
 * - NEXT_PUBLIC_WHISTLE_API_BASE — optional, default `http://localhost:3001/sdk/whistle/v1`
 *
 * Dev layout: whistle **server** on 3001, whistle **web** on 3000 (embed iframe), this app on another
 * port, e.g. `bun dev -- -p 3002`, so `/embed/report` is served by Whistle web, not Furbook.
 */
export function FurbookWhistleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const embedAppearance =
    resolvedTheme === "dark"
      ? "dark"
      : resolvedTheme === "light"
        ? "light"
        : "system";
  const apiKey = process.env.NEXT_PUBLIC_WHISTLE_PUBLISHABLE_KEY ?? "";
  const projectId = process.env.NEXT_PUBLIC_WHISTLE_PROJECT_ID ?? "";
  const baseUrl =
    process.env.NEXT_PUBLIC_WHISTLE_API_BASE ?? "http://localhost:3001/sdk/whistle/v1";

  if (process.env.NODE_ENV === "development" && apiKey && !isPublishableWhistleKey(apiKey)) {
    console.error(
      "[FurbookWhistleProvider] NEXT_PUBLIC_WHISTLE_PUBLISHABLE_KEY must start with whpk_. " +
        "Use a publishable key from the project (React SDK cannot use secret wh_ keys).",
    );
  }

  const resolvedKey =
    apiKey.length > 0 ? apiKey : "whpk_set_NEXT_PUBLIC_WHISTLE_PUBLISHABLE_KEY_in_env_local";
  const resolvedProjectId =
    projectId.length > 0 ? projectId : "00000000-0000-0000-0000-000000000000";
  const envIncomplete = apiKey.length === 0 || projectId.length === 0;

  return (
    <WhistleProvider
      apiKey={resolvedKey}
      projectId={resolvedProjectId}
      baseUrl={baseUrl}
      branding={true}
      embedAppearance={embedAppearance}
    >
      {envIncomplete ? (
        <div className="mx-auto max-w-2xl px-3 pt-3">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-medium">Whistle is not configured</p>
            <p className="mt-1 text-amber-800">
              Copy{" "}
              <code className="rounded bg-amber-100/80 px-1">examples/furbook/.env.example</code> to{" "}
              <code className="rounded bg-amber-100/80 px-1">.env.local</code> and set real{" "}
              <code className="rounded bg-amber-100/80 px-1">NEXT_PUBLIC_WHISTLE_PUBLISHABLE_KEY</code>{" "}
              (whpk_…) and{" "}
              <code className="rounded bg-amber-100/80 px-1">NEXT_PUBLIC_WHISTLE_PROJECT_ID</code>.
            </p>
          </div>
        </div>
      ) : null}
      {children}
    </WhistleProvider>
  );
}
