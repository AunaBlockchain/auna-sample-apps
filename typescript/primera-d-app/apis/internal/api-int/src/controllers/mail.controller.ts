import { Request, requestBody, RestBindings, get, post, ResponseObject, param } from '@loopback/rest';
import { inject } from '@loopback/core';
import { ClientMail } from '../mail/client-mail'
import * as paramsMail from './interface-mail-repository';
const clientMail = new ClientMail();

/**
 * OpenAPI generic response
 */
const GENERIC_RESPONSE: ResponseObject = {
  description: 'Generic Response',
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
export class MailController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  // Map to `POST /saveTemplate`
  @post('/sendMail', {
    responses: {
      '200': GENERIC_RESPONSE,
    },
  })
  async sendMail(
    @requestBody( {
      description: 'data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              from: { type: 'string' },
              to: { type: 'string' },
              replyTo: { type: 'string' },
              subject: { type: 'string' },
              messageText: { type: 'string' },
              messageHtml: { type: 'string' },
              auth: {
                type: 'object',
                properties: {
                  user: { type: 'string' },
                  pass: { type: 'string' },
                }
              }
            },
          },
        },
      },
    })
    params: paramsMail.SendMailRequest
  ): Promise<object> {

    let message = await clientMail.clientMail.sendMail(params);

    return {
      message: message,
      headers: Object.assign({}, this.req.headers),
    };
  }

  // Map to `POST /getTemplate`
  @post('/getTemplate', {
    responses: {
      '200': GENERIC_RESPONSE,
    },
  })
  async getTemplate(
    @requestBody({
      description: 'data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              idTemplate: { type: 'string' },
              parametersHtml: { type: 'string' },
            },
          },
        },
      },
    })
    params: paramsMail.GetTemplateRequest
  ): Promise<object> {

    let message = await clientMail.clientTemplateMail.GetTemplate(params);

    return {
      message: message,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
