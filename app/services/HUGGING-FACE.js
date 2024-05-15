const dynamic = new Function('modulePath', 'return import(modulePath)');

module.exports.huggingFaceClient = async (prompt) => {
    const { Client } = await dynamic('@gradio/client');
    const client = await Client.connect("MadsGalsgaard/WeAiU");
    const result = await client.predict("/chat", { 		
        message: prompt, 		
        request: 'You are a friendly Chatbot.', 		
        param_3: 512, 		
        param_4: 0.7, 		
        param_5: 0.95
    });
    return result;
};