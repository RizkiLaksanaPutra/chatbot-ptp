import fs from "fs/promises";
import path from "path";

// Model
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Document Loader
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// Text Splitter
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Store
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

// Generation
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { StringOutputParser } from "@langchain/core/output_parsers";

let isInitialized = false;
let retriever;
let chain;

const loadPdfDocuments = async () => {
  try {
    const pdfDirectoryPath = path.join(
      process.cwd(),
      "public/assets/documents/pdf/Pengetahuan"
    );

    const directoryLoader = new DirectoryLoader(pdfDirectoryPath, {
      ".pdf": (filePath) => new PDFLoader(filePath),
    });

    const directoryDocs = await directoryLoader.load();

    return directoryDocs;
  } catch (error) {
    throw new Error("Error while loading PDF files!", { cause: error });
  }
};

const splitDocuments = async (documents) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 20,
    });

    return await splitter.splitDocuments(documents);
  } catch (error) {
    throw new Error("Error while splitting documents!", { cause: error });
  }
};

const createVectorStore = async (documents) => {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "text-embedding-004",
      taskType: TaskType.SEMANTIC_SIMILARITY,
    });

    return await MemoryVectorStore.fromDocuments(documents, embeddings);
  } catch (error) {
    throw new Error("Error while creating vector store!", { cause: error });
  }
};

const createRetriever = (vectorStore) => {
  try {
    return vectorStore.asRetriever({
      k: 4,
      searchType: "similarity",
    });
  } catch (error) {
    throw new Error("Error while creating retriever!", { cause: error });
  }
};

const createChain = async (model, retriever) => {
  const promptTemplate = `
  Gunakan informasi berikut ini untuk menjawab pertanyaan di akhir.
  Gunakan maksimal tiga kalimat dan buat jawabannya sepadat mungkin.
  Selalu akhiri dengan ucapan terima karena telah bertanya.
  Jika Anda tidak tahu jawabannya atau jawabannya tidak ada di dalam konteks, selalu jawab dengan dengan kata "no_answer" dan jangan ucapkan terima kasih.

  Konteks: {context}
  Pertanyaan: {input}
  Jawaban:
  `;

  try {
    const prompt = PromptTemplate.fromTemplate(promptTemplate);
    const chain = await createStuffDocumentsChain({
      llm: model,
      prompt,
      outputParser: new StringOutputParser(),
    });

    return await createRetrievalChain({
      combineDocsChain: chain,
      retriever,
    });
  } catch (error) {
    throw new Error("Error while creating retrieval chain!", { cause: error });
  }
};

const ask = async (prompt) => {
  if (!isInitialized) {
    await initialize();
  }

  const result = await chain.invoke({
    input: prompt,
  });
  // { answer, chat_history, context, input }

  // Get context source document file name
  const sourceDocuments = result.context.map((ctx) => {
    const filePath = ctx.metadata?.source ?? "";
    // Detect path style (Linux or Windows)
    const pathSeparator = filePath.includes("/") ? "/" : "\\";
    return filePath.split(pathSeparator).pop();
  });

  return {
    ...result,
    sourceDocuments,
  };
};

const initialize = async () => {
  try {
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-1.5-flash",
      temperature: 0.5,
      maxRetries: 2,
    });

    const loadedDocuments = await loadPdfDocuments();
    const splitDocs = await splitDocuments(loadedDocuments);
    const vectorStore = await createVectorStore(splitDocs);

    retriever = createRetriever(vectorStore);
    chain = await createChain(model, retriever);

    if (retriever && chain) {
      isInitialized = true;
      console.info("Chatbot initialized!");
    }
  } catch (error) {
    console.error("Something went wrong while initializing Chatbot", error);
    isInitialized = false;
  }
};

export { ask, isInitialized };
