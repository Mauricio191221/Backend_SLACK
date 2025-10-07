import nodemailer from 'nodemailer';
import ENVIROMENT from './environment.config.js';

//La configuracion para nuestro mailer
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'mauriciodevtest00@gmail.com',
            pass: ENVIROMENT.GMAIL_PASSWORD
        }
    }
)

export default transporter