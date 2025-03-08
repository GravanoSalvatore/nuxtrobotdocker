import axios from "axios";

export default defineEventHandler(async (event) => {
  try {
    const symbols = [
      "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "BRK-B", "META",
      "LLY", "AVGO", "UNH", "V", "JNJ", "WMT", "XOM", "JPM", "PG", "MA",
      "ORCL", "COST", "HD", "AMD", "MRK", "ABBV", "PEP", "KO", "PFE", "ADBE",
      "NKE", "DIS", "MCD", "TMO", "CRM", "CMCSA", "CVX", "TXN", "IBM", "BA",
      "INTC", "LMT", "ACN", "AMGN", "GS", "LIN", "NOC", "C", "SPGI", "LOW",
      "MDT", "MS"
    ].join(",");

    const response = await axios.get(
      `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
        },
      }
    );

    return response.data.quoteResponse.result;
  } catch (error) {
    console.error("Ошибка запроса к Yahoo Finance:", error);
    return { error: "Ошибка получения данных" };
  }
});
