import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

export default defineEventHandler(async () => {
  const feedUrl = "https://forklog.com/news";

  try {
    const response = await fetch(feedUrl);
    if (!response.ok) throw new Error(`Ошибка загрузки RSS: ${response.status}`);
    
    let xmlText = await response.text();

    // 🛠 Исправляем некорректные символы в XML
    xmlText = xmlText.replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;");

    const parsedData = await parseStringPromise(xmlText, { explicitArray: false });

    // ✅ Проверяем структуру RSS
    const items = parsedData?.rss?.channel?.item || [];

    // ✅ Преобразуем новости в JSON-формат
    const articles = items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description.replace(/<\/?[^>]+(>|$)/g, ""), // Убираем HTML-теги
    }));

    return { status: "success", articles };
  } catch (error) {
    console.error("❌ Ошибка получения новостей:", error);
    return { status: "error", message: error.message };
  }
});
