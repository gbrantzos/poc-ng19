export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  extraDetails: Record<string, string>;
}

export function isProblemDetails(data: unknown): data is ProblemDetails {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof data.type === 'string' &&
    'title' in data &&
    typeof data.title === 'string' &&
    'detail' in data &&
    typeof data.detail === 'string' &&
    'status' in data &&
    typeof data.status === 'number'
  );
}
