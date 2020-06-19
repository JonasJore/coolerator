const { getProjectType } = require('./src/util/cli')

const args = process.argv.slice(2)

const projectType = args[0]
const PROJECT_NAME = args[1]

getProjectType(projectType, PROJECT_NAME)