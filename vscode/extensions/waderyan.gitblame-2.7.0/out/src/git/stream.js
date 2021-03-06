"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const events_1 = require("events");
const errorhandler_1 = require("../util/errorhandler");
const gitcommand_1 = require("../util/gitcommand");
const property_1 = require("../util/property");
const blame_1 = require("./blame");
class GitBlameStream extends events_1.EventEmitter {
    constructor(file, workTree) {
        super();
        this.emittedCommits = {};
        this.file = file;
        this.workTree = workTree;
        const gitCommand = gitcommand_1.getGitCommand();
        const args = this.generateArguments();
        const spawnOptions = {
            cwd: workTree,
        };
        errorhandler_1.ErrorHandler.logCommand(`${gitCommand} ${args.join(" ")}`);
        this.process = child_process_1.spawn(gitCommand, args, spawnOptions);
        this.setupListeners();
    }
    terminate() {
        this.dispose();
    }
    dispose() {
        if (this.process) {
            this.process.kill("SIGKILL");
            this.process.removeAllListeners();
        }
    }
    generateArguments() {
        const processArguments = [];
        processArguments.push("blame");
        if (property_1.Property.get("ignoreWhitespace")) {
            processArguments.push("-w");
        }
        processArguments.push("--incremental");
        processArguments.push("--");
        processArguments.push(this.file.fsPath);
        return processArguments;
    }
    setupListeners() {
        if (this.process) {
            this.process.addListener("close", (code) => this.close());
            this.process.stdout.addListener("data", (chunk) => {
                this.data(chunk.toString());
            });
            this.process.stderr.addListener("data", (error) => this.close(error));
        }
    }
    close(err) {
        this.emit("end", err);
    }
    data(dataChunk) {
        const lines = dataChunk.split("\n");
        let commitInfo = blame_1.GitBlame.blankCommitInfo();
        commitInfo.filename = this.file.fsPath.replace(this.workTree, "");
        lines.forEach((line, index) => {
            if (line && line !== "boundary") {
                const match = line.match(/(.*?) (.*)/);
                if (match === null) {
                    return;
                }
                const [, key, value] = Array.from(match);
                if (GitBlameStream.HASH_PATTERN.test(key) &&
                    lines.hasOwnProperty(index + 1) &&
                    /^(author|committer)/.test(lines[index + 1]) &&
                    commitInfo.hash !== "") {
                    this.commitInfoToCommitEmit(commitInfo);
                    commitInfo = blame_1.GitBlame.blankCommitInfo(true);
                    commitInfo.filename = this.file.fsPath.replace(this.workTree, "");
                }
                this.processLine(key, value, commitInfo);
            }
        });
        this.commitInfoToCommitEmit(commitInfo);
    }
    processLine(key, value, commitInfo) {
        const [keyPrefix, keySuffix] = key.split("-");
        let owner = {
            mail: "",
            name: "",
            temporary: true,
            timestamp: 0,
            tz: "",
        };
        if (keyPrefix === "author") {
            owner = commitInfo.author;
        }
        else if (keyPrefix === "committer") {
            owner = commitInfo.committer;
        }
        if (!owner.temporary && !keySuffix) {
            owner.name = value;
        }
        else if (keySuffix === "mail") {
            owner.mail = value;
        }
        else if (keySuffix === "time") {
            owner.timestamp = parseInt(value, 10);
        }
        else if (keySuffix === "tz") {
            owner.tz = value;
        }
        else if (key === "summary") {
            commitInfo.summary = value;
        }
        else if (GitBlameStream.HASH_PATTERN.test(key)) {
            commitInfo.hash = key;
            const hash = key;
            const [, finalLine, lines] = value
                .split(" ")
                .map((a) => parseInt(a, 10));
            this.lineGroupToLineEmit(hash, lines, finalLine);
        }
    }
    lineGroupToLineEmit(hash, lines, finalLine) {
        for (let i = 0; i < lines; i++) {
            this.emit("line", finalLine + i, hash);
        }
    }
    commitInfoToCommitEmit(commitInfo) {
        if (!this.emittedCommits[commitInfo.hash]) {
            this.emittedCommits[commitInfo.hash] = true;
            this.emit("commit", commitInfo.hash, commitInfo);
        }
    }
}
GitBlameStream.HASH_PATTERN = /[a-z0-9]{40}/;
exports.GitBlameStream = GitBlameStream;
//# sourceMappingURL=stream.js.map