<template>
  <div class="container">
    <div class="row">
      <div
        class="col-6 col-lg-3 col-md-3 col-sm-6 mb-4"
        v-for="card in cards"
        :key="card.title"
      >
        <div class="car h-100 pointer" @click="navigateToRoute(card.route)">
          <div class="card-body text-center">
            <div class="card-icon ">
              <div v-html="getIcon(card)"></div>
            </div>
            <h6 style="font-size: 10px" class="card-title">{{ card.title }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeRoute() {
      return this.$route.path; // Текущий маршрут
    },
    cardGroups() {
      const cardGroups = [];
      for (let i = 0; i < this.cards.length; i += 3) {
        cardGroups.push(this.cards.slice(i, i + 3));
      }
      return cardGroups;
    },
  },
  setup() {},
  data() {
    return {
      // counter: 888,
      intervalId: null,
      // isMobile: window.innerWidth < 992,
      scrollPosition: 0,
      customIconList: [
        "blocks-wave",
        "3-dots-move",
        "blocks-shuffle-3",
        "blocks-scale",
        "wind-toy",
        "pulse",
        "rotate-cube",
        "pulse-3",
        "tadpole",
        "clock",
      ], // Добавьте сюда новые идентификаторы

      cards: [
        {
          title: "EDITOR",
          description: "4V.COIN",
          route: "/main/editor",
          icons: {
            animated: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13"/></rect></svg>`,
            static: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
  <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"/>
  <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"/>
  <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"/>
</svg>
`
          },
        },
        {
          title: "CATEGORIES",
          description: "4V.COIN",
          route: "/main/create",
          icons: {
            animated: `<svg xmlns="http://www.w3.org/2000/svg" width=22" height="22" viewBox="0 0 24 24"><rect width="7.33" height="7.33" x="1" y="1" fill="currentColor"><animate id="svgSpinnersBlocksWave0" attributeName="x" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="y" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="width" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="0;svgSpinnersBlocksWave1.end+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="8.33" y="1" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="1;4;1"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="1" y="8.33" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="1;4;1"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.1s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="15.66" y="1" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="8.33" y="8.33" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="1" y="15.66" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="1;4;1"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.2s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="15.66" y="8.33" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="8.33" y="15.66" fill="currentColor"><animate attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="8.33;11.33;8.33"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.3s" dur="0.6s" values="7.33;1.33;7.33"/></rect><rect width="7.33" height="7.33" x="15.66" y="15.66" fill="currentColor"><animate id="svgSpinnersBlocksWave1" attributeName="x" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="y" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="15.66;18.66;15.66"/><animate attributeName="width" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="7.33;1.33;7.33"/><animate attributeName="height" begin="svgSpinnersBlocksWave0.begin+0.4s" dur="0.6s" values="7.33;1.33;7.33"/></rect></svg>`,
            static: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
  <rect width="7.33" height="7.33" x="1" y="1" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="8.33" y="1" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="1" y="8.33" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="15.66" y="1" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="8.33" y="8.33" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="1" y="15.66" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="15.66" y="8.33" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="8.33" y="15.66" fill="currentColor"></rect>
  <rect width="7.33" height="7.33" x="15.66" y="15.66" fill="currentColor"></rect>
</svg>
`
          },
        },
//         {
//           title: "CATEGORIES",
//           description: "4V.WEB 3.0",
//           route: "/main/category",
//           icons: {
//             animated: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><rect width="9" height="9" x="1.5" y="1.5" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksScale0" attributeName="x" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="y" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="width" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect><rect width="9" height="9" x="13.5" y="1.5" fill="currentColor" rx="1"><animate attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect><rect width="9" height="9" x="13.5" y="13.5" fill="currentColor" rx="1"><animate attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect><rect width="9" height="9" x="1.5" y="13.5" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksScale1" attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect></svg>`,
//             static: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
//   <rect width="9" height="9" x="1.5" y="1.5" fill="currentColor" rx="1"/>
//   <rect width="9" height="9" x="13.5" y="1.5" fill="currentColor" rx="1"/>
//   <rect width="9" height="9" x="13.5" y="13.5" fill="currentColor" rx="1"/>
//   <rect width="9" height="9" x="1.5" y="13.5" fill="currentColor" rx="1"/>
// </svg>
// `
//           },
//         },
     
        {
          title: "SEARCH TAG",
          description: "4V.ROBOT",
          route: "/main/tags",
          icons: {
            animated: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="0" fill="currentColor"><animate id="svgSpinnersPulseMultiple0" fill="freeze" attributeName="r" begin="0;svgSpinnersPulseMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulseMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate id="svgSpinnersPulseMultiple1" fill="freeze" attributeName="r" begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate id="svgSpinnersPulseMultiple2" fill="freeze" attributeName="r" begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle></svg>`,
            static: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="11" fill="currentColor"></circle>
  <circle cx="12" cy="12" r="7" fill="currentColor"></circle>
  <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
</svg>

`
          },
        },
        {
          title: "POPULAR",
          description: "4V.DEX",
          route: "/main/popular",
          icons: {
            animated: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M20.27,4.74a4.93,4.93,0,0,1,1.52,4.61,5.32,5.32,0,0,1-4.1,4.51,5.12,5.12,0,0,1-5.2-1.5,5.53,5.53,0,0,0,6.13-1.48A5.66,5.66,0,0,0,20.27,4.74ZM12.32,11.53a5.49,5.49,0,0,0-1.47-6.2A5.57,5.57,0,0,0,4.71,3.72,5.17,5.17,0,0,1,9.53,2.2,5.52,5.52,0,0,1,13.9,6.45,5.28,5.28,0,0,1,12.32,11.53ZM19.2,20.29a4.92,4.92,0,0,1-4.72,1.49,5.32,5.32,0,0,1-4.34-4.05A5.2,5.2,0,0,1,11.6,12.5a5.6,5.6,0,0,0,1.51,6.13A5.63,5.63,0,0,0,19.2,20.29ZM3.79,19.38A5.18,5.18,0,0,1,2.32,14a5.3,5.3,0,0,1,4.59-4,5,5,0,0,1,4.58,1.61,5.55,5.55,0,0,0-6.32,1.69A5.46,5.46,0,0,0,3.79,19.38ZM12.23,12a5.11,5.11,0,0,0,3.66-5,5.75,5.75,0,0,0-3.18-6,5,5,0,0,1,4.42,2.3,5.21,5.21,0,0,1,.24,5.92A5.4,5.4,0,0,1,12.23,12ZM11.76,12a5.18,5.18,0,0,0-3.68,5.09,5.58,5.58,0,0,0,3.19,5.79c-1,.35-2.9-.46-4-1.68A5.51,5.51,0,0,1,11.76,12ZM23,12.63a5.07,5.07,0,0,1-2.35,4.52,5.23,5.23,0,0,1-5.91.2,5.24,5.24,0,0,1-2.67-4.77,5.51,5.51,0,0,0,5.45,3.33A5.52,5.52,0,0,0,23,12.63ZM1,11.23a5,5,0,0,1,2.49-4.5,5.23,5.23,0,0,1,5.81-.06,5.3,5.3,0,0,1,2.61,4.74A5.56,5.56,0,0,0,6.56,8.06,5.71,5.71,0,0,0,1,11.23Z"><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>`,
            static: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
  <path fill="currentColor" d="M20.27,4.74a4.93,4.93,0,0,1,1.52,4.61,5.32,5.32,0,0,1-4.1,4.51,5.12,5.12,0,0,1-5.2-1.5,5.53,5.53,0,0,0,6.13-1.48A5.66,5.66,0,0,0,20.27,4.74ZM12.32,11.53a5.49,5.49,0,0,0-1.47-6.2A5.57,5.57,0,0,0,4.71,3.72,5.17,5.17,0,0,1,9.53,2.2,5.52,5.52,0,0,1,13.9,6.45,5.28,5.28,0,0,1,12.32,11.53ZM19.2,20.29a4.92,4.92,0,0,1-4.72,1.49,5.32,5.32,0,0,1-4.34-4.05A5.2,5.2,0,0,1,11.6,12.5a5.6,5.6,0,0,0,1.51,6.13A5.63,5.63,0,0,0,19.2,20.29ZM3.79,19.38A5.18,5.18,0,0,1,2.32,14a5.3,5.3,0,0,1,4.59-4,5,5,0,0,1,4.58,1.61,5.55,5.55,0,0,0-6.32,1.69A5.46,5.46,0,0,0,3.79,19.38ZM12.23,12a5.11,5.11,0,0,0,3.66-5,5.75,5.75,0,0,0-3.18-6,5,5,0,0,1,4.42,2.3,5.21,5.21,0,0,1,.24,5.92A5.4,5.4,0,0,1,12.23,12ZM11.76,12a5.18,5.18,0,0,0-3.68,5.09,5.58,5.58,0,0,0,3.19,5.79c-1,.35-2.9-.46-4-1.68A5.51,5.51,0,0,1,11.76,12ZM23,12.63a5.07,5.07,0,0,1-2.35,4.52,5.23,5.23,0,0,1-5.91.2,5.24,5.24,0,0,1-2.67-4.77,5.51,5.51,0,0,0,5.45,3.33A5.52,5.52,0,0,0,23,12.63ZM1,11.23a5,5,0,0,1,2.49-4.5,5.23,5.23,0,0,1,5.81-.06,5.3,5.3,0,0,1,2.61,4.74A5.56,5.56,0,0,0,6.56,8.06,5.71,5.71,0,0,0,1,11.23Z"/>
</svg>
`
          },
        },
       
//         {
//           title: "HISTORY",
//           description: "4V.WEB 3.0",
//           route: "/main/history",
//           icons: {
//             animated: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/><rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect><rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect></svg>`,
//             static: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
//   <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/>
//   <rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1"></rect>
//   <rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1"></rect>
// </svg>
// `
//           },
//         },
      ],
      colors: [
        "aqua",
        "red",
        "green",
        "blue",
        "purple",
        "orange",
        "yellow",
        "pink",
        "brown",
        "rgb(31, 153, 234)",
        "magenta",
        "lime",
      ],
    };
  },
  mounted() {},
  methods: {
    getIcon(card) {
      return this.activeRoute === card.route
        ? card.icons.animated
        : card.icons.static;
    },
    navigateToRoute(route) {
      this.$router.push(route);
    },
    // startCounter() {
    //   this.intervalId = setInterval(() => {
    //     this.counter += 1;
    //   }, 100);
    // },
    getColor(index) {
      return this.colors[index % this.colors.length];
    },
    // checkWindowSize() {
    //   this.isMobile = typeof window !== "undefined" && window.innerWidth < 992;
    // },
    handleScroll() {
      this.scrollPosition = window.scrollY;
    },
    shouldShowShadow(index) {
      const cardPosition = index * 200;
      return this.scrollPosition > cardPosition;
    },
    hasScrolledPastLine(index) {
      const linePosition = (index + 1) * 150; // Позиция для появления линии
      return this.scrollPosition > linePosition;
    },
  },
};
</script>

<style scoped>
.car {
  padding:20px;
  border: 2px solid rgb(14, 113, 166);
  border-radius: 15px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease; /* Плавный переход для изменения размеров и тени */
  /* box-shadow: inset 15px 15px 30px -10px rgb(1, 114, 180); */
}

.car:hover {
  transform: scale(1.05); /* Легкое увеличение карточки */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.hover-content {
  transition:
    color 0.3s ease-in-out,
    transform 0.3s ease-in-out; /* Анимация текста */
}

.car:hover .hover-content {
  transform: translateY(-5px); /* Легкое поднятие текста */
}

.card-icon {
  font-size: 24px; /* Размер иконки */
  color: cornflowerblue; /* Цвет иконки */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .card {
    border-radius: 15px;
  box-shadow: 
              inset -5px -5px 15px rgba(255, 255, 255, 0.5);
  transition: box-shadow 0.3s ease-in-out;
  } */

/* .scroll-shadow {
    box-shadow: inset 15px 15px 30px -10px var(--shadow-color);
  } */

/* .hover-content:hover .card-title,
  .hover-content:hover .card-text {
    color: white;
  } */

.dark-theme {
  --card-bg: #2c2c2c; /* Темный фон для карточек */
  --card-bg-hover: #3c3c3c; /* Темный фон при наведении */
}

.light-theme {
  --card-bg: #e0e0e0; /* Светлый фон для карточек */
  --card-bg-hover: #d6d6d6; /* Светлый фон при наведении */
}

.card-text,
.card-title {
  /* font-family: Verdana, Geneva, Tahoma, sans-serif; */
  transition: color 0.3s ease;
  /* color: rgba(255, 255, 255, 0.8); */
}

/* Линия разряда между строками */
.lightning-line {
  height: 2px;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  opacity: 0;
  transform: scaleX(0);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  margin: 10px 0;
}

.visible-line {
  opacity: 1;
  transform: scaleX(1);
}

/* Динамическое создание стилей для каждой карточки */
.hover-card-0:hover {
  --shadow-color: aqua;
}
.hover-card-1:hover {
  --shadow-color: red;
}
.hover-card-2:hover {
  --shadow-color: green;
}
.hover-card-3:hover {
  --shadow-color: blue;
}
.hover-card-4:hover {
  --shadow-color: purple;
}
.hover-card-5:hover {
  --shadow-color: orange;
}
.hover-card-6:hover {
  --shadow-color: yellow;
}
.hover-card-7:hover {
  --shadow-color: pink;
}
.hover-card-8:hover {
  --shadow-color: brown;
}
.hover-card-9:hover {
  --shadow-color: rgb(31, 153, 234);
}
.hover-card-10:hover {
  --shadow-color: magenta;
}
.hover-card-11:hover {
  --shadow-color: lime;
}

@media screen and (max-width: 1000px) {
  .scroll-shadow.hover-card-0 {
    --shadow-color: aqua;
  }
  .scroll-shadow.hover-card-1 {
    --shadow-color: red;
  }
  .scroll-shadow.hover-card-2 {
    --shadow-color: green;
  }
  .scroll-shadow.hover-card-3 {
    --shadow-color: blue;
  }
  .scroll-shadow.hover-card-4 {
    --shadow-color: purple;
  }
  .scroll-shadow.hover-card-5 {
    --shadow-color: orange;
  }
  .scroll-shadow.hover-card-6 {
    --shadow-color: yellow;
  }
  .scroll-shadow.hover-card-7 {
    --shadow-color: pink;
  }
  .scroll-shadow.hover-card-8 {
    --shadow-color: brown;
  }
  .scroll-shadow.hover-card-9 {
    --shadow-color: rgb(31, 153, 234);
  }
  .scroll-shadow.hover-card-10 {
    --shadow-color: magenta;
  }
  .scroll-shadow.hover-card-11 {
    --shadow-color: lime;
  }
  /* .card-text, .card-title { color: rgba(255, 255, 255, 0.8); } */
}
</style>
