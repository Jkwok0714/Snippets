#!/bin/python3

# OOP in Python test. Created Aug 14 2018

import random

def getBeer():
    taplist = [
        'Budweiser',
        'Coors Liggit',
        'Seven Stills 8LBBS',
        'HenHouse Saison',
        'Laughing Monk Brother Irwin',
        'Ballast Point Sculpin'
    ]
    return random.choice(taplist)

class Guy:
    guys = 0
    def __init__(self, name, catchphrase):
        self.name = name
        self.catchphrase = catchphrase
        Guy.guys += 1
    def introduce(self):
        print ('My name is ' + self.name + '. I do not do anything but say..' + self.catchphrase)

    def drink(self):
        print(self.name + ' has consumed a ' + getBeer())
    @classmethod
    def count(cls):
        print('There are {:d} guys'.format(Guy.guys))

class BadGuitarist(Guy):
    riffers = 0
    def __init__(self, name, guitar, catchphrase):
        Guy.__init__(self, name, catchphrase)
        self.guitar = guitar
        BadGuitarist.riffers += 1
    def introduce(self):
        print('My name is ' + self.name + ' and I play ' + self.guitar + '. ' + self.catchphrase)

    @classmethod
    def count(cls):
        print("There are {:d} rifflords.".format(BadGuitarist.riffers))

class BadSinger(Guy):
    singer = 0
    def __init__(self, name, catchphrase):
        Guy.__init__(self, name, catchphrase)
        BadSinger.singer += 1
    def introduce(self):
        print('My name is ' + self.name + '. ' + self.catchphrase + ' and I scream into microphones')
        if self.name == 'Ragnar Zolberg':
            print(' but really I do not need a microphone because my voice is powerful')

# Runtime executions
print('-----')

markus = BadGuitarist('Markus Vanhala', 'Jackson RR', 'Play the best fuck the rest!')
gildenlow = BadGuitarist('Daniel Gildenlow', 'Mayones Duvell', 'That song you have there, it is mine now!')
esa = BadGuitarist('Esa Holopainen', 'Mayones', 'I play all the leads, 3-2-1-3-2-1-3-2-1-3-2-1 -uses wahwah-')
bhen = Guy('Bhen', 'WUBLULUBLBLUBLUBLUB')
ragnar = BadSinger('Ragnar Zolberg', 'I was never meant to be a man')
bruce = BadSinger('Bruce Dickinson', 'I am polymath unlike you')

allGuys = [markus, gildenlow, esa, ragnar, bruce, bhen]

for guy in allGuys:
    guy.introduce()

bhen.drink();
markus.drink();

Guy.count()
BadGuitarist.count()
