import constants from './utils/constants.js';
import app from './server.js';

const port = constants.SERVER_PORT || 3000;

app.listen(port, ()=> {
    console.log('server rodando na porta ', port)
});

/*
browser.close();
child_process.execSync("start cmd.exe /K ping -t 192.168.18.1");
*/
