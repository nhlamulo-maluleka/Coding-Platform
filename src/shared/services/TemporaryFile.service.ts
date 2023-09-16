import { FileResult, fileSync } from "tmp";
import { writeFileSync, closeSync, unlinkSync } from "fs"
import { Language } from "../../core/enums/Languages";
import { ITemporaryFile } from "../interfaces/ITemporaryFile.interface";
import { temporaryPath } from "../../core/constants/constants";

export class TemporaryFileService implements ITemporaryFile {
    createTempFile(extension: Language): FileResult {
        return fileSync({ mode: 0o644, postfix: `.${extension}`, tmpdir: temporaryPath, tries: 2 })
    }

    writeUserCodeToTempFile(userCode: string, programLanguage: Language): [FileResult, string] {
        const createdTempFile = this.createTempFile(programLanguage);

        // Writing the user-code in the temporary file
        writeFileSync(createdTempFile.name, userCode, 'utf-8');

        // Closing the file to release its availability to be used for code execution
        closeSync(createdTempFile.fd);

        // Split the absolute path of the filename
        const fileAbsolutePath = createdTempFile.name.split("\\");

        // Extract the name of the temporary file without its extension
        const tempNameWithoutExtension = fileAbsolutePath[fileAbsolutePath.length - 1].split(".")[0];

        // Returning a tuple
        return [createdTempFile, tempNameWithoutExtension];
    }

    deleteTemporaryFile(filepath: string): void {
        // Deleting file
        unlinkSync(filepath);
    }
}

