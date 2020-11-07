const fs = require('fs');
const path = require('path');
const parser = require('xml2json');
const mkdirp = require('mkdirp');

const liveTemplatesPath = path.join(process.cwd(), '..', 'templates');
const liveTemplateFiles = fs.readdirSync(liveTemplatesPath);
const newFiles = [];

liveTemplateFiles.forEach((filename) => {
    const filePath = path.join(liveTemplatesPath, filename);
    const xml = fs.readFileSync(filePath);
    const liveTemplate = JSON.parse(parser.toJson(xml));

    if (liveTemplate && liveTemplate.templateSet && liveTemplate.templateSet.template) {
        const result = [];

        liveTemplate.templateSet.template.forEach((template) => {
            result.push({
                description: template.description,
                shortcut: template.name,
            });
        });

        const basename = (filename.split('.xml')[0] || '').trim();
        let content = `# ${basename.replace(/NanoGiants/g, '')}\n\n| Abbreviation | Description |\n| --- | --- |\n`;

        result.sort((a, b) => a.shortcut.localeCompare(b.shortcut));
        result.forEach((line) => {
            content += `| ${line.shortcut} | ${line.description} |\n`
        });

        fs.writeFileSync(path.join(process.cwd(), `${basename.replace(/\s/g, '')}.md`), content);
        newFiles.push(`${basename}.md`);
    }
});

const readme = String(fs.readFileSync(path.join(process.cwd(), '..', 'README.md')));
const section = `Live templates\n-\n\n${newFiles.map(file => `* [${file.split('.md')[0].trim().replace(/NanoGiants /g, '')}](documentation/${file.replace(/\s/g, '')})`).join('\n')}\n\nFeedback\n-`;

const newReadme = readme.replace(/Live templates\n-(.|\n)*Feedback\n-/g, section);
fs.writeFileSync(path.join(process.cwd(), '..', `README.md`), newReadme);

