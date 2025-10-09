export const getAvailableModels = async (req, res) => {
  try {
    const modelResults = [];

    for (const modelName of AVAILABLE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const testResult = await model.generateContent("Say 'OK'");
        const response = await testResult.response;
        modelResults.push({
          model: modelName,
          status: "available",
          response: response.text(),
        });
      } catch (error) {
        modelResults.push({
          model: modelName,
          status: "unavailable",
          error: error.message,
        });
      }
    }

    res.json({
      success: true,
      models: modelResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error testing models",
    });
  }
};
