import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register ts-node's ESM loader for .ts imports using project tsconfig
register('ts-node/esm', pathToFileURL('./'));

