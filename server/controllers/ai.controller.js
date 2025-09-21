import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askAi = async (req, res) => {
  try {
    const { problem, sufferingSince } = req.body;

    if (!problem || !sufferingSince) {
      return res
        .status(400)
        .json({ error: "Please provide problem and sufferingSince" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a helpful medical assistant.
Patient problem: "${problem}".
Suffering since: "${sufferingSince}".

Provide output in this structured format:
### Expected Causes
- cause 1
- cause 2

### Important Things To Do
- step 1
- step 2

Always add: "⚠️ This is not medical advice. Please consult a doctor."
`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Parse the Gemini response into structured JSON
    const structuredResponse = {
      expectedCauses: [],
      importantThingsToDo: [],
      disclaimer: ""
    };

    let currentSection = null;

    responseText.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("### Expected Causes")) {
        currentSection = "expectedCauses";
      } else if (trimmed.startsWith("### Important Things To Do")) {
        currentSection = "importantThingsToDo";
      } else if (trimmed.startsWith("⚠️")) {
        structuredResponse.disclaimer = trimmed;
      } else if (trimmed.startsWith("-") && currentSection) {
        structuredResponse[currentSection].push(trimmed.replace("-", "").trim());
      }
    });

    res.json({ reply: structuredResponse });
  } catch (error) {
    console.error("Error in askMedical:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while contacting Gemini API" });
  }
};
