const dynamic = new Function('modulePath', 'return import(modulePath)');

module.exports.huggingFaceClient_OLD = async (prompt) => {
    try{
        const { Client } = await dynamic('@gradio/client');
        const client = await Client.connect("MadsGalsgaard/WeAiU");
        const result = await client.predict("/chat", {
            message: prompt,
            request: 'You are a friendly Chatbot.',
            param_3: 512,
            param_4: 0.7,
            param_5: 0.95
        });
        return [true,result];
    }catch(error){
        console.error(error);
        return [false,error];
    }
};const connectClient = async() => {
    try{
        const { Client } = await dynamic('@gradio/client');
        const client = await Client.connect("MadsGalsgaard/WeAiU");
        return client;
    }catch(error){
        return null;
    }
 };
 
 module.exports.huggingFaceClient = async(prompt) => {
   let client = await connectClient();
   if(!client){
       return [false,'Could not connect to huggingface'];
   }
 
   try{
      const result = await Promise.race([
          client.predict("/chat",{
              message: prompt,
              request: 'You are a friendly Chatbot.',
              param_3: 512,
              param_4: 0.7,
              param_5: 0.95
          }),
          new Promise((_,reject) =>
              setTimeout(() => reject(new Error('Request time out')),5000)
          )
      ]);
 
      return [true, result];
   }catch(error){
      console.error('Error while making prediction ',error);
      if(error.message === 'Request timed out'){
         client = await connectClient();
         if(!client){
            return [false, 'could not refresh connection'];
         }
      }
      return [false, error];
   }
 }; 

