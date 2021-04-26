import Module from "module";

interface CompileHook {
  (content: string, filename: string, done: (newContent?: string) => void): void;
}

const defualtCompile = Module.prototype._compile;
const defaultHook: CompileHook = (content, filename, done) => done(content);

let currentHook = defaultHook;

Module.prototype._compile = function(content: string, filename: string) {
  currentHook(content, filename, (newContent) => {
    newContent = newContent || content;
    defualtCompile.call(this, newContent, filename);
  });
};

export const hookCompile = (newHook: CompileHook) => {
  currentHook = newHook;
};

export const clearHookCompile = () => {
  currentHook = defaultHook;
};
