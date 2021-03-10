import { Request, requestBody, RestBindings, get, post, ResponseObject, param } from '@loopback/rest';
import { inject } from '@loopback/core';
import { ClientReport } from './../report/client-report';

import * as paramsReport from './interface-report-repository';
const clientReport = new ClientReport();

const TemplateJRXML = clientReport.getFileString('src/report/Collateral.jrxml');
const STATUS_ACTIVE = 'ACTIVE';
const STATUS_INACIVE = 'INACTIVE';

/**
 * OpenAPI response for saveTemplate()
 */
const SAVE_RESPONSE: ResponseObject = {
  description: 'Save Template Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'SaveTemplateResponse',
        properties: {
          message: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A controller to implement save template requests
 */
export class ReportController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  // Map to `POST /saveTemplate`
  @post('/saveTemplate', {
    responses: {
      '200': SAVE_RESPONSE,
    },
  })
  async saveTemplate(
    @requestBody( {
      description: 'data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              TemplateISV: { type: 'string' },
              TemplateDapp: { type: 'string' },
              TemplateName: { type: 'string' },
              TemplateDescription: { type: 'string' },
            },
          },
        },
      },
    } )
    params: paramsReport.SaveTemplateRequest
  ): Promise<object> {
    // Reply with the result of save template and request headers

    let Template = {
      "TemplateID": "",
      "TemplateISV": params.TemplateISV,//"bcs",
      "TemplateDapp": params.TemplateDapp,//"node-d-app-example",
      "TemplateName": params.TemplateName,//"Collateral",
      "TemplateDescription": params.TemplateDescription,//" Collateral Report",
      "TemplateJRXML": TemplateJRXML,
      "TemplateStatus": STATUS_ACTIVE
    }

    const paramsInternal = {
      "Template": Template
    }

    let message = await clientReport.clientTemplate.SaveTemplate(paramsInternal);

    return {
        message: message,
        headers: Object.assign({}, this.req.headers),
      };
  }

  // Map to `POST /GenerateReport`
  @post('/GenerateReport', {
    responses: {
      '200': SAVE_RESPONSE,
    },
  })
  async generateReportCollateral(
    @requestBody( {
      description: 'data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              RutCliente: { type: 'string' },
              RutClientePrestamista: { type: 'string' },
              FondoClientePrestamista: { type: 'string' },
              Nemotecnico: { type: 'string' },
              Cantidad: { type: 'string' },
              Precio: { type: 'string' },
              Monto: { type: 'string' },
            },
          },
        },
      },
    } )
    params: paramsReport.GenerateReportRequest
  ): Promise<object> {
    // Reply with the result of save template and request headers
    const CollateralReport = clientReport.getByteArray('src/report/Collateral.jrxml');
    const data = clientReport.getByteArray('src/report/data.json');

    let paramsEngine = {
      "TemplateName": "Collateral",
      "Resources": [
          {
              "ResourceName": "Collateral",
              "ResourceExtension": "jrxml",
              "ResourceBytes": CollateralReport
          },
          {
              "ResourceName": "data",
              "ResourceExtension": "json",
              "ResourceBytes": data
          }
      ],
      "Parameters": [
      {
          "RutCliente": params.RutCliente,
          "RutClientePrestamista": params.RutClientePrestamista,
          "FondoClientePrestamista": params.FondoClientePrestamista,
          "Nemotecnico": params.Nemotecnico,
          "Cantidad": params.Cantidad,
          "Precio": params.Precio,
          "Monto": params.Monto,
      }
      ],
      "Datasource": ["JSONFILE", "data.json"],
      "Format": 0
  }
  
  let message = await clientReport.clientEngine.generateReport(paramsEngine);

  return {
      message: message,
      headers: Object.assign({}, this.req.headers),
    };

  }
}
