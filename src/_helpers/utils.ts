import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { join } from 'path';
import * as bcrypt from 'bcrypt';

export function sendEmail(
  email: string,
  subjectContent: string,
  payload: any,
  template: string,
): { status: boolean; data: any } {
  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.VETMERGENCIA_PASSWORD,
        user: process.env.VETMERGENCIA_EMAIL,
      },
      port: 465,
      service: process.env.EMAIL_SERVICE,
    });

    const source = fs.readFileSync(join(__dirname, '..', template), 'utf8');
    console.log('source', source);
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.VETMERGENCIA_EMAIL,
        html: compiledTemplate(payload),
        subject: subjectContent,
        to: email,
      };
    };
    // Send email
    transporter.sendMail(options(), (error, info) => {
      console.log(info, 'info');
      if (error) {
        console.log('error', error);
        return { status: false, data: error };
      } else {
        return { status: true, data: {} };
      }
    });
  } catch (error) {
    console.log('error', error);
    return { status: false, data: error };
  }
}

export function encrypt(info: string): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(info, salt);
}
