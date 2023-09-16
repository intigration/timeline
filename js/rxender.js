


/*
var BAR_WIDTH = 10;
var BAR_GAP = 2;
var LEVEL_FACTOR = 10;

var skillMap = {};
var lastSkillClass = 0;


function addSVG(svg, tag, attrs)
{
    var elt = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        elt.setAttribute(k, attrs[k]);
    svg.appendChild(elt);
}

function renderSkills(svg, skills, x)
{
    if (!skills)
        return;

    var len = skills.length;
    if (len === 0)
        return;

    var x0 = x - (len * BAR_WIDTH + (len - 1) * BAR_GAP) / 2;

    for (var i = 0; i < len; i++)
    {
        var skill = skills[i];
        var cls = skillMap[skill.name];
        if (!cls)
            skillMap[skill.name] = cls = 'skill-' + lastSkillClass++;

        var h = skill.level * LEVEL_FACTOR;
        addSVG(svg, 'circle', { x: x0, y: 100 - h, width: BAR_WIDTH, height: h, class: cls });

        x0 += BAR_WIDTH + BAR_GAP;
    }
}

function renderBox($container, item, id, x, y)
{
    var $div = $(
        '<div class="info" data-id="' + id + '">' +
            '<h1>' + item.title + '</h1>' +
            '<p>' + item.text + '</p>' +
        '</div>'
    );

    $container.append($div);

    var $h1 = $div.find('h1');
    $h1.css('position', 'absolute');
    var width = $h1.width() + 20;
    $h1.css('position', '');

    $div.css({
        left: (x - width / 2) + 'px',
        top: y,
        'width': width
    });

    return $div;
}

function render($svg, data)
{
    var svg = $svg[0];
    var add = addSVG.bind(null, svg);

    var $body = $('body');
    var len = data.length;

    var x = 100;
    var y = undefined;
    var circles = [];

    for (var i = 0; i < len; i++)
    {
        var d = data[i];

        var oldX = x;
        var oldY = y;
        x = (x || 0) + (d.length || 1) * 20;
        y = 20 + 50 * Math.random();

        // life line
        if (i > 0)
            add('line', { x1: oldX, y1: oldY, x2: x, y2: y });
        circles.push({ x: x, y: y });

        // skills
        renderSkills(svg, d.skills, x);

        // info box
        renderBox($body, d, i, x, y);
    }

    len = circles.length;
    for (var i = 0; i < len; i++)
    {
        var circle = circles[i];
        add('circle', { r: 5, cx: circle.x, cy: circle.y, 'data-id': i });
    }

    // open the info box corresponding to the circle
    $('circle').hover(
        function(event)
        {
            $('.info[data-id="' + $(event.target).attr('data-id') + '"]').addClass('is-text-visible');
        },
        function(event)
        {
            $('.info[data-id="' + $(event.target).attr('data-id') + '"]').removeClass('is-text-visible');
        }
    );
}
*/
