import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import { createApp }  from "vue";
import router from "./router";
import VueCookies from 'vue3-cookies';

import App from "./App";
import appInfo from "./app-info";

const app = createApp(App);
app.use(router);
app.use(VueCookies);
app.config.globalProperties.$appInfo = appInfo;
app.mount('#app');
