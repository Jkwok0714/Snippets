# Hashtag python comment!
import random

# Supernoob stuff
print 'Hello i am the peethon'
superVariable = 'super variables'
var1,var2,var3 = 5,1,'hyuk'
print 'printing the variable which is', superVariable, var3

# String operations
print superVariable[0]
print superVariable[1:6]
print superVariable[4:]
print superVariable * 5
print superVariable + var3

# Tuples vs Lists. Tuples are constants
nyantuple = ('hanekawa', 'kagarino')
wanlist = ['ellie', 'charlie', 'dogethatstealsbunfromsatania']

wanlist[2] = 'sad'
print 'wanlist[2]:', wanlist

nyannottuple = list(nyantuple)
nyannottuple[1] = 'kirie'
print 'nyantuple[1]:', nyannottuple

# Operators.. skipped a lot
greatestNumber = 4
print 'Greatest number', greatestNumber
greatestNumber **= 2
print 'Greatest number after operator', greatestNumber
if (greatestNumber == 16): print 'Wow it is actually 16. cool'
print 'Abs of -4', abs(-4)

# Choice
print 'Selecting stuff from wanlist'
print '==', random.choice(wanlist)
print '==', random.choice(wanlist)

waffus = ['aqua', 'megumin', 'kurisu', 'hanekawa', 'asuna', 'tomoko',
    'kagarino', 'shinoboom']
for x in range(3):
    print '==', random.choice(waffus)

# goodbye
raw_input('\n\nPress enter to make this go away.')
