# HTML Video

This repository hosts a small web app showing how to use the `MediaRecorder` API
to make a video in plain JavaScript in the browser and offer the video up for
download as a WEBM file.

## Running

Open `index.html`.

## To-Do

### See if there is an alternative to `createWriter` to use instead of memory cache

https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry/createWriter

Looks like that is obsolete, probably in favor of:

https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createwritable

The file handle here can be obtained by calling `showOpenFilePicker`.

This however does not seem to be well supported. It looks like there is no good way
to save to a file while generating the video data.

See:
https://twitter.com/carbon_noreply/status/1585550790231412736/photo/1

### Research the ability to upload the data to an endpoint in chunks

https://web.dev/fetch-upload-streaming

Looks like this is in the works but the support isn't there yet.
Alternatives I've found include API aware of chunks, similar to Range header.

### Revoke URL after download or on unload

Eventually I'll want to add the option to repeat the recording and for that
revoking the URL is a must to avoid memory leaks.

See:
https://twitter.com/carbon_noreply/status/1585550489264889856/photo/1

### Add a `svg-screencast` backend to generate animated SVGs over the WebMs

https://github.com/tomashubelbauer/svg-screencast
