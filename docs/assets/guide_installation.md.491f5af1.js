import{_ as n,c as a,o as s,a as t}from"./app.d1307649.js";const g=`{"title":"Installation","description":"","frontmatter":{},"headers":[{"level":2,"title":"You're not yet using Vue","slug":"you-re-not-yet-using-vue"},{"level":3,"title":"Install npm packages","slug":"install-npm-packages"},{"level":3,"title":"Initializing the editor","slug":"initializing-the-editor"},{"level":2,"title":"You're already using Vue","slug":"you-re-already-using-vue"},{"level":3,"title":"Install npm packages","slug":"install-npm-packages-1"},{"level":3,"title":"Using the editor component","slug":"using-the-editor-component"}],"relativePath":"guide/installation.md"}`,e={},o=t(`<h1 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h1><p>Schlechtenburg is very modular; consisting of one core package and multiple blocks. All packages are versioned together, meaning that v2.0.3 of one package is guaranteed to work with v2.0.3 of another schlechtenburg package.</p><p>Schlechtenburg is basically one Vue component, so if you&#39;re already using Vue you can import and use it directly. Otherwise, there&#39;s the standalone version that comes prepackaged with Vue.</p><h2 id="you-re-not-yet-using-vue" tabindex="-1">You&#39;re not yet using Vue <a class="header-anchor" href="#you-re-not-yet-using-vue" aria-hidden="true">#</a></h2><h3 id="install-npm-packages" tabindex="-1">Install npm packages <a class="header-anchor" href="#install-npm-packages" aria-hidden="true">#</a></h3><p>Install the standalone editor and any blocks you want to use:</p><div class="language-ts"><pre><code>npm i <span class="token operator">--</span>save <span class="token decorator"><span class="token at operator">@</span><span class="token function">schlechtenburg</span></span><span class="token operator">/</span>standalone \\
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">schlechtenburg</span></span><span class="token operator">/</span>layout \\
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">schlechtenburg</span></span><span class="token operator">/</span>heading \\
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">schlechtenburg</span></span><span class="token operator">/</span>paragraph
</code></pre></div><h3 id="initializing-the-editor" tabindex="-1">Initializing the editor <a class="header-anchor" href="#initializing-the-editor" aria-hidden="true">#</a></h3><div class="language-ts"><pre><code><span class="token comment">// Import the initialization function</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> startSchlechtenburg <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/standalone&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbMode <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/core&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// The following are some Schlechtenburg blocks that</span>
<span class="token comment">// will be available when editing or viewing</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  SbLayout<span class="token punctuation">,</span>
  getDefaultData <span class="token keyword">as</span> getEmptyLayoutBlock<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/layout&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbHeading <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/heading&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbParagraph <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/paragraph&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbImage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/image&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// This will be our input state</span>
<span class="token keyword">const</span> emptyLayout <span class="token operator">=</span> <span class="token function">getEmptyLayoutBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// This call initializes the Schlechtenburg editor and viewer.</span>
<span class="token function">useSchlechtenburg</span><span class="token punctuation">(</span>
  <span class="token comment">// Selector of the element the editor should bind to.</span>
  <span class="token comment">// Can also the an \`HTMLElement\` reference.</span>
  <span class="token string">&#39;#editor&#39;</span><span class="token punctuation">,</span> 
  <span class="token punctuation">{</span>
    <span class="token comment">// The input block data</span>
    block<span class="token operator">:</span> emptyLayout<span class="token punctuation">,</span>

    <span class="token comment">// Whether Schlechtenburg is in what-you-see (editing)</span>
    <span class="token comment">// or in what-you-get (viewing)</span>
    mode<span class="token operator">:</span> SbMode<span class="token punctuation">.</span>Edit<span class="token punctuation">,</span>

    <span class="token comment">// The list of available blocks in this editor instance</span>
    availableBlocks<span class="token operator">:</span> <span class="token punctuation">[</span>
      SbLayout<span class="token punctuation">,</span>
      SbHeading<span class="token punctuation">,</span>
      SbParagraph<span class="token punctuation">,</span>
      SbImage<span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// This callback will be alled any time the block data gets updated</span>
    <span class="token function-variable function">onUpdate</span><span class="token operator">:</span> <span class="token punctuation">(</span>blockData<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Got new block data&#39;</span><span class="token punctuation">,</span> blockData<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// </span>
<span class="token punctuation">)</span>

</code></pre></div><p><strong>Note:</strong> You need to provide both a root node</p><h2 id="you-re-already-using-vue" tabindex="-1">You&#39;re already using Vue <a class="header-anchor" href="#you-re-already-using-vue" aria-hidden="true">#</a></h2><h3 id="install-npm-packages-1" tabindex="-1">Install npm packages <a class="header-anchor" href="#install-npm-packages-1" aria-hidden="true">#</a></h3><p>Install the editor core and any blocks you want to use:</p><div class="language-"><pre><code>npm i --save @schlechtenburg/core \\
  @schlechtenburg/layout \\
  @schlechtenburg/heading \\
  @schlechtenburg/paragraph
</code></pre></div><h3 id="using-the-editor-component" tabindex="-1">Using the editor component <a class="header-anchor" href="#using-the-editor-component" aria-hidden="true">#</a></h3><p>The following example uses TSX, but <code>SbMain</code> is just a Vue component here and can be imported and used just like any other vue component.</p><p>You need to provide a root</p><div class="language-tsx"><pre><code><span class="token comment">// This is the main Schlechtenburg component</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbMain <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/core&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// The following are some Schlechtenburg blocks that will be available when editing or viewing</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbLayout <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/layout&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbHeading <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/heading&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbParagraph <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/paragraph&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> SbImage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@schlechtenburg/image&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// In your component</span>
<span class="token function">setup</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ..</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">SbMain</span></span>
    <span class="token attr-name">availableBlocks</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>
      SbLayout<span class="token punctuation">,</span>
      SbHeading<span class="token punctuation">,</span>
      SbParagraph<span class="token punctuation">,</span>
      SbImage<span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">}</span></span>
  <span class="token punctuation">/&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,18),p=[o];function c(l,i,u,r,k,h){return s(),a("div",null,p)}var m=n(e,[["render",c]]);export{g as __pageData,m as default};
