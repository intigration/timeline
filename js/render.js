function Renderer(dataUrl, options)
{
    // constants
    this.COLORS = options && options.colors || [ 'deeppink', 'deepskyblue', 'orange', 'springgreen','green' ];
    this.PERSON_COLORS = options && options.personColors || [ '#333', '#fff' ];
    this.USE_SKILL_BUBBLES = options && options.useSkillBubbles || false;
    this.LENGTH_FACTOR = options && options.lengthFactor || 120;
    this.LEVEL_FACTOR = options && options.levelFactor || 5;
    this.OVERLAP_FACTOR = options && options.overlapFactor || 0.8;
    this.OFFSET_X = options && options.offsetX || 20;
    this.OFFSET_Y = options && options.offsetY || 20;
    this.SKILLBAR_GAP = options && options.skillBarGap || 0.2;
    this.SKILLBARS_PADDING = options && options.skillBarsPadding || 5; // padding in %
    this.SVG_HEIGHT = options && options.svgHeight || 200;

    // elements
    this.skillsContainer = d3.select('.skills');
    this.chart = d3.select('.chart');
    this.background1 = d3.select('.background:first-child');
    this.background2 = d3.select('.background:nth-child(2)');

    this.skillColors = {};
    this.typeColors = {};
    this.personIndices = {};

    this.widthSvg = 0;
    this.scrollX = 0;
    this.prevBackground = null;
    this.tidBackground = null;
    this.prevBox = null;

    // load the data and render
    d3.json(dataUrl, Renderer.prototype.render.bind(this));
}

Renderer.prototype.render = function(error, root)
{
    if (error)
        throw error;

    this.root = root;

    this.showInfo = Renderer.prototype.displayInfo.bind(this, true);
    this.hideInfo = Renderer.prototype.displayInfo.bind(this, false);

    this.layoutSkills();
    this.setInitialBackground();

    this.drawLifeLine();
    this.drawInfoBoxes();
    this.drawLegend();

    if (this.USE_SKILL_BUBBLES)
        this.drawSkillBubbles();
    else
        this.drawSkillBars();

    this.setTitle();
    this.drawSocialIcons();

    this.svg
        .attr('width', this.widthSvg)
        .attr('viewbox', '0 0 ' + this.widthSvg + ' ' + this.SVG_HEIGHT);

    this.createBlurer();
    this.createScroller();

    // initially, scroll to the end
    this.setScroll(this.widthSvg + 300);
};

Renderer.prototype.setTitle = function()
{
    var names = Object.keys(this.personIndices);
    console.log(names);
    if (names.length === 1)
    {
        d3.select('head title').text(this.root.title);
        d3.select('h1.title').text(this.root.title);
    }
    else
    {
        d3.select('head title').text('Road to Industry 5.0 ' + names.slice(0, -1).join(', ') + (names.length > 2 ? ', ' : ' ') + 'and ' + names[names.length - 1]);
        d3.select('h1.title').text('Path to Industry 5.0');
        d3.select('h2.title')
            .selectAll('.name')
            .data(names)
            .enter()
            .append('span')
            .attr('data-personidx', function(d, i) { return i; })
            .text(function(d) { return d; });
        d3.select('h2.oneliner').text(this.root.title);
    }
};

Renderer.prototype.layoutSkills = function()
{
    var that = this;
    var x = this.OFFSET_X;

    if (this.USE_SKILL_BUBBLES)
    {
        var prevRadius = 0;

        this.root.items.forEach(function(d)
        {
            d3.packSiblings((d.skills || []).map(function(d)
            {
                d.r = d.level * that.LEVEL_FACTOR;
                return d;
            }));

            d.skillCircle = d.skills && d.skills.length > 0 ? d3.packEnclose(d.skills) : 0;
            var r = (d.skillCircle && d.skillCircle.r) || 0;

            x += Math.max((r + prevRadius) * that.OVERLAP_FACTOR, (d.length || 1) * that.LENGTH_FACTOR);
            d.x = x;
            d.y = that.SVG_HEIGHT - that.OFFSET_Y - r / 2;

            prevRadius = r;
        });
    }
    else
    {
        this.root.items.forEach(function(d)
        {
            x += Math.max((d.length || 1) * that.LENGTH_FACTOR);
            d.x = x;
            d.y = Math.max(that.OFFSET_Y, that.SVG_HEIGHT - that.OFFSET_Y - (d.skills && d.skills.length || 0) * that.LEVEL_FACTOR);
        });
    }

    this.widthSvg = x + this.OFFSET_X;
};

Renderer.prototype.drawLifeLine = function()
{
    var that = this;

    var line = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveCardinal);

    this.svg = this.chart.append('svg');
    this.svg.append('path')
        .datum(this.root.items)
        .attr('class', 'life-line')
        .attr('d', line);

    var stopGroup = this.svg.append('g');
    stopGroup.selectAll('.stop')
        .data(this.root.items)
        .enter()
        .append('circle')
            .attr('class', 'stop')
            .attr('data-id', function(d, i) { return i; })
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; })
            .attr('r', '5px')
            .on('mouseover', this.showInfo)
            .on('mouseout', this.hideInfo)
            .on('touchstart', function(d, i)
            {
                if (that.prevBox)
                    that.displayInfo(false, that.prevBox.d, that.prevBox.i);
                that.prevBox = { d: d, i: i };
                that.displayInfo(true, d, i);
            });

    stopGroup.selectAll('.fine-line')
        .data(this.root.items)
        .enter()
        .append('line')
            .attr('class', 'fine-line')
            .attr('x1', function(d) { return d.x; })
            .attr('y1', function(d) { return d.y - 20; })
            .attr('x2', function(d) { return d.x; })
            .attr('y2', function(d) { return d.y - 100 + (d.offsetY || 0); })
};

Renderer.prototype.drawInfoBoxes = function()
{
    var that = this;
    var now = this.root.monthNames[new Date().getMonth()] + ' ' + new Date().getFullYear();
    var lastTypeIdx = 0;
    var lastPersonIdx = 0;

    var infoBox = this.chart.selectAll('.info-box')
        .data(this.root.items)
        .enter()
        .append('div')
            .attr('class', 'info-box')
            .attr('data-id', function(d, i) { return i; })
            .attr('data-personidx', function(d)
            {
                var idx = that.personIndices[d.person];
                if (idx === undefined)
                    that.personIndices[d.person] = idx = lastPersonIdx++;
                return idx;            
            })
            .attr('style', function(d)
            {
                return (
                    'left:' + (d.x - 20) + 'px;' +
                    'margin-top:' + (d.y - 250 + (d.offsetY || 0)) + 'px;'
                );
            })
            .on('mouseover', this.showInfo)
            .on('mouseout', this.hideInfo);
    infoBox.append('img')
    .attr('src', function(d)
    {
        
        return d.logo || '';

        })
    .attr('style',function() { return 'height:31px;'; });
      

    infoBox.append('time')
        .text(function(d) { return d.date || now; });

    infoBox.filter(function(d) { return !!d.subtitle; })
        .append('div')
        .append('h2')
            .text(function(d) { return d.subtitle; });

    infoBox.append('div').append('h1')
        .attr('style', function(d)
        {
            var color = that.typeColors[d.type];
            if (!color)
                that.typeColors[d.type] = color = that.COLORS[lastTypeIdx++];//'hsl(' + (55 * lastTypeIdx++) + ', 100%, 50%)';
            return 'border-color:' + color;
        })
        .text(function(d) { return d.title; });

    infoBox.filter(function(d) { return !!d.text; })
        .append('p')
            .html(function(d) { return d.text; })
            .on('click', function(i) { alert(d, i) });
};

Renderer.prototype.drawLegend = function()
{
    var that = this;

    d3.select('legend ul').selectAll('li')
        .data(Object.keys(this.typeColors))
        .enter()
        .append('li')
            .attr('style', function(d) { return 'border-color:' + that.typeColors[d]; })
            .text(function(d) { return d; });
};

Renderer.prototype.drawSkillBubbles = function()
{
    var that = this;
    var lastSkillIdx = 0;

    var skillSet = this.skillsContainer.selectAll('.skill-set')
        .data(this.root.items)
        .enter()
        .append('div')
            .attr('class', 'skill-set')
            .attr('data-id', function(d, i) { return i; })
            .attr('style', function(d)
            {
                var r = (d.skillCircle && d.skillCircle.r) || 0;

                return (
                    'left:' + d.x + 'px;' +
                    'top:' + (30 + r / 2) + 'px;'
                );
            });

    var skill = skillSet.selectAll('.skill')
        .data(function(d) { return d.skills || []; })
        .enter()
        .append('div')
            .attr('class', function(d)
            {
                return 'skill';
            })
            .attr('style', function(d)
            {
                var color = that.skillColors[d.name];
                if (!color)
                    that.skillColors[d.name] = color = 'hsl(' + (29 * lastSkillIdx++) + ', 100%, 95%)';

                return (
                    'left:' + (d.x - d.r) + 'px;' +
                    'top:' + (d.y - d.r) + 'px;' +
                    'width:' + (2 * d.r) + 'px;' +
                    'height:' + (2 * d.r) + 'px;' +
                    //'border: 5px solid ' + color + ';' +
                    //'background-color: #fff;'
                    'background-color:' + color + ';'
                );
            })
            .html(function(d) { return d.name; });
}; 

Renderer.prototype.drawSkillBars = function()
{
    var lenGroups = this.root.skills.length;

    // gaps between groups (equal to one bar width)
    var numBars = lenGroups;

    for (var i = 0; i < lenGroups; i++)
    {
        var group = this.root.skills[i];
        numBars += group.length + (group.length - 1) * this.SKILLBAR_GAP;
    }

    var barWidth = (100 - 2 * this.SKILLBARS_PADDING) / numBars;

    var eltMeasureWidth = document.getElementById('measureWidth');
    var measureWidth = function(text)
    {
        eltMeasureWidth.textContent = text;
        return Math.ceil(eltMeasureWidth.getBoundingClientRect().width);
    };

    var skillGroup = d3.select('.skillbars').selectAll('.skillbar-group')
        .data(this.root.skills)
        .enter()
        .append('div')
            .attr('class', 'skillbar-group')
            .style('margin', '0 ' + (barWidth * (0.5 - this.SKILLBAR_GAP)) + 'vw');

    skillGroup.selectAll('.skillbar')
        .data(function(d, i)
        {
            return d.map(function(d)
            {
                return { name: d, groupIdx: i };
            });
        })
        .enter()
        .append('div')
            .attr('class', 'skillbar')
            .attr('data-skill', function(d) { return d.name; })
            .attr('data-natural-height', function(d) { return (measureWidth(d.name) + 15) + 'px' })
            .attr('data-hue', function(d, i) { return d.groupIdx * 60 + i * 4; })
            .style('width', barWidth + 'vw')
            .style('height', function(d) { return (measureWidth(d.name) + 15) + 'px' })
            .style('margin', '0 ' + (barWidth * this.SKILLBAR_GAP * 0.5) + 'vw')
        .append('div')
            .text(function(d) { return d.name; })
            .style('width', function(d) { return (measureWidth(d.name) + 5) + 'px' });
};

Renderer.prototype.drawSocialIcons = function()
{
    var socialIcons = d3.select('.social-icons');

    socialIcons.selectAll('.social-icon')
        .data(this.root.social)
        .enter()
        .append('a')
            .attr('class', 'social-icon')
            .attr('href', function(d) { return d.href; })
            .attr('target', '_blank')
        .append('img')
            .attr('src', function(d) { return d.icon; });

    if (this.root.pdfCV)
    {
        socialIcons
            .append('a')
                .attr('class', 'social-icon pdf-cv')
                .attr('href', this.root.pdfCV)
                .attr('target', '_blank')
                .attr('title', 'Download CV as PDF')
            .append('img')
                .attr('src', 'assets/icons/pdf.svg');
    }
};
  
Renderer.prototype.displayInfo = function(show, d, i)
{
    this.chart.select('.info-box[data-id="' + i + '"]').classed('is-text-visible', show);
    this.skillsContainer.select('[data-id="' + i + '"]').classed('is-visible', show);
    this.chart.select('.stop[data-id="' + i + '"]')
        .attr('style', show ?
            'stroke:' + this.typeColors[d.type] + '; fill:' + this.typeColors[d.type] :
            'stroke: #000; fill: #fff')
        .attr('r', show ? '10px' : '5px');

    d3.select('.skillbars').classed('is-visible', show);

    var maxSkillLevel = d.skills ? Math.max.apply(null, d.skills.map(function(d) { return d.level; })) : 0;
    var lenSkills = (d.skills && d.skills.length) || 0;

    for (var i = 0; i < lenSkills; i++)
    {
        var skill = d.skills[i];
        var bar = d3.select('[data-skill="' + skill.name + '"]');
        if (!bar.size())
            continue;

        if (show)
        {
            bar
                .style('opacity', 0.9)
                .style('color', '#fff')
                .style('background-color', 'hsl(' + bar.attr('data-hue') + ', 50%, 50%)')
                .style('height', (skill.level / maxSkillLevel * 100) + '%');
        }
        else
        {
            bar
                .style('opacity', 0.5)
                .style('color', '#000')
                .style('background-color', '#fff')
                .style('height', bar.attr('data-natural-height'));
        }
    }

    if (show && d.background)
        this.setBackground(d);
};

Renderer.prototype.setInitialBackground = function()
{
    for (var i = this.root.items.length - 1; i >= 0; i--)
    {
        if (this.root.items[i].background)
        {
            this.setBackground(this.root.items[i]);
            break;
        }
    }
};

Renderer.prototype.setBackground = function(d)
{
    if (!d || !d.background || d.background === this.prevBackground)
        return;

    if (this.tidBackground !== null)
        clearTimeout(this.tidBackground);

    var that = this;
    var img = document.createElement('img');
    img.onload = function()
    {
        that.tidBackground = setTimeout(function()
        {
            that.background2.style('background-image', 'url(' + d.background + ')');
            that.background2.style('opacity', 1);
            that.background1.style('opacity', 0);

            var tmp = that.background1;
            that.background1 = that.background2;
            that.background2 = tmp;    

            that.tidBackground = null;
            that.prevBackground = d.background;
        }, 1500);
    };

    img.src = d.background;
};

Renderer.prototype.setScroll = function(scroll)
{
    this.scrollX = scroll;
    
    var w = window.innerWidth;
    var h = window.innerHeight;

    var chartScale = Math.min(1, (h * 0.5) / 400);
    var chartOffsetY = (1 - chartScale) * h * 0.2;
    var widthSvg = this.widthSvg * chartScale;

    if (this.scrollX < -50)
        this.scrollX = -50;
    else if (this.scrollX >= widthSvg - w + 200)
        this.scrollX = widthSvg - w + 200;

    this.chart.attr('style', 'transform: translate(' + -this.scrollX + 'px, ' + chartOffsetY + 'px) scale(' + chartScale + ');');
};

Renderer.prototype.createScroller = function()
{
    var that = this;
    var eltScrollLeft = document.getElementById('scroll-left');
    var eltScrollRight = document.getElementById('scroll-right');
    var tidScroll = null;

    var stopScrolling = function()
    {
        if (tidScroll !== null)
            clearInterval(tidScroll);
        tidScroll = null;
    };

    var setScroll = function(offset)
    {
        if (tidScroll === null)
        {
            tidScroll = setInterval(function()
            {
                that.setScroll(that.scrollX + offset);
            }, 200);
        }
    };

    var onMouseWheel = function(event)
    {
        event.preventDefault();
        that.setScroll(that.scrollX + event.deltaX);
    };
    
    var scrollLeft = setScroll.bind(null, -50);
    var scrollRight = setScroll.bind(null, 50);

    eltScrollLeft.addEventListener('mouseenter', scrollLeft);
    eltScrollLeft.addEventListener('mouseleave', stopScrolling);
    eltScrollRight.addEventListener('mouseenter', scrollRight);
    eltScrollRight.addEventListener('mouseleave', stopScrolling);

    eltScrollLeft.addEventListener('touchstart', scrollLeft); 
    eltScrollLeft.addEventListener('touchend', stopScrolling);
    eltScrollRight.addEventListener('touchstart', scrollRight); 
    eltScrollRight.addEventListener('touchend', stopScrolling);

    document.addEventListener('mousewheel', onMouseWheel);
    document.addEventListener('wheel', onMouseWheel);

    var startX;

    document.addEventListener('touchstart', function(event)
    {
        event.preventDefault();
        startX = that.scrollX + event.touches[0].clientX;
    });

    document.addEventListener('touchmove', function(event)
    {
        event.preventDefault();
        that.setScroll(startX - event.touches[0].clientX);
    });

    document.addEventListener('scroll', function(event)
    {
        event.preventDefault();
    });
};

Renderer.prototype.createBlurer = function()
{
    var that = this;
    var prevBlur = 10;

    document.addEventListener('mousemove', function(event)
    {
        var h = window.innerHeight / 2;
        var blur = Math.floor(Math.min(10, 5 * (h / Math.abs(h - event.clientY) - 1)));
        if (blur !== prevBlur) {
            that.background1.style('filter', 'blur(' + blur + 'px)');
            //background.style.filter = 'blur(' + blur + 'px)'; 
        }
            else {
        prevBlur = blur; }
    });
};
