<template>
  <div>
    <h4 class="text-center fw-bold">Creating a Telegram Channel and Registration</h4>

    <ul class="fw-bold container">
      <li class="">Create a Telegram channel.</li>
      <li class="">
        Add
        <span
          style="color:cornflowerblue;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; cursor: pointer;"
          @mouseover="highlightText('@FourVrobot')"
          @click="copyText('@FourVrobot')"
        >
          @FourVrobot
        </span>
        as an administrator of your channel.
      </li>
      <li class="">
        Find your <span style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:14px">chat ID</span>
        of the channel using
        <span style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:14px">
          <a href="https://t.me/get_id_bot" target="_blank">@get_id_bot</a>
        </span>.
      </li>
      <li class="">
        Go to <span style="color:cornflowerblue">Settings</span>, enter your
        <span style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:14px">chat ID</span> and channel name*, then click "Add" to register.
      </li>
    </ul>

    <h4 class="text-center fw-bold">Selecting Categories and Tags for Posting</h4>

    <ul class="container">
      <li class="">Choose a category to work with relevant tags.</li>
      <li class="">Select a tag from popular tags, search for a tag by name, or create your own.</li>
    </ul>

    <h4 class="text-center fw-bold">Scheduled Messages</h4>

    <ul class=" container">
      <li class="">
        In the Editor section, select the channel, time, and date for the scheduled message.
        Then click the "Scheduled Message" button, and the message will appear in your channel at the specified time and date.
      </li>
    </ul>

    <h4 class="text-center fw-bold">Auto Posting</h4>

    <ul class=" container">
      <li class="">
        The Auto Posting service fully automates the administration of your Telegram channel or chat.
        The service automatically posts news, articles, or any other content based on your selected tag.
      </li>
    </ul>

    <p class="container fw-bold fs-6">* Not mandatory but recommended for convenience.</p>
  </div>
</template>

<script>
export default {
  methods: {
    highlightText(text) {
      window.getSelection().selectAllChildren(document.getElementById("highlightedText"));
    },
    copyText(text) {
      const tempElement = document.createElement("textarea");
      tempElement.value = text;
      document.body.appendChild(tempElement);
      tempElement.select();
      document.execCommand("copy");
      document.body.removeChild(tempElement);
      alert("Text copied: " + text);
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  font-size: 17px;
}
</style>
