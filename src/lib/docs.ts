import * as fs from "fs-extra";
import * as path from "path";
import glob from "glob-promise";
import {IOptions} from "glob";
//import * as glob from "glob-promise";
import { promisify } from "util";
import { GetStaticPaths } from "next";

interface ContentItem {
  src: string;
  dest: string;
  files: string[];
  exclude?: string[];
}

interface BuildData {
  content: ContentItem[];
  resource: any[]; // you'll need to define the shape of this data
  overwrite: any[]; // you'll need to define the shape of this data
  dest: string;
  globalMetadataFiles: any[]; // you'll need to define the shape of this data
  fileMetadataFiles: any[]; // you'll need to define the shape of this data
  fileMetadata: any; // you'll need to define the shape of this data
  template: string[];
  postProcessors: any[]; // you'll need to define the shape of this data
  markdownEngineName: string;
  noLangKeyword: boolean;
  keepFileLink: boolean;
  cleanupCacheHistory: boolean;
  disableGitFeatures: boolean;
  globalMetadata: any; // you'll need to define the shape of this data
  xrefService: string[];
  sitemap: {
    baseUrl: string;
  };
}

interface Config {
  metadata: any[]; // you'll need to define the shape of this data
  build: BuildData;
}

export interface ParamsObject {
  params: {
    filePath?: string;
    slug?: string | string[] | undefined;
    locale?: string;
  };
}

export interface DataObject {
  data: ParamsObject[];
  fallback: boolean;
}

const configPath = 'C:/build-docs/build-docs'
const configName = 'docfx.json'
let fileCount = 0;
let docsContent: DataObject;

const readFile = promisify(fs.readFile);

async function readConfigFile(filePath: string): Promise<Config> {
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content);
}

async function generateOutput(config: Config): Promise<DataObject> {
  const { content } = config.build;
  const output = [];

  for (const item of content) {

    const { src, files, exclude, dest } = item;

    if (!src || !files) {
      continue;
    }

    for (const pattern of files) {

      const options : IOptions = {
        ignore: exclude,
        cwd: path.join(configPath, src),
      };

      // get the matching files from the src folder
      const matchedFiles = await glob(pattern, options);

      // loop through the matched files and create the output object
      for (const file of matchedFiles) {

        // skip the includes folder, these will have to be resolved in the template
        if (file.indexOf("includes") > -1 || file.indexOf("toc.yml") > -1) {
          continue;
        }

        fileCount++;

        // construct the complete file path
        const origFilePath = path.join(configPath, src, file)

        let obj: ParamsObject = {
          params: {
            filePath: origFilePath
          }
        };

        // if the file is in a language folder, add the locale to the params
        setLanguageLocale(dest, obj);

        // Set the slug

        let slug = file.replace(/\\/g, "/").replace(/\.md$/, "");
        
        if(dest)
        {
          const destParts = dest.split("/");
          if(destParts.length > 1 && isSupportedLanguage(destParts[0])) {
            // remove the language from the destParts
            destParts.shift();
          }
          const combined = destParts.concat(slug.split("/"));
          obj.params["slug"] = combined.filter((element) => element !== '' && !element.startsWith('index') && !element.startsWith('toc'));
        } else {
          obj.params["slug"] = slug.split("/").filter((element) => element !== '' && !element.startsWith('index') && !element.startsWith('toc'));
        }
        
        output.push(obj);
      } // for (const file of matchedFiles)
    }
  }

  return { data: output, fallback: true };

  function setLanguageLocale(dest: string, obj: ParamsObject) {
    if (dest?.startsWith("da")) {
      obj.params["locale"] = "da";
    } else if (dest?.startsWith("de")) {
      obj.params["locale"] = "de";
    } else if (dest?.startsWith("en")) {
      obj.params["locale"] = "en";
    } else if (dest?.startsWith("fr")) {
      obj.params["locale"] = "fr";
    } else if (dest?.startsWith("nl")) {
      obj.params["locale"] = "nl";
    } else if (dest?.startsWith("no")) {
      obj.params["locale"] = "no";
    } else if (dest?.startsWith("se")) {
      obj.params["locale"] = "se";
    } // TODO: default to english
    // else {
    //   obj.params["locale"] = "en";
    // }
  }

  function isSupportedLanguage(dest: string): boolean {
    // search supportedLanguages for the dest
    for (const lang of supportedLanguages) {
      // perform case insensitive comparison
      if (lang.code.toLowerCase() === dest.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}

const supportedLanguages = [
  {name: 'Dansk',     code: 'da', menu: 'Sprog'   },
  {name: 'Deutsch',   code: 'de', menu: 'Sprachen' },
  {name: 'Dutch',     code: 'nl', menu: 'Talen'    },
  {name: 'English',   code: 'en', menu: 'Languages'},
  {name: 'Français',  code: 'fr', menu: 'Langues'  },
  {name: 'Norsk',     code: 'no', menu: 'Språk'   },
  {name: 'Svenska',   code: 'se', menu: 'Språk'   },
];


const getDocs = async () => {
  try {
    
    if(docsContent) {
      return docsContent;
    }

    const config = await readConfigFile(path.join(configPath, configName));
    const output = await generateOutput(config);
    docsContent = output;
    console.log("Total files: " + fileCount);
    return output;
    //console.log(JSON.stringify(output, null, 2));
  } catch (error) {
    console.error("An error occurred:", error);
  }
};


export async function readDocFile(filePath: string): Promise<string> {
  const content = await readFile(filePath, "utf-8");
  return content;
}

export default getDocs;
