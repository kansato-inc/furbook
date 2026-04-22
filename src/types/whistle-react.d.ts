declare module "@kansato/whistle-react" {
  import { ComponentType, ReactNode } from "react";

  export interface IngestSubject {
    type: "user" | "post" | "comment";
    id: string;
    name?: string;
  }

  export interface ReportTarget {
    type: "post" | "comment" | "user" | "profile";
    id: string;
  }

  export interface ReportModalOptions {
    subject: IngestSubject;
    target: ReportTarget;
    reporter?: IngestSubject;
  }

  export interface WhistleConfig {
    apiKey: string;
    projectId: string;
    baseUrl?: string;
    timeout?: number;
    fetch?: typeof fetch;
    branding?: boolean;
  }

  export interface WhistleProviderProps {
    apiKey?: string;
    projectId?: string;
    baseUrl?: string;
    timeout?: number;
    fetch?: typeof fetch;
    branding?: boolean;
    config?: WhistleConfig;
    children: ReactNode;
  }

  export function WhistleProvider(props: WhistleProviderProps): ReactNode;

  export interface ReportButtonProps {
    subject: IngestSubject;
    target: ReportTarget;
    reporter?: IngestSubject;
    children: (props: { onClick: () => void }) => ReactNode;
  }

  export const ReportButton: ComponentType<ReportButtonProps>;

  export function useWhistle(): {
    client: unknown;
    config: WhistleConfig;
    openReport: (options: ReportModalOptions) => void;
    closeReport: () => void;
    isReportModalOpen: boolean;
    reportModalOptions: ReportModalOptions | null;
  };
}
