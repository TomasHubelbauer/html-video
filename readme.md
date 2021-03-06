# HTML Video

`python3 -m http.server` and go to http://localhost:8000

## To-Do

### See if there is an alternative to `createWriter` to use instead of memory cache

https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry/createWriter

Looks like that is obsolete, probably in favor of:

https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle/createwritable

The file handle here can be obtained by calling `showOpenFilePicker`.

This however does not seem to be well supported. It looks like there is no good way
to save to a file while generating the video data.

### Research the ability to upload the data to an endpoint in chunks

https://web.dev/fetch-upload-streaming

Looks like this is in the works but the support isn't there yet.
Alternatives I've found include API aware of chunks, similar to Range header.

### Revoke URL after download or on unload

Eventually I'll want to add the option to repeat the recording and for that
revoking the URL is a must to avoid memory leaks.

### Add a `svg-screencast` backend to generate animated SVGs over the WebMs

https://github.com/tomashubelbauer/svg-screencast
