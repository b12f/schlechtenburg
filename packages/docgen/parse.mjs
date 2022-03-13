import { parse } from 'vue-docgen-api'
import { join } from 'path'
import glob from 'glob-promise'

(async () => {
  const files = (await Promise.all(process.argv.slice(2)
    .map(
      (path) => glob(path)
        .then(
          (found_paths) => found_paths
            .map(found_path => join(process.cwd(), found_path))
        )
    )
  )).flat();

  const vueParsed = await Promise.all(files
    .map(file => parse(file)
      .catch((error) => {
        // For now, ignore any errors
        // console.log(error, file);
        return null;
      })
    )
  );
  const vueFiltered = vueParsed.filter(p => p);
  console.log(JSON.stringify(vueFiltered, null, 2));
})();
