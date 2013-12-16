window["STRd6/rombo:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "rombo\n=====\n\nExplore binary data\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\nremoteDependencies: [\n  \"https://code.jquery.com/jquery-1.10.1.min.js\"\n  \"https://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js\"\n  \"https://pixipaint.net/envweb-v0.4.7.js\"\n]\ndependencies:\n  appcache: \"distri/appcache:v0.2.0\"\n  byte_array: \"distri/byte_array:v0.1.1\"\n  runtime: \"STRd6/runtime:v0.2.0\"\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Rombo\n=====\n\nExplore binary data.\n\n    require \"./setup\"\n\n    ByteArray = require \"byte_array\"\n    FileReading = require(\"./lib/file_reading\")\n    Modal = require(\"./lib/modal\")\n    \n    $ ->\n      Modal.show FileReading.binaryReaderInput\n        success: (arrayBuffer) ->\n          console.log arrayBuffer\n        error: (evt) ->\n          console.log evt\n        complete: ->\n          Modal.hide()\n",
      "type": "blob"
    },
    "lib/file_reading.coffee.md": {
      "path": "lib/file_reading.coffee.md",
      "mode": "100644",
      "content": "File Reading\n============\n\nRead files from a file input triggering an event when a person chooses a file.\n\nCurrently we only care about json, image, and text files, though we may care\nabout others later.\n\n    detectType = (file) ->\n      if file.type.match /^image\\//\n        return \"image\"\n\n      if file.name.match /\\.json$/\n        return \"json\"\n\n      return \"text\"\n\n    module.exports =\n\nCreate an input to read a file as a binary array.\n\n      binaryReaderInput: ({complete, error, success}) ->\n        input = document.createElement('input')\n        input.type = \"file\"\n\n        input.onchange = ->\n          reader = new FileReader()\n\n          file = input.files[0]\n\n          reader.onload = (evt) ->\n            success evt.target.result\n            complete?()\n\n          reader.onerror = (evt) -> \n            error evt\n            complete?()\n\n          reader.readAsArrayBuffer(file)\n\n        return input\n\n      readerInput: ({chose, encoding, image, json, text, accept}) ->\n        accept ?= \"image/gif,image/png\"\n        encoding ?= \"UTF-8\"\n\n        input = document.createElement('input')\n        input.type = \"file\"\n        input.setAttribute \"accept\", accept\n\n        input.onchange = ->\n          reader = new FileReader()\n\n          file = input.files[0]\n\n          switch detectType(file)\n            when \"image\"\n              reader.onload = (evt) ->\n                image? evt.target.result\n\n              reader.readAsDataURL(file)\n            when \"json\"\n              reader.onload = (evt) ->\n                json? JSON.parse evt.target.result\n\n              reader.readAsText(file, encoding)\n            when \"text\"\n              reader.onload = (evt) ->\n                text? evt.target.result\n\n              reader.readAsText(file, encoding)\n\n          chose(file)\n\n        return input\n",
      "type": "blob"
    },
    "style.styl": {
      "path": "style.styl",
      "mode": "100644",
      "content": "body\n  margin: 0\n  overflow: hidden\n\n#modal\n  background-color: rgba(0, 0, 0, 0.25)\n  display: none\n  position: absolute\n  z-index: 9000\n  top: 0\n\n  input[type=file]\n    box-sizing: border-box\n    padding: 5em 2em\n    width: 320px\n    height: 180px\n\n  & > *\n    background-color: white\n    border: 1px solid black\n    margin: auto\n    position: absolute\n    top: 0\n    bottom: 0\n    left: 0\n    right: 0\n\n  &.active\n    display: block\n    width: 100%\n    height: 100%\n",
      "type": "blob"
    },
    "setup.coffee.md": {
      "path": "setup.coffee.md",
      "mode": "100644",
      "content": "Setup\n=====\n\nSet up our runtime styles and expose some stuff for debugging.\n\n    # For debug purposes\n    global.PACKAGE = PACKAGE\n    global.require = require\n\n    runtime = require(\"runtime\")(PACKAGE)\n    runtime.boot()\n    runtime.applyStyleSheet(require('./style'))\n\n    # Updating Application Cache and prompting for new version\n    require \"appcache\"\n",
      "type": "blob"
    },
    "lib/modal.coffee.md": {
      "path": "lib/modal.coffee.md",
      "mode": "100644",
      "content": "Modal\n=====\n\nMessing around with some modal BS\n\n    # HACK: Dismiss modal by clicking on overlay\n    $ ->\n      $ \"<div>\",\n        id: \"modal\"\n      .appendTo \"body\"\n\n      $(\"#modal\").click (e) ->\n        if e.target is this\n          Modal.hide()\n\n    module.exports = Modal =\n      show: (element) ->\n        $(\"#modal\").empty().append(element).addClass(\"active\")\n\n      hide: ->\n        $(\"#modal\").removeClass(\"active\")\n",
      "type": "blob"
    }
  },
  "distribution": {
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\",\"remoteDependencies\":[\"https://code.jquery.com/jquery-1.10.1.min.js\",\"https://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js\",\"https://pixipaint.net/envweb-v0.4.7.js\"],\"dependencies\":{\"appcache\":\"distri/appcache:v0.2.0\",\"byte_array\":\"distri/byte_array:v0.1.1\",\"runtime\":\"STRd6/runtime:v0.2.0\"}};",
      "type": "blob"
    },
    "main": {
      "path": "main",
      "content": "(function() {\n  var ByteArray, FileReading, Modal;\n\n  require(\"./setup\");\n\n  ByteArray = require(\"byte_array\");\n\n  FileReading = require(\"./lib/file_reading\");\n\n  Modal = require(\"./lib/modal\");\n\n  $(function() {\n    return Modal.show(FileReading.binaryReaderInput({\n      success: function(arrayBuffer) {\n        return console.log(arrayBuffer);\n      },\n      error: function(evt) {\n        return console.log(evt);\n      },\n      complete: function() {\n        return Modal.hide();\n      }\n    }));\n  });\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "lib/file_reading": {
      "path": "lib/file_reading",
      "content": "(function() {\n  var detectType;\n\n  detectType = function(file) {\n    if (file.type.match(/^image\\//)) {\n      return \"image\";\n    }\n    if (file.name.match(/\\.json$/)) {\n      return \"json\";\n    }\n    return \"text\";\n  };\n\n  module.exports = {\n    binaryReaderInput: function(_arg) {\n      var complete, error, input, success;\n      complete = _arg.complete, error = _arg.error, success = _arg.success;\n      input = document.createElement('input');\n      input.type = \"file\";\n      input.onchange = function() {\n        var file, reader;\n        reader = new FileReader();\n        file = input.files[0];\n        reader.onload = function(evt) {\n          success(evt.target.result);\n          return typeof complete === \"function\" ? complete() : void 0;\n        };\n        reader.onerror = function(evt) {\n          error(evt);\n          return typeof complete === \"function\" ? complete() : void 0;\n        };\n        return reader.readAsArrayBuffer(file);\n      };\n      return input;\n    },\n    readerInput: function(_arg) {\n      var accept, chose, encoding, image, input, json, text;\n      chose = _arg.chose, encoding = _arg.encoding, image = _arg.image, json = _arg.json, text = _arg.text, accept = _arg.accept;\n      if (accept == null) {\n        accept = \"image/gif,image/png\";\n      }\n      if (encoding == null) {\n        encoding = \"UTF-8\";\n      }\n      input = document.createElement('input');\n      input.type = \"file\";\n      input.setAttribute(\"accept\", accept);\n      input.onchange = function() {\n        var file, reader;\n        reader = new FileReader();\n        file = input.files[0];\n        switch (detectType(file)) {\n          case \"image\":\n            reader.onload = function(evt) {\n              return typeof image === \"function\" ? image(evt.target.result) : void 0;\n            };\n            reader.readAsDataURL(file);\n            break;\n          case \"json\":\n            reader.onload = function(evt) {\n              return typeof json === \"function\" ? json(JSON.parse(evt.target.result)) : void 0;\n            };\n            reader.readAsText(file, encoding);\n            break;\n          case \"text\":\n            reader.onload = function(evt) {\n              return typeof text === \"function\" ? text(evt.target.result) : void 0;\n            };\n            reader.readAsText(file, encoding);\n        }\n        return chose(file);\n      };\n      return input;\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=lib/file_reading.coffee",
      "type": "blob"
    },
    "style": {
      "path": "style",
      "content": "module.exports = \"body {\\n  margin: 0;\\n  overflow: hidden;\\n}\\n\\n#modal {\\n  background-color: rgba(0, 0, 0, 0.25);\\n  display: none;\\n  position: absolute;\\n  z-index: 9000;\\n  top: 0;\\n}\\n\\n#modal input[type=file] {\\n  padding: 5em 2em;\\n  width: 320px;\\n  height: 180px;\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\n#modal > * {\\n  background-color: white;\\n  border: 1px solid black;\\n  margin: auto;\\n  position: absolute;\\n  top: 0;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n}\\n\\n#modal.active {\\n  display: block;\\n  width: 100%;\\n  height: 100%;\\n}\";",
      "type": "blob"
    },
    "setup": {
      "path": "setup",
      "content": "(function() {\n  var runtime;\n\n  global.PACKAGE = PACKAGE;\n\n  global.require = require;\n\n  runtime = require(\"runtime\")(PACKAGE);\n\n  runtime.boot();\n\n  runtime.applyStyleSheet(require('./style'));\n\n  require(\"appcache\");\n\n}).call(this);\n\n//# sourceURL=setup.coffee",
      "type": "blob"
    },
    "lib/modal": {
      "path": "lib/modal",
      "content": "(function() {\n  var Modal;\n\n  $(function() {\n    $(\"<div>\", {\n      id: \"modal\"\n    }).appendTo(\"body\");\n    return $(\"#modal\").click(function(e) {\n      if (e.target === this) {\n        return Modal.hide();\n      }\n    });\n  });\n\n  module.exports = Modal = {\n    show: function(element) {\n      return $(\"#modal\").empty().append(element).addClass(\"active\");\n    },\n    hide: function() {\n      return $(\"#modal\").removeClass(\"active\");\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=lib/modal.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "remoteDependencies": [
    "https://code.jquery.com/jquery-1.10.1.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/coffee-script/1.6.3/coffee-script.min.js",
    "https://pixipaint.net/envweb-v0.4.7.js"
  ],
  "repository": {
    "id": 15213493,
    "name": "rombo",
    "full_name": "STRd6/rombo",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/rombo",
    "description": "Explore binary data",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/rombo",
    "forks_url": "https://api.github.com/repos/STRd6/rombo/forks",
    "keys_url": "https://api.github.com/repos/STRd6/rombo/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/rombo/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/rombo/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/rombo/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/rombo/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/rombo/events",
    "assignees_url": "https://api.github.com/repos/STRd6/rombo/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/rombo/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/rombo/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/rombo/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/rombo/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/rombo/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/rombo/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/rombo/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/rombo/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/rombo/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/rombo/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/rombo/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/rombo/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/rombo/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/rombo/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/rombo/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/rombo/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/rombo/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/rombo/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/rombo/merges",
    "archive_url": "https://api.github.com/repos/STRd6/rombo/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/rombo/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/rombo/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/rombo/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/rombo/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/rombo/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/rombo/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/rombo/releases{/id}",
    "created_at": "2013-12-16T00:14:45Z",
    "updated_at": "2013-12-16T00:14:45Z",
    "pushed_at": "2013-12-16T00:14:45Z",
    "git_url": "git://github.com/STRd6/rombo.git",
    "ssh_url": "git@github.com:STRd6/rombo.git",
    "clone_url": "https://github.com/STRd6/rombo.git",
    "svn_url": "https://github.com/STRd6/rombo",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 0,
    "subscribers_count": 1,
    "branch": "master",
    "defaultBranch": "master"
  },
  "dependencies": {
    "appcache": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "appcache\n========\n\nHTML5 AppCache Helpers\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "App Cache\n=========\n\nSome helpers for working with HTML5 application cache.\n\nhttp://www.html5rocks.com/en/tutorials/appcache/beginner/\n\n    applicationCache = window.applicationCache\n\n    applicationCache.addEventListener 'updateready', (e) ->\n      if applicationCache.status is applicationCache.UPDATEREADY\n        # Browser downloaded a new app cache.\n        if confirm('A new version of this site is available. Load it?')\n          window.location.reload()\n    , false\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nentryPoint: \"main\"\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var applicationCache;\n\n  applicationCache = window.applicationCache;\n\n  applicationCache.addEventListener('updateready', function(e) {\n    if (applicationCache.status === applicationCache.UPDATEREADY) {\n      if (confirm('A new version of this site is available. Load it?')) {\n        return window.location.reload();\n      }\n    }\n  }, false);\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"main\"};",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "repository": {
        "id": 14539483,
        "name": "appcache",
        "full_name": "distri/appcache",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/appcache",
        "description": "HTML5 AppCache Helpers",
        "fork": false,
        "url": "https://api.github.com/repos/distri/appcache",
        "forks_url": "https://api.github.com/repos/distri/appcache/forks",
        "keys_url": "https://api.github.com/repos/distri/appcache/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/appcache/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/appcache/teams",
        "hooks_url": "https://api.github.com/repos/distri/appcache/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/appcache/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/appcache/events",
        "assignees_url": "https://api.github.com/repos/distri/appcache/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/appcache/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/appcache/tags",
        "blobs_url": "https://api.github.com/repos/distri/appcache/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/appcache/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/appcache/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/appcache/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/appcache/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/appcache/languages",
        "stargazers_url": "https://api.github.com/repos/distri/appcache/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/appcache/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/appcache/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/appcache/subscription",
        "commits_url": "https://api.github.com/repos/distri/appcache/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/appcache/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/appcache/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/appcache/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/appcache/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/appcache/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/appcache/merges",
        "archive_url": "https://api.github.com/repos/distri/appcache/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/appcache/downloads",
        "issues_url": "https://api.github.com/repos/distri/appcache/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/appcache/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/appcache/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/appcache/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/appcache/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/appcache/releases{/id}",
        "created_at": "2013-11-19T22:09:16Z",
        "updated_at": "2013-11-29T20:49:51Z",
        "pushed_at": "2013-11-19T22:10:28Z",
        "git_url": "git://github.com/distri/appcache.git",
        "ssh_url": "git@github.com:distri/appcache.git",
        "clone_url": "https://github.com/distri/appcache.git",
        "svn_url": "https://github.com/distri/appcache",
        "homepage": null,
        "size": 240,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {}
    },
    "byte_array": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "byte_array\n==========\n\nStore bytes in an array. Serialize and restore from JSON\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Byte Array\n=========\n\nExperiment to store an array of 8-bit data and serialize back and forth from JSON.\n\n    module.exports = (sizeOrData) ->\n      if typeof sizeOrData is \"string\"\n        view = deserialize(sizeOrData)\n      else\n        buffer = new ArrayBuffer(sizeOrData)\n        view = new Uint8Array(buffer)\n\n      self =\n        get: (i) ->\n          return view[i]\n\n        set: (i, value) ->\n          view[i] = value\n\n          return self.get(i)\n\n        size: ->\n          view.length\n\n        toJSON: ->\n          serialize(view)\n\n    mimeType = \"application/octet-binary\"\n\n    deserialize = (dataURL) ->\n      dataString = dataURL.substring(dataURL.indexOf(';') + 1)\n\n      binaryString = atob(dataString)\n      length =  binaryString.length\n\n      buffer = new ArrayBuffer length\n\n      view = new Uint8Array(buffer)\n\n      i = 0\n      while i < length\n        view[i] = binaryString.charCodeAt(i)\n        i += 1\n\n      return view\n\n    serialize = (bytes) ->\n      binary = ''\n      length = bytes.byteLength\n\n      i = 0\n      while i < length\n        binary += String.fromCharCode(bytes[i])\n        i += 1\n\n      \"data:#{mimeType};#{btoa(binary)}\"\n",
          "type": "blob"
        },
        "test/byte_array.coffee": {
          "path": "test/byte_array.coffee",
          "mode": "100644",
          "content": "ByteArray = require \"../main\"\n\ntestPattern = (n) ->\n  byteArray = ByteArray(256)\n\n  [0...256].forEach (i) ->\n    byteArray.set(i, i % n is 0)\n\n  reloadedArray = ByteArray(byteArray.toJSON())\n\n  [0...256].forEach (i) ->\n    test = 0 | (i % n is 0)\n    assert.equal reloadedArray.get(i), test, \"Byte #{i} is #{test}\"\n\ndescribe \"ByteArray\", ->\n  it \"should be empty to start\", ->\n    byteArray = ByteArray(256)\n\n    [0...256].forEach (i) ->\n      assert.equal byteArray.get(i), 0\n\n  it \"should be able to set and get byts\", ->\n    byteArray = ByteArray(512)\n\n    [0...512].forEach (i) ->\n      byteArray.set(i, i)\n\n    [0...512].forEach (i) ->\n      assert.equal byteArray.get(i), i % 256\n\n  it \"should be serializable and deserializable\", ->\n    byteArray = ByteArray(512)\n\n    [0...512].forEach (i) ->\n      byteArray.set(i, i)\n\n    reloadedArray = ByteArray(byteArray.toJSON())\n\n    [0...512].forEach (i) ->\n      assert.equal reloadedArray.get(i), i % 256, \"Byte #{i} is #{i % 256}\"\n\n  it \"should be serializable and deserializable with various patterns\", ->\n    testPattern(1)\n    testPattern(2)\n    testPattern(3)\n    testPattern(4)\n    testPattern(5)\n    testPattern(7)\n    testPattern(11)\n    testPattern(32)\n    testPattern(63)\n    testPattern(64)\n    testPattern(77)\n    testPattern(128)\n\n  # Some may wish for this to throw an error, but normal JS arrays don't\n  # and by default neither do typed arrays so this is just 'going with the flow'\n  it \"should silently discard setting out of range values\", ->\n    byteArray = ByteArray(8)\n\n    assert.equal byteArray.set(9, 1), undefined\n    assert.equal byteArray.get(9), undefined\n\n  it \"should know its size\", ->\n    byteArray = ByteArray(128)\n\n    assert.equal byteArray.size(), 128\n\n  it \"shouldn't be too big when serializing as json\", ->\n    byteLength = 2048\n    byteArray = ByteArray(byteLength)\n\n    serializedLength = byteArray.toJSON().length\n\n    n = 0.70\n    assert serializedLength < byteLength / n, \"Serialized length < bit length divided by #{n} : #{serializedLength} < #{byteLength / n}\"\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.1\"\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var deserialize, mimeType, serialize;\n\n  module.exports = function(sizeOrData) {\n    var buffer, self, view;\n    if (typeof sizeOrData === \"string\") {\n      view = deserialize(sizeOrData);\n    } else {\n      buffer = new ArrayBuffer(sizeOrData);\n      view = new Uint8Array(buffer);\n    }\n    return self = {\n      get: function(i) {\n        return view[i];\n      },\n      set: function(i, value) {\n        view[i] = value;\n        return self.get(i);\n      },\n      size: function() {\n        return view.length;\n      },\n      toJSON: function() {\n        return serialize(view);\n      }\n    };\n  };\n\n  mimeType = \"application/octet-binary\";\n\n  deserialize = function(dataURL) {\n    var binaryString, buffer, dataString, i, length, view;\n    dataString = dataURL.substring(dataURL.indexOf(';') + 1);\n    binaryString = atob(dataString);\n    length = binaryString.length;\n    buffer = new ArrayBuffer(length);\n    view = new Uint8Array(buffer);\n    i = 0;\n    while (i < length) {\n      view[i] = binaryString.charCodeAt(i);\n      i += 1;\n    }\n    return view;\n  };\n\n  serialize = function(bytes) {\n    var binary, i, length;\n    binary = '';\n    length = bytes.byteLength;\n    i = 0;\n    while (i < length) {\n      binary += String.fromCharCode(bytes[i]);\n      i += 1;\n    }\n    return \"data:\" + mimeType + \";\" + (btoa(binary));\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "test/byte_array": {
          "path": "test/byte_array",
          "content": "(function() {\n  var ByteArray, testPattern;\n\n  ByteArray = require(\"../main\");\n\n  testPattern = function(n) {\n    var byteArray, reloadedArray, _i, _j, _results, _results1;\n    byteArray = ByteArray(256);\n    (function() {\n      _results = [];\n      for (_i = 0; _i < 256; _i++){ _results.push(_i); }\n      return _results;\n    }).apply(this).forEach(function(i) {\n      return byteArray.set(i, i % n === 0);\n    });\n    reloadedArray = ByteArray(byteArray.toJSON());\n    return (function() {\n      _results1 = [];\n      for (_j = 0; _j < 256; _j++){ _results1.push(_j); }\n      return _results1;\n    }).apply(this).forEach(function(i) {\n      var test;\n      test = 0 | (i % n === 0);\n      return assert.equal(reloadedArray.get(i), test, \"Byte \" + i + \" is \" + test);\n    });\n  };\n\n  describe(\"ByteArray\", function() {\n    it(\"should be empty to start\", function() {\n      var byteArray, _i, _results;\n      byteArray = ByteArray(256);\n      return (function() {\n        _results = [];\n        for (_i = 0; _i < 256; _i++){ _results.push(_i); }\n        return _results;\n      }).apply(this).forEach(function(i) {\n        return assert.equal(byteArray.get(i), 0);\n      });\n    });\n    it(\"should be able to set and get byts\", function() {\n      var byteArray, _i, _j, _results, _results1;\n      byteArray = ByteArray(512);\n      (function() {\n        _results = [];\n        for (_i = 0; _i < 512; _i++){ _results.push(_i); }\n        return _results;\n      }).apply(this).forEach(function(i) {\n        return byteArray.set(i, i);\n      });\n      return (function() {\n        _results1 = [];\n        for (_j = 0; _j < 512; _j++){ _results1.push(_j); }\n        return _results1;\n      }).apply(this).forEach(function(i) {\n        return assert.equal(byteArray.get(i), i % 256);\n      });\n    });\n    it(\"should be serializable and deserializable\", function() {\n      var byteArray, reloadedArray, _i, _j, _results, _results1;\n      byteArray = ByteArray(512);\n      (function() {\n        _results = [];\n        for (_i = 0; _i < 512; _i++){ _results.push(_i); }\n        return _results;\n      }).apply(this).forEach(function(i) {\n        return byteArray.set(i, i);\n      });\n      reloadedArray = ByteArray(byteArray.toJSON());\n      return (function() {\n        _results1 = [];\n        for (_j = 0; _j < 512; _j++){ _results1.push(_j); }\n        return _results1;\n      }).apply(this).forEach(function(i) {\n        return assert.equal(reloadedArray.get(i), i % 256, \"Byte \" + i + \" is \" + (i % 256));\n      });\n    });\n    it(\"should be serializable and deserializable with various patterns\", function() {\n      testPattern(1);\n      testPattern(2);\n      testPattern(3);\n      testPattern(4);\n      testPattern(5);\n      testPattern(7);\n      testPattern(11);\n      testPattern(32);\n      testPattern(63);\n      testPattern(64);\n      testPattern(77);\n      return testPattern(128);\n    });\n    it(\"should silently discard setting out of range values\", function() {\n      var byteArray;\n      byteArray = ByteArray(8);\n      assert.equal(byteArray.set(9, 1), void 0);\n      return assert.equal(byteArray.get(9), void 0);\n    });\n    it(\"should know its size\", function() {\n      var byteArray;\n      byteArray = ByteArray(128);\n      return assert.equal(byteArray.size(), 128);\n    });\n    return it(\"shouldn't be too big when serializing as json\", function() {\n      var byteArray, byteLength, n, serializedLength;\n      byteLength = 2048;\n      byteArray = ByteArray(byteLength);\n      serializedLength = byteArray.toJSON().length;\n      n = 0.70;\n      return assert(serializedLength < byteLength / n, \"Serialized length < bit length divided by \" + n + \" : \" + serializedLength + \" < \" + (byteLength / n));\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/byte_array.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.1\"};",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.1.1",
      "entryPoint": "main",
      "repository": {
        "id": 14937369,
        "name": "byte_array",
        "full_name": "distri/byte_array",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/byte_array",
        "description": "Store bytes in an array. Serialize and restore from JSON",
        "fork": false,
        "url": "https://api.github.com/repos/distri/byte_array",
        "forks_url": "https://api.github.com/repos/distri/byte_array/forks",
        "keys_url": "https://api.github.com/repos/distri/byte_array/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/byte_array/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/byte_array/teams",
        "hooks_url": "https://api.github.com/repos/distri/byte_array/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/byte_array/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/byte_array/events",
        "assignees_url": "https://api.github.com/repos/distri/byte_array/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/byte_array/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/byte_array/tags",
        "blobs_url": "https://api.github.com/repos/distri/byte_array/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/byte_array/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/byte_array/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/byte_array/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/byte_array/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/byte_array/languages",
        "stargazers_url": "https://api.github.com/repos/distri/byte_array/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/byte_array/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/byte_array/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/byte_array/subscription",
        "commits_url": "https://api.github.com/repos/distri/byte_array/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/byte_array/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/byte_array/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/byte_array/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/byte_array/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/byte_array/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/byte_array/merges",
        "archive_url": "https://api.github.com/repos/distri/byte_array/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/byte_array/downloads",
        "issues_url": "https://api.github.com/repos/distri/byte_array/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/byte_array/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/byte_array/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/byte_array/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/byte_array/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/byte_array/releases{/id}",
        "created_at": "2013-12-04T22:10:23Z",
        "updated_at": "2013-12-04T22:11:11Z",
        "pushed_at": "2013-12-04T22:10:23Z",
        "git_url": "git://github.com/distri/byte_array.git",
        "ssh_url": "git@github.com:distri/byte_array.git",
        "clone_url": "https://github.com/distri/byte_array.git",
        "svn_url": "https://github.com/distri/byte_array",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.1.1",
        "defaultBranch": "master"
      },
      "dependencies": {}
    },
    "runtime": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "runtime\n=======\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nentryPoint: \"runtime\"\n",
          "type": "blob"
        },
        "runtime.coffee.md": {
          "path": "runtime.coffee.md",
          "mode": "100644",
          "content": "The runtime holds utilities to assist with an apps running environment.\n\nIt should me moved into it's own component one day.\n\n    Runtime = (pkg) ->\n\nHold on to a reference to our root node.\n\n      root = null\n\nReturns the node that is the parent of the script element that contains the code\nthat calls this function. If `document.write` has been called before this then the\nresults may not be accurate. Therefore be sure to call currentNode before\nwriting anything to the document.\n\n      currentNode = ->\n        target = document.documentElement\n\n        while (target.childNodes.length and target.lastChild.nodeType == 1)\n          target = target.lastChild\n\n        return target.parentNode\n\nDisplay a promo in the console linking back to the creator of this app.\n\n      promo = ->\n        console.log(\"%c You should meet my creator #{pkg.progenitor.url}\", \"\"\"\n          background: #000;\n          color: white;\n          font-size: 2em;\n          line-height: 2em;\n          padding: 10px 100px;\n          margin-bottom: 1em;\n          text-shadow:\n            0 0 0.05em #fff,\n            0 0 0.1em #fff,\n            0 0 0.15em #fff,\n            0 0 0.2em #ff00de,\n            0 0 0.35em #ff00de,\n            0 0 0.4em #ff00de,\n            0 0 0.5em #ff00de,\n            0 0 0.75em #ff00de;'\n        \"\"\")\n\nCall on start to boot up the runtime, get the root node, add styles, display a\npromo.\n\n      boot: ->\n        root = currentNode()\n\n        promo()\n\n        return root\n\nApply the stylesheet to the root node.\n\n      applyStyleSheet: (style) ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n\n        root.appendChild(styleNode)\n\nExport\n\n    module.exports = Runtime\n",
          "type": "blob"
        },
        "test/runtime.coffee": {
          "path": "test/runtime.coffee",
          "mode": "100644",
          "content": "Runtime = require \"../runtime\"\n\ndescribe \"Runtime\", ->\n  it \"should be created from a package and provide a boot method\", ->\n    assert Runtime(PACKAGE).boot\n",
          "type": "blob"
        }
      },
      "distribution": {
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"runtime\"};",
          "type": "blob"
        },
        "runtime": {
          "path": "runtime",
          "content": "(function() {\n  var Runtime;\n\n  Runtime = function(pkg) {\n    var currentNode, promo, root;\n    root = null;\n    currentNode = function() {\n      var target;\n      target = document.documentElement;\n      while (target.childNodes.length && target.lastChild.nodeType === 1) {\n        target = target.lastChild;\n      }\n      return target.parentNode;\n    };\n    promo = function() {\n      return console.log(\"%c You should meet my creator \" + pkg.progenitor.url, \"background: #000;\\ncolor: white;\\nfont-size: 2em;\\nline-height: 2em;\\npadding: 10px 100px;\\nmargin-bottom: 1em;\\ntext-shadow:\\n  0 0 0.05em #fff,\\n  0 0 0.1em #fff,\\n  0 0 0.15em #fff,\\n  0 0 0.2em #ff00de,\\n  0 0 0.35em #ff00de,\\n  0 0 0.4em #ff00de,\\n  0 0 0.5em #ff00de,\\n  0 0 0.75em #ff00de;'\");\n    };\n    return {\n      boot: function() {\n        root = currentNode();\n        promo();\n        return root;\n      },\n      applyStyleSheet: function(style) {\n        var styleNode;\n        styleNode = document.createElement(\"style\");\n        styleNode.innerHTML = style;\n        return root.appendChild(styleNode);\n      }\n    };\n  };\n\n  module.exports = Runtime;\n\n}).call(this);\n\n//# sourceURL=runtime.coffee",
          "type": "blob"
        },
        "test/runtime": {
          "path": "test/runtime",
          "content": "(function() {\n  var Runtime;\n\n  Runtime = require(\"../runtime\");\n\n  describe(\"Runtime\", function() {\n    return it(\"should be created from a package and provide a boot method\", function() {\n      return assert(Runtime(PACKAGE).boot);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/runtime.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "runtime",
      "repository": {
        "id": 13202878,
        "name": "runtime",
        "full_name": "STRd6/runtime",
        "owner": {
          "login": "STRd6",
          "id": 18894,
          "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png&r=x",
          "gravatar_id": "33117162fff8a9cf50544a604f60c045",
          "url": "https://api.github.com/users/STRd6",
          "html_url": "https://github.com/STRd6",
          "followers_url": "https://api.github.com/users/STRd6/followers",
          "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
          "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
          "organizations_url": "https://api.github.com/users/STRd6/orgs",
          "repos_url": "https://api.github.com/users/STRd6/repos",
          "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
          "received_events_url": "https://api.github.com/users/STRd6/received_events",
          "type": "User",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/STRd6/runtime",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/STRd6/runtime",
        "forks_url": "https://api.github.com/repos/STRd6/runtime/forks",
        "keys_url": "https://api.github.com/repos/STRd6/runtime/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/STRd6/runtime/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/STRd6/runtime/teams",
        "hooks_url": "https://api.github.com/repos/STRd6/runtime/hooks",
        "issue_events_url": "https://api.github.com/repos/STRd6/runtime/issues/events{/number}",
        "events_url": "https://api.github.com/repos/STRd6/runtime/events",
        "assignees_url": "https://api.github.com/repos/STRd6/runtime/assignees{/user}",
        "branches_url": "https://api.github.com/repos/STRd6/runtime/branches{/branch}",
        "tags_url": "https://api.github.com/repos/STRd6/runtime/tags",
        "blobs_url": "https://api.github.com/repos/STRd6/runtime/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/STRd6/runtime/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/STRd6/runtime/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/STRd6/runtime/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/STRd6/runtime/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/STRd6/runtime/languages",
        "stargazers_url": "https://api.github.com/repos/STRd6/runtime/stargazers",
        "contributors_url": "https://api.github.com/repos/STRd6/runtime/contributors",
        "subscribers_url": "https://api.github.com/repos/STRd6/runtime/subscribers",
        "subscription_url": "https://api.github.com/repos/STRd6/runtime/subscription",
        "commits_url": "https://api.github.com/repos/STRd6/runtime/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/STRd6/runtime/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/STRd6/runtime/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/STRd6/runtime/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/STRd6/runtime/contents/{+path}",
        "compare_url": "https://api.github.com/repos/STRd6/runtime/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/STRd6/runtime/merges",
        "archive_url": "https://api.github.com/repos/STRd6/runtime/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/STRd6/runtime/downloads",
        "issues_url": "https://api.github.com/repos/STRd6/runtime/issues{/number}",
        "pulls_url": "https://api.github.com/repos/STRd6/runtime/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/STRd6/runtime/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/STRd6/runtime/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/STRd6/runtime/labels{/name}",
        "releases_url": "https://api.github.com/repos/STRd6/runtime/releases{/id}",
        "created_at": "2013-09-30T00:44:37Z",
        "updated_at": "2013-09-30T01:02:40Z",
        "pushed_at": "2013-09-30T01:02:39Z",
        "git_url": "git://github.com/STRd6/runtime.git",
        "ssh_url": "git@github.com:STRd6/runtime.git",
        "clone_url": "https://github.com/STRd6/runtime.git",
        "svn_url": "https://github.com/STRd6/runtime",
        "homepage": null,
        "size": 180,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {},
      "name": "runtime"
    }
  }
});