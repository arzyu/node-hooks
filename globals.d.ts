declare namespace NodeJS {
  interface Module {
    _compile(content: string, filename: string): void;
  }
}
