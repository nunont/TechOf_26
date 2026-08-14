const json = pm.response.json();

const token = json.token;

if (token){
    pm.collectionVariables.set("TOKEN", token);
}