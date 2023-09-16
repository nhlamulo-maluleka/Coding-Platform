import { Language } from "../../core/enums/Languages";

export interface ICodeExecution {
    executeCode(userCode: string, programmingLanguage: Language, callback: Function): void;
}