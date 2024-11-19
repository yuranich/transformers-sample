const { TextEncoder, TextDecoder } = require('text-encoding')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.process = require('bare-process')
const fetch = require('bare-fetch')
global.fetch = fetch
global.Headers = fetch.Headers
global.Response = fetch.Response

const { pipeline } = require('@xenova/transformers')
console.log('imports are done...')

process.on('exit', (code) => {
  console.log(`Process exited with code: ${code}`);
});

async function main () {
  console.log('main started...')

  const facts = [
    'Albert Einstein was a theoretical physicist.',
    'The capital of France is Paris.',
    'The Great Wall of China is one of the Seven Wonders of the World.',
    'Python is a popular programming language.',
    'Mount Everest is the highest mountain in the world.',
    'Leonardo da Vinci painted the Mona Lisa.',
    'Shakespeare wrote Hamlet.',
    'The human body has 206 bones.',
    'The speed of light is approximately 299,792 kilometers per second.',
    'Water boils at 100 degrees Celsius.',
    'The Earth orbits the Sun.',
    'The Pyramids of Giza are located in Egypt.',
    'Coffee is one of the most popular beverages in the world.',
    'Tokyo is the capital city of Japan.',
    'Photosynthesis is the process by which plants make their food.',
    'The Pacific Ocean is the largest ocean on Earth.',
    'Mozart was a prolific composer of classical music.',
    'The Internet is a global network of computers.',
    'Basketball is a sport played with a ball and a hoop.',
    'The first computer virus was created in 1983.',
    'Artificial neural networks are inspired by the human brain.',
    'Deep learning is a subset of machine learning.',
    "IBM's Watson won Jeopardy! in 2011.",
    'The first computer programmer was Ada Lovelace.',
    'The first chatbot was ELIZA, created in the 1960s.'
  ].map(text => ({ text }))

  const embeddingPipeline = await pipeline(
    'feature-extraction',
    'Xenova/all-MiniLM-L6-v2'
  )
  console.log('extractor pipeline created')

  const generateEmbedding = async (text) => {
    const result = await embeddingPipeline(text, {
      pooling: 'mean',
      normalize: true
    })
    return Array.from(result.data)
  }

  const data = []
  for (const doc of docs) {
    const vector = await generateEmbedding(doc.content)
    data.push({ id: doc.id, content: doc.content, vector })
  }
  console.log('data size: ', data.length)
}

main().catch(console.error)
