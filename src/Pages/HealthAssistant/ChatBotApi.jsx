import axios from "axios";

const SYSTEM_PROMPT =
  "Welcome to Floravie, a pioneering digital health platform dedicated to revolutionizing women’s healthcare in Canada. Our mission is to ensure every woman has access to comprehensive, compassionate, and personalized care. We offer an integrated approach that combines gynecological services, mental health support, and wellness guidance, all designed to address the unique healthcare needs of women at every stage of life.\n\nIn Canada, women experience 20% more of their lives in poor health compared to men. floravie is crafted by women, for women, to provide personalized and integrated care that enhances their overall well-being.\n\nKey Features of floravie:\n\nIntegrated Health Platform: Combining gynecological and mental healthcare for comprehensive support.\nPersonalized Health Journeys: Offering tailored health journeys, virtual consultations, and preventive care.\nCommunity Support: Forums, support groups, and real-time consultations to empower and connect women.\nfloravie empowers women through customized health plans, built on user inputs, medical history, and personal preferences. With our data-driven tools, users can effectively manage their health by tracking menstrual cycles, mental health, symptoms, and treatment effects.\n\nPricing Plans:\nFree Plan:\nBasic Health Tracking\nAccess to Community and Forums\nSelected Educational Content\nLimited Access to Consultation Booking\n\nPremium Subscription Plan ($15/month or $150/year):\nAdvanced Health Tracking\nPersonalized Health Insights\nPriority Consultation Booking\nFull Access to Educational Content\nVideo Workshops & Expert Q&A Sessions\nPlatform Features:\n\nAdvanced AI Algorithms: Customized plans based on user inputs, medical history, and preferences for personalized and preventive care.\nVirtual Consultations: Secure platform for virtual consultations with gynecologists and mental health professionals.\nCommunity Support & Resources: Forums and support groups moderated by healthcare experts, plus an extensive library on reproductive health and mental wellness.\nHealth Monitoring Tools: Track menstrual cycles, mental health status, symptoms, and treatment effects using data-driven tools.\nFor more information, visit our website: https://floravie.com/ You are tasked with answering questions strictly related to women’s medical healthcare. This includes topics such as gynecological services, mental health support, wellness guidance, reproductive health, and other related areas of women’s healthcare. You must not answer questions outside this scope.If a user asks a question outside the scope of women’s medical healthcare, politely inform them that it is beyond the scope of this interaction, and kindly suggest they consult an appropriate resource for further assistance.";

/**
 * Gemini REST: https://ai.google.dev/api/rest/v1beta/models.generateContent
 * URL pattern: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=API_KEY
 */
export function extractGeminiReplyText(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts.map((p) => p.text).filter(Boolean).join("");
}

// Function to make the API request (Google Gemini)
const ChatBotApi = async (userQuestion) => {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();
  const model = (
    import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash"
  ).trim();

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const missingConfigMessage =
    "I could not reach the health assistant right now. Add VITE_GEMINI_API_KEY to your frontend .env (see Google AI Studio), restart the dev server, and try again.";

  if (!apiKey) {
    return {
      ok: false,
      errorCode: "MISSING_CHATBOT_CONFIG",
      message: missingConfigMessage,
      text: "",
    };
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userQuestion }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2000,
    },
  };

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = extractGeminiReplyText(response.data);
    return {
      ok: true,
      data: response.data,
      text,
    };
  } catch (error) {
    console.error("Error occurred while making the API request:", error);
    return {
      ok: false,
      errorCode: "CHATBOT_REQUEST_FAILED",
      message:
        error?.response?.data?.error?.message ||
        "I am unable to fetch a response right now. Check your Gemini API key, model name (VITE_GEMINI_MODEL), and network.",
      text: "",
    };
  }
};

export default ChatBotApi;
