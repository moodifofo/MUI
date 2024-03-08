import * as fs from 'node:fs';
import * as path from 'node:path';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import { TransformCacheCollection, transform, createFileReporter } from '@wyw-in-js/transform';
import { preprocessor } from '@pigment-css/react/utils';
import * as prettier from 'prettier';

const shouldUpdateOutput = process.env.UPDATE_FIXTURES === 'true';

export async function runTransformation(
  relativePath: string,
  options?: { themeArgs?: { theme?: any } },
) {
  const cache = new TransformCacheCollection();
  const { emitter: eventEmitter } = createFileReporter(false);
  const inputFilePath = path.join(__dirname, relativePath);
  const outputFilePath = path.join(__dirname, relativePath.replace('.input.', '.output.'));
  const outputCssFilePath = path.join(__dirname, relativePath.replace('.input.js', '.output.css'));

  const inputContent = fs.readFileSync(inputFilePath, 'utf8');
  let outputContent = fs.existsSync(outputFilePath) ? fs.readFileSync(outputFilePath, 'utf8') : '';
  let outputCssContent = fs.existsSync(outputCssFilePath)
    ? fs.readFileSync(outputCssFilePath, 'utf8')
    : '';

  const pluginOptions = {
    themeArgs: {
      theme: options?.themeArgs?.theme,
    },
    babelOptions: {
      configFile: false,
      babelrc: false,
    },
    tagResolver(_source: string, tag: string) {
      return require.resolve(`../exports/${tag}`);
    },
  };
  const result = await transform(
    {
      options: {
        filename: inputFilePath,
        preprocessor,
        pluginOptions,
      },
      cache,
      eventEmitter,
    },
    inputContent,
    asyncResolveFallback,
  );

  const prettierConfig = await prettier.resolveConfig(
    path.join(process.cwd(), 'prettier.config.js'),
  );
  const formattedJs = await prettier.format(result.code, {
    ...prettierConfig,
    parser: 'babel',
  });
  const formattedCss = await prettier.format(result.cssText ?? '', {
    ...prettierConfig,
    parser: 'css',
  });

  if (!outputContent || shouldUpdateOutput) {
    fs.writeFileSync(outputFilePath, formattedJs, 'utf-8');
    outputContent = formattedJs;
  }

  if (!outputCssContent || shouldUpdateOutput) {
    fs.writeFileSync(outputCssFilePath, formattedCss, 'utf-8');
    outputCssContent = formattedCss;
  }

  return {
    output: {
      js: formattedJs,
      css: formattedCss,
    },
    fixture: {
      js: outputContent,
      css: outputCssContent,
    },
  };
}
