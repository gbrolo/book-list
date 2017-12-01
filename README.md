# Bookmarker

A simple webpage Bookmarker application made with Electron. Add any webpage and open it via an Electron window or with your
local browser.

## Getting Started

Clone this repository and run
```
npm install
npm start
```

### Prerequisites

You´ll need Node.js and npm. If you want to develop an application based on this and would like for Electron to automatically
refresh the content, then run:

```
npm install electron-reload

```

And uncomment line 6 at main.js

## Deployment

You can package your application via electron-packager

```
npm install -g electron-packager
```

And then run

```
electron-packager .
```

Which will package your application for the OS you are using (Mac, Windows or Linux).

## Built With

* [Electron](https://electronjs.org/) - Used to create desktop applications
* [Node](https://nodejs.org/en/)
* [Bower](https://bower.io/) - Dependency manager for web components


## Authors

* **Gabriel Brolo** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* To Ray Viljoen. You can take his Electron course on [Udemy](https://www.udemy.com/master-electron/)
