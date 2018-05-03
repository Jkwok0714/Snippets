const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('dbtest.db');
let check;

db.serialize(() => {
  db.run('CREATE TABLE if not exists beers_table (info TEXT)');
  let stmt = db.prepare('INSERT INTO beers_table VALUES (?)');
  for (let i = 0; i < 10; i++) {
    stmt.run('IPA' + i);
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM beers_table', (err, row) => {
    console.log(`DB Row ${row.id}: ${row.info}`);
  });
});

db.close();
