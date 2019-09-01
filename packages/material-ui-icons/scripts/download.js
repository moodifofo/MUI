/* eslint-disable no-console */

import fse from "fs-extra";
import path from "path";
import yargs from "yargs";
import Queue from "modules/waterfall/Queue";
import sleep from "modules/waterfall/sleep";
import retry from "modules/waterfall/retry";
import "isomorphic-fetch";

const themeMap = {
  baseline: "", // filled
  outline: "outlined",
  round: "round",
  twotone: "twotone",
  sharp: "sharp"
};

const themeFileNameMap = {
  baseline: "", // filled
  outline: "Outlined",
  round: "Rounded",
  twotone: "TwoTone",
  sharp: "Sharp"
};

function downloadIcon(icon) {
  const { name } = icon;
  console.log(`downloadIcon ${icon.index}: ${name}`);

  return Promise.all(
    Object.keys(themeMap).map(async theme => {
      const response = await fetch(
        `https://fonts.gstatic.com/s/i/materialicons${themeMap[theme]}/${name}/v1/24px.svg`
      );
      if (response.status !== 200) {
        throw new Error(`status ${response.status}`);
      }
      const SVG = await response.text();
      await fse.writeFile(
        path.join(
          __dirname,
          `../material-io-tools-icons/ic_${icon.name}${themeFileNameMap[theme]}_24px.svg`
        ),
        SVG
      );
    })
  );
}

async function run() {
  try {
    const argv = yargs
      .usage("Download the SVG from material.io/tools/icons")
      .describe("start-after", "Resume at the following index").argv;
    console.log("run", argv);
    await fse.ensureDir(path.join(__dirname, "../material-io-tools-icons"));
    const response = await fetch("https://fonts.google.com/metadata/icons");
    const text = await response.text();
    const data = await JSON.parse(text.replace(")]}'", ""));
    let icons = data.icons;
    icons = icons.map((icon, index) => ({ index, ...icon }));
    icons = icons.splice(argv.startAfter || 0);
    console.log(`${icons.length} icons to download`);

    const queue = new Queue(
      async icon => {
        await retry(async ({ tries }) => {
          await sleep((tries - 1) * 100);
          await downloadIcon(icon);
        });
      },
      { concurrency: 5 }
    );
    queue.push(icons);
    await queue.wait({ empty: true });
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

run();
