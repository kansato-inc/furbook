declare module "@kansato/whistle-react" {
  import { ComponentType, ReactNode } from "react";

  export interface SubjectDisplay {
    name?: string | null;
    username?: string | null;
    avatarUrl?: string | null;
  }

  export interface IngestSubject {
    type: string;
    externalId: string;
    display?: SubjectDisplay;
    metadata?: Record<string, unknown>;
  }

  export interface ReportTarget {
    contentExternalId: string;
    contentType: string;
  }

  export interface ReportFormContext {
    subject: IngestSubject;
    target: ReportTarget;
    reporter?: IngestSubject;
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
    embedAppearance?: "light" | "dark" | "system";
  }

  export interface WhistleProviderProps {
    apiKey?: string;
    projectId?: string;
    baseUrl?: string;
    timeout?: number;
    fetch?: typeof fetch;
    branding?: boolean;
    embedAppearance?: "light" | "dark" | "system";
    config?: WhistleConfig;
    children: ReactNode;
  }

  export function WhistleProvider(props: WhistleProviderProps): ReactNode;

  export type DialogSurface = "default" | "embed";

  export interface ReportButtonProps {
    context: ReportFormContext;
    variant?: "dialog" | "inline";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: ReactNode;
    className?: string;
    dialogSurface?: DialogSurface;
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
