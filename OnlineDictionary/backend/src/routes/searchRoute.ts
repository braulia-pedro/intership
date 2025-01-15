import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

async function fetchWord(word: string): Promise<any> {
  const url = `https://pt.wiktionary.org/w/api.php?action=query&format=json&prop=revisions&titles=${word}&rvprop=content`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error(`Erro ao buscar a palavra "${word}":`, error.message);
    throw new Error('Erro ao consultar a API do Wiktionary');
  }
}

router.get('/:word', async (req: Request, res: Response) => {
  const { word } = req.params;

  try {
    const rawData = await fetchWord(word);
    const formattedData  = processarDadosWiktionary(rawData, word);
    res.json(formattedData );
  } catch (erro: any) {
    res.status(500).json({ error: erro.message });
  }
});

function processarDadosWiktionary(rawData: any, word: string) {
  const pages = rawData?.query?.pages;
  const pageId = Object.keys(pages || {})[0];
  const content = pages?.[pageId]?.revisions?.[0]?.['*'];

  if (!content) {
    return { word, message: 'Nenhum resultado encontrado.' };
  }

  const cleanText = (text: string) => text.replace(/\[\[(.*?)\]\]/g, '$1');
  const definitions = content.match(/# (.*?)\n/g)?.map((definitions: string) => cleanText(definitions.replace(/# /, '').trim())) || [];
  const synonyms = content.match(/===Sinônimos===\n([\s\S]*?)\n===/s)?.[1]?.split('\n')
    .filter((synonyms: string) => synonyms.startsWith('*'))
    .map((synonyms: string) => cleanText(synonyms.replace('*', '').trim())) || [];

  const expressions = content.match(/===Expressões===\n([\s\S]*?)\n===/s)?.[1]?.split('\n')
    .filter((expressions: string) => expressions.startsWith('*'))
    .map((expressions: string) => cleanText(expressions.replace('*', '').trim())) || [];

  return {
    word,
    definitions,
    synonyms,
    expressions,
  };
}

export default router;
