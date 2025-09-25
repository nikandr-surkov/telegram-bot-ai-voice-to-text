export default async function handler(req, res) {
    const { message } = req.body;

    if (!message) {
        return res.status(200).json({ ok: true });
    }

    const chatId = message.chat.id;

    // Handle /start command
    if (message.text === '/start') {
        const welcomeText = `🎙️ *Voice Note Transcriber*

Send me any voice message or audio file and I'll convert it to text!

✅ *What I can do:*
- Transcribe voice notes
- Transcribe forwarded audio
- Support multiple languages
- Handle audio files up to 25MB

Just forward or send me any voice message! 🎯`;

        await sendMessage(chatId, welcomeText);
        return res.status(200).json({ ok: true });
    }

    // Handle voice messages and audio files
    const audioFile = message.voice || message.audio || message.document?.mime_type?.startsWith('audio/');

    if (audioFile) {
        // Get file_id (works for original and forwarded messages!)
        const fileId = message.voice?.file_id || message.audio?.file_id || message.document?.file_id;

        if (!fileId) {
            await sendMessage(chatId, '⚠️ Could not process this audio file.');
            return res.status(200).json({ ok: true });
        }

        try {
            // Send "transcribing..." message
            await sendMessage(chatId, '⏳ *Transcribing your audio...*');

            // Get file info from Telegram
            const fileResponse = await fetch(
                `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${fileId}`
            );
            const fileData = await fileResponse.json();

            if (!fileData.ok) {
                throw new Error('Could not get file info');
            }

            // Get file URL
            const filePath = fileData.result.file_path;
            const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;

            // Download the file
            const audioResponse = await fetch(fileUrl);
            const audioBuffer = await audioResponse.arrayBuffer();
            const audioBlob = new Blob([audioBuffer], { type: 'audio/ogg' });

            // Create form data for Whisper API
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.ogg');
            formData.append('model', 'whisper-1');

            // Call Whisper API
            const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: formData
            });

            if (!whisperResponse.ok) {
                throw new Error(`Whisper API error: ${whisperResponse.status}`);
            }

            const transcription = await whisperResponse.json();

            // Send transcription back to user
            const responseText = `📝 *Transcription:*\n\n${transcription.text}`;
            await sendMessage(chatId, responseText);

        } catch (error) {
            console.error('Transcription error:', error);
            await sendMessage(chatId, '❌ Sorry, I couldn\'t transcribe this audio. Please try again.');
        }
    } else if (message.text) {
        // Handle regular text messages
        await sendMessage(chatId, '👋 Send me a voice message or audio file and I\'ll transcribe it for you!');
    }

    res.status(200).json({ ok: true });
}

// Helper function to send messages
async function sendMessage(chatId, text) {
    return fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
        })
    });
}