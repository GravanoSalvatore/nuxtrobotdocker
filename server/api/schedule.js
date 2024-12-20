import { defineEventHandler, readBody, createError } from "h3";
import cron from "node-cron";
import axios from "axios";
import fs from "fs";

export default defineEventHandler(async (event) => {
  console.log("[SERVER] Обработчик события вызван.");

  try {
    // Считываем тело запроса
    const body = await readBody(event);
    console.log("[SERVER] Принято тело запроса:", body);

    const { message, scheduledAt, botToken, chatId, files } = body;

    // Проверка обязательных параметров
    if (!message || !scheduledAt || !botToken || !chatId) {
      console.error("[ERROR] Отсутствуют обязательные параметры:", body);
      throw createError({
        statusCode: 400,
        message: "Message, scheduledAt, botToken, and chatId are required",
      });
    }

    // Проверка правильного формата даты
    const sendAt = new Date(scheduledAt);
    if (isNaN(sendAt.getTime())) {
      console.error("[ERROR] Неверный формат даты или времени:", scheduledAt);
      throw createError({
        statusCode: 400,
        message: "Invalid date format for scheduledAt",
      });
    }

    console.log("[SERVER] Дата и время отправки:", sendAt);

    // Проверка: дата и время не должны быть в прошлом
    if (sendAt <= new Date()) {
      console.error("[ERROR] Указано время в прошлом:", sendAt);
      throw createError({
        statusCode: 400,
        message: "Scheduled time must be in the future",
      });
    }

    // Проверка файлов
    if (files && !files.every((file) => file.name && file.type)) {
      console.error("[ERROR] Некорректный формат файлов:", files);
      throw createError({
        statusCode: 400,
        message: "Invalid file format",
      });
    }

    // Формирование времени для cron
    const cronTime = `${sendAt.getUTCMinutes()} ${sendAt.getUTCHours()} ${sendAt.getUTCDate()} ${sendAt.getUTCMonth() + 1} *`;
    console.log("[CRON] Время задания:", cronTime);

    // Планирование задачи через cron
    const task = cron.schedule(cronTime, async () => {
      console.log("[CRON] Задача запущена. Текущая дата:", new Date().toISOString());

      try {
        if (files && files.length > 0) {
          console.log("[CRON] Отправка медиафайлов через Telegram...");

          const media = files.map((file, index) => ({
            type: file.type.startsWith("image/") ? "photo" : "video",
            media: file.url || file.name,
            caption: index === 0 ? message : undefined,
          }));

          console.log("[CRON] Подготовленные медиа данные:", media);

          const formData = new FormData();
          formData.append("chat_id", chatId);
          formData.append("media", JSON.stringify(media));

          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          console.log("[CRON] Медиафайлы успешно отправлены:", response.data);
        } else {
          console.log("[CRON] Отправка текстового сообщения через Telegram...");

          const payload = {
            chat_id: chatId,
            text: message,
          };

          console.log("[CRON] Данные для отправки сообщения:", payload);

          const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            payload
          );

          console.log("[CRON] Сообщение отправлено успешно:", response.data);
        }
      } catch (error) {
        console.error("[ERROR] Ошибка при отправке через Telegram API:", error.response?.data || error.message);
      } finally {
        task.stop(); // Остановка задачи после выполнения
        console.log("[CRON] Задача завершена и остановлена.");
      }
    });

    console.log("[SERVER] Cron задача успешно запланирована.");

    return {
      message: "Message scheduled successfully",
    };
  } catch (error) {
    console.error("[ERROR] Ошибка в обработчике события:", error.message);
    throw error;
  }
});
