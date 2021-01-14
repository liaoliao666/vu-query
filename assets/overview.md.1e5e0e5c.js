import{l as n,f as a,G as s}from"./framework.dc3bd9a4.js";const t='{"title":"Overview","description":"","frontmatter":{"id":"overview","title":"Overview"},"headers":[{"level":2,"title":"Motivation","slug":"motivation"},{"level":2,"title":"Enough talk, show me some code already!","slug":"enough-talk-show-me-some-code-already"}],"relativePath":"overview.md","lastUpdated":1610601521825}',e={},p=s('<p>Vu Query is often described as the missing data-fetching library for React, but in more technical terms, it makes <strong>fetching, caching, synchronizing and updating server state</strong> in your React applications a breeze.</p><h2 id="motivation"><a class="header-anchor" href="#motivation" aria-hidden="true">#</a> Motivation</h2><p>While most traditional state management libraries are great for working with client state, they are <strong>not so great at working with async or server state</strong>. This is because <strong>server state is totally different</strong>. For starters, server state:</p><ul><li>Is persisted remotely in a location you do not control or own</li><li>Requires asynchronous APIs for fetching and updating</li><li>Implies shared ownership and can be changed by other people without your knowledge</li><li>Can potentially become &quot;out of date&quot; in your applications if you&#39;re not careful</li></ul><p>Once you grasp the nature of server state in your application, <strong>even more challenges will arise</strong> as you go, for example:</p><ul><li>Caching... (possibly the hardest thing to do in programming)</li><li>Deduping multiple requests for the same data into a single request</li><li>Updating out of date data in the background</li><li>Knowing when data is &quot;out of date&quot;</li><li>Reflecting updates to data as quickly as possible</li><li>Performance optimizations like pagination and lazy loading data</li><li>Managing memory and garbage collection of server state</li><li>Memoizing query results with structural sharing</li></ul><p>If you&#39;re not overwhelmed by that list, then that must mean that you&#39;ve probably solved all of your server state problems already and deserve an award. However, if you are like a vast majority of people, you either have yet to tackle all or most of these challenges and we&#39;re only scratching the surface!</p><p>Vu Query is hands down one of the <em>best</em> libraries for managing server state. It works amazingly well <strong>out-of-the-box, with zero-config, and can be customized</strong> to your liking as your application grows.</p><p>Vu Query allows you to defeat and overcome the tricky challenges and hurdles of <em>server state</em> and control your app data before it starts to control you.</p><p>On a more technical note, Vu Query will likely:</p><ul><li>Help you remove <strong>many</strong> lines of complicated and misunderstood code from your application and replace with just a handful of lines of Vu Query logic.</li><li>Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources</li><li>Have a direct impact on your end-users by making your application feel faster and more responsive than ever before.</li><li>Potentially help you save on bandwidth and increase memory performance</li></ul><h2 id="enough-talk-show-me-some-code-already"><a class="header-anchor" href="#enough-talk-show-me-some-code-already" aria-hidden="true">#</a> Enough talk, show me some code already!</h2><p>In the example below, you can see Vu Query in its most basic and simple form being used to fetch the GitHub stats for the Vu Query GitHub project itself:</p><p><a href="https://codesandbox.io/s/github/liaoliao666/vu-query/tree/master/examples/simple" target="_blank" rel="noopener noreferrer">Open in CodeSandbox</a></p><div class="language-vue"><pre><code>\n// AppWithClient\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> QueryClientProvider<span class="token punctuation">,</span> QueryClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vu-query&#39;</span>\n\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>\n\n<span class="token keyword">const</span> queryClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>QueryClientProvider</span> <span class="token attr-name">:client</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>queryClient<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>App</span> <span class="token punctuation">/&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>QueryClientProvider</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n\n// App\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> toRefs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> useQuery <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vu-query&#39;</span>\n\n<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">useQuery</span><span class="token punctuation">(</span><span class="token string">&#39;repoData&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>\n  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;https://api.github.com/repos/liaoliao666/vu-query&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span>\n    res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span>\n<span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> isLoading<span class="token punctuation">,</span> error<span class="token punctuation">,</span> data<span class="token punctuation">,</span> isFetching <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">toRefs</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isLoading<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Loading...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-else-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>error<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Loading...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-else</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>{{ data.name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>{{ data.description }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">&gt;</span></span>👀 {{ data.subscribers_count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">&gt;</span></span>✨ {{ data.stargazers_count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">&gt;</span></span>🍴 {{ data.forks_count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ isFetching ? &#39;Updating...&#39; : &#39;&#39; }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',15);e.render=function(s,t,e,o,l,c){return n(),a("div",null,[p])};export default e;export{t as __pageData};