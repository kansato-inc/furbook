"use client";

import { WhistleProvider } from "@kansato/whistle-react";

export function FurbookWhistleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WhistleProvider
      apiKey="demo-api-key"
      projectId="demo-project-id"
      baseUrl="http://localhost:3001/sdk/whistle/v1"
      branding={true}
    >
      {children}
    </WhistleProvider>
  );
}
