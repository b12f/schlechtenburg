<script setup>
import ExampleEditor from './ExampleEditor'
</script>

# Yet another WYSIWYG editor

Schlechtenburg is an experimental WYSIWYG editor framework made with Vue 3 and TypeScript. It takes cues from both Wordpress' Gutenberg editor and CKEditor, though it tries to become a best of both worlds; a very lightweight, easily extensible core, written with modern components and the accompanying state management.

It inputs and outputs a tree of JSON-serializable data.

This is still in the Proof-of-concept phase.

<div class="cta-row">
  <a href="/schlechtenburg/guide/why" class="button button_cta">Why Schlechtenburg?</a>
  <a href="/schlechtenburg/guide/introduction" class="button">Get Started</a>
  <a href="/schlechtenburg/api" class="button">See the API docs</a>
</div>

<ExampleEditor></ExampleEditor>
