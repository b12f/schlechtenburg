# Why Schlechtenburg?

Installing a WYSIWYG editor in your application or on your website is often the easy part. The hard
part comes afterwards: extending and customizing the editor to fit your specific needs. There are
currently a couple of very good editors, but after reading this text I think you'll agree there's
still room for improvement. We'll be looking at the following alternative WYSIWYG editors:

* [Quill](https://quilljs.com/)
* [CKEditor](https://ckeditor.com/ckeditor-5/)
* [Gutenberg](https://wordpress.org/gutenberg/)

## Block based

Though all three are meant for text editing, Quill and CKEditor are a bit more explicit about this
in their architecture:

* They input and output a string
* They have one global toolbar

Gutenberg is a bit more involved, literally using building "blocks" to create it's editor. Instead
of seeing the content as a long string it takes a more component-esque approach. For example, the
following things are all their own blocks in the gutenberg editor, which a specific react component
that handles the editing mode, and one that handles the display mode.

* Paragraph
* Heading
* List
* Image
* Column-based layout
* External media embeds like YouTube videos

When editing, you are editing, adding or removing one specific block at a time. Blocks can contain
other blocks in a tree structure, and they all have their own (but uniform) editing UI.

Schlechtenburg takes a block based approach, just like its namesake Gutenberg. This has a couple of advantages:

* You can take strong control over the final rendered HTML of a block that you create
* Blocks are easily published as reusable JS modules
* You very rarely need blocks inside text, but the reverse has abundant usecases
* The mental model is closer to how actual HTML works
* Very complex pages can be handled by the editor 
* If you know React or Vue, you understand a lot about how to write blocks for the editor

## Design system with standardized components

Making sure the final rendered data looks correct is always easier than making sure the editing
experience is great. Schlechtenburg aims to offer a vast library of reusable components, patterns,
variables, and rules for the editing UI. We call this **SBUI**. Complex blocks require complex editing forms and UIs so
most of the work goes into creating this UI. A good Design System should help ease the pain.

## Accessible 

Toolbars and editing elements are in the correct tab order, **SBUI** elements are all fully
accessible.

## JSON only

Input and Output is one standardized, typed, JSON-stringifyable object. For example, a paragraph
looks like this:

```
{
  id: '1590592116800',
  name: 'sb-paragraph',
  data: {
    value: 'This is the second paragraph<br>',
    align: 'left'
  }
},
```

The main advantage here is that it enables you to write your own tooling around the format, since
you don't have to deal with HTML or the DOM directly. This also enables really easy subtree rendering,
by just taking that subtree of the JSON and feeding it to a Schlechtenburg instance. if instead of
rendering a full page you'd only want to render the images, you could find all of the `sb-image` nodes
in the tree and rendering them all inside an `sb-layout` block.

## So why not Gutenberg?

Gutenberg is tied heavily into the Wordpress ecosystem, making its inclusion in other sites harder
than necessary.
