# Appium Test Project - Android

This is a basic test project to demonstrate using Appium to automate apps on Android. The test does the following:   

1. Opens the Contacts app and creates a new contact with a first name, last name, phone number and email address.
2. Opens the Dialer app, searches for the contact, calls them and then hangs up.
3. Goes back to the Contacts app and deletes the contact.

## Requirements

- A valid Android Emulator running at API 33.
  - I recommend installing Android Studio and using it to manage your emulators.
- node.js v17.8

## Initial Setup

1. Clone the repo to a local folder.
2. Open a terminal and go to the repo's folder.
3. Run `npm install`

## Running the Tests

1. Start an Android emulator. You can do this either from terminal or via the Android Studio GUI.
2. Open a terminal.
   1. Go to the folder with the repo.
   2. Run this command to start appium `npx appium`

3. Open another terminal.
   1. Go to the folder with the repo.
   2. Run this command to execute the tests `npm test`