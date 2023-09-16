"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryFileService = void 0;
const tmp_1 = require("tmp");
const fs_1 = require("fs");
const constants_1 = require("../../core/constants/constants");
class TemporaryFileService {
    createTempFile(extension) {
        return (0, tmp_1.fileSync)({ mode: 0o644, postfix: `.${extension}`, tmpdir: constants_1.temporaryPath, tries: 2 });
    }
    writeUserCodeToTempFile(userCode, programLanguage) {
        const createdTempFile = this.createTempFile(programLanguage);
        // Writing the user-code in the temporary file
        (0, fs_1.writeFileSync)(createdTempFile.name, userCode, 'utf-8');
        // Closing the file to release its availability to be used for code execution
        (0, fs_1.closeSync)(createdTempFile.fd);
        // Split the absolute path of the filename
        const fileAbsolutePath = createdTempFile.name.split("\\");
        // Extract the name of the temporary file without its extension
        const tempNameWithoutExtension = fileAbsolutePath[fileAbsolutePath.length - 1].split(".")[0];
        // Returning a tuple
        return [createdTempFile, tempNameWithoutExtension];
    }
    deleteTemporaryFile(filepath) {
        // Deleting file
        (0, fs_1.unlinkSync)(filepath);
    }
}
exports.TemporaryFileService = TemporaryFileService;
