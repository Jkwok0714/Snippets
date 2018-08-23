const nap = (time, callback) => {
    let stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
    }
    callback();
}
process.on('message', (data) => {
  let result = data.split('').sort(() => 0.5-Math.random()).join('');
  console.log('[Child] hey man im busy');

  setTimeout(() => {
    console.log('[Child] i told you im busy');
  }, 2000);
  
  nap(4000, () =>{
    console.log('[Child] look im so busy i took a while to start stuff');
    process.send(result);
  });
});
