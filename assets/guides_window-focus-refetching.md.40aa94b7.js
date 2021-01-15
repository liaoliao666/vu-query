import{l as n,f as s,G as a}from"./framework.dc3bd9a4.js";const t='{"title":"Window Focus Refetching","description":"","frontmatter":{"id":"window-focus-refetching","title":"Window Focus Refetching"},"headers":[{"level":2,"title":"Custom Window Focus Event","slug":"custom-window-focus-event"},{"level":2,"title":"Ignoring Iframe Focus Events","slug":"ignoring-iframe-focus-events"},{"level":2,"title":"Managing Focus in React Native","slug":"managing-focus-in-react-native"},{"level":2,"title":"Managing focus state","slug":"managing-focus-state"}],"relativePath":"guides/window-focus-refetching.md","lastUpdated":1610694116660}',e={},o=a('<p>If a user leaves your application and returns to stale data, <strong>Vu Query automatically requests fresh data for you in the background</strong>. You can disable this globally or per-query using the <code>refetchOnWindowFocus</code> option:</p><h4 id="disabling-globally"><a class="header-anchor" href="#disabling-globally" aria-hidden="true">#</a> Disabling Globally</h4><div class="language-js"><pre><code><span class="token comment">//</span>\n<span class="token keyword">const</span> queryClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryClient</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  defaultOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n    queries<span class="token operator">:</span> <span class="token punctuation">{</span>\n      refetchOnWindowFocus<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token operator">&lt;</span>QueryClientProvider client<span class="token operator">=</span><span class="token punctuation">{</span>queryClient<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">...</span><span class="token operator">&lt;</span><span class="token operator">/</span>QueryClientProvider<span class="token operator">&gt;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h4 id="disabling-per-query"><a class="header-anchor" href="#disabling-per-query" aria-hidden="true">#</a> Disabling Per-Query</h4><div class="language-js"><pre><code><span class="token function">useQuery</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> fetchTodos<span class="token punctuation">,</span> <span class="token punctuation">{</span> refetchOnWindowFocus<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="custom-window-focus-event"><a class="header-anchor" href="#custom-window-focus-event" aria-hidden="true">#</a> Custom Window Focus Event</h2><p>In rare circumstances, you may want to manage your own window focus events that trigger Vu Query to revalidate. To do this, Vu Query provides a <code>focusManager.setEventListener</code> function that supplies you the callback that should be fired when the window is focused and allows you to set up your own events. When calling <code>focusManager.setEventListener</code>, the previously set handler is removed (which in most cases will be the default handler) and your new handler is used instead. For example, this is the default handler:</p><div class="language-js"><pre><code>focusManager<span class="token punctuation">.</span><span class="token function">setEventListener</span><span class="token punctuation">(</span><span class="token parameter">handleFocus</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Listen to visibillitychange and focus</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> window<span class="token punctuation">.</span>addEventListener<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;visibilitychange&#39;</span><span class="token punctuation">,</span> handleFocus<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>\n    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;focus&#39;</span><span class="token punctuation">,</span> handleFocus<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Be sure to unsubscribe if a new handler is set</span>\n    window<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;visibilitychange&#39;</span><span class="token punctuation">,</span> handleFocus<span class="token punctuation">)</span>\n    window<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;focus&#39;</span><span class="token punctuation">,</span> handleFocus<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="ignoring-iframe-focus-events"><a class="header-anchor" href="#ignoring-iframe-focus-events" aria-hidden="true">#</a> Ignoring Iframe Focus Events</h2><p>A great use-case for replacing the focus handler is that of iframe events. Iframes present problems with detecting window focus by both double-firing events and also firing false-positive events when focusing or using iframes within your app. If you experience this, you should use an event handler that ignores these events as much as possible. I recommend <a href="https://gist.github.com/tannerlinsley/1d3a2122332107fcd8c9cc379be10d88" target="_blank" rel="noopener noreferrer">this one</a>! It can be set up in the following way:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> focusManager <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vu-query&#39;</span>\n<span class="token keyword">import</span> onWindowFocus <span class="token keyword">from</span> <span class="token string">&#39;./onWindowFocus&#39;</span> <span class="token comment">// The gist above</span>\n\nfocusManager<span class="token punctuation">.</span><span class="token function">setEventListener</span><span class="token punctuation">(</span>onWindowFocus<span class="token punctuation">)</span> <span class="token comment">// Boom!</span>\n</code></pre></div><h2 id="managing-focus-in-react-native"><a class="header-anchor" href="#managing-focus-in-react-native" aria-hidden="true">#</a> Managing Focus in React Native</h2><p>Instead of event listeners on <code>window</code>, React Native provides focus information through the <a href="https://reactnative.dev/docs/appstate#app-states" target="_blank" rel="noopener noreferrer"><code>AppState</code> module</a>. You can use the <code>AppState</code> &quot;change&quot; event to trigger an update when the app state changes to &quot;active&quot;:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AppState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-native&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> focusManager <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vu-query&#39;</span>\n\nfocusManager<span class="token punctuation">.</span><span class="token function">setEventListener</span><span class="token punctuation">(</span><span class="token parameter">setFocus</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">handleAppStateChange</span> <span class="token operator">=</span> <span class="token parameter">appState</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">setFocus</span><span class="token punctuation">(</span>appState <span class="token operator">===</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  AppState<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span> handleAppStateChange<span class="token punctuation">)</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    AppState<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span> handleAppStateChange<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="managing-focus-state"><a class="header-anchor" href="#managing-focus-state" aria-hidden="true">#</a> Managing focus state</h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> focusManager <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vu-query&#39;</span>\n\n<span class="token comment">// Override the default focus state</span>\nfocusManager<span class="token punctuation">.</span><span class="token function">setFocused</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>\n\n<span class="token comment">// Fallback to the default focus check</span>\nfocusManager<span class="token punctuation">.</span><span class="token function">setFocused</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span>\n</code></pre></div>',16);e.render=function(a,t,e,p,c,u){return n(),s("div",null,[o])};export default e;export{t as __pageData};