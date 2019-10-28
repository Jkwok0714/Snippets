/**
 * @file By itself, sharp is destroying EXIF data on rotate. Preserve it with exif reader
 * Created Oct 27 2019
 */
const sharp = require('sharp');
const piexif = require('piexifjs');
const fs = require('fs');
const { promisify } = require('util');

const fsp = {
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile)
};

const filepath = './IMG_9237.JPG';
const filepathTo = './IMG_9237_E.JPG';

const main = async () => {
    const originalBuffer = await fsp.readFile(filepath);
    const exifDump = piexif.load(originalBuffer.toString('binary'));
    const rotatedBuffer = await sharp(filepath).rotate(90).toBuffer();
    const finalBinary = piexif.insert(piexif.dump(exifDump), rotatedBuffer.toString('binary'));
    await fsp.writeFile(filepathTo, new Buffer(finalBinary, 'binary'));
    console.log('done, please check');
};

main();
