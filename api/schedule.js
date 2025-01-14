
// import { defineEventHandler, getMethod, createError, readBody } from "h3";
// import schedule from "node-schedule";
// import axios from "axios";
// import FormData from "form-data";

// console.log("[SERVER] Файл schedule.js загружен.");

// export default defineEventHandler(async (event) => {
//   console.log("[SERVER] Обработчик события вызван.");

//   const method = getMethod(event);
//   if (method !== "POST") {
//     throw createError({
//       statusCode: 405,
//       message: "HTTP method is not allowed. Use POST.",
//     });
//   }

//   try {
//     const body = await readBody(event);
//     console.log("[SERVER] Принято тело запроса:", JSON.stringify(body, null, 2));

//     const { message, scheduledAt, botToken, chatId, files } = body;

//     if (!scheduledAt || !botToken || !chatId) {
//       throw createError({
//         statusCode: 400,
//         message: "scheduledAt, botToken, and chatId are required",
//       });
//     }

//     const scheduledTime = new Date(scheduledAt);
//     if (isNaN(scheduledTime.getTime())) {
//       throw createError({
//         statusCode: 400,
//         message: "Invalid scheduledAt format",
//       });
//     }

//     if (scheduledTime <= new Date()) {
//       throw createError({
//         statusCode: 400,
//         message: "Scheduled time must be in the future",
//       });
//     }

//     console.log("[SERVER] Сообщение запланировано на:", scheduledTime);

//     schedule.scheduleJob(scheduledTime, async () => {
//       console.log("[SCHEDULE] Выполнение задачи по расписанию:", new Date().toISOString());
//       try {
//         if (files && files.length > 0) {
//           console.log("[SCHEDULE] Отправка медиафайлов...");
//           const formData = new FormData();

//           files.forEach((file) => {
//             const buffer = Buffer.from(file.data, "base64"); // Декодируем файл
//             formData.append("photo", buffer, file.name); // Добавляем файл в запрос
//           });

//           formData.append("chat_id", chatId);
//           if (message) {
//             formData.append("caption", message);
//           }

//           const response = await axios.post(
//             `https://api.telegram.org/bot${botToken}/sendPhoto`,
//             formData,
//             { headers: formData.getHeaders() }
//           );

//           console.log("[SCHEDULE] Медиа успешно отправлено:", response.data);
//         } else if (message) {
//           console.log("[SCHEDULE] Отправка текстового сообщения...");
//           const payload = { chat_id: chatId, text: message };
//           const response = await axios.post(
//             `https://api.telegram.org/bot${botToken}/sendMessage`,
//             payload
//           );
//           console.log("[SCHEDULE] Сообщение успешно отправлено:", response.data);
//         } else {
//           console.warn("[SCHEDULE] Нет данных для отправки.");
//         }
//       } catch (error) {
//         console.error("[SCHEDULE ERROR] Ошибка выполнения задачи:", error.response?.data || error.message);
//       }
//     });

//     return {
//       message: "Message scheduled successfully with direct media support",
//     };
//   } catch (error) {
//     console.error("[ERROR] Общая ошибка обработчика события:", error.message);
//     throw error;
//   }
// });
import { defineEventHandler, getMethod, createError, readBody } from "h3";
import schedule from "node-schedule";
import axios from "axios";
import FormData from "form-data";

console.log("[SERVER] Файл schedule.js загружен.");

export default defineEventHandler(async (event) => {
  console.log("[SERVER] Обработчик события вызван.");

  const method = getMethod(event);
  if (method !== "POST") {
    throw createError({
      statusCode: 405,
      message: "HTTP method is not allowed. Use POST.",
    });
  }

  try {
    const body = await readBody(event);
    console.log("[SERVER] Принято тело запроса:", JSON.stringify(body, null, 2));

    const { message, scheduledAt, botToken, chatId, files } = body;

    if (!scheduledAt || !botToken || !chatId) {
      throw createError({
        statusCode: 400,
        message: "scheduledAt, botToken, and chatId are required",
      });
    }

    const scheduledTime = new Date(scheduledAt);
    if (isNaN(scheduledTime.getTime())) {
      throw createError({
        statusCode: 400,
        message: "Invalid scheduledAt format",
      });
    }

    if (scheduledTime <= new Date()) {
      throw createError({
        statusCode: 400,
        message: "Scheduled time must be in the future",
      });
    }

    console.log("[SERVER] Сообщение запланировано на:", scheduledTime);

    schedule.scheduleJob(scheduledTime, async () => {
      console.log("[SCHEDULE] Выполнение задачи по расписанию:", new Date().toISOString());
      try {
        if (files && files.length > 0) {
          console.log("[SCHEDULE] Отправка медиафайлов...");
          const formData = new FormData();

          const mediaGroup = files.map((file, index) => {
            const buffer = Buffer.from(file.data, "base64"); // Декодируем файл
            const type = file.type.startsWith("image/") ? "photo" : "video";

            formData.append(`file${index}`, buffer, file.name);
            return {
              type,
              media: `attach://file${index}`,
              caption: index === 0 ? message || "" : undefined, // Подпись только для первого файла
            };
          });

          formData.append("chat_id", chatId);
          formData.append("media", JSON.stringify(mediaGroup));

          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
            formData,
            { headers: formData.getHeaders() }
          );

          console.log("[SCHEDULE] Медиа успешно отправлено:", response.data);
        } else if (message) {
          console.log("[SCHEDULE] Отправка текстового сообщения...");
          const payload = { chat_id: chatId, text: message };
          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            payload
          );
          console.log("[SCHEDULE] Сообщение успешно отправлено:", response.data);
        } else {
          console.warn("[SCHEDULE] Нет данных для отправки.");
        }
      } catch (error) {
        console.error("[SCHEDULE ERROR] Ошибка выполнения задачи:", error.response?.data || error.message);
      }
    });

    return {
      message: "Message scheduled successfully with media group support",
    };
  } catch (error) {
    console.error("[ERROR] Общая ошибка обработчика события:", error.message);
    throw error;
  }
});
