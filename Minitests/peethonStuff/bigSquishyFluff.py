# Testing PILLOWS. Created Aug 18 2018

fn = './test2.jpg'

from PIL import Image
from PIL.ExifTags import TAGS

import os
import platform
import time
from bcolors import bcolors

print(bcolors.BOLD + '(||| Fluffs Are Your Friend |||)' + bcolors.ENDC)

# Stack Overflow/Mark Amery
def modifyDate(pathToFile):
    """
    Try to get the date that a file was created, falling back to when it was
    last modified if that isn't possible.
    See http://stackoverflow.com/a/39501288/1709587 for explanation.
    """
    if platform.system() == 'Windows':
        return os.path.getctime(pathToFile)
    else:
        stat = os.stat(pathToFile)
        try:
            return stat.st_birthtime
        except AttributeError:
            return stat.st_mtime

def getExif(pathToFile):
    img = Image.open(pathToFile)
    info = img._getexif()
    return {TAGS.get(tag): value for tag, value in info.items()}

def parseTime(creationTime):
    return time.ctime(creationTime)

def creationTime(pathToFile):
    return parseTime(os.path.getctime(pathToFile))

def getInformation(pathToFile):
    exifData = getExif(pathToFile)
    print bcolors.BOLD + 'Get Exif: ' + bcolors.ENDC + str(exifData)
    print bcolors.BOLD + 'Parse Time: ' + bcolors.ENDC + str(parseTime(modifyDate(pathToFile)))
    print bcolors.BOLD + 'Creation Time: ' + bcolors.ENDC + str(creationTime(pathToFile))

getInformation(fn)
