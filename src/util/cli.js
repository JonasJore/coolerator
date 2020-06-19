const { generateReactProject } = require('../generators/templategenerator')

// TODO: update
const manPage = () => {
    return `
        Thanks for using coolerator!

        this application takes two arguments to work properly:
            - projectType
            - projectName
        ex:
            node index.js react my-cool-react-application

            where react is type and my-cool-react-application is name
        
        if you experience any bugs (this is early in dev cycle) feel free to post an issue about it here: https://www.github.com/jonasjore/coolerator/issues
        or send me a tweet @jore_irl
    `
}

 module.exports = {
    getProjectType: getProjectType = (projectType, PROJECT_NAME) => {
        switch(projectType) {
            case 'react': {
                console.log("generating " + PROJECT_NAME)
                return generateReactProject(PROJECT_NAME)
            }
            case '-h': {
                console.log(manPage())
                break
            }
            default:
                throw Error("project type not implemented yet")
        }
    }
 }