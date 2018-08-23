console.log('Starting daily routine, press Ctrl-C to cancel');

let explosions = setInterval(() => {
  console.log(`\x1b[31mMegumin: \x1b[33mEXPL${'O'.repeat(Math.floor(Math.random() * 10) + 1)}SION!\x1b[0m`);
}, 1000);

process.on('SIGINT', () => {
  clearInterval(explosions);
  console.log('\nClosing now');
  setTimeout(() => {
    process.exit();
  }, 1000);
} );
