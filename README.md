# apivideodashboard2.0

## Installation

This app requires:

1. ffmpeg installed.  The Livestream comes in as webRTC webm, and is transcoded to FLV to arrive at the RTMP at api.video.
2.  Node JS
3. server must have access to the PSQL DB so ProjectID can be queried to the API Key.

### steps
Clone from Gitlab repo.
create .env file, and add videoDir= with path where videos can be temporarily stored.

## Usage

Query the main page with query strings including projectIds for the account:

Example
?sandbox=prUMsehoEjCfbzxl1eeV00I&production=prgyb7CosLx3tdlUltXHggV

IF there is only a sandbox - the page wil default to the sandbox view.  If there are 2 projectIds, the page will default to production.

the iframe HTML has an example page.  