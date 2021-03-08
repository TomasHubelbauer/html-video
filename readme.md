# HTML Video

`python3 -m http.server` and go to http://localhost:8000

## To-Do

### See if there is an alternative to `createWriter` to use instead of memory cache

https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry/createWriter

### Research the ability to upload the data to an endpoint in chunks

https://web.dev/fetch-upload-streaming

Looks like this is in the works but the support isn't there yet.
Alternatives I've found include API aware of chunks, similar to Range header.

### Revoke URL after download or on unload

Eventually I'll want to add the option to repeat the recording and for that
revoking the URL is a must to avoid memory leaks.

