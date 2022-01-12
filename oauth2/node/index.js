/*
 * Copyright (c) BOLSA DE COMERCIO DE SANTIAGO S.A. (Chile) All rights
 * reserved.
 *
 * All rights to this product are owned by BOLSA DE COMERCIO DE
 * SANTIAGO S.A.
 * and may only be used under the terms of its associated license
 * document. You
 * may NOT copy, modify, sublincese, or distribute this source file or
 * portions
 * of it unless previously authorized in writing by BOLSA DE COMERCIO
 * DE
 * SANTIAGO S.A. In any event, this notice must always be included
 * verbatim with
 * this file.
 */

'use strict';

const ClientOAuth2 = require('client-oauth2');
const axios = require('axios').default;

const main = async(clientId, username, password) => {
    const auth = new ClientOAuth2({
        accessTokenUri: 'https://sso.aunablockchain.com/auth/realms/auna/protocol/openid-connect/token',
        authorizationUri: 'https://sso.aunablockchain.com/auth/realms/auna/protocol/openid-connect/auth',
        clientId: clientId,
        scopes: ['openid', 'email', 'profile', 'roles']
    });

    const token = await auth.owner.getToken(username, password);
    console.log(token);

    const resp = await axios.get('https://90249000-0-sample-node-app-01-sample-external-01.aunablockchain.com/', {
        headers: { Authorization: `Bearer ${token.accessToken}`}
    });
    console.log(resp.data);
}

const myArgs = process.argv.slice(2);
main(myArgs[0], myArgs[1], myArgs[2]).then(console.log('Done')).catch(e => console.error(e));