<!DOCTYPE html>
<html>
	<head>
        <meta charset="UTF-8">
        <title>My Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./assets/css/bootstrap-combined.no-icons.min.css">
        <link rel="stylesheet" href="./assets/css/flatly.bootstrap.css">
        <link rel="stylesheet" href="./assets/css/font-awesome.min.css">
        <link rel="stylesheet" href="./assets/css/style.css">
	</head>
	 <body>

    <div class="container">
        <div class="navbar navbar-inverse navbar-fixed-top">
          <div class="navbar-inner">
            <div class="container-fluid">
              <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="brand" href="#">Project name</a>
              <div class="nav-collapse collapse">
                <p class="navbar-text pull-right">
                  Logged in as <a href="#" class="navbar-link">Username</a>
                </p>
                <ul class="nav">
                  <li class="active"><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div><!--/.nav-collapse -->
            </div>
          </div>
        </div>

        <div class="container-fluid center-contain">
            <div class="span12">
              <div class="hero-unit">
                <h1>Hello, world!</h1>
                <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                <p><a href="#aboutModal" data-toggle="modal" class="btn btn-primary btn-large"> Learn more &raquo;</a></p>
              </div>
              <div class="row-fluid">
                <div class="span4">
                  <h2><i class="icon-heart"></i> Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a class="btn" href="#">View details &raquo;</a></p>
                </div><!--/span-->
                <div class="span4">
                  <h2><i class="icon-linux"></i> Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a class="btn" href="#">View details &raquo;</a></p>
                </div><!--/span-->
                <div class="span4">
                  <h2><i class="icon-spinner icon-spin"></i> Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a class="btn" href="#">View details &raquo;</a></p>
                </div><!--/span-->
              </div><!--/row-->
              <div class="row-fluid">
                <div class="span4">
                  <h2>Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a class="btn" href="#">View details &raquo;</a></p>
                </div><!--/span-->
                <div class="span4">
                  <h2>Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a class="btn" href="#">View details &raquo;</a></p>
                </div><!--/span-->
                <div class="span4">
                  <h2>Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><a class="btn" href="#">View details &raquo;</a></p>
                </div><!--/span-->
              </div><!--/row-->
            </div><!--/span-->
          </div><!--/row-->

          <hr>

          <footer>
            <p>&copy; Company 2013</p>
          </footer>

        </div><!--/.fluid-container-->
       </div> 
    <!--/. Sample modal window-->
    <div id="aboutModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="aboutModal" aria-hidden="true" style="display: none;">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="title">Modal Header</h3>
        </div>
        <div class="modal-body">
            <h3>Main subtitles goes here</h3>
            <p>
              All the rest of the text are belong to us
            </p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Okay</button>
        </div>
    </div>

    <!-- Le javascript
    ================================================== -->
    <script src="./assets/js/jquery-2.0.3.min.js"></script>
    <script src="./assets/js/bootstrap.min.js"></script>
    <script src="./assets/js/underscore-min.js"></script>
    <script src="./assets/js/request.js"></script>
    <script src="./assets/js/beeline.js"></script>
    <script src="./assets/js/social.api.js"></script>
    <script src="./assets/js/main.js"></script>
  </body>
</html>
