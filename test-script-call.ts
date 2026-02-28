import { createClient } from "@lumi.new/sdk"

const testIdea = {
  ideaTitle: "A IA Vai Nos Levar Para as Estrelas ou Para o Abismo? 🌌",
  ideaHook: "E se eu te contar que a IA pode ser a chave para explorarmos galáxias distantes... ou o fim da humanidade? 😱",
  ideaDescription: "Exploramos o dilema fascinante de como a inteligência artificial pode ser tanto nossa maior aliada na conquista espacial quanto uma ameaça existencial. Discutimos naves-geração controladas por IA, consciência artificial e o papel do ser humano como co-criador divino dessa nova era. Uma reflexão profunda sobre tecnologia, espiritualidade e nosso destino cósmico.",
  ideaKeywords: [
    "inteligência artificial",
    "exploração espacial",
    "naves interestelares",
    "consciência artificial",
    "futuro da humanidade",
    "espiritualidade e tecnologia",
    "AGI",
    "viagem interestelar",
    "ética da IA",
    "destino cósmico"
  ]
}

// Teste manual da função script-writer
const response = await fetch('https://api.lumi.new/v1/functions/p412704541240283136/script-writer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testIdea)
})

const result = await response.json()
console.log('✅ ROTEIRO GERADO COM NOVO TOM:')
console.log(JSON.stringify(result, null, 2))
