// server/api/telegram.js
export default defineEventHandler(async (event) => {
    const { chatId, botToken, text } = await readBody(event)
    
    try {
      const response = await $fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        body: {
          chat_id: chatId,
          text: text,
          parse_mode: "HTML"
        }
      })
      
      return response
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Failed to send to Telegram'
      })
    }
  })