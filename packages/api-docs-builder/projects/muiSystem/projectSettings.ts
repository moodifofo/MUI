import path from 'path';
import { ProjectSettings } from '../../buildApi';
import findApiPages from '../../utils/findApiPages';
import getSystemComponentInfo from './getSystemComponentInfo';

const muiSystemSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/system/pagesApi.js'),
  },
  typeScriptProjects: ['system'],
  getApiPages: () => findApiPages('docs/pages/system/api'),
  getComponentInfo: getSystemComponentInfo,
};

export default muiSystemSettings;
