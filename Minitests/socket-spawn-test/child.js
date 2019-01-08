console.log(`Child spawned at ${process.pid}`);
setTimeout(() => {
  console.log(`Child terminating at ${process.pid}`);
  process.exit();
}, 12000);
