export interface SendMailRequest {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    messageText: string;
    messageHtml: string
    auth:{
      user: string;
      pass: string;
    }
  };
    
  export interface GetTemplateRequest {
    idTemplate: string;
    parametersHtml: string;
  };
  

  