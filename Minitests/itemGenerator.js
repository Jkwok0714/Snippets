// part 1 part 2 of part 3

var part1 = ['Desert', 'Oceanic', 'Solar', 'Sky', 'Far', 'Earthen', 'Luminant', 'Bone', 'Cleaving', 'Fiery', 'Frozen', 'Devastating', 'Terrifying', 'Grim', 'Foul', 'Janky', 'Terrible', 'Awesome',
  'Godlike', 'Holy', 'Unholy', 'Crude', 'Deathly', 'Arrogant', 'Refined', 'Graceful', 'Resolute', 'Gleaming', 'Ordinant', 'Lawful', 'Chaotic', 'Aquatic', 'Dusty', 'Demonic', 'Angelic',
  'Volcanic', 'Crystal', 'Shitty', 'Icy', 'Nordic', 'Oriental', 'Forsaken'];
var part2 = ['Beater', 'Slicer', 'Splitter', 'Blade', 'Axe', 'Waraxe', 'Halberd', 'Spear', 'Sword', 'Zweihander', 'Morningstar', 'Mace', 'Flail', 'Knuckle', 'Club', 'Launcher', 'Longbow',
  'Horsebow', 'Recurve', 'Rapier', 'Sidearm', 'Revolver', 'Handcannon', 'Scythe', 'Bleeder', 'Dagger', 'Knife', 'Javelin', 'Hook', 'Heirloom', 'Musket', 'Dirk', 'Main Gauche', 'Staff',
  'Wand', 'Lance', 'Bec de Corbin'];
var part3 = ['Terror', 'Grimness', 'Dusk', 'Ancient Lords', 'Heaven', 'Hell', 'Romance', 'Justice', 'Light', 'Darkness', 'Reaper', 'Dominance', 'Absolution', 'Bloodlust', 'Vengeance', 'Corniness',
  'Metal', 'Death', 'Great Punishment', 'Fortune', 'Sloth', 'Lust', 'Deep Depths'];

var assembleEquipment = function() {
  var result = {};
  var name = '';

  //Generate a name
  name += part1[Math.floor(Math.random() * part1.length)];
  name += ' ' + part2[Math.floor(Math.random() * part2.length)];
  if (name.length <= 10) {
    name += ' of ' + part3[Math.floor(Math.random() * part3.length)];
  }
  result.name = name;

  //Generate a strength property
  result.strength = Math.floor(Math.random() * 100);
  result.worth = result.strength * 300 + 100;

  return result;
}

var generateTestStuff = function(times) {
  i = 0;
  while (i < times) {
    var newEquip = assembleEquipment();
    console.log('Got:', newEquip.name, ' ... strength', newEquip.strength, 'worth', newEquip.worth);
    i++;
  }
};

generateTestStuff(10);
