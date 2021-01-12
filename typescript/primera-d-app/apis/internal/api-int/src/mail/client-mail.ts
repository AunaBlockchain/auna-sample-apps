import { MailApiClient } from '@bcs/baas-mailer-cli'
import { MailTemplateApiClient } from '@bcs/auna-mailer-template-cli'
const fs = require('fs');
const conv = require('convert-string');

export class ClientMail {

    public clientMail : MailApiClient; //Client Mail
    public clientTemplateMail : MailTemplateApiClient; // Cliente Template Mail

    constructor() {
      this.clientMail = new MailApiClient({
        endpointAddr: (process.env.HOST_MAIL || 'localhost') + ":" + (process.env.PORT_MAIL || '3101')
      });
      this.clientTemplateMail = new MailTemplateApiClient({
        endpointAddr: (process.env.HOST_MAIL_TEMPLATE_SERVICE || 'localhost') + ":" + (process.env.PORT_MAIL_TEMPLATE_SERVICE || '3051')
      });
    }

    public getByteArray( filePath : String ){
        return conv.UTF8.stringToBytes( fs.readFileSync(filePath).toString() );
    }

    public getFileString ( filePath : String ){
      return fs.readFileSync( filePath ).toString()
    }
}