import Module from "module";

interface RequireHook {
  (id: string, done: (result?: any) => any): any;
}

const defualtRequire = Module.prototype.require;
const defaultHook: RequireHook = (id, done) => done();

let currentHook = defaultHook;

Module.prototype.require = function(this: Module, id: string) {
  return currentHook(id, (newResult) => {
    return newResult || defualtRequire.call(this, id);
  });
} as NodeJS.Require;

export const hookRequire = (newHook: RequireHook) => {
  currentHook = newHook;
};

export const clearHookRequire = () => {
  currentHook = defaultHook;
};
