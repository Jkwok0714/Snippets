# Imports
import os, time
from datetime import datetime

# Constants
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

startString = '\n >> '

# Accept user input for a directory. Takes absolute path
directory = ''
currentDirectory = os.getcwd()
while directory == '':
  directory = raw_input('Input absolute path:')

directoryList = os.listdir(directory)
directoryList2 = os.listdir(currentDirectory)

# Function definiton
def getFileSizes(directory, directoryList):
    print(bcolors.BOLD + 'Getting filsizes of current working directory of: ' + directory + bcolors.ENDC + '\n')
    for file in directoryList:
        filePath = directory + '/' + file
        size = os.path.getsize(filePath)
        lastModified = datetime.strptime(time.ctime(os.path.getctime(filePath)), '%a %b %d %H:%M:%S %Y')
        lastModifiedStr = lastModified.strftime('%y-%m-%d-%H-%M')
        print('Filesize: ' + file + ' - ' + str(size) + 'b. Modified: ' + lastModifiedStr)

def printFileList(directory, directoryList):
    print(bcolors.BOLD + 'List files for ' + directory + bcolors.ENDC)
    joined_string = startString.join([str(v) for v in directoryList])
    print('\nUser input directory: ' + startString + joined_string)

# Print the information and run
# printFileList(directory, directoryList)
getFileSizes(directory, directoryList)
# printFileList(currentDirectory, directoryList2)
getFileSizes(currentDirectory, directoryList2)
