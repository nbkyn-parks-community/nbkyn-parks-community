(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.1"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.1"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.1"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.1"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _ extends class{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:i||t})),t&&r){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},_.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class v{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"7e15e032e5879c3ee7e2ea445ad4edda","url":"404.html"},{"revision":"a28cb1326306e1a253b9786152e44707","url":"assets/css/styles.20d378f3.css"},{"revision":"2ae355fdbd5578ba6681cdcec07bd0b3","url":"assets/js/01a85c17.62537126.js"},{"revision":"24e8cbc05c7f45d765ad5ed39a82a316","url":"assets/js/068e142e.02244a45.js"},{"revision":"84b2856768c6d8a55166b70782f98099","url":"assets/js/078b638b.b811641e.js"},{"revision":"a57cbeaaddd45e494cb1b6a0b01ff150","url":"assets/js/1521bd3b.82f4166f.js"},{"revision":"d0968e86151743b64ae339807f622459","url":"assets/js/1753747f.82fa3206.js"},{"revision":"05bbe888dbe5772774f2aba560a33bae","url":"assets/js/1766.bba137e3.js"},{"revision":"79d88c25a3bf75285b15dca10a332059","url":"assets/js/17896441.74d1af6c.js"},{"revision":"ccde8e2a075479f3bbe0cfe907c12519","url":"assets/js/190256f2.b43fd0ca.js"},{"revision":"f405559e662b4d9310831a6ef016829d","url":"assets/js/19b6a548.9feb0944.js"},{"revision":"a6d829289d129e4b1e37cef11b5b1f8e","url":"assets/js/1be78505.7c3e25c4.js"},{"revision":"5fc64499c9f4a229cc9e4f8a99049835","url":"assets/js/1eb08314.f93f1a8f.js"},{"revision":"95ec2c01f9611c038b98c81af2cc789b","url":"assets/js/1ec1a0db.a70af0e8.js"},{"revision":"e8e498efaa1540443b6e596277f2b16d","url":"assets/js/1f391b9e.a356b49a.js"},{"revision":"7056a02be025bfc0504dd5bd80a7b8c3","url":"assets/js/1fd6871f.4555e9cb.js"},{"revision":"dbc1faf47bc55ada841c3b32efb8ee25","url":"assets/js/227cec60.ed84227f.js"},{"revision":"c2c45cc5613ab9d19ea363d46ae198c6","url":"assets/js/230.9164cd38.js"},{"revision":"091e2c77c4db58a25ebd93287684a1bb","url":"assets/js/23bae58c.4657a0e7.js"},{"revision":"8102a1b35bfbfa15b1b57b8e48100902","url":"assets/js/24ad2b7a.fa1b75de.js"},{"revision":"d29bb2fee18bb06a298e1f5cd4c913e1","url":"assets/js/2724aeed.62cd10bf.js"},{"revision":"cf6bf4d6d604e75a73807fb65da63bea","url":"assets/js/31fca81d.f3154338.js"},{"revision":"d22f405ceada438191e27d965172c7b6","url":"assets/js/3720c009.1d75d846.js"},{"revision":"e91717d564be8081d9e3b78dfbdf2e3f","url":"assets/js/38610ff3.d791a0df.js"},{"revision":"1da11f43f8c0fb560c0044e7151303a2","url":"assets/js/393be207.e0992474.js"},{"revision":"ae29fa39aede456df0de43563b5b26d3","url":"assets/js/3a22bc9a.9f837610.js"},{"revision":"277087cb3179602b69450303e772f97b","url":"assets/js/40309127.e4610532.js"},{"revision":"c2f8f1bb352048018e6d0cfbf6ff1e18","url":"assets/js/41ce5ed0.1101561f.js"},{"revision":"95f554de1ebe10d8878adadcfb43f6a7","url":"assets/js/4608.fa3ebbc9.js"},{"revision":"e7209a53ce1e2fd1cdc528b59f2baad9","url":"assets/js/4c3cde04.bfb9f3d3.js"},{"revision":"10e165ab49e84c3436f319a559d7fb53","url":"assets/js/4f831626.465dc577.js"},{"revision":"046f10e7faca1e5362ee64c6a1be5491","url":"assets/js/501add24.95def4f4.js"},{"revision":"17cbe397be0f17c06b6ce8c123bdae15","url":"assets/js/5131.b85d6f2f.js"},{"revision":"465d219322e2759ab5210a3039c06e5e","url":"assets/js/5283.acddcac6.js"},{"revision":"8cd3b2d607bd65e8e6329a59c5494900","url":"assets/js/535.c725fef0.js"},{"revision":"762776a3fadb4fa75b8bc7bb19b971d8","url":"assets/js/53e0a087.10a8d382.js"},{"revision":"3b9266e7cb0d0e2ef1626a51f9c24a5e","url":"assets/js/550ed89b.df28efa2.js"},{"revision":"28b323572438ef9157252319ffa35172","url":"assets/js/57fc973c.5086f35f.js"},{"revision":"420105149f20ae5c0dfede7754d91f7d","url":"assets/js/58250553.1a2dd642.js"},{"revision":"8aa3a957326d665fc5b9bd1d0c6b3ed0","url":"assets/js/5986c9ad.0f30f624.js"},{"revision":"3742c8b7adc1e1032a58eef4b90c6a0f","url":"assets/js/59e6257f.3c0476cd.js"},{"revision":"5122629b2797806edf190a90d620be08","url":"assets/js/6875c492.a05b2a7d.js"},{"revision":"86e99065fce4f831f05c57189f042926","url":"assets/js/69b09ea9.d0e9d04e.js"},{"revision":"11f30b2b36d02bb8515fe4a8da12f093","url":"assets/js/70ba0b48.0dc539d2.js"},{"revision":"7a02a7f40fd703c149e3d8be9ec3c3c7","url":"assets/js/78acfc31.389e732d.js"},{"revision":"0a4994f84da50593ba683e6321b86beb","url":"assets/js/7a09604b.196c36bd.js"},{"revision":"3d40567ba33b445e7684698e936f86b9","url":"assets/js/810c1731.c0b5d98c.js"},{"revision":"7f8a9246c2ab0c192cfd888fa26b4f2a","url":"assets/js/814f3328.0fa3b343.js"},{"revision":"0f4e7b01e63088b1ed90e55720ed554c","url":"assets/js/89cfe0af.b020fc6c.js"},{"revision":"35a9685ebd23fa187276d1c3455af002","url":"assets/js/8d120e59.e65f8c8f.js"},{"revision":"5f62dc00f2a9a8f3c588c389ab70afeb","url":"assets/js/935f2afb.86806ecf.js"},{"revision":"13192e6c2a60bffa2f18278f02c772bb","url":"assets/js/9535aee6.74f0b1d6.js"},{"revision":"18c3b0f7f5c9f40b15f7eceecc7c74f4","url":"assets/js/9e4087bc.78787afd.js"},{"revision":"87b3490ecb8fbd198af85ed848c6b0ff","url":"assets/js/a5d0ea05.3a2f5fa7.js"},{"revision":"43b9ce5f69945276088abae55e602e23","url":"assets/js/a6aa9e1f.6f3f9f65.js"},{"revision":"aea32b29bec70fc12d348428c341f2c6","url":"assets/js/a7023ddc.106eb8cf.js"},{"revision":"29044e5b976bca2d6553325bcccd6ca8","url":"assets/js/a7075ab6.52d12eb3.js"},{"revision":"b115476f2f81407fdaa5838c981f30d4","url":"assets/js/a85364fe.848c020b.js"},{"revision":"4f42ad1cbe491cb715d43c9ac3d8e295","url":"assets/js/a88b361a.bf23a78e.js"},{"revision":"d4ec97b244bcf582292759ca21508f7d","url":"assets/js/addec50b.9dd46b22.js"},{"revision":"284bbc9c58a9e01a4e68c4a5efcad5aa","url":"assets/js/afaff11a.430c071b.js"},{"revision":"00f34d3661f15a5eb6937866b3664692","url":"assets/js/b2b675dd.83490820.js"},{"revision":"c3295387525342e41480c74048f09540","url":"assets/js/b2f554cd.5e226faa.js"},{"revision":"c3175fb3a175bf8608b7264b837b78db","url":"assets/js/bca61705.ecb2e5b6.js"},{"revision":"6f006c7a6a0830b640daf36230908496","url":"assets/js/bd9a2117.b10e4f4b.js"},{"revision":"6fb436bc580f3061a4537742fc3d9e38","url":"assets/js/c4f5d8e4.ae793153.js"},{"revision":"020e80352719aa9010e163051668d494","url":"assets/js/c8b16e43.ee776823.js"},{"revision":"e0f22e6ff8938f5fc304ec6a7ea14654","url":"assets/js/ccc49370.a04d12a0.js"},{"revision":"e0c9dfe2038c87013107a7b1b34b8b16","url":"assets/js/d39bc86f.5b38ac9b.js"},{"revision":"5a4de0b777fcee9740a23b172897c346","url":"assets/js/d537b4b7.92172727.js"},{"revision":"ca7d19a413dc3dcfd6d6d77c530645c8","url":"assets/js/d68cff99.e9a7e58f.js"},{"revision":"2045bdd4343135e87a53665f94c83123","url":"assets/js/df203c0f.acb4f71b.js"},{"revision":"4e2863175d71f92863eb127947297385","url":"assets/js/ef5817d4.dbb94f9b.js"},{"revision":"eb1db4bf52dc3d38a1096459791963d9","url":"assets/js/main.6d1cf376.js"},{"revision":"3d94275838e6af247d7e593ef1f1517e","url":"assets/js/runtime~main.0f081cf8.js"},{"revision":"6e042014c07612ffb502669ac86778e1","url":"blog/archive/index.html"},{"revision":"af52260a365c7f58186b996d7c62ca41","url":"blog/index.html"},{"revision":"ae5a69b00ad46bc3c679463415765ff5","url":"blog/notes-3-2-2022/index.html"},{"revision":"0558f9678ec98fe4a883779018ab00aa","url":"blog/Open-Garden-Day-Planning Session-3-2-2022/index.html"},{"revision":"709724bc3f2872d780258101fda01331","url":"blog/tags/bike/index.html"},{"revision":"c66b3375c7e8183cf50726078fcf45a2","url":"blog/tags/community/index.html"},{"revision":"8ac8b21dd9484955afb15496152449cc","url":"blog/tags/index.html"},{"revision":"b77125d9079763cbcf72159c4a9bceec","url":"blog/tags/open-garden-day/index.html"},{"revision":"a3a3f167ce9118c4f085c51cec29d9c3","url":"events/intro/index.html"},{"revision":"7122c84e2aaad564269be7e6a5d06c40","url":"events/OpenGardenDay2019/index.html"},{"revision":"16a8295eb86561e7302f25440f121217","url":"events/OpenGardenDay2022/index.html"},{"revision":"1b3e55de450f1d0151eb81ecc2cd5402","url":"gardens/Berry-St/index.html"},{"revision":"673497d7f717caa0cc8f1498ed3c89e5","url":"gardens/BrooklynGreenway/index.html"},{"revision":"6fee305eb85b59ea4aa1c64670fe7c73","url":"gardens/BushwickInlet/index.html"},{"revision":"fb323aa20db864c8c7bff7e441f732d5","url":"gardens/Cooperpark/index.html"},{"revision":"cc99e555eb1ebb9c76c021109eec0d83","url":"gardens/El_Puente/index.html"},{"revision":"c1a41c0670bd2c01f7e53fbffc8db0c1","url":"gardens/Franklin/index.html"},{"revision":"d94913e5360420841255a4e22f5fa0de","url":"gardens/GrandStreet/index.html"},{"revision":"0d3357d42b61b20bc0fb4d10b4d61537","url":"gardens/Green-Dome/index.html"},{"revision":"c349d2ebe8ffc9b6a13f42367c86aeb3","url":"gardens/HooperGrove/index.html"},{"revision":"2e01b407eb69bcea909bbc67fa09373f","url":"gardens/index.html"},{"revision":"b69edd7d559cf17a1f4a4ce01ffe7264","url":"gardens/Java-st/index.html"},{"revision":"c7593e2fa359e7196dbed1841ae5ec48","url":"gardens/Keap-fourth/index.html"},{"revision":"313aa48ccf66468bd11abffe8e9badf7","url":"gardens/LaCasitaVerde/index.html"},{"revision":"ce1c8f036919c8b69bb08abdd64837c1","url":"gardens/Lentol/index.html"},{"revision":"0917bb0e331bc01d9f093055303135be","url":"gardens/NorthsideCommunityGarden/index.html"},{"revision":"671de840bf97f9bbf1ef2a5cc01ac6ed","url":"gardens/OliveSt/index.html"},{"revision":"0e9fdbff9633b58a8eebb75b1e659da4","url":"gardens/PowersSt/index.html"},{"revision":"a137e26c27a4d3506951480dd008f6ce","url":"gardens/Red-Shed/index.html"},{"revision":"088a08a81c6e954112ab7efef6600f16","url":"gardens/Scholes-st/index.html"},{"revision":"2f569ed887c34de0b851526468073577","url":"gardens/SouthsideCommunityGarden/index.html"},{"revision":"0607799772398d35b3a97888d3588a6c","url":"gardens/Sunshine-Community/index.html"},{"revision":"add33e3ff643060902cac623dde7d3db","url":"gardens/tags/brooklyn/index.html"},{"revision":"da6e70f472550c69315105eabcc22586","url":"gardens/tags/index.html"},{"revision":"acbcb5e21dd129c4ddd18c47416ae8f6","url":"gardens/TenEyck/index.html"},{"revision":"ddc422595212058d5f34417a4f45cdf1","url":"getting-started/archive/index.html"},{"revision":"1c81b349a3fa1ba209d35defe1758322","url":"getting-started/create-a-blog-post/index.html"},{"revision":"6dbf5e329b604570de6874e6238942ca","url":"getting-started/index.html"},{"revision":"76630552d1bee9b7acf0cb0d7edbec71","url":"index.html"},{"revision":"9fa871559229e3f9e666ea94f4715a49","url":"manifest.json"},{"revision":"210de3d08f4c74084c2165beb1669831","url":"markdown-page/index.html"},{"revision":"161f5f414185e9d2606d445df796531c","url":"assets/images/0-67d0238d169d1fddabb280a0fd4300ef.png"},{"revision":"f0503eee7a3f532957150c802ace0b79","url":"assets/images/1-d548b036f63fb644d8ca22550210ce2a.png"},{"revision":"2d40be662f1e07d73fc86627f8179e47","url":"assets/images/10-89c47a8bfe514716491c582930bf802a.png"},{"revision":"dd5005f6025e3138441c3269bffe0a06","url":"assets/images/11-5a59a345936e7ce01627584883d4f7a7.png"},{"revision":"a5fd7030970634800beb30d21771829e","url":"assets/images/2-b60e8cc61eb143ad8961f5462b34beb4.png"},{"revision":"e5e17d1b37665d6d3292838e52c2217f","url":"assets/images/3-f044f4c61d336b7127c9ebc41a971b4c.png"},{"revision":"117244db0fb4ee96e5aad77a3322b5fd","url":"assets/images/4-0943b32d5bd6e7daf57e0f4460c1861d.png"},{"revision":"3d898695c2b14a605cd512ef02af6c61","url":"assets/images/5-131781f5c82d2bf9d9ea0b5863d5660f.png"},{"revision":"e523dde5c7bc42d438c281e3c17f3e67","url":"assets/images/6-56f7004b31d32d6d6c762e1147ec8531.png"},{"revision":"b3414c8dfcb822b9bc98e54bfe05f8dc","url":"assets/images/7-e62f11c6ecd839da2505e7f02c558235.png"},{"revision":"b30034217edfc049cd7a2cb5c023b532","url":"assets/images/8-ed947e5e77c9230286f92f26b559cfb1.png"},{"revision":"795071941c73dce2b5218dbf6d38beba","url":"assets/images/9-81b9c34b357cdfd080233dd5ab8cf827.png"},{"revision":"80b813135c6d46a80857272c0902b098","url":"icon-192x192.png"},{"revision":"9322c4a1acdbf0d88c426e42980e50a3","url":"icon-256x256.png"},{"revision":"ea3392d7375dc9aa0b5bf7ec3233f89e","url":"icon-384x384.png"},{"revision":"7f8bea500178ce6ad96daebc51b8f6af","url":"icon-512x512.png"},{"revision":"7fa1a026116afe175cae818030d4ffc4","url":"img/docusaurus.png"},{"revision":"4343e07bf942aefb5f334501958fbc0e","url":"img/favicon.ico"},{"revision":"f24c3984a41ab80d80b12c177afac523","url":"img/logo.svg"},{"revision":"b9d9189ed8f8dd58e70d9f8b3f693b3e","url":"img/tutorial/docsVersionDropdown.png"},{"revision":"c14bff79aafafca0957ccc34ee026e2c","url":"img/tutorial/localeDropdown.png"},{"revision":"8d04d316f4d1777793ee773fcbf16cea","url":"img/undraw_docusaurus_mountain.svg"},{"revision":"3d3d63efa464a74e2befd1569465ed21","url":"img/undraw_docusaurus_react.svg"},{"revision":"932b535fc71feb29877bc4b9d708b1d0","url":"img/undraw_docusaurus_tree.svg"},{"revision":"1b73c3364fc806bcfe5b0aa5d6805db3","url":"logo.png"},{"revision":"0ffcbc4e97f36a97a3b3820b4127d3f9","url":"map-2022.svg"},{"revision":"faa399ea54deb40c87a45f91dcd950b2","url":"OpenGarden-Day2022.gif"},{"revision":"ab1a63f290294630d313a987ea94d6c7","url":"Screenshot2022-02-26.png"},{"revision":"efcf3e6dd5f92b3b169965bddccbbd9d","url":"ShareQR2022.png"},{"revision":"161f5f414185e9d2606d445df796531c","url":"urban-gardener/0.png"},{"revision":"f0503eee7a3f532957150c802ace0b79","url":"urban-gardener/1.png"},{"revision":"2d40be662f1e07d73fc86627f8179e47","url":"urban-gardener/10.png"},{"revision":"dd5005f6025e3138441c3269bffe0a06","url":"urban-gardener/11.png"},{"revision":"a5fd7030970634800beb30d21771829e","url":"urban-gardener/2.png"},{"revision":"e5e17d1b37665d6d3292838e52c2217f","url":"urban-gardener/3.png"},{"revision":"117244db0fb4ee96e5aad77a3322b5fd","url":"urban-gardener/4.png"},{"revision":"3d898695c2b14a605cd512ef02af6c61","url":"urban-gardener/5.png"},{"revision":"e523dde5c7bc42d438c281e3c17f3e67","url":"urban-gardener/6.png"},{"revision":"b3414c8dfcb822b9bc98e54bfe05f8dc","url":"urban-gardener/7.png"},{"revision":"b30034217edfc049cd7a2cb5c023b532","url":"urban-gardener/8.png"},{"revision":"795071941c73dce2b5218dbf6d38beba","url":"urban-gardener/9.png"}],s=new v({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=[],s=new URL(e,self.location.href);return s.origin!==self.location.origin||(s.search="",s.hash="",t.push(s.href),s.pathname.endsWith("/")?t.push(`${s.href}index.html`):t.push(`${s.href}/index.html`)),t}(a);for(let i=0;i<n.length;i+=1){const r=n[i],c=s.getCacheKeyForURL(r);if(c){const s=caches.match(c);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:r,possibleURLs:n,cacheKey:c,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});const s=t.data?.type;"SKIP_WAITING"===s&&self.skipWaiting()}))})()})()})();