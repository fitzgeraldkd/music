![K logo](/public/logo64.png)

# My Personal Music Site

## Running

To run locally, navigate to the root directory in your terminal and run these commands:

```bash
npm i
npm start
```

The app should open automatically in your default browser once the server is running.

Note: This app was built using Node v18 and may not work with earlier versions.

## Audio Files

The audio files are served from AWS S3. When releasing new songs, the files either need to be added to a folder that has public read access granted through the bucket policy, or a new statement needs to be added to grant permission to the folder.
