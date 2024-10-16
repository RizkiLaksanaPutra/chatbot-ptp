import { NextRequest, NextResponse } from "next/server";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import * as ChatbotPeraturan from "@/lib/chatbot-peraturan";
import * as ChatbotPengetahuan from "@/lib/chatbot-pengetahuan";

export async function POST(request) {
  try {
    const data = await request.json();

    const prompt = data?.prompt;
    const modelType = data?.modelType;
    if (!prompt || !modelType) {
      return NextResponse.json(
        {
          code: StatusCodes.BAD_REQUEST,
          status: ReasonPhrases.BAD_REQUEST,
          errors: {
            message: "Prompt or modelType cannot be empty!",
          },
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    let result;
    if (modelType === "peraturan") {
      result = await ChatbotPeraturan.ask(prompt);
    } else if (modelType === "pengetahuan") {
      result = await ChatbotPengetahuan.ask(prompt);
    }

    return NextResponse.json(
      {
        code: StatusCodes.OK,
        status: ReasonPhrases.OK,
        data: {
          ...result,
        },
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        code: StatusCodes.BAD_REQUEST,
        status: ReasonPhrases.BAD_REQUEST,
        errors: {
          message: "Bad request!",
          reason: error.message,
        },
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
}
