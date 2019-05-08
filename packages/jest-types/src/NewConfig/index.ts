import {Arguments} from 'yargs';
import {
  Nil,
  CoverageThreshold,
  ReportOptionKeys,
  NotifyMode,
  DisplayNameColor,
} from './_Internal';

export type Path = string;
export type Glob = string;
export type SnapshotUpdateState = 'all' | 'new' | 'none';
export type ReporterConfig = [string, {[key: string]: unknown}];
export type DisplayName =
  | string
  | {
      name: string;
      color: DisplayNameColor;
    };

export type HasteConfig = {
  computeSha1?: boolean;
  defaultPlatform?: string | Nil;
  hasteImplModulePath?: string;
  platforms?: Array<string>;
  providesModuleNodeModules: Array<string>;
  throwOnModuleCollision?: boolean;
};

export type ConfigGlobals = Record<string, any>;

/** Argv Options That share same type as Shared Project & Global Options */
export interface ArgvToSharedDirect {
  coveragePathIgnorePatterns: Array<string>; // Global has optional
  globalSetup: string | Nil;
  globalTeardown: string | Nil;
  rootDir: Path;
}

/** Argv Options needed for Project & Global Options that require manipulation*/
export interface ArgvToSharedRaw {}

/** Shared Project & Global Options Derived from Argv Options */
export interface SharedOptionsDerivedFromArgv {}

/** Derived Options that is shared b/n Global and Project*/
export interface SharedOptionsDerived {
  detectLeaks: boolean;
  detectOpenHandles: boolean;
  errorOnDeprecated: boolean;
  extraGlobals: Array<keyof NodeJS.Global>; /// GlobalConfig has string[]
  filter: Path | Nil;
}

/** Argv Options That share same type as Project Options*/
export interface ArgvToProjectDirect {
  automock: boolean;
  browser: boolean;
  cache: boolean;
  cacheDirectory: Path;
  clearMocks: boolean;
  moduleDirectories: Array<string>;
  moduleFileExtensions: Array<string>;
  modulePathIgnorePatterns: Array<string>;
  modulePaths: Array<string>;
  preset: string | Nil;
  prettierPath: string;
  resetMocks: boolean;
  resetModules: boolean;
  resolver: Path | Nil;
  restoreMocks: boolean;
  roots: Array<Path>;
  setupFiles: Array<Path>;
  setupFilesAfterEnv: Array<Path>;
  snapshotSerializers: Array<Path>;
  testEnvironment: string;
  testPathIgnorePatterns: Array<string>;
  testRunner: string;
  testURL: string;
  transformIgnorePatterns: Array<Glob>;
  unmockedModulePathPatterns: Array<string> | Nil;
  watchPathIgnorePatterns: Array<string>;
}

/** Argv Options needed for Project Options that require manipulation*/
export interface ArgvToProjectRaw {
  globals: string;
  haste: string;
  moduleNameMapper: string;
  testRegex: string | Array<string>;
  timers: string;
  transform: string;
}
/////// PROJECT OPTIONS /////////////
/** The Project Options Derived from Argv Options */
export interface ProjectOptionsDerivedFromArgv {
  globals: ConfigGlobals;
  haste: HasteConfig;
  moduleNameMapper: Array<[string, string]>;
  testRegex: Array<string>;
  timers: 'real' | 'fake';
  transform: Array<[string, Path]>;
}

/** Derived Project Options*/
export interface ProjectOptionsDerived {
  cwd: Path;
  dependencyExtractor?: string;
  displayName?: DisplayName;
  forceCoverageMatch: Array<Glob>;
  moduleLoader: Path;
  name: string;
  runner: string;
  skipFilter: boolean;
  skipNodeResolution: boolean;
  snapshotResolver: Path | Nil;
  testEnvironmentOptions: Record<string, any>;
  testLocationInResults: boolean;
}

/////// GLOBAL OPTIONS /////////////

/** The Argv Options shared to directly to global */
export interface ArgvToGlobalDirect {
  changedFilesWithAncestor: boolean;
  changedSince: string;
  collectCoverage: boolean;
  coverageDirectory: string;
  findRelatedTests: boolean;
  forceExit: boolean;
  json: boolean;
  lastCommit: boolean;
  logHeapUsage: boolean;
  maxWorkers: number;
  noStackTrace: boolean;
  notify: boolean;
  onlyChanged: boolean;
  projects: Array<Glob>;
  silent: boolean;
  testMatch: Array<Glob>;
  testNamePattern: string;
  testResultsProcessor: string | Nil;
  testSequencer: string;
  useStderr: boolean;
  verbose: boolean | Nil;
  watch: boolean;
  watchAll: boolean;
  watchman: boolean;
}

/** Argv Options needed for Global Options that require manipulation*/
export interface ArgvToGlobalRaw {
  bail: boolean | number;
  collectCoverageFrom: string;
  collectCoverageOnlyFrom: Array<string>;
  coverageReporters: Array<string>;
  coverageThreshold: string;
  outputFile: Path;
  testPathPattern: Array<string>;
  testFailureExitCode: string | Nil;
  notifyMode: string;
  updateSnapshot: boolean;
}

/** The Global Options Derived from Argv Options */
export interface GlobalOptionsDerivedFromArgv {
  bail: number;
  collectCoverageFrom: Array<Glob>;
  collectCoverageOnlyFrom: {[key: string]: boolean} | Nil;
  coverageReporters: Array<ReportOptionKeys>;
  coverageThreshold: CoverageThreshold;
  notifyMode: NotifyMode;
  outputFile: Path | Nil;
  testFailureExitCode: number;
  testPathPattern: string;
  updateSnapshot: SnapshotUpdateState;
}

/** Derived Global Options*/
export interface GlobalOptionsDerived {
  enabledTestsMap: {[key: string]: {[key: string]: boolean}} | Nil;
  expand: boolean;
  forceExit: boolean;
  listTests: boolean;
  maxConcurrency: number;
  noSCM: boolean | Nil;
  nonFlagArgs: Array<string>;
  onlyFailures: boolean;
  passWithNoTests: boolean;
  replname: string | Nil;
  reporters: Array<string | ReporterConfig>;
  runTestsByPath: boolean;
  skipFilter: boolean;
  watchPlugins: Array<{path: string; config: Record<string, any>}> | Nil;
}

/** Argv Options That dont share same config names*/
export interface ArgvStatic {
  /** Add Comment */
  all: boolean;
  /** Add Comment */
  ci: boolean;
  /** Add Comment */
  clearCache: boolean;
  /** Add Comment */
  color: boolean;
  /** Add Comment */
  colors: boolean;
  /** Add Comment */
  config: string;
  /** Add Comment */
  coverage: boolean;
  /** Add Comment */
  debug: boolean;
  /** Add Comment */
  env: string;
  /** Add Comment */
  expand: boolean;
  /** Add Comment */
  init: boolean;
  /** Add Comment */
  runInBand: boolean;
  /** Add Comment */
  showConfig: boolean;
  /** Add Comment */
  version: boolean;
}

export interface ArgVRequired
  extends ArgvStatic,
    ArgvToGlobalRaw,
    ArgvToGlobalDirect,
    ArgvToSharedDirect,
    ArgvToSharedRaw,
    ArgvToProjectDirect,
    ArgvToProjectRaw {}

export type Argv = Arguments<Partial<ArgVRequired>>;

export interface SharedOptions
  extends SharedOptionsDerived,
    SharedOptionsDerivedFromArgv,
    ArgvToSharedDirect {}

export interface GlobalOptions
  extends SharedOptions,
    GlobalOptionsDerived,
    GlobalOptionsDerivedFromArgv,
    ArgvToGlobalDirect {}

export interface ProjectOptions
  extends SharedOptions,
    ProjectOptionsDerived,
    ProjectOptionsDerivedFromArgv,
    ArgvToProjectDirect {}

export interface AllOptions extends GlobalOptions, ProjectOptions {}

export type AllOptionsPartial = Partial<AllOptions>;

export type AllOptionsNullable = {[P in keyof AllOptions]: AllOptions[P] | Nil};

// Allow Setting Default to Null ?
export type DefaultOptions = Partial<AllOptionsNullable>;

export type InitialOptions = AllOptionsPartial;

// /////// CHECKS /////////////
// type ArgVToGlobalPreCheck<
//   T extends keyof ArgvToGlobalRaw = keyof GlobalOptionsDerivedFromArgv
// > = T;

// type ArgVToProject<
//   T extends keyof ArgvToProjectRaw = keyof ProjectOptionsDerivedFromArgv
// > = T;

// export type Checks = {
//   ArgVToGlobalPre: ArgVToGlobalPreCheck;
//   ArgVToProjectPre: ArgVToProject;
// };
