export abstract class BaseAgent {
  abstract name: string;
  abstract description: string;

  abstract analyze(context: unknown): Promise<unknown>;
  abstract recommend(context: unknown): Promise<unknown>;
}
