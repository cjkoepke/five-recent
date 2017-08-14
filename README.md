# Five Recent - WP Plugin Concept
This was a weekend project to build a concept: WordPress options page that runs entirely through [React](https://reactjs.org). It should **not** be used in production since there is very little sanitation going on via the client.

## Installation
In a terminal (I use [Hyper](https://hyper.is/) and love it), navigate to your local WordPress' plugin folder:
```bash
$ cd /path/to/wordpress/plugins/
```

From there, clone the repo and `cd` into the root folder for the React app:
```bash
$ git clone https://github.com/cjkoepke/five-recent.git && cd five-recent/view
```

Install the dependancies and generate a build. You can either do this via [npm](https://npmjs.org) or [Yarn](https://yarnpkg.com/en/):
```bash
$ yarn install && yarn build
```

After this is done, you can activate the plugin in your WordPress dashboard.

## Usage
Once you've built and activated the plugin in your local WordPress installation, you'll see a new submenu appear under Posts:

![Navigation Submenu for Five Recent](https://github.com/cjkoepke/five-recent/blob/master/docs/navigation.png "Navigation Example")

Once there, you can do the following:

- Change the **Post Title**.
- Change the associated **Featured Image**.
- **Delete** the Post.

Each of these will happen without refreshing the page, but will be persisted to the server. Try it out!

## Tools
I bootstrapped the view layer of this project with [create-react-app](https://github.com/facebookincubator/create-react-app). I highly recommend this as a starting point, no matter your expertise — you can always eject your app later if you want access to the build pipeline and Webpack.

Beyond that, I utilized the following dependencies:

#### Node WPAPI
From the docs: "An isomorphic JavaScript client for the WordPress REST API that makes it easy for your JavaScript application to request specific resources from a WordPress website."

This client seriously rocks. It's super easy to do just about anything you would do with PHP. This particular app passes a nonce instance to the React WPAPI instance to verify the logged in user.

[See Documentation](http://wp-api.org/node-wpapi/)

#### Component File Picker
A really simple, intuitive component to handle file uploads without having to use the `<input type="file">` interface (which can make things ugly).

[See Documentation](https://www.npmjs.com/package/component-file-picker)

## Contributing
If you would like to contribute to this plugin (i.e. you have suggestions on structure, want to expand functionality, or think it could be done better), feel free to [submit a pull request](https://github.com/cjkoepke/five-recent/compare).

Please keep in mind that since this is a side-project and simply for gaining experience with the WPAPI and React relationship, pull requests may or may not be merged. Therefore, any submissions should be done purely as an afterthought of the initial desire to learn and play with the plugin, and not as the primary goal. ;-)
