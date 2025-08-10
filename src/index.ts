// import ollama from 'ollama';
import { Embeddings } from './embeddings.ts';

async function run() {
  const embeddings = new Embeddings();
  await embeddings.init();

  console.log('This Ran');

  // await embeddings.embed('This is interesting.');
  // await embeddings.embed('I am 9 years old.');

  // await embeddings.query('How old are you?', 1);
  // await embeddings.deleteCollection();
  // const response = await ollama.chat({
  //   model: 'gemma3:4b-it-qat',
  //   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
  //   stream: true,
  // });
  // for await (const part of response) {
  //   process.stdout.write(part.message.content);
  // }
}

run();
