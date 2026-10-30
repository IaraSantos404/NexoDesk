export function formatData(data: Date | string): string {
  return new Date(data).toLocaleDateString("pt-BR");
}
