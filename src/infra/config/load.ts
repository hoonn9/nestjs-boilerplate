import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

function loadConfig() {
  const contents = readFileSync(join(YAML_CONFIG_FILENAME), 'utf8');

  return load(contents) as Record<string, any>;
}

export default loadConfig;
