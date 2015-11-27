import { dirname, basename, extname } from 'path';
import { groupBy, trimRight, startsWith, last, chain, uniq, indexBy } from 'lodash';

const pageContext = require.context('../../etwasvonluise', true, /^\.\/.*\/.*\.md$/);
const imageContext = require.context('../../etwasvonluise', true, /^\.\/.*\.(jpg|jpeg|gif|png)$/);
const images = imageContext.keys();

export const projects = pageContext.keys().map(getProject);
export const projectsMap = indexBy(projects, 'id');

export const categories = chain(projects)
    .pluck('path')
    .map(getCategoryName)
    .uniq()
    .map(addCategoryId)
    .value();

export const categoriesMap = chain(categories)
    .indexBy('id')
    .mapValues(getProjectsForCategory)
    .value();

function getProject(path) {
    const id = basename(path, '.md');
    const content = pageContext(path);
    const images = getImages(path);

    return { id, path, content, images };
}

function getImages(path) {
    const directory = trimRight(path, extname(path));

    return images
        .filter(image => startsWith(image, directory))
        .map(image => imageContext(image));
}

function getCategoryName(path) {
    return dirname(path).replace(/^\.\/?/, '');
}

function addCategoryId(name) {
    return {
        id: last(name.split(' ')),
        name
    };
}

function getProjectsForCategory(category) {
    return projects.filter(project => getCategoryName(project.path) === category.name);
}
