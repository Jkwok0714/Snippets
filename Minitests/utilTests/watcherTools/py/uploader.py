# Py watcher-uploader, Created Oct 6 2018

# Imports
import paramiko, sys, os
from config import config
from options import options

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
currentDir = os.getcwd()
targetLocalPath = os.path.realpath(os.path.join(currentDir, options.localDir))
targetRemotePath = options.remoteDir

# Aliases
normPath = os.path.normpath
joinPath = os.path.join
isDir = os.path.isdir
splitPath = os.path.split
dirOnly = os.path.dirname
fileOnly = os.path.basename

# Create a list of relative paths recursively for the files
def buildFileList(baseDirectory):
    fullFileList = []
    def getFileList(directory):
        isRoot = directory == '.'
        for filename in os.listdir(baseDirectory if isRoot else joinPath(baseDirectory, directory)):
            absPath = normPath(joinPath(baseDirectory, filename) if isRoot else joinPath(baseDirectory, directory, filename));
            if isDir(absPath):
                # print 'dir:', filename
                getFileList(joinPath(directory, filename))
            else:
                filepath = normPath(joinPath(directory, filename))
                # print 'file:', filepath
                fullFileList.append(filepath)
    getFileList('.')
    return fullFileList

# Handles dealing with the sftp connection
class ConnectionHandler:
    def __init__ (self, config):
        self.config = config;
        self.transport = paramiko.Transport((config.hostname, config.hostport))
        self.transport.connect(username = config.username, password = config.password)
        self.sftp = paramiko.SFTPClient.from_transport(self.transport)
    def chdir(self, targetDir):
        self.sftp.chdir(targetDir)
    def close(self):
        self.sftp.close()
        self.transport.close()
    def listdir(self):
        return self.sftp.listdir()
    def uploadFile(self, localFile, remotePath):
        filename = fileOnly(localFile)
        self.__navigateDir(remotePath)
        # print 'remote cwd', self.sftp.getcwd()
        # print 'putting', filename
        try:
            self.sftp.put(localFile, filename)
        except IOError:
            print bcolors.WARNING, 'File failed to upload: ', filename, bcolors.ENDC

    def __navigateDir(self, remotePath):
        if remotePath == '/':
            self.sftp.chdir('/')
        elif remotePath == '~':
            self.sftp.chdir('~')
        elif remotePath == '':
            pass
        else:
            try:
                self.sftp.chdir(remotePath)
            except IOError:
                dirname, basename = splitPath(remotePath.rstrip('/'))
                self.__navigateDir(dirname)
                self.sftp.mkdir(basename)
                self.sftp.chdir(basename)
                return

def main():
    print bcolors.BOLD, 'Initiating file moving script on', targetLocalPath, '...', bcolors.ENDC
    connection = ConnectionHandler(config)
    localFileList = buildFileList(targetLocalPath)
    putFiles = 0
    for file in localFileList:
        target = joinPath(targetLocalPath, file)
        destination = joinPath(targetRemotePath, dirOnly(file))
        # print 'abs path', target
        # print 'filepath', destination
        connection.uploadFile(target, destination)
        putFiles += 1
        print bcolors.OKBLUE, 'Put', file, bcolors.ENDC
    print bcolors.OKGREEN, 'End script, put', putFiles, 'files.', bcolors.ENDC
    connection.close()

main()
