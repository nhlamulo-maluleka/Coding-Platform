import { FileResult } from "tmp";
import { Language } from "../../core/enums/Languages";

export interface ITemporaryFile {
    createTempFile(extension: Language): FileResult;
    writeUserCodeToTempFile(userCode: string, programmingLanguage: Language): [FileResult, string];
    /**
     * This temporary file can also be an extra file created after the temp file is compiled such as a [.exe] file
     * @param filepath 
     */
    deleteTemporaryFile(filepath: string): void;
}