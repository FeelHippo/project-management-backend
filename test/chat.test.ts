import request = require("supertest");
import app from "../src/app";
import * as openAiService from "../src/repository/openai.service";

jest.mock("../src/repository/openai.service");

describe("Chat Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /api/chat should return a chat response", async () => {
    const mockResponse = "Yes indeed, sir.";
    const mockPayload = { userMessage: "Do you speak English?", cefr: "en" };
    (openAiService.getAIResponse as jest.Mock).mockResolvedValue(mockResponse);

    const response = await request(app).post("/api/chat").send(mockPayload);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ response: mockResponse });
  });

  it("POST /api/chat should return a bad request error when the body is malformed", async () => {
    const mockPayload = {};

    const response = await request(app).post("/api/chat").send(mockPayload);
    expect(response.status).toBe(400);
  });
});
