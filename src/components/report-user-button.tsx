"use client";

import {
  ReportDialog,
  useSecureReportSubmission,
} from "@kansato/whistle-react";
import type { IngestSubject } from "@kansato/whistle-sdk";

interface ReportUserButtonProps {
  user: IngestSubject;
}

export function ReportUserButton({ user }: ReportUserButtonProps) {
  const { submit } = useSecureReportSubmission({
    onSuccess: (response) => console.log("User reported:", response.report.id),
    onError: (err) => console.error("Report failed:", err),
  });

  return (
    <ReportDialog
      subject={user}
      target={{
        contentType: "user",
        contentExternalId: user.externalId,

      }}
      trigger={
        <button
          type="button"
          className="text-sm text-red-500 hover:text-red-600 font-medium px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
        >
          Report @{user.display?.username ?? user.externalId}
        </button>
      }
      onSubmit={async (data, helpers) => {
        try {
          const result = await submit({
            subject: data.subject,
            target: data.target,
            reason: data.reason,
            description: data.description,
          });
          helpers.resolve({
            id: result.report.id,
            status: result.report.status,
            createdAt: result.report.createdAt,
          });
        } catch (err) {
          helpers.reject(err);
        }
      }}
    />
  );
}
