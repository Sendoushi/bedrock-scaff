/* eslint-disable strict */'use strict';/* eslint-enable strict */
/* global Promise */

const path = require('path');
const glob = require('glob');
const gulp = require('gulp');
const rename = require('gulp-rename');
const conflict = require('gulp-conflict');
const template = require('gulp-template');
const inquirer = require('inquirer');
const utilsPath = require('bedrock-utils/src/node/path.js');
const utilsString = require('bedrock-utils/src/string.js');

const prompt = [{
    type: 'input', name: 'projectName',
    message: 'Which is your project name?'
}, {
    type: 'list', name: 'mod',
    message: 'What CMS you want to use?',
    choices: [
        { name: 'No CMS', value: 'nocms' },
        { name: 'BoltCMS', value: 'boltcms' },
        { name: 'Wordpress', value: 'wordpress' },
        { name: 'Node.js', value: 'node' }
    ]
}, {
    type: 'input', name: 'buildSrc', default: './build',
    message: 'Where do you want the built content?',
    when: answers => answers.mod !== 'node'
}, {
    type: 'list', name: 'markup',
    message: 'What markup do you want to use?',
    choices: [
        { name: 'None', value: 'none' },
        { name: 'HTML', value: 'html' },
        { name: 'PHP', value: 'php' },
        { name: 'Twig', value: 'twig' }
    ],
    when: answers => answers.mod !== 'node'
}, {
    type: 'checkbox', name: 'libs',
    message: 'Which libs / frameworks / approaches do you want to use?',
    choices: [
        { name: 'Jquery', value: 'jquery', checked: true },
        { name: 'Bedrock', value: 'bedrock', checked: true },
        { name: 'ES6', value: 'es6', checked: true },
        { name: 'Vue', value: 'vue', checked: false },
        { name: 'Redux', value: 'redux', checked: false },
        { name: 'Flow', value: 'flow', checked: false }
    ],
    when: answers => answers.mod !== 'node'
}];

//-------------------------------------
// Functions

/**
 * Sets a template
 *
 * @param {string} src
 * @param {string} dest
 * @param {object} data
 * @returns {promise}
 */
function setTemplate(src, dest, data) {
    const promise = new Promise(function (resolve, reject) {
        let called = false;

        try {
            gulp.src(src)
            .pipe(template(data))
            .pipe(rename(function (file) {
                if (file.basename[0] === '_') {
                    file.basename = '' + file.basename.slice(1);
                }
            }))
            .pipe(conflict(dest), {
                defaultChoice: 'n' // Skip
            })
            .pipe(gulp.dest(dest))
            .on('end', function () { called = true; if (!called) { return false; } resolve(); })
            .on('close', function () { called = true; if (!called) { return false; } resolve(); })
            .on('finish', function () { called = true; if (!called) { return false; } resolve(); });
        } catch (err) {
            reject(err);
        }
    });

    return promise;
}

/**
 * Runs templates
 *
 * @param {object} config
 * @returns {promise}
 */
function runTemplates(config) {
    const templatesPath = path.join(__dirname, '../templates');
    const promises = [];
    let templates = [];
    let newTemplates;

    // Taking care of templates
    templates = glob.sync(`${templatesPath}/common/**`);
    templates = templates.map(val => path.join(templatesPath, 'common', val));

    if (!config.mod !== 'node') {
        newTemplates = glob.sync(`${templatesPath}/browser/**`);
        newTemplates = newTemplates.map(val => { return { mod: 'browser', src: val }; });
        templates = templates.concat(newTemplates);
    } else {
        newTemplates = glob.sync(`${templatesPath}/node/**`);
        newTemplates = newTemplates.map(val => path.join(templatesPath, 'node', val));
        templates = templates.concat(newTemplates);
    }

    // Now lets really template
    templates.forEach(val => {
        const base = path.join(templatesPath, val.mod, val.src);
        const src = path.join(base, val.src);
        const dest = path.dirname(path.join(config.pathSrc, config.buildSrc, src.replace(base, '')));

        // Check if it is flow and it has it...
        if (!config.hasFlow) {
            if (src.replace('flow', '') !== src) {
                return;
            }
        }

        // Check if it is ES6 and it has it...
        if (src.replace('.js', '') !== src) {
            if (!config.hasES6) {
                if (src.replace('.es6', '') !== src) {
                    return;
                }
            } else {
                if (src.replace('.es6', '') === src) {
                    return;
                }
            }
        }

        // TODO: Lets check if this is right
        console.log(src, dest);

        // promises.push(setTemplate(src, dest, config));
    });

    return Promise.all(promises);
}

/**
 * Converts string for template usage
 *
 * @param {object} config
 * @returns {object}
 */
function readyConfig(config) {
    let buildSrc = config.buildSrc;

    if (buildSrc[0] !== '.' && buildSrc[0] !== '/') {
        buildSrc = './' + buildSrc;
    }

    return {
        originalSrc: config.originalSrc,
        pathSrc: config.pathSrc,
        projectId: utilsString.dashize(config.projectName).replace(/-/g, '_'),
        projectName: config.projectName,
        buildSrc: buildSrc,
        hasJquery: config.mod !== 'node' && config.libs.filter(val => val === 'jquery')[0],
        hasFlow: config.mod !== 'node' && config.libs.filter(val => val === 'flow')[0],
        hasES6: config.mod !== 'node' && config.libs.filter(val => val === 'es6')[0],
        hasMarkup: config.markup !== 'none',
        isNode: config.mod === 'node'
    };
}

/**
 * Run task
 *
 * @param {string} src
 * @param {string} runMod
 * @param {function} cb
 * @returns promise
 */
function run(src, mod, cb) {
    var promise = new Promise(resolve => resolve());

    if (typeof mod === 'function') {
        cb = mod;
        mod = null;
    }

    // Now the promise...
    return promise.then(function () {
        if (!src || typeof src !== 'string' || !src.length) {
            throw new Error('Project path is needed!');
        }

        if (src !== '.') {
            return utilsPath.getPwd(src);
        }

        // Lets confirm
        return inquirer.prompt([{
            type: 'confirm',
            name: 'root',
            message: 'Do you really want to use the actual folder?',
            default: false
        }])
        .then(answers => answers.root && utilsPath.getPwd(src));
    })
    .then(function (pathSrc) {
        return inquirer.prompt(prompt)
        .then(answers => {
            // Cache sources
            answers.originalSrc = src;
            answers.pathSrc = pathSrc;

            return answers;
        });
    })
    .then(readyConfig)
    .then(runTemplates)
    .then(() => cb && cb())
    .catch(err => cb && cb(err));
}

// ------------------------------------
// Export

module.exports = {
    run: run
};
