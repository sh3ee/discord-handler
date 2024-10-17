const { glob } = require('glob'); 
const path = require('node:path');

/**
 * @param {String} file
 */
function deleteCache(file) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) { delete require.cache[filePath]; }
}

/**
 * @param {String} folderName
 */
exports.loadFiles = async function (folderName) {
    const files = await glob(path.join(process.cwd(), folderName, '**/*.js').replace(/\\/g, '/'));
    await Promise.all(files.map(deleteCache));
    return files;
}
