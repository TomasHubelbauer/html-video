# HTML Video

This repository hosts a small web app showing how to use the `MediaRecorder` API
to make a video in plain JavaScript in the browser and offer the video up for
download as a WEBM file.

## Running

Open `index.html`.

## Notes

### WEBM and other video types

No other video types other than WEBM are supported on Firefox as of writing:
https://stackoverflow.com/a/68236494/2715716

### Saving to the file system

Firefox doesn't support `showOpenFilePicker`:
https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker#browser_compatibility

This is needed for `createWritable` which is a replacement for the deprecated
and non-standard `createWriter`.

Until Firefox ships these APIs I have nothing to do here, but if Mozilla ever
does, I will implement saving directly to the file system handle.

## To-Do

### Research the ability to upload the data to an endpoint in chunks

https://web.dev/fetch-upload-streaming

Looks like this is in the works but the support isn't there yet.
Alternatives I've found include API aware of chunks, similar to Range header.

### Add a `svg-screencast` backend to generate animated SVGs over the WebMs

https://github.com/tomashubelbauer/svg-screencast
