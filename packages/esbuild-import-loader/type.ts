import { TransformOptions } from 'esbuild'

export type EsbuildImportLoader = Omit<TransformOptions, 'sourcemap' | 'sourcefile'> & {
  libraryName: string
  customStyle?: (importName: string) => string
  customName: (importName: string) => string
}
