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

        const basename = filename.split('.xml')[0] || '';
        let content = `# ${basename}\n\n| Abbreviation | Description |\n| --- | --- |\n`;

        result.forEach((line) => {
            content += `| ${line.shortcut} | ${line.description} |\n`
        });

        fs.writeFileSync(path.join(process.cwd(), '..', `${basename}.md`), content);
        newFiles.push(`${basename}.md`);
    }

    console.log(liveTemplate)
});

const readme = String(fs.readFileSync(path.join(process.cwd(), '..', 'README.md')));
const section = `Livetemplates\n-\n\n${newFiles.map(file => `* [${file.split('.md')[0]}](${file})`)}\n\nFeedback\n-`;

const newReadme = readme.replace(/Livetemplates\n-(.|\n)*Feedback\n-/g, section);
fs.writeFileSync(path.join(process.cwd(), '..', `README.md`), newReadme);

