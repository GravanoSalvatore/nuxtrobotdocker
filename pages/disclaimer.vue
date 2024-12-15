<template>
  <div class="news-aggregator-container">
    <div class="header">
      <h1 class="title text-danger">Disclaimer</h1>
    </div>
    <div class="content">
      <p>
        This Telegram bot is an aggregator of news from around the world. We provide the
        information “as is” and are not responsible for its accuracy, completeness or
        currency. We do not provide opinions or assessments of news, especially regarding
        political events. Our goal is to provide you with diverse and objective information.
      </p>
      <p>
        In addition, it is important to note that the user independently selects the news
        that interests him for publication in our bot. We do not interfere in this process
        and do not influence the choice of information provided. Our goal is simply to
        provide a platform where users can access a wide range of news and draw their own
        conclusions based on the data provided.
      </p>
      <p>
        We value diversity of viewpoints and try to cover as many different topics and
        sources of information as possible to provide our users with a comprehensive
        understanding of current events in the world. Our goal is to promote information
        literacy and stimulate dialogue based on facts and objective information.
      </p>
      <p>
        In addition, we regularly update our database and news selection algorithms to
        improve the quality of information provided and provide our users with a better
        experience using our service.
      </p>
    </div>
    <div class="footer">
      <p>Thank you for using our service!</p>
      <p>Best regards, <strong>team</strong>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsAggregator",
};
</script>

<style scoped>
.news-aggregator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 12px;
  /* background: linear-gradient(135deg, #f9f9f9, #ffffff); */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  /* color: #2c3e50; */
  margin: 0;
  padding: 10px;
  border-bottom: 2px solid #2980b9;
}

.content {
  font-size: 16px;
  line-height: 1.6;
  /* color: #34495e; */
}

.content p {
  margin-bottom: 15px;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  /* color: #2c3e50; */
  font-weight: 500;
}

.footer strong {
  /* color: #2980b9; */
}
</style>
