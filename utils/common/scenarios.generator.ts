import { readdirSync, readFileSync, writeFileSync, statSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const testsFolderPath: string = "tests";

const testsSpecsSufix: string = "tests.spec.ts";

const scenariosFolderName: string = "scenarios"

let files: string[]  = [];

function getFiles(dirPath: string) {
    console.log(`Reading all files from directory ${dirPath} and filter by name '*.${testsSpecsSufix}'`);

    readdirSync(dirPath).forEach(File => {

        const absolutePth: string = join(dirPath, File);

        if (statSync(absolutePth).isDirectory()) {
            return getFiles(absolutePth);
        }
        else if(absolutePth.includes(testsSpecsSufix)) {
            console.log(absolutePth);

            return files.push(absolutePth);
        }
    });
}

function parseFiles(files: string[]) {

    console.log(`Parse files: in each file find text between /** and */ and save it into the txt file`);

    files.forEach(file => {
        var specFileName = file.replace(/^.*[\\/]/, '');

        var specFileScenariosName = specFileName.replace('.ts', '.txt');

        const specFileContent: string = readFileSync(file, 'utf-8');

        const array = [...specFileContent.matchAll(/(?<=\/\*\*)[\s\S]*?(?=\*\/)/g)];

        let suiteCases: string = `File Path: ${file}\r\n`;

        array.forEach(element => {
            suiteCases = `${suiteCases}${element[0].replaceAll('*', '')}\r\n`;
        });

        if (!existsSync(`./${scenariosFolderName}`)) {
            console.log(`Create folder '${scenariosFolderName}' as it does not exist`);

            mkdirSync(`./${scenariosFolderName}`);
        }

        let scenariosSuitePath: string = `./${scenariosFolderName}/${specFileScenariosName}`;

        console.log(`Save spec '${specFileName}' scenarios into the file by path ${scenariosSuitePath}`);

        writeFileSync(scenariosSuitePath, suiteCases, { flag: 'w' });
    });
}

// --- Get all files from specified folder. Default: tests ---
getFiles(testsFolderPath);

// --- Parse files for text between /** */ and save it into txt files located in folder scenarios ---
parseFiles(files);