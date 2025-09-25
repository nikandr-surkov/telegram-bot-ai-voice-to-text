# 🎙️ AI Voice-to-Text Telegram Bot

Build and deploy a serverless Telegram bot that transcribes voice messages to text using OpenAI's Whisper API in just 3 minutes! This bot runs on Vercel's serverless infrastructure with zero server management.

## 🎥 Video Tutorial

Watch the full video tutorial showing the entire process in 3 minutes: [YouTube Link Coming Soon]

## ✨ Features

- **Voice Transcription** - Converts voice notes to text instantly
- **Multi-Language Support** - Transcribes audio in 50+ languages
- **Forwarded Messages** - Works with forwarded voice messages
- **AI-Powered** - Uses OpenAI's Whisper API for accurate transcriptions
- **Serverless Architecture** - Runs on Vercel, no server required
- **Free Hosting** - Uses Vercel's free tier

## 📋 Prerequisites

- Node.js installed on your machine
- A Telegram account
- A Vercel account (free)
- An OpenAI account (for API key)

## 🛠️ Quick Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/nikandr-surkov/telegram-bot-ai-voice-to-text.git
cd telegram-bot-ai-voice-to-text
```

### Step 2: Create Your Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Choose a name for your bot (e.g., "Voice Transcriber Bot")
4. Choose a username for your bot (must end with 'bot', e.g., `voice_transcriber_bot`)
5. Copy the bot token that BotFather gives you

### Step 3: Get OpenAI API Key

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Name it "Telegram Bot"
4. Copy the API key (starts with `sk-...`)

### Step 4: Deploy to Vercel

1. Install Vercel CLI (if not installed):
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your bot:
```bash
vercel --prod
```

Follow the prompts:
- Setup and deploy: `Y`
- Which scope: Select your account
- Link to existing project: `N` 
- Project name: Press Enter (or choose a name)
- Directory: Press Enter (current directory)

Copy your deployment URL (e.g., `https://your-project.vercel.app`)

### Step 5: Add Environment Variables

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add two variables:
   
   **Variable 1:**
   - **Name:** `BOT_TOKEN`
   - **Value:** Your bot token from BotFather
   - Click **Save**
   
   **Variable 2:**
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key
   - Click **Save**

### Step 6: Redeploy

After adding the environment variables, redeploy:
```bash
vercel --prod
```

### Step 7: Set Up Webhook

Tell Telegram where to send updates. Replace `YOUR_BOT_TOKEN` and `YOUR_VERCEL_URL`:

```bash
curl "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=YOUR_VERCEL_URL/api/bot"
```

You should see:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

## 🎉 Test Your Bot

1. Open Telegram
2. Search for your bot by its username
3. Click **Start**
4. Send a voice message
5. Get instant transcription! ✨

## 📁 Project Structure

```
telegram-bot-ai-voice-to-text/
├── api/
│   └── bot.js          # Main bot handler with Whisper integration
├── .env.example        # Example environment variables
├── package.json        # Node.js project file
├── vercel.json         # Vercel configuration
└── README.md          # This file
```

## 🔧 How It Works

1. **Voice Message**: User sends a voice note to the bot
2. **File Processing**: Bot downloads the audio file from Telegram
3. **Whisper API**: Audio is sent to OpenAI's Whisper for transcription
4. **Response**: Bot sends back the transcribed text
5. **Serverless**: Function runs on-demand, no server maintenance needed

## 💰 Cost

- **Vercel**: FREE (hobby tier)
- **Telegram Bot**: FREE
- **OpenAI Whisper**: $0.006 per minute of audio
- **Estimated monthly cost**: $1-5 for personal use

## 🚀 Use Cases

- **Meeting Notes**: Record and transcribe meetings
- **Language Learning**: Transcribe foreign language audio
- **Accessibility**: Help hearing-impaired users
- **Note Taking**: Quick voice-to-text for ideas
- **Podcast Clips**: Transcribe interesting segments

## 🛡️ Security

- API keys are stored securely as environment variables
- No audio files are permanently stored
- All processing happens in memory
- Secure webhook communication with Telegram

## 📝 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
BOT_TOKEN=your-telegram-bot-token
OPENAI_API_KEY=your-openai-api-key
```

**Note**: Never commit your `.env` file to version control!

## Author
### Nikandr Surkov
- 🌐 Website: https://nikandr.com
- 📺 YouTube: https://www.youtube.com/@NikandrSurkov
- 📢 Telegram Channel: https://t.me/NikandrApps
- 📱 Telegram: https://t.me/nikandr_s
- 💻 GitHub: https://github.com/nikandr-surkov
- 🐦 Twitter: https://x.com/NikandrSurkov
- 💼 LinkedIn: https://www.linkedin.com/in/nikandr-surkov/
- ✍️ Medium: https://medium.com/@NikandrSurkov

---

Built with ❤️ for the Telegram developer community
