angular.module('datapoints', []);

angular.module('datapoints', ['d3'])
.directive('lineChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

          var margin = {top: 15, right: 60, bottom: 150, left: 100},
              width = 400 - margin.left - margin.right,
              height = 360 - margin.top - margin.bottom;

          var svg = d3.select(element[0])
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('id', 'svg_id')
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          var x = d3.time.scale().range([0, width]);
          var y = d3.scale.linear().range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(5)
            .tickFormat(d3.time.format('%B-%d-%Y')); // tickFormat
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5);

          // Define the div for the tooltip
          var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

          // Define time format for X-axis
          var formatTime = d3.time.format("%e %B %H:%M");

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // scope.$watch('data', function(){
          //     scope.render(scope.data);
          // });

          scope.render = function(data) {
            if (data === undefined) {
              return ;
            }

            svg.selectAll('*').remove();
            svg.selectAll('g.axis').remove();
            svg.selectAll('.line').remove();

            data.forEach(function(d) {
              d.val = +d.val;
              d.created = new Date(d.created);
            });

            x.domain(d3.extent(data, function(d) {return d.created}));
            y.domain([0, d3.max(data, function(d) {return d.val})]);

            var lineGenerator = d3.svg.line().interpolate('monotone')
              .x(function(d){ return x(d.created)})
              .y(function(d){ return y(d.val)});

            var path = svg.append('path')
            .attr('d',lineGenerator(data));

            var totalLength = path.node().getTotalLength();

            path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(1500)
                .ease('linear')
                .attr('stroke-dashoffset', 2*totalLength);

            svg.selectAll('dot')
              .data(data)
              .enter().append('circle')
              .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html((formatTime(d.created)) + "<br/><b>"  + d.val + "</b>")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              })
              .attr({r: 7, cy: height})
              .transition()
              .duration(1500)
              .attr({'cy': function(d) {return y(d.val)}, 'cx': function(d) {return x(d.created)}})
              ;

            // Add the X Axis
            svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis)
              .selectAll('text')
              .style('text-anchor', 'end')
              .attr('dx', '-.8em')
              .attr('dy', '.15em')
              .attr('transform', function(d) {
                  return 'rotate(-65)'
              });

            // Add the Y Axis
            svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis);
          };
        });
      }};
  }]);

  angular.module('datapoints', ['d3'])
  .directive('lineChart', ['d3Service', function(d3Service) {
      return {
        restrict: 'EA',
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {
          d3Service.d3().then(function(d3) {

            var margin = {top: 15, right: 60, bottom: 150, left: 100},
                width = 400 - margin.left - margin.right,
                height = 360 - margin.top - margin.bottom;

            var svg = d3.select(element[0])
            .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .attr('id', 'svg_id')
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .ticks(5)
              .tickFormat(d3.time.format('%B-%d-%Y')); // tickFormat
            var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left')
              .ticks(5);

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            // Define time format for X-axis
            var formatTime = d3.time.format("%e %B %H:%M");

            // Browser onresize event
            window.onresize = function() {
              scope.$apply();
            };

            // Watch for resize event
            scope.$watch(function() {
              return angular.element(window)[0].innerWidth;
            }, function() {
              scope.render(scope.data);
            });

            // watch for data changes and re-render
            scope.$watch('data', function(newVals, oldVals) {
              return scope.render(newVals);
            }, true);

            // scope.$watch('data', function(){
            //     scope.render(scope.data);
            // });

            scope.render = function(data) {
              if (data === undefined) {
                return ;
              }

              svg.selectAll('*').remove();
              svg.selectAll('g.axis').remove();
              svg.selectAll('.line').remove();

              data.forEach(function(d) {
                d.val = +d.val;
                d.created = new Date(d.created);
              });

              x.domain(d3.extent(data, function(d) {return d.created}));
              y.domain([0, d3.max(data, function(d) {return d.val})]);

              var lineGenerator = d3.svg.line().interpolate('monotone')
                .x(function(d){ return x(d.created)})
                .y(function(d){ return y(d.val)});

              var path = svg.append('path')
              .attr('d',lineGenerator(data));

              var totalLength = path.node().getTotalLength();

              path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
                  .attr('stroke-dashoffset', totalLength)
                  .transition()
                  .duration(1500)
                  .ease('linear')
                  .attr('stroke-dashoffset', 2*totalLength);

              svg.selectAll('dot')
                .data(data)
                .enter().append('circle')
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div	.html((formatTime(d.created)) + "<br/><b>"  + d.val + "</b>")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                    })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .attr({r: 7, cy: height})
                .transition()
                .duration(1500)
                .attr({'cy': function(d) {return y(d.val)}, 'cx': function(d) {return x(d.created)}})
                ;

              // Add the X Axis
              svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis)
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .attr('transform', function(d) {
                    return 'rotate(-65)'
                });

              // Add the Y Axis
              svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis);
            };
          });
        }};
    }]);

angular.module('datapoints', ['d3'])
.directive('scattermapChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

        // var margin = {top: 15, right: 60, bottom: 150, left: 100},
          var margin = {top: 50, right: 50, bottom: 50, left: 50},
            width = 400 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

          var svg = d3.select(element[0])
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('id', 'svg_id')
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


          var xValue = function(d) {return d.coords[0];},
              xScale = d3.scale.linear().range([0, width]),
              xMap = function(d) {return xScale(xValue(d))};

              var yValue = function(d) {return d.coords[1];},
                  yScale = d3.scale.linear().range([height, 0]),
                  yMap = function(d) {return yScale(yValue(d))};



          // var x = d3.scale.linear().range([0, width]);
          // var y = d3.scale.linear().range([height, 0]);
          // setup fill color
          var cValue = function(d) {return d.creator._id;},
              color = d3.scale.category10();

          var xAxis = d3.svg.axis()
            .scale(xScale)
            .innerTickSize(-height)
            .ticks(10)
          var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .innerTickSize(-width)
            .ticks(10);

          // Define the div for the tooltip
          var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

          // Define time format for X-axis
          var formatTime = d3.time.format("%e %B %H:%M");

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function() {
            return angular.element(window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // scope.$watch('data', function(){
          //     scope.render(scope.data);
          // });

          scope.render = function(data) {
            if (data === undefined) {
              return ;
            }

            svg.selectAll('*').remove();
            svg.selectAll('g.axis').remove();
            svg.selectAll('.line').remove();


            xScale.domain(d3.extent(data, xValue));
            yScale.domain(d3.extent(data, yValue));

            svg.selectAll('dot')
              .data(data)
              .enter().append('circle')
              .attr({r: 5 , cx: xMap, cy: yMap})
              .style("opacity",.5)
              .style("fill", function(d) {return color(cValue(d));})
              .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html("x:" + xValue(d) + ", y:" + yValue(d) + "<br/><b>"  + d.val + "</b>")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              })
              .transition()
              .duration(1000)
              .attr({r: function(d) {return d.val/2}})
              ;

            // Add the X Axis
            svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis)
              .selectAll('text')
              // .style('text-anchor', 'end')
              // .attr('dx', '-.8em')
              // .attr('dy', '.15em')
              // .attr('transform', function(d) {
              //     return 'rotate(-65)'})
              ;

            // Add the Y Axis
            svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis);
          };
        });
      }};
  }]);
