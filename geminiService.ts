
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askQuestion(question: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `আপনি বলইবুনিয়া মাধ্যমিক বিদ্যালয়ের একজন স্মার্ট সহকারী। ছাত্র বা অভিভাবক জিজ্ঞাসা করেছেন: "${question}"। উত্তরটি বাংলায় এবং অত্যন্ত বন্ধুত্বপূর্ণভাবে দিন। বিদ্যালয়ের ইতিহাস, সুযোগ-সুবিধা, শিক্ষক বা পড়ালেখা নিয়ে সাহায্য করুন। আপনার উত্তরে বিদ্যালয়ের সঠিক নাম "বলইবুনিয়া মাধ্যমিক বিদ্যালয়" ব্যবহার করুন।`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });
      return response.text || "দুঃখিত, আমি উত্তরটি খুঁজে পাচ্ছি না। আবার চেষ্টা করুন।";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে চেষ্টা করুন।";
    }
  }
}

export const geminiService = new GeminiService();
