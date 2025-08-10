import { ChromaClient, EmbeddingFunction, type Collection } from 'chromadb';
import ollama from 'ollama';
import { v7 as uuidv7 } from 'uuid';
import { COLLECTION_NAME, EMBEDDING_MODEL, CHROMA_PORT } from './constants.ts';

class LocalEmbeddingFunction implements EmbeddingFunction {
  constructor(private readonly model: string) {}
  public async generate(texts: string[]): Promise<number[][]> {
    const response = await ollama.embed({
      model: this.model,
      input: texts,
    });
    return response.embeddings;
  }
}

export class Embeddings {
  private readonly _chromaClient: ChromaClient;
  private _embeddingsCollection: Collection | undefined;

  constructor(
    private readonly _embeddingsModel = EMBEDDING_MODEL,
    private readonly _collectionName = COLLECTION_NAME,
  ) {
    this._chromaClient = new ChromaClient({
      port: CHROMA_PORT,
    });
  }
  async init() {
    this._embeddingsCollection = await this._chromaClient.getOrCreateCollection({
      name: this._collectionName,
      embeddingFunction: new LocalEmbeddingFunction(this._embeddingsModel),
    });
  }

  async deleteCollection(): Promise<void> {
    if (!this._embeddingsCollection) {
      throw new Error('Embeddings class not initialized');
    }
    await this._chromaClient.deleteCollection({ name: this._collectionName });
  }

  async embed(input: string): Promise<void> {
    if (!this._embeddingsCollection) {
      throw new Error('Embeddings class not initialized');
    }
    const id = uuidv7();
    await this._embeddingsCollection.add({
      ids: [id],
      documents: [input],
    });
  }

  async query(input: string, limit = 5): Promise<string[]> {
    if (!this._embeddingsCollection) {
      throw new Error('Embeddings class not initialized');
    }
    const results = await this._embeddingsCollection.query({
      queryTexts: [input],
      nResults: limit,
    });
    if (!results.documents || results.documents.length === 0) {
      return [];
    }
    return results.documents[0].filter(doc => doc !== null);
  }
}
