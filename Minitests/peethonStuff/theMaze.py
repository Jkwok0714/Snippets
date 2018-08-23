#!/bin/python3

# Replace RPG starter project with this code when new instructions are live

def showInstructions():
  #print a main menu and the commands
  print('''
RPG Game
========

Escape to the garden with a key and explosives

Commands:
  go [cardinal direction]
  get [item]
''')

def showStatus():
  #print the player's current status
  print('\n---------------------------')
  print('You are in the ' + currentRoom)
  #print the current inventory
  print('Inventory : ' + str(inventory))
  #print an item if there is one
  # if "item" in rooms[currentRoom]:
  #   print('You see a ' + rooms[currentRoom]['item'])
  showItemsInRoom()
  showAvailableDirections()
  print("---------------------------")

def showAvailableDirections():
  string = 'You see doors going these directions:'
  for key, value in rooms[currentRoom].items():
      if key == 'north' or key == 'south' or key == 'west' or key == 'east':
          string += ' ' + key
  print(string)

def showItemsInRoom():
  if 'item' in rooms[currentRoom]:
      string = 'You see these items:'
      for key in rooms[currentRoom]['item']:
          string += ' ' + key
      print(string)

# an inventory, which is initially empty
inventory = []

# a dictionary linking a room to other rooms
rooms = {
        'Hall' : {
              'south' : 'Kitchen',
              'west' : 'Girlie Room',
              'north' : 'Beer Hall',
              'item' : ['key']
            },
        'Girlie Room' : {
              'east' : 'Hall',
              'north' : 'Garden',
              'item' : ['nyanners', 'rpop', 'meme']
            },
        'Beer Hall' : {
              'south' : 'Hall',
              'item' : ['explosives', 'budweiser', 'corona liggit']
            },
        'Kitchen' : {
              'north' : 'Hall',
              'west' : 'Dining Room',
              'item' : ['monster']
            },
        'Dining Room' : {
              'east' : 'Kitchen'
            },
        'Garden' : {
              'south' : 'Girlie Room'
            }
     }

# start the player in the Hall
currentRoom = 'Hall'

showInstructions()

# loop forever
while True:
  showStatus()

  #get the player's next 'move'
  #.split() breaks it up into an list array
  #eg typing 'go east' would give the list:
  #['go','east']
  move = ''
  while move == '':
    move = raw_input('>')

  move = move.lower().split()

  #if they type 'go' first
  if move[0] == 'go':
    #check that they are allowed wherever they want to go
    if move[1] in rooms[currentRoom]:
      #set the current room to the new room
      currentRoom = rooms[currentRoom][move[1]]
      if 'item' in rooms[currentRoom] and 'Monster' in rooms[currentRoom]['item']:
          print('Oh no, a dogemonster. You lose the will to go on.')
          break
      if currentRoom == 'Garden' and 'key' in inventory and 'explosives' in inventory:
          print('You escaped into the garden!')
          break
    #there is no door (link) to the new room
    else:
        print('You can\'t go that way!')

  #if they type 'get' first
  if move[0] == 'get' :
    #if the room contains an item, and the item is the one they want to get
    if "item" in rooms[currentRoom] and move[1] in rooms[currentRoom]['item']:
      #add the item to their inventory
      inventory += [move[1]]
      #display a helpful message
      print(move[1] + ' got!')
      #delete the item from the room
      rooms[currentRoom]['item'].remove(move[1])
      if not rooms[currentRoom]['item']:
        del rooms[currentRoom]['item']
    #otherwise, if the item isn't there to get
    else:
      #tell them they can't get it
      print('Can\'t get ' + move[1] + '!')

  # Fabulous new functionality to exit the game
  if move[0] == 'exit' :
      print('You have spontaneously combusted. Now exiting "game" bhi')
      raise SystemExit
