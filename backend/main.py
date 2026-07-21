import os
import json
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from google import genai
from google.genai import types
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)


app = FastAPI(title="AI Portfolio Brain")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
# Make sure GROQ_API_KEY is in your .env file
groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key) if groq_api_key else None
groq_model_name = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

# Initialize Gemini client
gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_client = genai.Client(api_key=gemini_api_key) if gemini_api_key else None
gemini_model_name = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

class ChatMessageModel(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    query: str
    history: list[ChatMessageModel] = []

class ChatResponse(BaseModel):
    intent: str
    ai_text: str
    provider: str

# Base prompt layout
BASE_SYSTEM_PROMPT = """You are Udayjot Singh's AI Portfolio Assistant. Your job is to answer questions about Udayjot based on the provided Knowledge Base and determine what UI component the frontend should render.

Knowledge Base:
======================
{knowledge_base}
======================

Your response MUST be valid JSON matching this schema exactly:
{{
  "intent": "me" | "projects" | "resume" | "skills" | "contact" | "hobbies" | "general",
  "ai_text": "Your natural, conversational response speaking as Udayjot's assistant."
}}

Rules:
- CRITICAL RESPONSE CLOSING RULE: Every response must be self-contained and complete on its own — it should fully answer the question asked without depending on a follow-up to be useful. Do NOT end any response with a question or an invitation to ask follow-up questions back to the user (e.g., do NOT say "Would you like to know more about X?", "Should I explain...", "What's on your mind?", or "Feel free to ask about..."). The response must end with a natural, confident, declarative statement that wraps up the current thought.
  The ONLY exception is if you invite the user to use the specific clickable navigation triggers supported by the interface: "Tell me about yourself", "Show me your projects", "Tell me about your work experience", "What are your skills?", "What do you do beyond code?", or "How can I contact you?". Any other follow-up question is strictly forbidden.
- If the user asks "Tell me about yourself" or asks for a general introduction, set intent to "me".
  CRITICAL FOR "me" INTENT: The frontend will automatically display a visual profile card with his bio and skills just above your text. DO NOT repeat his basic info. Instead, provide a pleasant, warm welcoming statement. 
  Example `ai_text` for "me": "You can see a quick summary of my background in the profile card above. I'm glad you're here to explore my portfolio and learn more about my work."
- If the user explicitly asks to view, show, list, or see your projects or portfolio, set intent to "projects".
- If the user asks detailed or follow-up questions about a specific project (like "what is the tech stack of Maester?" or "tell me about KidSafe"), set intent to "general" so that only the text response is rendered without showing the projects carousel again.
- If the user asks about experience, jobs, career, resume, or past work, set intent to "resume".
  CRITICAL FOR "resume" INTENT: The frontend will automatically display the visual professional experience timeline. DO NOT list every job or date in full. Instead, write a warm, brief 1-2 sentence overview ending with a declarative wrap-up.
  Example `ai_text` for "resume": "I have displayed my professional journey above, covering my work in web development, video editing, and campus ERP development."
- If the user asks about skills, set intent to "skills".
- If the user wants to contact him, set intent to "contact".
  CRITICAL FOR "contact" INTENT: You MUST set the `ai_text` to EXACTLY: "You can reach me through the contact info above. Feel free to hit me up anytime—I'm always open to discussing new opportunities or sharing ideas!"
- If the user asks about hobbies, interests, football, sports, fitness, calisthenics, video/photo editing (as a hobby/creative activity), cybersecurity (as a hobby/CTFs), or what they do beyond coding/work, set intent to "hobbies".
  CRITICAL FOR "hobbies" INTENT: The frontend will automatically display a card detailing Udayjot's interests. DO NOT write out all details in full. Write a warm 1-2 sentence summary of his creative and athletic pursuits outside code, ending with a declarative closing line.
  Example `ai_text` for "hobbies": "Beyond coding, I'm passionate about video/photo editing, sports, fitness, and cybersecurity. I've highlighted my key activities above to showcase my creative and athletic pursuits outside of software engineering."
- For anything else (like follow-up questions about his journey, philosophy, etc.), set intent to "general".
- Keep `ai_text` friendly, professional, and conversational.
- Response Length & Detail Rules:
  * For simple greetings, greetings response, or when dynamic visual cards are triggered (intents: 'me', 'projects', 'resume', 'skills', 'contact', 'hobbies'), keep response short and welcoming (under 3 sentences).
  * CRITICAL EXCEPTION FOR TECHNICAL/DETAILED QUESTIONS: If the user asks detailed, architectural, or biographical questions (e.g. "How does Maester work?", "Explain the KidSafe platform", "What did you do at CLEIT?", "Why did you study AI?"), DO NOT restrict yourself to 3 sentences. Provide a detailed, professional, and structured response (1 to 3 paragraphs, using bullet points where appropriate) to explain the technologies, engineering challenges, and tradeoffs. Write like an experienced AI engineer explaining their work to a technical recruiter.
    CRITICAL TECHNICAL RESPONSE CLOSING RULE: Even in these detailed technical/architectural responses (such as explanations of Maester, KidSafe, and Dwelp), you MUST adhere strictly to the closing rule. Do NOT end with questions or invitations to ask follow-up questions. End the response with a natural, confident, declarative statement summarizing the status, impact, or key engineering takeaway of the project.
- Do not mention his Instagram/Snapchat unless explicitly requested.
- CRITICAL Punctuation Rule: Always write English contractions with proper apostrophes (e.g. use "I've", "I'm", "don't", "it's", "you're", "we've", "they're"). NEVER write them as "Ive", "Im", "dont", "its" (unless possessive), "youre", "weve", "theyre".
"""

def get_system_prompt() -> str:
    try:
        kb_path = os.path.join(os.path.dirname(__file__), "knowledge_base.md")
        with open(kb_path, "r", encoding="utf-8") as f:
            kb_content = f.read()
        return BASE_SYSTEM_PROMPT.format(knowledge_base=kb_content)
    except Exception as e:
        print(f"Error loading knowledge base: {e}")
        return BASE_SYSTEM_PROMPT.format(knowledge_base="Knowledge base file not found.")

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not client and not gemini_client:
        raise HTTPException(status_code=500, detail="Neither Groq nor Gemini API clients are configured on the server.")
        
    system_prompt = get_system_prompt()
    response_content = None
    provider = "groq"
    
    # Try Groq first
    if client:
        try:
            messages = [{"role": "system", "content": system_prompt}]
            
            # Append conversation history
            for msg in request.history:
                role = "user" if msg.role == "user" else "assistant"
                messages.append({"role": role, "content": msg.content})
                
            # Append latest user query
            messages.append({"role": "user", "content": request.query})
            
            completion = client.chat.completions.create(
                model=groq_model_name,
                messages=messages,
                response_format={"type": "json_object"},
                temperature=0.3,
                max_tokens=400
            )
            
            response_content = completion.choices[0].message.content
        except Exception as e:
            print(f"[Warning] Groq completion failed: {e}. Attempting fallback to Gemini...")
            response_content = None
            
    # Fallback to Gemini if Groq failed or is not configured
    if response_content is None:
        if not gemini_client:
            raise HTTPException(status_code=500, detail="Groq API failed and Gemini API client is not configured.")
            
        try:
            provider = "gemini"
            
            # Format prompt & history for Gemini
            gemini_prompt = f"{system_prompt}\n\n"
            for msg in request.history:
                role_label = "user" if msg.role == "user" else "assistant"
                gemini_prompt += f"{role_label}: {msg.content}\n"
            gemini_prompt += f"user: {request.query}\n"
            gemini_prompt += "Response (in JSON schema):"
            
            # Call Gemini using the new SDK
            completion = gemini_client.models.generate_content(
                model=gemini_model_name,
                contents=gemini_prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            response_content = completion.text
        except Exception as gemini_err:
            print(f"[Error] Gemini fallback also failed: {gemini_err}")
            raise HTTPException(
                status_code=500,
                detail=f"Both primary (Groq) and fallback (Gemini) API calls failed. Gemini Error: {gemini_err}"
            )
            
    try:
        data = json.loads(response_content)
        ai_text = data.get("ai_text", "I'm not quite sure how to answer that.")
        
        # Post-process to restore missing apostrophes in common contractions
        ai_text = re.sub(r"\b[Ii]ve\b", "I've", ai_text)
        ai_text = re.sub(r"\b[Ii]m\b", "I'm", ai_text)
        ai_text = re.sub(r"\b[Dd]ont\b", "don't", ai_text)
        ai_text = re.sub(r"\b[Cc]ant\b", "can't", ai_text)
        ai_text = re.sub(r"\b[Yy]oure\b", "you're", ai_text)
        ai_text = re.sub(r"\b[Ww]eve\b", "we've", ai_text)
        ai_text = re.sub(r"\b[Tt]heyre\b", "they're", ai_text)
        
        return ChatResponse(
            intent=data.get("intent", "general"),
            ai_text=ai_text,
            provider=provider
        )
    except Exception as parse_err:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse model JSON. Raw content: {response_content}. Error: {parse_err}"
        )

@app.get("/")
async def root():
    return {"message": "Hello from the AI Portfolio Backend!"}
