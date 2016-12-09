# <%= projectName %>

**Note:** You shouldn't change anything inside public / build folder. It will be overwritten.

----------

## Installation

- Install [node](http://nodejs.org)
- `npm install`

----------

## Development

- `cp app/config/config_local.yml.dev app/config/config_local.yml`
- `npm run build # targets development env

**Note:** You should have in your IDE a linter for ESLint, Stylelint and Editorconfig.

### Styleguide

This project follows a [BEM methodology](https://en.bem.info/methodology/naming-convention/).

#### Cheatsheet of what is used

This pattern should be used for naming and styling elements.

`[BLOCK]__[ELEMENT]-—[MODIFIER]`

----------

## Deploy

- `cp app/config/config_local.yml.dist app/config/config.yml`
- Change `app/config/config_local.yml` according to database specifications
- `npm run build-prod # targets production env

----------

## Test

- `npm run test`
