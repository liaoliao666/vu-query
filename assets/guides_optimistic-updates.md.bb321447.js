import{l as n,f as s,G as a}from"./framework.dc3bd9a4.js";const t='{"title":"Optimistic Updates","description":"","frontmatter":{"id":"optimistic-updates","title":"Optimistic Updates"},"headers":[{"level":2,"title":"Updating a list of todos when adding a new todo","slug":"updating-a-list-of-todos-when-adding-a-new-todo"},{"level":2,"title":"Updating a single todo","slug":"updating-a-single-todo"}],"relativePath":"guides/optimistic-updates.md","lastUpdated":1611340383540}',o={},p=a('<p>When you optimistically update your state before performing a mutation, there is a non-zero chance that the mutation will fail. In most cases, you can just trigger a refetch for your optimistic queries to revert them to their true server state. In some circumstances though, refetching may not work correctly and the mutation error could represent some type of server issue that won&#39;t make it possible to refetch. In this event, you can instead choose to rollback your update.</p><p>To do this, <code>useMutation</code>&#39;s <code>onMutate</code> handler option allows you to return a value that will later be passed to both <code>onError</code> and <code>onSettled</code> handlers as the last argument. In most cases, it is most useful to pass a rollback function.</p><h2 id="updating-a-list-of-todos-when-adding-a-new-todo"><a class="header-anchor" href="#updating-a-list-of-todos-when-adding-a-new-todo" aria-hidden="true">#</a> Updating a list of todos when adding a new todo</h2><div class="language-js"><pre><code><span class="token keyword">const</span> queryClient <span class="token operator">=</span> <span class="token function">useQueryClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token function">useMutation</span><span class="token punctuation">(</span>updateTodo<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token comment">// When mutate is called:</span>\n  <span class="token function-variable function">onMutate</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token parameter">newTodo</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Cancel any outgoing refetches (so they don&#39;t overwrite our optimistic update)</span>\n    <span class="token keyword">await</span> queryClient<span class="token punctuation">.</span><span class="token function">cancelQueries</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// Snapshot the previous value</span>\n    <span class="token keyword">const</span> previousTodos <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">cloneDeep</span><span class="token punctuation">(</span>queryClient<span class="token punctuation">.</span><span class="token function">getQueryData</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// Optimistically update to the new value</span>\n    queryClient<span class="token punctuation">.</span><span class="token function">setQueryData</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> <span class="token parameter">old</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      old<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newTodo<span class="token punctuation">)</span>\n\n      <span class="token keyword">return</span> old\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// Return a context object with the snapshotted value</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> previousTodos <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// If the mutation fails, use the context returned from onMutate to roll back</span>\n  <span class="token function-variable function">onError</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> newTodo<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    queryClient<span class="token punctuation">.</span><span class="token function">setQueryData</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> context<span class="token punctuation">.</span>previousTodos<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// Always refetch after error or success:</span>\n  <span class="token function-variable function">onSettled</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    queryClient<span class="token punctuation">.</span><span class="token function">invalidateQueries</span><span class="token punctuation">(</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="updating-a-single-todo"><a class="header-anchor" href="#updating-a-single-todo" aria-hidden="true">#</a> Updating a single todo</h2><div class="language-js"><pre><code><span class="token function">useMutation</span><span class="token punctuation">(</span>updateTodo<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token comment">// When mutate is called:</span>\n  <span class="token function-variable function">onMutate</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token parameter">newTodo</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Cancel any outgoing refetches (so they don&#39;t overwrite our optimistic update)</span>\n    <span class="token keyword">await</span> queryClient<span class="token punctuation">.</span><span class="token function">cancelQueries</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>id<span class="token operator">:</span> newTodo<span class="token punctuation">.</span>id<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// Snapshot the previous value</span>\n    <span class="token keyword">const</span> previousTodo <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">cloneDeep</span><span class="token punctuation">(</span>queryClient<span class="token punctuation">.</span><span class="token function">getQueryData</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> newTodo<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// Optimistically update to the new value</span>\n    queryClient<span class="token punctuation">.</span><span class="token function">setQueryData</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>id<span class="token operator">:</span> newTodo<span class="token punctuation">.</span>id<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> _<span class="token punctuation">.</span><span class="token function">cloneDeep</span><span class="token punctuation">(</span>newTodo<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// Return a context with the previous and new todo</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> previousTodo<span class="token punctuation">,</span> newTodo <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// If the mutation fails, use the context we returned above</span>\n  <span class="token function-variable function">onError</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> newTodo<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    queryClient<span class="token punctuation">.</span><span class="token function">setQueryData</span><span class="token punctuation">(</span>\n      <span class="token punctuation">[</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> context<span class="token punctuation">.</span>newTodo<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">,</span>\n      context<span class="token punctuation">.</span>previousTodo\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// Always refetch after error or success:</span>\n  <span class="token function-variable function">onSettled</span><span class="token operator">:</span> <span class="token parameter">newTodo</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    queryClient<span class="token punctuation">.</span><span class="token function">invalidateQueries</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;todos&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>id<span class="token operator">:</span> newTodo<span class="token punctuation">.</span>id<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>You can also use the <code>onSettled</code> function in place of the separate <code>onError</code> and <code>onSuccess</code> handlers if you wish:</p><div class="language-js"><pre><code><span class="token function">useMutation</span><span class="token punctuation">(</span>updateTodo<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  <span class="token function-variable function">onSettled</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">newTodo<span class="token punctuation">,</span> error<span class="token punctuation">,</span> variables<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// do something</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div>',8);o.render=function(a,t,o,e,c,u){return n(),s("div",null,[p])};export default o;export{t as __pageData};
