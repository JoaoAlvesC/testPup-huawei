import dotenv from 'dotenv';
dotenv.config();
import app from './server.js';

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log('server rodando na porta ', port)
});


/*
browser.close();
child_process.execSync("start cmd.exe /K ping -t 192.168.18.1");
*/
