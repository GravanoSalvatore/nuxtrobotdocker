<template >
<div class="mb-4">
  <!-- <TonConnectUIProvider :options="options"> -->
    <nav class="navbar navbar-expand-lg ">
  <div class="container-fluid d-flex justify-content-between align-items-center">
    <!-- Логотип -->
    <NuxtLink class="navbar-brand" to="/">
      <img style="max-width: 30px" src="../assets/img/favicon.png">
      <img class="mt-1" style="max-width: 200px" src="@/assets/img/4vrobot2.png" />
    </NuxtLink>
  <a title="Get coins!"  href= "https://t.me/FourVrobot/FourVworldNews?startapp" target="_blank"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><g fill="none"><path fill="#CA2C31" d="m.943 17.933l4.085-4.025l6.955-1.233l-.688 3.64l-9.402 2.89l-.608-.262z"/><path fill="#A02422" d="M5.735 14.94L1.3 18.97l3.262 1.59l4.953-2.527V16.84l1.012-2.73zm10.495 7.098l-2.142.93l-2.023 4.287s1.78 3.943 1.86 3.943s1.092.08 1.092.08l3.6-4.025l.91-6.875z"/><path fill="#CA2C31" d="M14.125 25.21s1.193-.242 2.043-.648c.85-.405 1.9-1.01 1.9-1.01l-.386 3.358l-3.762 4.282s-.147-.182-.772-1.542c-.498-1.085-.67-1.473-.67-1.473z"/><path fill="#F7D74D" d="M7.895 20.165s-1.435-.12-3.007 1.867c-1.435 1.816-2.108 4.77-2.368 5.53s-.882.915-.675 1.263c.208.348 1.105.328 2.213.19c1.107-.137 2.057-.485 2.057-.485s-.047.12-.207.38c-.058.093-.258.225-.243.363c.035.327 2.84.335 5.08-1.97c2.42-2.488 1.245-4.528 1.245-4.528z"/><path fill="#FBF0B4" d="M8.328 21.323s-1.548.082-2.828 2.07s-1.875 4.29-1.752 4.444c.12.155 2.505-.707 3.077-.535c.393.12.19.518.295.623c.088.087 1.123.235 2.798-1.58c1.677-1.815 1.28-4.365 1.28-4.365z"/><path fill="#858585" d="M9.087 18.61s-.777.692-1.055 1.09s-.277.433-.26.553s.305 1.437 1.503 2.592c1.47 1.418 2.782 1.608 2.973 1.608s1.452-1.418 1.452-1.418z"/><path fill="#437687" d="M12.525 22.81s1.26.828 3.373.117c2.887-.97 5.005-3.14 7.627-5.88c2.53-2.645 4.653-5.927 4.653-5.927L26.69 6.138z"/><path fill="#3F545F" d="m16.998 20.083l.347-1.08l.87.122s.663.313 1.15.54c.488.227 1.115.4 1.115.4l-1.238 1.045s-.675-.255-1.167-.47c-.555-.242-1.078-.558-1.078-.558"/><path fill="#8DAFBF" d="M21.08 4.035s-2.405 1.395-5.852 4.657c-3.108 2.94-5.41 5.6-5.968 7.863c-.465 1.895-.218 3.045.84 4.288c1.117 1.314 2.428 1.967 2.428 1.967s.984.015 5.094-3.147c5.128-3.948 9.236-10.558 9.236-10.558z"/><path fill="#D83F22" d="M26.045 10.46s-2.093-.892-3.585-2.975c-1.483-2.067-1.365-3.465-1.365-3.465s1.24-.972 4.028-2.085c1.874-.747 4.427-1.13 5.267-.507s-.575 3.745-.575 3.745l-2.578 4.99z"/><path fill="#6896A5" d="M17.043 20.1s-1.808-.923-2.958-2.235c-2.175-2.477-2.625-5.197-2.625-5.197l1.092-1.283s.273 2.89 2.606 5.388c1.52 1.627 3.107 2.372 3.107 2.372s-.317.268-.657.527c-.218.168-.566.428-.566.428"/><path fill="#A02422" d="M28.178 11.12s1.084-1.307 2.112-4.255c1.435-4.11.185-5.355.185-5.355s-.423 1.955-1.89 4.673a54 54 0 0 1-2.602 4.25s.784.352 1.21.475c.534.155.984.212.984.212"/><path fill="#B3E1EE" d="M9.952 17.415c.325.31.818-.015 1.14-.775c.325-.76.32-1.185.07-1.365c-.31-.225-.83.268-1.057.705c-.25.485-.398 1.2-.153 1.435M21.238 5.032S19.335 6.4 17.305 8.26c-1.862 1.707-3.097 3.043-3.267 3.353c-.18.332-.183.802-.043 1.042s.45.365.732.155c.283-.213 2.296-2.437 4.113-4.028a44 44 0 0 1 2.945-2.377s.52-.92.435-1.13c-.085-.213-.982-.243-.982-.243"/><path fill="#ED6A65" d="M21.238 5.033s1.404-1.078 2.935-1.835c1.422-.705 2.837-1.293 3.092-.783c.242.485-1.343 1.145-2.738 2.035S21.79 6.403 21.79 6.403s-.205-.375-.337-.723a6 6 0 0 1-.215-.647"/><path fill="#E1E1E1" d="M22.398 9.812c-1.393-1.282-3.33-.937-4.285.203c-.98 1.175-.908 2.97.25 4.05c1.052.98 3.01 1.203 4.19-.172c1.05-1.22.985-3.033-.155-4.08"/><path fill="#3F545F" d="M18.833 10.468c-.828.812-.783 2.422.202 3.157c.86.643 2.08.61 2.845-.172c.765-.783.765-2.205.047-2.94c-.825-.843-2.147-.975-3.094-.046"/><path fill="#A02524" d="M12.5 19.223s1.547-1.57 1.717-1.4s.148 1.122-.592 2.182c-.742 1.06-2.375 2.948-3.668 4.22c-1.275 1.252-3.072 2.685-3.242 2.66c-.133-.02-.67-.288-.885-.548c-.21-.257.417-1.474.67-1.877c.255-.402 6-5.238 6-5.238"/><path fill="#CA2C31" d="M5.307 25.463c-.02.36.53.884.53.884l8.38-8.522s-.392-.442-1.547.275c-1.165.725-2.185 1.595-3.69 3.052c-2.098 2.035-3.653 3.95-3.673 4.31"/><path fill="#fff" d="M4.765 9.237c-.277.278-.29.723.02.978c.275.228.723.08.89-.125s.148-.65-.075-.87c-.222-.223-.665-.15-.835.017"/><path fill="#fff" d="M10.255 8.913c-.21.232-.143.577.052.705c.195.127.488.115.63-.06a.53.53 0 0 0-.052-.668c-.17-.167-.495-.127-.63.023" opacity=".5"/><path fill="#fff" d="M13.888 2.972s.305-.87.485-.88c.182-.01.445.87.445.87s.902.01.962.143c.078.17-.577.74-.577.74s.212.85.112.952c-.112.113-.89-.335-.89-.335s-.8.558-.973.405c-.15-.132.163-1.032.163-1.032s-.75-.548-.71-.7c.058-.215.982-.163.982-.163m10.365 20.86c.302.168.682.073.822-.25c.128-.287-.107-.63-.32-.722c-.212-.093-.585.03-.72.273c-.133.24.035.6.218.7m4.294-7.372c-.172-.268-.544-.355-.787-.14c-.235.21-.178.54-.045.707c.133.168.488.23.703.093s.235-.5.13-.66"/></g></svg>
  </a>
    <!-- Кнопка TON -->
    <NuxtLink to="/ton" class="ms-auto me-3">
      <Ton />
    </NuxtLink>

    <!-- Активный канал (правее TON) -->
    <span class="btn-danger4 " style="font-size: 9px; white-space: nowrap;">
      <!-- Active channel:  -->
      {{ activeChannelName }}
    </span>
  </div>
</nav>
<Running/>
<Cookie/>
  <div class="container">
    <div class="">
      <NuxtLink style="text-decoration: none; margin-left:" to="/"> </NuxtLink>
    </div>
    <button
      class="theme-toggle-btn"
      @click="themeStore.toggleTheme"
      :title="
        themeStore.isDark
          ? 'Переключить на светлую тему'
          : 'Переключить на тёмную тему'
      "
    >
    <svg  style="
       
       font-size: 20px;
       margin-left: 20px;
       margin-top: px;
      "
      v-if="!themeStore.isDark" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path fill="currentColor" d="m6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91l-1.41-1.41l-1.79 1.79l1.41 1.41zm-3.21 13.7l1.79 1.8l1.41-1.41l-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91l1.41 1.41l1.79-1.8l-1.41-1.41z"/></svg>
      <!-- <Icon
        v-if="!themeStore.isDark"
        name="meteocons:clear-day-fill"
        style="
       
          font-size: 20px;
          margin-left: 20px;
          margin-top: px;
         
        "
      /> -->

      <Icon
        v-else
        name="meteocons:clear-night"
        style="font-size: 20px; margin-left: 20px; margin-top: px"
      />
    </button>

    <Grid />
    <div class="row">
      <!-- Левая колонка -->
      <div class="col-12 col-md-3 fixed-sidebar mb-4 mb-md-0">
        <div class="sidebar-content">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div
              v-for="(item, index) in accordionItems"
              :key="index"
              class="accordion-item"
            >
              <h2 class="accordion-header">
                <button
                  :class="{ 'active-item': activeIndex === index }"
                  @click="handleItemClick(item, index)"
                  class="accordion-button pointer"
                >
                  <div class="card-icon me-2" v-html="item.icon"></div>
                  <span style="color:">{{ item.title }}</span>
                </button>
              </h2>
            </div>
            <br />
          </div>
         
        </div>
        
      
       
        <TonWallet />
       
        <div class="container">
            <div class="row align-items-center">
              <!-- Социальные иконки -->
              <div class="col-md-12  text-center text-md-start mb-3 mb-md-0">
                <div
                  class="d-flex  justify-content-center justify-content-md-start"
                >
                  <a
                    style="color: var(--bs-body-color)"
                    href="#"
                    class="me-3 fs-6 mt-3"
                    aria-label="Facebook"
                  >
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a
                    style="color: var(--bs-body-color)"
                    href="#"
                    class="me-3 fs-6 mt-3"
                    aria-label="Twitter"
                  >
                    <i class="bi bi-twitter"></i>
                  </a>
                  <a
                    style="color: var(--bs-body-color)"
                    href="#"
                    class="me-3 fs-6 mt-3"
                    aria-label="Instagram"
                  >
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a
                    style="color: var(--bs-body-color)"
                    href="#"
                    class="me-3 fs-6 mt-3"
                    aria-label="LinkedIn"
                  >
                    <i class="bi bi-telegram"></i>
                  </a>
                  <a
                    style="color: var(--bs-body-color)"
                    href="#"
                    class="fs-6 me-3 mt-3"
                    aria-label="YouTube"
                  >
                    <i class="bi bi-youtube"></i>
                  </a>
                  <a
                    style="color: var(--bs-body-color)"
                    href="#"
                    class="fs-6 me-3 mt-3"
                    aria-label="YouTube"
                  >
                    <i class="bi bi-reddit"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!-- Правая колонка -->
      <div class="col-12 col-md-9 p" ref="newsContainer">
       
          <div v-if="isHomePage">
        <button  @click="toggleSavedTags" v-if="savedTags.length > 0"   class="pl-4 btn-danger1">
        <i class="bi bi-floppy2-fill pointer "> Saved tags</i> 
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><g clip-path="url(#unjsUnstorage0)"><path fill="#616161" d="M31.043 6.988V28.86a2.183 2.183 0 0 1-2.183 2.183H3.14A2.183 2.183 0 0 1 .957 28.86V3.14c0-1.205.978-2.182 2.183-2.182h22.41c.89 0 1.735.397 2.302 1.085l2.51 3.047c.44.535.68 1.205.68 1.898"/><path fill="#fff" d="M25.985 31.043H6v-13.23a.82.82 0 0 1 .82-.82h18.348a.82.82 0 0 1 .82.82v13.23z"/><path fill="#039BE5" d="M6 27.98h19.985v3.063H6z"/><path fill="#424242" d="M4.188.958v11.937c0 .445.392.793.912.793h19.163c.52 0 .922-.346.922-.793V.958z"/><path fill="#E0E0E0" d="M8.75.958v11.255c0 .42.295.745.685.745H23.8c.39 0 .692-.325.692-.745V.957zM21.493 11.63c0 .18-.148.327-.328.327H16.82a.33.33 0 0 1-.328-.327V2.285c0-.18.148-.327.328-.327h4.345c.18 0 .328.147.328.327z"/></g><defs><clipPath id="unjsUnstorage0"><path fill="#fff" d="M0 0h32v32H0z"/></clipPath></defs></g></svg> -->
        </button>
        
    <div 
      v-show="showSavedTags" 
      class="saved-tags-container mt-2"
    >
      <div class="saved-tags">
        <span
          v-for="tag in savedTags"
          :key="tag"
          class="badge bg-success saved-tag"
          @click="handleTagClick(tag)"
        >
          {{ tag }}
          <i
            @click.stop="removeSavedTag(tag)"
            class="bi bi-x-circle pointer text-white"
          ></i>
        </span>
      </div>
    </div>
    
  
   <!-- Список новостей -->
   <div style="position: relative" class="news-list">
     
     <div class="" v-if="news.length > 0">
       <h5 class="fw-bold mt-1">{{ currentTag }}: {{ news.length }}</h5>
       <button
         class="btn-danger1 me-2"
         :class="{ 'btn-danger': isTagSaved(currentTag) }"
         @click="toggleSaveTag(currentTag)"
       >
         {{ isTagSaved(currentTag) ? "Delete" : "Save" }}
       </button>

       <button
         @click="toggleAutopilot"
         :class="[
           'btn-danger1 fw-bold me-2',
           { 'btn-primary': autopilotActive },
         ]"
       >
         {{ autopilotActive ? "Stop Autopilot" : "Start Autopilot" }}
       </button>
       <!-- <button
         type="button"
         class="btn-danger1"
         data-bs-toggle="modal"
         data-bs-target="#staticBackdrop"
       >
         Setting
       </button> -->
     </div>
     <!-- Модальное окно -->
     <div
       class="modal fade"
       id="staticBackdrop"
       data-bs-backdrop="static"
       data-bs-keyboard="false"
       tabindex="-1"
       aria-labelledby="staticBackdropLabel"
       aria-hidden="true"
     >
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-body">
             <setting />
           </div>
           <div class="modal-footer">
             <button type="button" class="btn-danger1" data-bs-dismiss="modal">
               Close
             </button>
           </div>
         </div>
       </div>
     </div>

     <!-- <div
       v-if="news.length > 0"
       style="color: cornflowerblue"
       class="text-center"
     >
       Total: {{ news.length }}
     </div> -->
     <i
       v-if="news.length > 0"
       style="position: absolute; right: 0; top:0"
       @click="clearNews"
       class="bi bi-x-circle pointer"
     ></i>
     <div v-if="loadingNews" class="text-center">
       <p>
         <svg 
     
      xmlns="http://www.w3.org/2000/svg" 
      width="82" 
      height="82" 
      viewBox="0 0 24 24">
      <path 
      fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple0" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="0;svgSpinnersPulseRingsMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple1" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="matrix(0 0 0 0 12 12)"><animateTransform id="svgSpinnersPulseRingsMultiple2" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="translate" values="12 12;0 0"/><animateTransform additive="sum" attributeName="transform" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" type="scale" values="0;1"/><animate attributeName="opacity" begin="svgSpinnersPulseRingsMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></path></svg>
       </p>
     </div>

     <div v-else class="row">
       <div
         v-for="item in news"
         :key="item.id"
         class="col-12 col-md-6 col-lg-4 col-xl-4"
       >
         <div class="news-item border p-3 rounded">
           <div class="car">
             <img
               v-if="item.tempImageUrl || item.urlToImage"
               :src="item.tempImageUrl || item.urlToImage"
               class="card-img-top c"
             />
             <img v-else :src="image" class="card-img-top c" />

             <div class="card-body">
               <div class="overlay">
                 <h5 class="card-title">
                   <a style="font-size: 12px" :href="item.url" target="_blank">
                     {{ item.sourceName }}
                   </a>
                 </h5>
                 <p class="card-text">
                   <small class="text-muted">
                     {{ formatDateTime(item.publishedAt) }}
                   </small>
                 </p>
                 <p
                   v-if="item.author"
                   class="badge bg-primary"
                   :style="{
                     'max-width': '200px',
                     'white-space': 'nowrap',
                     overflow: 'hidden',
                     'text-overflow': 'ellipsis',
                   }"
                 >
                   {{ item.author }}
                 </p>
                 <p v-else class="badge bg-secondary">Unknown</p>
                 <div>
                   <p style="color: cornflowerblue" class="fw-bold">
                    <a :href="item.url" target="_blank">   {{ item.title }}</a>
                   </p>
                   <p>{{ item.description }}</p>
                   <p v-html="item.content"></p>
                 </div>
               </div>
               <button @click="openEditModal(item)" class="btn-danger1 mt-2">
                 Editing and sending
               </button>
               <!-- <button @click="sendToTelegram(item)" class="btn-danger1 mt-2">
                 Telegram
                 <i style="color: cornflowerblue" class="bi bi-telegram"></i>
               </button> -->
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
  
  
  
  
  
  
  
  </div>
 
        <div class="row container p">
      
          <NuxtPage />
        </div>
        <Main
        
         v-show="!showSavedTags"  
        v-if="isHomePage "/>
      </div>
     
      <div
        v-if="showModal"
        class="modal fade show"
        id="settingsModal"
        tabindex="-1"
        aria-labelledby="settingsModalLabel"
        aria-hidden="true"
        style="display: block; background:"
      >
        <div class="modal-dialog1 form">
          <div class="modal-content">
            <button
              style="font-size: 9px"
              type="button"
              class="btn-close position-absolute top-0 end-0 me-2 mt-2"
              aria-label="Close"
              @click="closeModal"
            ></button>

            <!-- <div
              class="modal-header"
              style=""
            >
              Manage Channels
             
            </div> -->
            <div class="modal-body">
              <!-- Ваш компонент -->
              <button
            class="btn mb-3"
            :class="{ 'btn-success': showDocument, 'btn-secondary': !showDocument }"
            @click="toggleDocument"
          >
            Creating a Telegram Channel and Registration
          </button>
              <Document v-if="showDocument" />
              <Setting />
              <!-- <Main /> -->

             
<br/>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    <!-- Модальное окно -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div>
              <!-- Кнопка для открытия компонента -->
              <button @click="toggleSetting" class="btn">
                <i class="bi bi-sliders"></i>
              </button>
              <i
                style="position: absolute; right: 0; top: 0"
                class="bi bi-x-circle pointer"
                data-bs-dismiss="modal"
              ></i>
              <!-- Анимированный блок с настройками -->
              <transition name="fade">
                <div v-if="showSetting" class="setting-container">
                  <setting />
                  <!-- Кнопка для закрытия -->
                  <!-- <button @click="toggleSetting" class="btn btn-danger mt-3">Close</button> -->
                </div>
              </transition>
            </div>
            <div class="mb-3">
              <div class="text-center mt-3">
                <img
                  :src="editableItem.tempImageUrl || editableItem.urlToImage"
                  class="img-fluid"
                  alt="Preview"
                />
              </div>
              <!-- <div class="mb-3"> -->
              <!-- <label for="editImageFile" class="form-label"
                  >Upload Image</label
                >
                <input
                  id="editImageFile"
                  type="file"
                  @change="uploadImage"
                  class="form-control"
                />
              </div> -->
              <!-- <div class="mb-3">
                <label for="editImage" class="form-label">Image URL</label>
                <input
                  id="editImage"
                  type="text"
                  v-model="editableItem.tempImageUrl"
                  class="form-control"
                />
              </div> -->
              <label style="color:cornflowerblue" for="editTitle" class="form-label fw-bold mt-1">Title</label>
              <textarea
                id="editTitle"
                type="text"
                v-model="editableItem.title"
                class="form-control"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <label style="color:cornflowerblue" for="editDescription" class="form-label fw-bold"
                >Description</label
              >
              <textarea
                id="editDescription"
                v-model="editableItem.description"
                class="form-control"
              ></textarea>
            </div>
            <div class="mb-3">
              <label style="color:cornflowerblue" for="editContent" class="form-label fw-bold">Content</label>
              <textarea
                id="editContent"
                v-model="editableItem.content"
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <!-- <button type="button" class="btn-danger1" data-bs-dismiss="modal">
              Close
            </button> -->
            <button type="button" class="btn-danger1" @click="saveChanges">
              Save changes
            </button>
            <button @click="sendToTelegram(editableItem)" class="btn-danger1">
              Send to Telegram
              <i style="color: cornflowerblue" class="bi bi-telegram"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <!-- </TonConnectUIProvider> -->
</template>

<script>
//import Setting from '@/components/Setting.vue'
//import { useTopPopularStore } from "../stores/popular";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useTopPopularStore } from "../../stores/popular";
import { useChannelStore } from "@/stores/channelStore";
import { useThemeStore } from "~/stores/useThemeStore";
export default {
  ssr: false,
  // components:{Pay},
  data() {
    return {
      showDocument: false,
      email: "",
    };
  },
  methods: {
    toggleDocument() {
      this.showDocument = !this.showDocument; // Переключение видимости Document
    },
    closeModal() {
      this.$emit("close"); // Закрываем модальное окно
      this.showDocument = false; // Закрываем Document при закрытии окна
    },
    formatDateTime(dateTime) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      return new Date(dateTime).toLocaleString("en-US", options);
    },
    sendFeedback() {
      if (this.email) {
        alert(`Ваш email (${this.email}) принят. Спасибо за обратную связь!`);
        this.email = "";
      }
    },
  },

  setup() {
    const popularStore = useTopPopularStore();
    const themeStore = useThemeStore();
    const channelStore = useChannelStore();
    themeStore.setThemeFromStorage();
    const route = useRoute();
    const isHomePage = computed(() => route.path === "/");



    const showSavedTags = ref(false);
    const toggleSavedTags = () => {
      showSavedTags.value = !showSavedTags.value;
    };
    const editableItem = ref({});
    const showSetting = ref(false);
    const toggleSetting = () => {
      showSetting.value = !showSetting.value;
    };
    const openEditModal = (item) => {
      editableItem.value = { ...item };
      const modal = new bootstrap.Modal(document.getElementById("editModal"));
      modal.show();
    };
    const saveChanges = () => {
      const index = news.value.findIndex((n) => n.id === editableItem.value.id);
      if (index !== -1) {
        news.value[index] = { ...editableItem.value };
      }
    };
    const currentTag = ref("");
    const channels = computed(() => channelStore.channels);
    const toggleSaveTag = (tag) => {
      if (!tag.trim()) {
        console.error("Текущий тег пустой, невозможно сохранить/удалить.");
        return;
      }
      popularStore.toggleSaveTag(tag);
      console.log(`${isTagSaved(tag) ? "Удалён" : "Сохранён"} тег: ${tag}`);
    };

    // Выбрать тег из сохранённых
    const handleTagClick = async (tag) => {
      try {
        currentTag.value = tag; // Установить текущий тег
        console.log(`Текущий тег изменён на: ${tag}`);
        await fetchNews(tag); // Загрузить новости по тегу
        console.log(`Новости для тега "${tag}" успешно загружены.`);
      } catch (error) {
        console.error(`Ошибка загрузки новостей для тега "${tag}":`, error);
      }
    };

    const isTagSaved = (tag) => popularStore.savedTags.includes(tag);

    const removeSavedTag = (tag) => {
      popularStore.toggleSaveTag(tag); // Используем хранилище
    };

    const savedTags = computed(() => themeStore.savedTags);
    const tags = computed(() => themeStore.tags);
    const news = computed(() => themeStore.news);
    const localNews = ref([]);
    const loadingNews = computed(() => themeStore.loadingNews);
    const activeChannelId = computed(() => channelStore.activeChannelId); // Получаем activeChannelId
    const activeChannelName = computed(() => channelStore.activeChannelName);

    const clearNews = () => {
      themeStore.clearNews();
      localNews.value = [];
    };
  
    const sendToTelegram = (item) => {
      if (!activeChannelId.value) {
        alert("Выберите канал для отправки новостей!");
        return;
      }

      // Проверяем, есть ли description и content
      const description = item.description ? item.description : "";
      const content = item.content ? item.content : "";

      // Формируем сообщение
      const message = `<b>🔥🔥🔥${item.title}🔥🔥🔥</b>\n${description}\n${content}\n<a href="${item.url}">➡️Читать полностью</a>`;

      const data = {
        chat_id: activeChannelId.value,
        text: message,
        parse_mode: "HTML",
      };

      axios
        .post(
          `https://api.telegram.org/bot${popularStore.botToken}/sendMessage`,
          data
        )
        .then((response) => {
          console.log(
            "Сообщение успешно отправлено в Telegram:",
            response.data
          );
          alert("Сообщение отправлено!");
        })
        .catch((error) => {
          console.error("Ошибка отправки сообщения:", error);
          alert(`Ошибка отправки: ${error.message}`);
        });
    };
    const fetchNews = async (tagName) => {
      await themeStore.fetchNews(tagName);
      localNews.value = themeStore.news.map((item) => ({ ...item })); // Локальная копия новостей
    };
    // const removeSavedTag = (tag) => {
    //   themeStore.savedTags = themeStore.savedTags.filter((savedTag) => savedTag !== tag); // Удаляем тег
    //   localStorage.setItem("savedTags", JSON.stringify(themeStore.savedTags)); // Сохраняем изменения в localStorage
    //   console.log("Тег удалён:", tag);
    // };

    // const removeSavedTag = (tag) => {
    //   themeStore.toggleSaveTag(tag); // Обновляем теги через метод Pinia
    // };

    const activeIndex = ref(null);
    const router = useRouter();
    const showModal = ref(false);
    const accordionItems = ref([
      {
        title: "Settings",
        icon: '<i class="bi bi-sliders text-secondary"></i>',
        route: "/null",
      },
      {
        title: "Profile",
        icon: '<i class="bi bi-person-lines-fill"></i>',
        route: "/profile",
      },
      {
        title: "Ton lab",
        content: "Content for item #7.",
        icon: '<i class="bi bi-globe text-info"></i>',
        route: "/ton",
      },
      // {
      //   title: "Earn tokens",
      //   icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 14 14"><path fill="gold" fill-rule="evenodd" d="M13.462 9.692C13.462 12.664 10.77 14 7 14S.537 12.664.537 9.713c0-2.825 1.235-4.432 3.705-5.885a4.59 4.59 0 0 0 5.52-.004c2.467 1.438 3.7 3.045 3.7 5.868M8.743 3.008l1.27-1.985A.7.7 0 0 0 9.41 0H4.843a.7.7 0 0 0-.603 1.077l1.047 1.95c1.061.635 2.4.629 3.456-.019" clip-rule="evenodd"/></svg>',
      //   route: "/privacy",
      // },
      {
        title: "Invite friends",
        content: "Content for item #7.",
        icon: '<i class="bi bi-people-fill text-primary"></i>',
        route: "/ref",
      },
      // {
      //   title: "Payments",
      //   content: "Content for item #4.",
      //   icon: '<i class="bi bi-wallet2"></i>',
      //   route: "/pay",
      // },
      // {
      //   title: "About us",
      //   icon: '<i class="bi bi-file-earmark-text"></i>',
      //   route: "/aboutUs",
      // },
      {
        title: "About us",
        icon: '<i class="bi bi-file-text-fill text-muted"></i>',
        route: "/aboutUs",
      },
      {
        title: "Privacy policy",
        icon: '<i class="bi bi-shield-check text-success"></i>',
        route: "/privacy",
      },

      
      {
        title: "Terms of servises",
        icon: '<i class="bi bi-file-earmark-text-fill text-success"></i>',
        route: "/terms",
      },
      // {
      //   title: "Documentation",
      //   content: "Content for item #6.",
      //   icon: '<i class="bi bi-filetype-doc"></i>',
      //   route: "/doc",
      // },

      {
        title: "Disclaimer",
        content: "Content for item #9.",
        icon: '<i class="bi bi-exclamation-triangle-fill text-danger"></i>',
        route: "/disclaimer",
      },
    ]);

    const handleItemClick = (item, index) => {
      if (item.title === "Settings") {
        showModal.value = true; // Открыть модальное окно
        console.log("Модальное окно открыто");
      } else if (item.route) {
        router.push(item.route); // Перейти по маршруту
      } else {
        console.warn(`No route defined for ${item.title}`);
      }
      activeIndex.value = index;
    };
    // const handleTagClick = async (tag) => {
    //   try {
    //     popularStore.clearNews();
    //     await themeStore.fetchNews(tag); // Загружаем новости по тегу
    //     console.log(`Новости для тега "${tag}" успешно загружены.`);
    //   } catch (error) {
    //     console.error(`Ошибка загрузки новостей для тега "${tag}":`, error);
    //   }
    // };
    const closeModal = () => {
      showModal.value = false; // Закрыть модальное окно
      console.log("Модальное окно закрыто");
    };

    // Инициализация темы
    try {
      themeStore.setThemeFromStorage();
    } catch (error) {
      console.error("Ошибка загрузки темы:", error);
    }
    onMounted(() => {
      popularStore.loadSavedTags();
      if (popularStore.savedTags.length > 0) {
        currentTag.value = popularStore.savedTags[0]; // Устанавливаем первый тег как текущий
      }
      themeStore.loadSavedTags(); // Загружаем сохранённые теги
      channelStore.loadChannels();
      themeStore.startSyncingSavedTags();
    });
    // Данные для аккордеона

    return {
      isHomePage,

      showSavedTags,
      toggleSavedTags,
      activeChannelName,
      showSetting,
      toggleSetting,
      editableItem,
      openEditModal,
      saveChanges,
      currentTag,
      isTagSaved,
      toggleSaveTag,
      removeSavedTag,
      savedTags,
      // : computed(() => popularStore.savedTags),
      channels,
      tags,
      sendToTelegram,
      activeChannelId,
      clearNews,
      localNews,
      // news,
      handleTagClick,
      news,
      loadingNews,
      closeModal,
      showModal,
      activeIndex,
      handleItemClick,
      accordionItems,
      themeStore,
      popularStore,
    };
  },
};
</script>

<style lang="css" scoped>
.btn {
  transition: background-color 0.3s ease-in-out;
}

.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: cornflowerblue;
}

.nav-link.active {
  color: cornflowerblue; /* Цвет активной ссылки */
  font-weight: bold;
}

.card-body {
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
}
.overlay {
  overflow-x: hidden;
  overflow-y: auto;
  height: 250px;
}
.card-img-top {
  width: 100%;
  height: auto;
}
.modal-dialog1 {
border-radius: 20px;
  max-width: 650px;
  margin: 30px auto;
}
modal-dialog {
  max-width: auto;
  margin: 30px auto;
}
.modal-content {
  border-radius: 15px;
  padding: 20px;
  border:2px solid cornflowerblue;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-12.col-md-9 {
  order: 2; /* На десктопах содержимое второе */
}

.col-12.col-md-3 {
  order: 1; /* На десктопах сайдбар первый */
}
@media (max-width: 767px){
  .accordion{
    margin-top:10px;
  }
}
@media (max-width: 767px) {
  .col-12.col-md-9 {
    order: 1; /* На мобильных содержимое первое */
  }

  .col-12.col-md-3 {
    order: 2; /* На мобильных сайдбар второй */
  }
}

.navbar {


  /* background-color: #ffffff; */
  border-bottom: 1px solid cornflowerblue;
}

/* .navbar-brand {
  font-weight: bold;
  color: cornflowerblue;
} */

/* .navbar-brand:hover {
  color: #0056b3;
} */

.nav-link:hover {
  color: cornflowerblue;
  /* text-decoration: underline; */
}
.accordion-button.active-item {
  background-color: rgba(0, 123, 255, 0.1) !important; /* Светло-синий фон */
  color: cornflowerblue !important; /* Цвет текста */
  font-weight: bold; /* Жирный текст */
  border-left: 4px solid cornflowerblue !important; /* Линия слева */
}

.accordion-button.active-item:hover {
  background-color: rgba(0, 123, 255, 0.2); /* Изменение фона при наведении */
}

input {
  border: none !important;
  box-shadow: none !important;
}

footer a {
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
.p {
  padding-right: 0px !important;
}
.accordion-button.no-arrow::after {
  display: none !important;
}

.accordion-button[disabled]::after {
  display: none;
}

.fixed-sidebar {
  max-height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}

@media (max-width: 767px) {
  .fixed-sidebar {
    position: static;
  }
}

.accordion-button {
  display: flex;
  align-items: center;
}

.card-icon {
  margin-right: 10px;
}

.theme-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  position: absolute; /* Абсолютное позиционирование */
  top: 0px; /* Отступ сверху */
  right: 0px; /* Отступ справа */
  z-index: 1000; /* Убедитесь, что кнопка поверх контента */
}

/* .theme-toggle-btn:hover {
  background-color: rgba(214, 247, 32, 0.1);
} */

/* .dark-theme .theme-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
} */

/* Настройка для мобильных устройств */
@media (max-width: 767px) {
  .theme-toggle-btn {
    top: 65px; /* Отступ ниже кнопки тоггл-меню */
    right: 0px; /* Меньший отступ справа */
  }
}
@media (max-width: 444px) {
  .theme-toggle-btn {
    top: 0; /* Отступ ниже кнопки тоггл-меню */
    right: 40px; /* Меньший отступ справа */
  }
}
/* .theme-icon {
transition: transform 0.3s ease;
caret-color: yellow;
} */

/* .theme-toggle-btn:hover .theme-icon {
  transform: rotate(30deg);
} */
.accordion-button::after {
  display: none !important;
}

.saved-tags {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.saved-tag {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 10px;
}
.nav-link {
  color: var(--bs-body-color);
}
</style>
