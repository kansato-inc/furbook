"use client";

import { WhistleProvider } from "@kansato/whistle-react";

export function WhistleProviderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_WHISTLE_PUBLISHABLE_KEY ?? "";
  const projectId = process.env.NEXT_PUBLIC_WHISTLE_PROJECT_ID ?? "";
  const baseUrl = process.env.NEXT_PUBLIC_WHISTLE_API_BASE;

  const configured = apiKey.length > 0 && projectId.length > 0;

  return (
    <WhistleProvider
      apiKey={apiKey || "pk_live_not_configured"}
      projectId={projectId || "00000000-0000-0000-0000-000000000000"}
      baseUrl={baseUrl}
      routeHandlerPath="/api/whistle/report"
      branding
      embedAppearance="system"
    >
      {!configured && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-center text-sm text-yellow-800">
          Whistle not configured: copy{" "}
          <code className="bg-yellow-100 px-1 rounded">.env.example</code> to{" "}
          <code className="bg-yellow-100 px-1 rounded">.env.local</code> and add
          your credentials
        </div>
      )}
      {children}
    </WhistleProvider>
  );
}
