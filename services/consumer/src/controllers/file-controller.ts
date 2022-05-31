import fs from 'fs'

async function writeFile(data: string) {
    fs.writeFileSync(__dirname + '/../settings/text.txt', data)
}

async function readFile() {
    const buff = fs.readFileSync(__dirname + '/../settings/text.txt')
    const text = buff.toString()

    return text;
}

export { writeFile, readFile }