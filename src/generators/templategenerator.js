const path = require('path')

const { copyDirRecursive } = require('../util/fileOperations')

module.exports = {
    generateReactProject: generateReactProject = (PROJECT_NAME) => {
        copyDirRecursive(
            path.join(__dirname, '../../project-templates/react-project'),
            path.join('./', PROJECT_NAME)
        )
    
        console.log("a new, fresh react-app served")
    }
} 