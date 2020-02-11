const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project Name',
      default: this.appname, // Default to solution folder name
    }, {
      type: 'input',
      name: 'bucket',
      message: 'bucket (stages are created as <bucket name>-<branch slug>'
    }, {
      type: 'input',
      name: 'buildPath',
      message: 'build path',
      default: 'build/'
    }, {
      type: 'input',
      name: 'production',
      message: 'Production url'
    }, {
      type: 'confirm',
      name: 'clientkit',
      message: 'Enable Clientkit',
      default: true
    }]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('workflows/deploy.yml'),
      this.destinationPath('.github/workflows/deploy.yml'),
      this.answers
    );
  }
};
