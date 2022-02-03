# Contributing

1. [Introduction](#introduction)
1. [Creating a Preset](#creating-a-preset)
1. [Generating a Preview Image](#generating-a-preview-image)

## Introduction

Thanks for deciding to contribute to Microlink Cards, to make the process of adding a new preset as simple as possible we've put together this short guide.

We look forward to seeing your creations! 😊

> Throughout the steps we will be referring to some directories, to simplify this we'll create a dictionary:
>
> ```
> PRESETS_DIR → /packages/app/src/components/presets
>
> PREVIEWS_DIR → /packages/app/public/preview
> ```

## Creating a Preset

### ⚡️ Fast Route

The quickest way to get up and running is with the `create-preset` script, to utilize this simply navigate to the `app` directory.

```bash
$ cd packages/app
```

The command takes one argument, the **name** of your new preset:

```bash
$ npm run create-script "My Awesome Preset"
```

This will generate a file in `PRESETS_DIR` and `PREVIEWS_DIR`:

- `/packages/app/src/components/presets/my-awesome-preset.js`
- `/packages/app/public/preview/my-awesome-preset.js`

As well as adding an export to `/packages/app/src/components/presets/index.js`

```js
// ...
export { myAwesomePreset } from '/my-awesome-preset'
// ...
```

### Manual Creation

If you prefer to scaffold by hand, you you can do so by creating `my-preset.js` within `PRESETS_DIR`. The structure for naming is as follows:

| file name           | export name       | `name` property   |
| ------------------- | ----------------- | ----------------- |
| `my-awesome-preset` | `myAwesomePreset` | My Awesome Preset |

Next, create a `my-preset.png` in `PREVIEWS_DIR`. Given that you likely don't have a preset yet you can duplicate an existing preset's preview, you'll be able to replace it later (see [Generating a Preview Image](#generating-a-preview-image)).

Finally, you will have to export `myPreset` from `index.js` in `PRESETS_DIR`.

## Generating a Preview Image

If you used the `create-preset` script for generating your preset, you may have noticed that the preview image doesn't match your design. To fix this you will need to manually generate the image. There are two ways of doing this.

### ⚡️ Fast Route

Every pull request spins up a preview environment, you can use this to generate the preview image. Simply open your PR, go to the preset within the preview deployment, and click the template to access the **Direct URL**.

Now just save this image, and replace `/packages/app/public/preview/{my-preset}.png` with it.

### Manual Creation

Head over to https://cards.microlink.io and copy + paste your `code` (minus the `<Inline>` wrap) and `query` into the editor.

As above, click the template to retrieve the **Direct URL**, save the image, and place it in `/packages/app/public/preview/{your-preset}.png`.
