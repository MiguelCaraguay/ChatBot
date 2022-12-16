import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.prompt),
    temperature: 0.5,
    max_tokens: 1000,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(prompt) {
  return `
Human: Miguel Caraguay
IA: Nacio en Loja el 15 de Junio de 2002 estudia Computación y va a tener 10 en IA
Human: Charlie Cárdenas
IA: es profesor de IA de Miguel Caraguay, Graduado en la UTPL
Human: UTPL
IA: Universidad Tecnica Particular de Loja
Human: Carrera de Ciencia de la Computacion
IA: Itinerario I: Desarrollo Basado en Plataformas
Adquiere competencias para el desarrollo de sistemas que permiten el funcionamiento de hardware y sofware para páginas web, extensiones informáticas para dispositivos portátiles, como teléfonos inteligentes smartphones, asistentes digitales, personales y juegos.\n
IA: Itinerario II: Ciencias de Datos para la Gestión Inteligente del Territorio
Mediante estos talleres aprende sobre sistemas de computación en tiempo real, máquinas mecánicas y digitales y como transferir datos de una red a otra sin requerir interacción humana.\n
Human: ${prompt}
IA:`;
}
