module.exports = function (plop) {
  plop.addHelper('lowerCase', (text) => text.toLowerCase());
  plop.addHelper('properCase', (text) =>
    text.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    }),
  );

  plop.setGenerator('component', {
    description: 'Add a react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name please (ex: layout, breadcrumbs, menuItem)!',
      },
    ],
    actions: [
      {
        type: 'add',
        path:
          'src/lib/components/{{lowerCase name}}/{{properCase name}}.component.js',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path:
          'src/lib/components/{{lowerCase name}}/{{properCase name}}.component.test.js',
        templateFile: 'plop-templates/component.test.hbs',
      },
      {
        type: 'add',
        path: 'stories/{{lowerCase name}}.stories.js',
        templateFile: 'plop-templates/stories.hbs',
      },
    ],
  });
};
