import * as esbuild from 'esbuild';
import { createBuildSettings } from './settings.js';

await esbuild.build(createBuildSettings({}));
