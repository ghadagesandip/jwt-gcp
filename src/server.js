const express = require('express');
const { GoogleAuth } = require('google-auth-library');

const port = 5001;
const app = express();


app.post('/jwt', function(req, resp){

    /**
    * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
    * this library will automatically choose the right client based on the environment.
    */
    async function main() {
       
        const auth = new GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        console.log('client', client)
        const token = await client.getAccessToken();
        resp.json({
            token:token
        })
        
        // const client = new JWT({
        //     email: keys.client_email,
        //         key: keys.private_key,
        //         scopes: [
        //             'https://www.googleapis.com/auth/cloud-platform'
        //         ],
        //     });
            
        //     const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
        //     const res = await client.request({url});

        //     const tokenInfo = await client.getTokenInfo(client.credentials.access_token);
            

           

        //     resp.send({
        //         data: res,
        //         tokenInfo
        //     })
    }

    main().catch(function(error){
        console.log('err', error)
        resp.json({error:error})
    });
})

app.listen(port, function(){
    console.log('Server is up and running on '+port)
});