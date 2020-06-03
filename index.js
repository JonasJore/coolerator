const fs = require('fs')
const path = require('path')
const args = process.argv.slice(2)

const projectType = args[0] 
const PROJECT_NAME = args[1]
const DIR_PERMISSION = 0755;

const createDir = (dir) => {
    try {
        fs.mkdirSync(dir, DIR_PERMISSION)
    } catch(err) {
        throw err
    }
}

const copy = (src, dest) => {
    const desination = fs.createWriteStream(dest)
    fs.createReadStream(src).pipe(desination)
}

const copyDirRecursive = (src, dest) => {
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

const generateReactProject = () => {
    copyDirRecursive(
        path.join(__dirname, '/project-templates/react-project/'),
        path.join('./', PROJECT_NAME)
    )

    console.log("a new, fresh react-app served")
}

const manPage = () => {
    return `
        Thanks for using coolerator!

        this application takes two arguments to work properly:
            - projectType
            - projectName
        ex:
            node index.js react my-cool-react-application

            where react is type and my-cool-react-application is name
        
        if you experience any bugs (this is early in dev cycle) feel free to post an issue about it in the repo: https://www.github.com/jonasjore/coolerator 
        or send me a tweet @jore_irl
    `
}

const getProjectType = (projectType) => {
    switch(projectType) {
        case 'react': {
            console.log("generating " + PROJECT_NAME)
            return generateReactProject()
        }
        case '-h': {
            console.log(manPage())
            return 
        }
        default:
            throw Error("project type not implemented yet")
    }
}

/* 
    basic functionality:
    package should be available globally
    first argument should be project generation type e.g react or mvn
    second will be the projects name

    when -h print a good man-page
*/

getProjectType(projectType)