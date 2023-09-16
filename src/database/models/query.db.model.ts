export interface QueryModel {
    sql: string;
    timeout?: number | undefined;
    values?: string[] | undefined;
}