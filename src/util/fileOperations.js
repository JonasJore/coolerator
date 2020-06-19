const fs = require('fs')
const path = require('path')

const DIR_PERMISSION = 0755;

const createDir = (dir) => {
    try {
        fs.mkdirSync(dir, DIR_PERMISSION)
    } catch(err) {
        throw err
    }
}

const copy = (src, dest) => {
    const destination = fs.createWriteStream(dest)
    fs.createReadStream(src).pipe(destination)
}

module.exports = {
    copyDirRecursive : copyDirRecursive = (src, dest) => {
        createDir(dest)
        const files = fs.readdirSync(src)
    
        for(var i = 0; i < files.length; i++) {
            const currentFile = fs.lstatSync(path.join(src, files[i]))
            if(currentFile.isDirectory()) {
                copyDirRecursive(path.join(src, files[i]), path.join(dest, files[i]))
            } else {
                copy(path.join(src, files[i]), path.join(dest, files[i]))
            }
        }
    }
}