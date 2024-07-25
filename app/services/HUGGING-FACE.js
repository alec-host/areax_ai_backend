const dynamic = new Function('modulePath', 'return import(modulePath)');

module.exports.huggingFaceClient_OLD = async(prompt) => {
    try{
        const { Client } = await dynamic('@gradio/client');
        const client = await Client.connect("MadsGalsgaard/WeAiU");
        const result = await client.predict("/chat", {
                message: prompt,
                system_message: 'You are a friendly Chatbot. Summarize the response in not more than 200 characters.',
                max_tokens: 250,
                temperature: 0.1,
                top_p: 0.1
        });
        return [true,result];
    }catch(error){
        console.error(error);
        return [false,error];
    }
};

const connectClient = async() => {
   try{
       const { Client } = await dynamic('@gradio/client');
       const client = await Client.connect("MadsGalsgaard/WeAiU",{ hf_token: "hf_" });
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
             system_message: 'You are a friendly Chatbot. Summarize the response in not more than 200 characters.',
             max_tokens: 250,
             temperature: 0.1,
             top_p: 0.1
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