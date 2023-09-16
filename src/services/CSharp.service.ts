import { spawnSync, execFileSync } from "child_process"
import path from "path"
import { ICodeExecution } from "../shared/interfaces/ICodeExecution.interface";
import { TemporaryFileService } from "../shared/services/TemporaryFile.service";
import { Language } from "../core/enums/Languages";
import { temporaryPath } from "../core/constants/constants";
import { CodeOutputErrorHandler } from "../models/errors/CodeOutputErrorHandler";
import { CodeOutputResponse } from "../models/response/CodeOutputResponse.model";

export class CSharpService extends TemporaryFileService implements ICodeExecution {
    public executeCode(code: string, programmingLanguage: Language, callback: Function): void {
        const [tempFile, tempFileNameWithoutExtension] = this.writeUserCodeToTempFile(code, programmingLanguage);
        const exeTmpDir = `${temporaryPath}/${tempFileNameWithoutExtension}.exe`;

        try {
            // Compile c# code
            const process = spawnSync('csc', [`/out:${exeTmpDir}`, tempFile.name])

            if (process.status === 0) {

                const execute = execFileSync(exeTmpDir)

                callback(new CodeOutputResponse(execute.toString()));
            }
            else {
                const splitErrorMessage = process.output.toString().replace(/[,]$/g, '').trim().split('\n');
                throw new CodeOutputErrorHandler(splitErrorMessage[splitErrorMessage.length - 1]);
            }

            // Deleting the .exe file
            this.deleteTemporaryFile(exeTmpDir);
        }
        catch (e) {
            callback(e)
        }

        // Removing the temp file after usage
        tempFile.removeCallback();
    }
}