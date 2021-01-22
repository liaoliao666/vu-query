import{l as n,f as s,G as a}from"./framework.dc3bd9a4.js";const t='{"title":"Default Query Function","description":"","frontmatter":{"id":"default-query-function","title":"Default Query Function"},"relativePath":"guides/default-query-function.md","lastUpdated":1611340383540}',p={},o=a('<p>If you find yourself wishing for whatever reason that you could just share the same query function for your entire app and just use query keys to identify what it should fetch, you can do that by providing a <strong>default query function</strong> to Vu Query:</p><div class="language-js"><pre><code><span class="token comment">// Define a default query function that will receive the query key</span>\n<span class="token keyword">const</span> <span class="token function-variable function">defaultQueryFn</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> queryKey <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">https://jsonplaceholder.typicode.com</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>queryKey<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> data<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// provide the default query function to your app with defaultOptions</span>\n<span class="token keyword">const</span> queryClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryClient</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  defaultOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n    queries<span class="token operator">:</span> <span class="token punctuation">{</span>\n      queryFn<span class="token operator">:</span> defaultQueryFn<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>QueryClientProvider client<span class="token operator">=</span><span class="token punctuation">{</span>queryClient<span class="token punctuation">}</span><span class="token operator">&gt;</span>\n        <span class="token operator">&lt;</span>YourApp <span class="token operator">/</span><span class="token operator">&gt;</span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>QueryClientProvider<span class="token operator">&gt;</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">// All you have to do now is pass a key!</span>\n<span class="token keyword">function</span> <span class="token function">Posts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> status<span class="token punctuation">,</span> data<span class="token punctuation">,</span> error<span class="token punctuation">,</span> isFetching <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useQuery</span><span class="token punctuation">(</span><span class="token string">&#39;/posts&#39;</span><span class="token punctuation">)</span>\n\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// You can even leave out the queryFn and just go straight into options</span>\n<span class="token keyword">function</span> <span class="token function">Post</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> postId <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> status<span class="token punctuation">,</span> data<span class="token punctuation">,</span> error<span class="token punctuation">,</span> isFetching <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useQuery</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/posts</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>postId<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    enabled<span class="token operator">:</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token function">unref</span><span class="token punctuation">(</span>postId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>If you ever want to override the default queryFn, you can just provide your own like you normally would.</p>',3);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};
