import { ReportApiClient } from '@bcs/baas-report-cli';
import { ReportTemplateApiClient } from '@bcs/auna-report-template-cli';
const fs = require('fs');
const conv = require('convert-string');

export class ClientReport {

    public clientEngine : ReportApiClient; //Client Engine
    public clientTemplate : ReportTemplateApiClient; //Client CRUD Template

    constructor() {
      this.clientEngine = new ReportApiClient({
        endpointAddr: (process.env.HOST_ENGINE || 'localhost') + ":" + (process.env.PORT_ENGINE || '3071')     
      });

      this.clientTemplate = new ReportTemplateApiClient({
        endpointAddr: (process.env.HOST_REPORT_TEMPLATE_SERVICE || 'localhost') + ":" + (process.env.PORT_REPORT_TEMPLATE_SERVICE || '3070')
      });
    }

    public getByteArray( filePath : String ){
        return conv.UTF8.stringToBytes( fs.readFileSync(filePath).toString() );
    }

    public getFileString ( filePath : String ){
      return fs.readFileSync( filePath ).toString()
    }
}
