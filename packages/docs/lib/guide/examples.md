<script setup>
import ExampleEditor from '../ExampleEditor'
import ExampleStandaloneEditor from '../ExampleStandaloneEditor'
</script>

# Examples

## As a View Component

This documentation website already uses Vue under the hood, so Schlechtenburg can just imported as
any other component:

<ExampleEditor></ExampleEditor>

## Standalone

`@schlechtenburg/standalone` gives you a wrapped version of the editor in case you don't have Vue
already installed in your application

<ExampleStandaloneEditor></ExampleStandaloneEditor>
