"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSharpService = void 0;
const child_process_1 = require("child_process");
const TemporaryFile_service_1 = require("../shared/services/TemporaryFile.service");
const constants_1 = require("../core/constants/constants");
const CodeOutputErrorHandler_1 = require("../models/errors/CodeOutputErrorHandler");
const CodeOutputResponse_model_1 = require("../models/response/CodeOutputResponse.model");
class CSharpService extends TemporaryFile_service_1.TemporaryFileService {
    executeCode(code, programmingLanguage, callback) {
        const [tempFile, tempFileNameWithoutExtension] = this.writeUserCodeToTempFile(code, programmingLanguage);
        const exeTmpDir = `${constants_1.temporaryPath}/${tempFileNameWithoutExtension}.exe`;
        try {
            // Compile c# code
            const process = (0, child_process_1.spawnSync)('csc', [`/out:${exeTmpDir}`, tempFile.name]);
            if (process.status === 0) {
                const execute = (0, child_process_1.execFileSync)(exeTmpDir);
                callback(new CodeOutputResponse_model_1.CodeOutputResponse(execute.toString()));
            }
            else {
                const splitErrorMessage = process.output.toString().replace(/[,]$/g, '').trim().split('\n');
                throw new CodeOutputErrorHandler_1.CodeOutputErrorHandler(splitErrorMessage[splitErrorMessage.length - 1]);
            }
            // Deleting the .exe file
            this.deleteTemporaryFile(exeTmpDir);
        }
        catch (e) {
            callback(e);
        }
        // Removing the temp file after usage
        tempFile.removeCallback();
    }
}
exports.CSharpService = CSharpService;
