
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

class GeminiService {
  private apiKey: string | null = null;

  constructor() {
    // Try to load API key from localStorage on initialization
    this.apiKey = localStorage.getItem('geminiApiKey');
  }

  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('geminiApiKey', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  clearApiKey(): void {
    this.apiKey = null;
    localStorage.removeItem('geminiApiKey');
  }

  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  async generateResponse(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("API key not set");
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: userMessage }]
            }]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to get response from Gemini API");
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response generated");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }
}

// Create a singleton instance
const geminiService = new GeminiService();
export default geminiService;
