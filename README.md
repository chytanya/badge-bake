# Bake assertions into images

## Node restrictions
  Using Node version: v0.10.0

  This restriction is because of the `openbadges-bakery` npm module we are using to bake the assertions into the images that relies on this older node version.

### Remote URL Testing
  Use https://localtunnel.me/ to assign a publicly available URL so the test urls can be reached by services like Mozilla Backpack or Badgr.io

  When a new public URL is available, search and replace the old url in the `public/data` directory with this new URL.

### Testing baked badge
  - Create an account on badgr.io
  - Use the email associated with this account and replace it with the `recipient->email` field in `assertion.json`.
  - Optionally update the UID in `assertion.json` file.
  - Delete any existing file at -> `image/baked.png`
  - Run the server and load the route, check if a new file is created at -> `image/baked.png`
  - Upload this image at `My Badges` section on http://badgr.io homepage.
